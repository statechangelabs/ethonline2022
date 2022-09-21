// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "hardhat/console.sol";
import "@polydocs/contracts/contracts/interfaces/MetadataURI.sol";

// import "./Review.sol";

contract Escrow is Ownable {
    using Counters for Counters.Counter;

    event BidCreated(
        uint256 indexed jobID,
        address indexed buyer,
        address indexed seller
    );
    event OfferCreated(
        uint256 indexed jobID,
        address indexed buyer,
        address indexed seller
    );

    event BidAccepted(
        uint256 indexed jobID,
        address indexed buyer,
        address indexed seller
    );

    event OfferAccepted(
        uint256 indexed jobID,
        address indexed buyer,
        address indexed seller
    );

    event Delivered(uint256 indexed jobID, address indexed buyer);

    event Receipt(uint256 indexed jobID, address indexed seller);

    event Refunded(uint256 indexed jobID, address indexed buyer);

    event Cancelled(
        uint256 indexed jobID,
        address indexed buyer,
        address indexed seller
    );

    event PartialOffered(
        uint256 indexed jobID,
        address indexed buyer,
        address indexed seller,
        uint256 amount
    );

    event Disputed(uint256 indexed jobID, address indexed seller);

    event Arbitrated(
        uint256 indexed jobID,
        address indexed buyer,
        address indexed seller
    );

    event Completed(uint256 indexed jobID);

    Counters.Counter private _counter;
    enum State {
        AWAITING_ACCEPTANCE,
        AWAITING_DELIVERY,
        AWAITING_RECEIPT,
        COMPLETE,
        REFUNDED,
        CANCELLED,
        DISPUTED,
        ARBITRATED
    }

    struct Job {
        uint256 amount;
        address buyer;
        address seller;
        address arbiter;
        State status;
        bool buyerAccepted;
        bool sellerAccepted;
        bool arbitrated;
        uint256 deliveryHeight;
        uint256 dueHeight;
        uint256 partialOffer;
        address partialOfferer;
    }

    mapping(uint256 => string) public arbiterOpinionUris;

    uint256 reviewBlocks = 1000;

    Job[] public jobs;
    IERC20 private USDC;
    string private _uri;

    // State public currentState;

    constructor() {
        USDC = IERC20(0xe11A86849d99F524cAC3E7A0Ec1241828e332C62);
    }

    /// @notice This is the latest block height at which the terms were updated.
    /// @dev This is the latest block height at which the terms were updated. 0 by default.
    // uint256 _lastTermChange = 0;

    // /// @notice Returns whether the address is allowed to accept terms on behalf of the signer.
    // /// @dev This function returns whether the address is allowed to accept terms on behalf of the signer.
    // mapping(address => bool) private _metaSigners;

    // /// @notice This modifier requires that the msg.sender is either the owner of the contract or an approved metasigner
    // modifier onlyMetaSigner() {
    //     require(
    //         _metaSigners[_msgSender()] || owner() == _msgSender(),
    //         "Not a metasigner or Owner"
    //     );
    //     _;
    // }

    // function setURI(string memory _newURI) external onlyMetaSigner {
    //     _uri = _newURI;
    //     _lastTermChange = block.number;
    //     emit UpdatedURI(_uri);
    // }

    // /// @notice Function to get the contract URI
    // /// @dev This function returns the contract URI.
    // /// @return _uri The contract URI.
    // function URI() public view returns (string memory) {
    //     return _uri;
    // }

    function getJob(uint256 _jobId) public view returns (Job memory) {
        Job memory job = jobs[_jobId];
        return (job);
    }

    function checkSigner(string memory Uri, bytes memory _signature)
        internal
        pure
        returns (address)
    {
        bytes32 hash = ECDSA.toEthSignedMessageHash(bytes(Uri));
        return ECDSA.recover(hash, _signature);
    }

    function bid(
        uint256 amount,
        address seller,
        address arbiter
    ) external {
        _bid(amount, seller, arbiter, msg.sender);
    }

    function bidFor(
        uint256 amount,
        address seller,
        address arbiter,
        address buyer,
        bytes memory signature
    ) external {
        // string memory message = "I intend to bid for this job.";
        require(buyer == checkSigner("I am hiring for this job.", signature));
        _bid(amount, seller, arbiter, buyer);
    }

    // when buyer is initiating the job for a specific amount and for a specific seller
    function _bid(
        uint256 amount,
        address seller,
        address arbiter,
        address buyer
    ) internal {
        Job memory newJob;
        newJob.amount = amount;
        newJob.buyer = buyer;
        newJob.status = State.AWAITING_ACCEPTANCE;
        newJob.seller = seller;
        newJob.arbiter = arbiter;
        newJob.buyerAccepted = true;
        newJob.sellerAccepted = false;
        jobs.push(newJob);

        console.log(_counter.current());
        USDC.transferFrom(buyer, address(this), amount); // buyer needs to approve this contract to spend USDC
        console.log("Bid created event firing now.");
        emit BidCreated(_counter.current(), newJob.buyer, newJob.seller);
        console.log("Bid created event emitted above this.");
        _counter.increment();
    }

    function acceptBid(uint256 jobID) external {
        _acceptBid(jobID, msg.sender);
    }

    function acceptBidFor(
        uint256 jobID,
        address seller,
        bytes memory signature
    ) external {
        require(seller == checkSigner("I am accepting this job.", signature));
        _acceptBid(jobID, seller);
    }

    function _acceptBid(uint256 jobId, address seller) internal {
        console.log("Seller balance");
        Job storage job = jobs[jobId];
        console.log("here");
        require(seller == job.seller);
        job.sellerAccepted = true;
        require(job.buyerAccepted && job.sellerAccepted);
        job.status = State.AWAITING_DELIVERY;
        emit BidAccepted(jobId, job.buyer, job.seller);
    }

    function offer(
        uint256 amount,
        address buyer,
        address arbiter
    ) external {
        _offer(amount, buyer, arbiter, msg.sender);
    }

    function offerFor(
        uint256 amount,
        address buyer,
        address arbiter,
        address seller,
        bytes memory signature
    ) external {
        require(seller == checkSigner("I am offering this job.", signature));
        _offer(amount, buyer, arbiter, seller);
    }

    function _offer(
        uint256 amount,
        address buyer,
        address arbiter,
        address seller
    ) internal {
        Job memory newJob;

        newJob.amount = amount;
        newJob.buyer = buyer;
        newJob.status = State.AWAITING_ACCEPTANCE;
        newJob.seller = seller; // newJob.seller = seller; ??
        newJob.arbiter = arbiter;
        newJob.buyerAccepted = false;
        newJob.sellerAccepted = true;
        jobs.push(newJob);

        emit OfferCreated(_counter.current(), newJob.buyer, newJob.seller);
        _counter.increment();
    }

    function acceptOffer(uint256 jobId) external {
        _acceptOffer(jobId, msg.sender);
    }

    function acceptOfferFor(
        uint256 jobId,
        address buyer,
        bytes memory signature
    ) external {
        require(
            buyer ==
                checkSigner("I am accepting the offer for this job.", signature)
        );
        _acceptOffer(jobId, buyer);
    }

    function _acceptOffer(uint256 jobId, address buyer) internal {
        Job storage job = jobs[jobId];
        require(buyer == job.buyer);
        job.buyerAccepted = true;
        require(job.buyerAccepted && job.sellerAccepted);
        USDC.transferFrom(buyer, address(this), job.amount);
        job.status = State.AWAITING_DELIVERY;
        emit OfferAccepted(jobId, job.buyer, job.seller);
    }

    function assertDelivery(uint256 jobId) external {
        _assertDelivery(jobId, msg.sender);
    }

    function assertDeliveryFor(
        uint256 jobId,
        address seller,
        bytes memory signature
    ) external {
        require(
            seller ==
                checkSigner("I am asserting delivery for this job.", signature)
        );
        _assertDelivery(jobId, seller);
    }

    function _assertDelivery(uint256 jobId, address seller) internal {
        Job storage job = jobs[jobId];
        require(seller == job.seller);
        job.status = State.AWAITING_RECEIPT;
        emit Delivered(jobId, job.buyer);
    }

    function receiveDelivery(uint256 jobId) external {
        _receiveDelivery(jobId, msg.sender);
    }

    function recieveDeliveryFor(
        uint256 jobId,
        address buyer,
        bytes memory signature
    ) external {
        require(
            buyer ==
                checkSigner("I am receiving delivery for this job.", signature)
        );
        _receiveDelivery(jobId, buyer);
    }

    function _receiveDelivery(uint256 jobId, address buyer) internal {
        Job storage job = jobs[jobId];
        require(buyer == job.buyer);
        job.status = State.COMPLETE;
        USDC.approve(address(this), job.amount);
        USDC.transferFrom(address(this), job.seller, job.amount);
        emit Receipt(jobId, job.seller);
    }

    function cancel(uint256 jobId) external {
        _cancel(jobId, msg.sender);
    }

    function cancelFor(
        uint256 jobId,
        address canceller,
        bytes memory signature
    ) external {
        require(
            canceller == checkSigner("I am cancelling this job.", signature)
        );
        _cancel(jobId, canceller);
    }

    function _cancel(uint256 jobId, address canceller) internal {
        Job storage job = jobs[jobId];
        if (canceller == job.seller) {
            require(
                job.status == State.AWAITING_DELIVERY ||
                    job.status == State.AWAITING_RECEIPT ||
                    job.status == State.AWAITING_ACCEPTANCE
            );
            if (job.buyerAccepted) {
                job.status = State.REFUNDED;
                USDC.transferFrom(address(this), job.buyer, job.amount);
                emit Refunded(jobId, job.buyer);
            } else {
                job.status = State.CANCELLED;
                emit Cancelled(jobId, job.buyer, job.seller);
            }
        } else if (canceller == job.buyer) {
            if (job.status == State.AWAITING_ACCEPTANCE) {
                if (job.buyerAccepted) {
                    job.status = State.CANCELLED;
                    emit Cancelled(jobId, job.buyer, job.seller);
                    USDC.transferFrom(address(this), job.buyer, job.amount);
                } else {
                    job.status = State.CANCELLED;
                    emit Cancelled(jobId, job.buyer, job.seller);
                }
            } else {
                // Buyer cannot cancel the job in progress
                require(false);
            }
        } else {
            //Only the buyer or seller can cancel the job
            require(false);
        }
    }

    function partialCompletion(uint256 jobId, uint256 amount) external {
        _partialCompletion(jobId, amount, msg.sender);
    }

    function partialCompletionFor(
        uint256 jobId,
        uint256 amount,
        address offerer,
        bytes memory signature
    ) external {
        require(
            offerer ==
                checkSigner(
                    "I am asserting partial completion for this job.",
                    signature
                )
        );
        _partialCompletion(jobId, amount, offerer);
    }

    function _partialCompletion(
        uint256 jobId,
        uint256 amount,
        address offerer
    ) internal {
        Job storage job = jobs[jobId];
        require(
            offerer == job.seller || offerer == job.buyer,
            "Only the parties can offer a partial delivery"
        );
        require(
            amount <= job.amount,
            "The amount cannot be greater than the job amount"
        );
        require(
            job.status == State.AWAITING_DELIVERY ||
                job.status == State.AWAITING_RECEIPT,
            "Job must be in progress"
        );
        if (job.partialOffer == amount) {
            require(
                job.partialOfferer != offerer,
                "Cannot offer the same amount twice"
            );
            //settle it
            job.status = State.COMPLETE;
            emit Completed(jobId);
            if (job.partialOffer > 0 && job.partialOffer <= job.amount) {
                USDC.transferFrom(address(this), job.seller, job.partialOffer);
            }
            if (job.partialOffer < job.amount) {
                // need to understand this
                USDC.transferFrom(
                    address(this),
                    job.seller,
                    job.amount - job.partialOffer
                );
                job.partialOffer = amount;
            }
        } else {
            job.partialOffer = amount;
            job.partialOfferer = offerer;
            emit PartialOffered(jobId, job.buyer, job.seller, job.partialOffer);
        }
    }

    function dispute(uint256 jobId) external {
        _dispute(jobId, msg.sender);
    }

    function disputeFor(
        uint256 jobId,
        address disputor,
        bytes memory signature
    ) external {
        require(
            disputor ==
                checkSigner(
                    string(
                        abi.encodePacked(
                            "I am disputing the job with id: ",
                            jobId
                        )
                    ),
                    signature
                )
        );
        _dispute(jobId, disputor);
    }

    function _dispute(uint256 jobId, address disputor) internal {
        Job storage job = jobs[jobId];
        require(disputor == job.buyer, "Only the buyer can dispute");
        require(
            job.status == State.AWAITING_DELIVERY || // can the buyer dispute before the seller delivers?
                job.status == State.AWAITING_RECEIPT,
            "Job must be in progress"
        );
        job.status = State.DISPUTED;
        emit Disputed(jobId, job.seller);
    }

    function arbitrate(
        uint256 jobId,
        uint256 amount,
        string memory opinionURI
    ) external {
        _arbitrate(jobId, amount, opinionURI, msg.sender);
    }

    function arbitrateFor(
        uint256 jobId,
        uint256 amount,
        string memory opinionURI,
        address arbiter,
        bytes memory signature
    ) external {
        require(
            arbiter ==
                checkSigner(
                    string(
                        abi.encodePacked(
                            "This is my opinion on job with id: ",
                            jobId
                        )
                    ),
                    signature
                )
        );
        _arbitrate(jobId, amount, opinionURI, arbiter);
    }

    function _arbitrate(
        uint256 jobId,
        uint256 amount,
        string memory opinionURI,
        address arbiter
    ) internal {
        Job storage job = jobs[jobId];
        require(job.status == State.DISPUTED, "Must be disputed to arbitrate");
        require(job.arbiter == arbiter, "Only the arbiter can arbitrate");
        require(
            amount <= job.amount,
            "The amount cannot be greater than the job amount"
        );
        // JobReview memory review;
        arbiterOpinionUris[jobId] = opinionURI;

        job.status = State.COMPLETE;
        if (amount > 0) {
            USDC.transferFrom(address(this), job.seller, amount);
        }
        if (amount < job.amount) {
            // need to understand this
            USDC.transferFrom(address(this), job.seller, job.amount - amount);
        }

        emit Arbitrated(jobId, job.buyer, job.seller);
    }
}
