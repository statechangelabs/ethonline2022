// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@polydocs/contracts/contracts/interfaces/MetadataURI.sol";

contract Escrow is MetadataURI, Ownable {
    using Counters for Counters.Counter;
    // address public buyer;
    // address public seller;
    // address public arbiter;
    // uint public amount;
    // Counters private _counter;
    event BidCreated(
        uint256 indexed jobID
        // address buyer,
        // address seller,
        // address arbiter,
        // uint256 amount
    );
    event OfferCreated(
        uint256 indexed jobID
        // address buyer,
        // address seller,
        // address arbiter,
        // uint256 amount
    );

    event BidAccepted(
        uint256 indexed jobID
        // address buyer,
        // address seller,
        // address arbiter,
        // uint256 amount
    );

    event OfferAccepted(
        uint256 indexed jobID
        // address buyer,
        // address seller,
        // address arbiter,
        // uint256 amount
    );

    event Delivered(
        uint256 indexed jobID
        // address buyer,
        // address seller,
        // address arbiter,
        // uint256 amount
    );

    event Receipt(
        uint256 indexed jobID
        // address buyer,
        // address seller,
        // address arbiter,
        // uint256 amount
    );

    event Refunded(
        uint256 indexed jobID
        // address buyer,
        // address seller,
        // address arbiter,
        // uint256 amount
    );

    event Cancelled(
        uint256 indexed jobID
        // address buyer,
        // address seller,
        // address arbiter,
        // uint256 amount
    );

    event PartialOffered(
        uint256 indexed jobID
        // address buyer,
        // address seller,
        // address arbiter,
        // uint256 amount
    );

    event Disputed(
        uint256 indexed jobID
        // address buyer,
        // address seller,
        // address arbiter,
        // uint256 amount
    );

    event Arbitrated(
        uint256 indexed jobID
        // address buyer,
        // address seller,
        // address arbiter,
        // uint256 amount
    );

    event Reviewed(
        uint256 indexed jobID
        // address buyer,
        // address seller,
        // address arbiter,
        // uint256 amount
    );

    event Completed(
        uint256 indexed jobID
        // address buyer,
        // address seller,
        // address arbiter,
        // uint256 amount
    );

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
        // uint jobId;
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
        string sellerReviewUri;
        string buyerReviewUri;
        string arbiterReviewByBuyerUri;
        string arbiterReviewBySellerUri;
        string arbiterOpinionUri;
        uint256 partialOffer;
        address partialOfferer;
    }

    uint256 reviewBlocks = 1000;

    Job[] public jobs;
    IERC20 private USDC;
    string private _uri;

    // State public currentState;

    constructor() {
        USDC = IERC20(0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174);
        // buyer = _buyer;
        // seller = _seller;
        // arbiter = _arbiter;
        // amount = 0;
        // currentState = State.AWAITING_PAYMENT;
    }

    /// @notice This is the latest block height at which the terms were updated.
    /// @dev This is the latest block height at which the terms were updated. 0 by default.
    uint256 _lastTermChange = 0;

    /// @notice Returns whether the address is allowed to accept terms on behalf of the signer.
    /// @dev This function returns whether the address is allowed to accept terms on behalf of the signer.
    mapping(address => bool) private _metaSigners;

    /// @notice This modifier requires that the msg.sender is either the owner of the contract or an approved metasigner
    modifier onlyMetaSigner() {
        require(
            _metaSigners[_msgSender()] || owner() == _msgSender(),
            "Not a metasigner or Owner"
        );
        _;
    }

    /// @notice Function to set the contract URI
    /// @dev This function lets the owner of the contract or a metasigner set the contract URI.
    /// @dev It emits UpdatedURI event when URI is updated.
    /// @param _newURI The URI to set.
    function setURI(string memory _newURI) external onlyMetaSigner {
        _uri = _newURI;
        _lastTermChange = block.number;
        emit UpdatedURI(_uri);
    }

    /// @notice Function to get the contract URI
    /// @dev This function returns the contract URI.
    /// @return _uri The contract URI.
    function URI() public view returns (string memory) {
        return _uri;
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
        string memory signature
    ) external {
        return _bid(amount, seller, arbiter, buyer);
    }

    // when buyer is initiating the job for a specific amount and for a specific seller
    function _bid(
        uint256 amount,
        address seller,
        address arbiter,
        address buyer
    ) internal {
        Job memory newJob;
        _counter.increment();
        newJob.amount = amount;
        newJob.buyer = buyer; //newJob.buyer = buyer; ??
        newJob.status = State.AWAITING_ACCEPTANCE;
        newJob.seller = seller;
        newJob.arbiter = arbiter;
        newJob.buyerAccepted = true;
        newJob.sellerAccepted = false;
        jobs.push(newJob);
        USDC.transferFrom(buyer, address(this), amount); // USDC.transferFrom(buyer, address(this), amount); ??
        // require(condition, "Escrow: condition");
        emit BidCreated(
            _counter.current()
            // msg.sender,
            // seller,
            // arbiter,
            // amount
        );
        // return _counter.current();
    }

    function acceptBid(uint256 jobID) external {
        _acceptBid(jobID, msg.sender);
    }

    function acceptBidFor(
        uint256 jobID,
        address seller,
        string memory signature
    ) external {
        _acceptBid(jobID, seller);
    }

    function _acceptBid(uint256 jobId, address seller) internal {
        Job storage job = jobs[jobId];
        require(
            seller == job.seller, //seller == job.seller??
            "Escrow: Only the seller can accept the bid"
        );
        job.sellerAccepted = true;
        require(job.buyerAccepted && job.sellerAccepted);
        job.status = State.AWAITING_DELIVERY;
        emit BidAccepted(jobId);
        // , job.buyer, job.seller, job.arbiter, job.amount);
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
        string memory signature
    ) external {
        _offer(amount, buyer, arbiter, seller);
    }

    function _offer(
        uint256 amount,
        address buyer,
        address arbiter,
        address seller
    ) internal {
        Job memory newJob;
        _counter.increment();
        newJob.amount = amount;
        newJob.buyer = buyer;
        newJob.status = State.AWAITING_ACCEPTANCE;
        newJob.seller = seller; // newJob.seller = seller; ??
        newJob.arbiter = arbiter;
        newJob.buyerAccepted = false;
        newJob.sellerAccepted = true;
        jobs.push(newJob);

        emit OfferCreated(
            _counter.current()
            // buyer,
            // msg.sender,
            // arbiter,
            // amount
        );
    }

    function offerAccepted(uint256 jobId) external {
        _offerAccepted(jobId, msg.sender);
    }

    function offerAcceptedFor(
        uint256 jobId,
        address buyer,
        string memory signature
    ) external {
        _offerAccepted(jobId, buyer);
    }

    function _offerAccepted(uint256 jobId, address buyer) internal {
        Job storage job = jobs[jobId];
        require(
            buyer == job.buyer, // buyer == job.buyer ??
            "Escrow: Only the buyer can accept the offer"
        );
        job.buyerAccepted = true;
        require(job.buyerAccepted && job.sellerAccepted);
        USDC.transferFrom(buyer, address(this), job.amount);
        job.status = State.AWAITING_DELIVERY;
        emit OfferAccepted(
            jobId
            // job.buyer,
            // job.seller,
            // job.arbiter,
            // job.amount
        );
    }

    function assertDelivery(uint256 jobId) external {
        _assertDelivery(jobId, msg.sender);
    }

    function assertDeliveryFor(
        uint256 jobId,
        address seller,
        string memory signature
    ) external {
        _assertDelivery(jobId, seller);
    }

    function _assertDelivery(uint256 jobId, address seller) internal {
        Job storage job = jobs[jobId];
        require(
            seller == job.seller, // seller == job.seller ??
            "Escrow: Only the seller can assert delivery"
        );
        job.status = State.AWAITING_RECEIPT;
        emit Delivered(jobId);
        // , job.buyer, job.seller, job.arbiter, job.amount);
    }

    function receiveDelivery(uint256 jobId) external {
        _receiveDelivery(jobId, msg.sender);
    }

    function recieveDeliveryFor(
        uint256 jobId,
        address buyer,
        string memory signature
    ) external {
        _receiveDelivery(jobId, buyer);
    }

    function _receiveDelivery(uint256 jobId, address buyer) internal {
        Job storage job = jobs[jobId];
        require(
            buyer == job.buyer, // buyer == job.buyer ??
            "Escrow: Only the buyer can receive delivery"
        );
        job.status = State.COMPLETE;
        USDC.transferFrom(address(this), job.seller, job.amount);
        emit Receipt(jobId);
        // , job.buyer, job.seller, job.arbiter, job.amount);
    }

    function cancel(uint256 jobId) external {
        _cancel(jobId, msg.sender);
    }

    function cancelFor(
        uint256 jobId,
        address canceller,
        string memory signature
    ) external {
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
                // USDC.transfer(address(this), job.buyer, job.amount);
                emit Refunded(
                    jobId
                    // job.buyer,
                    // job.seller,
                    // job.arbiter,
                    // job.amount
                );
            } else {
                job.status = State.CANCELLED;
                emit Cancelled(
                    jobId
                    // job.buyer,
                    // job.seller,
                    // job.arbiter,
                    // job.amount
                );
            }
        } else if (canceller == job.buyer) {
            if (job.status == State.AWAITING_ACCEPTANCE) {
                if (job.buyerAccepted) {
                    job.status = State.CANCELLED;
                    emit Cancelled(
                        jobId
                        // job.buyer,
                        // job.seller,
                        // job.arbiter,
                        // job.amount
                    );
                    // USDC.transfer(address(this), job.buyer, job.amount);
                } else {
                    job.status = State.CANCELLED;
                    emit Cancelled(
                        jobId
                        // job.buyer,
                        // job.seller,
                        // job.arbiter,
                        // job.amount
                    );
                }
            } else {
                require(
                    false,
                    "Escrow: Buyer cannot cancel the job in progress"
                );
            }
        } else {
            require(
                false,
                "Escrow: Only the buyer or seller can cancel the job"
            );
        }
    }

    function partialCompletion(uint256 jobId, uint256 amount) external {
        _partialCompletion(jobId, amount, msg.sender);
    }

    function partialCompletionFor(
        uint256 jobId,
        uint256 amount,
        address offerer,
        string memory signature
    ) external {
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
            "Escrow: Only the parties can offer a partial delivery"
        );
        require(
            amount <= job.amount,
            "Escrow: The amount cannot be greater than the job amount"
        );
        require(
            job.status == State.AWAITING_DELIVERY ||
                job.status == State.AWAITING_RECEIPT,
            "Escrow: Job must be in progress"
        );
        if (job.partialOffer == amount) {
            require(
                job.partialOfferer != offerer,
                "Escrow: Cannot offer the same amount twice"
            );
            //settle it
            job.status = State.COMPLETE;
            emit Completed(
                jobId
                // job.buyer,
                // job.seller,
                // job.arbiter,
                // job.amount
            );
            if (job.partialOffer > 0 && job.partialOffer <= job.amount)
                USDC.transferFrom(address(this), job.seller, job.partialOffer);
            if (job.partialOffer < job.amount)
                // need to understand this
                USDC.transferFrom(
                    address(this),
                    job.seller,
                    job.amount - job.partialOffer
                );
            job.partialOffer = amount;
        } else {
            job.partialOffer = amount;
            job.partialOfferer = offerer;
            emit PartialOffered(jobId);
            // , offerer, amount);
        }
    }

    function dispute(uint256 jobId) external {
        _dispute(jobId, msg.sender);
    }

    function disputeFor(
        uint256 jobId,
        address disputor,
        string memory signature
    ) external {
        _dispute(jobId, disputor);
    }

    function _dispute(uint256 jobId, address disputor) internal {
        Job storage job = jobs[jobId];
        require(disputor == job.buyer, "Escrow: Only the buyer can dispute");
        job.status = State.DISPUTED;
        emit Disputed(jobId);
        // , job.buyer, job.seller, job.arbiter, job.amount);
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
        string memory signature
    ) external {
        _arbitrate(jobId, amount, opinionURI, arbiter);
    }

    function _arbitrate(
        uint256 jobId,
        uint256 amount,
        string memory opinionURI,
        address arbiter
    ) internal {
        Job storage job = jobs[jobId];
        require(
            job.status == State.DISPUTED,
            "Escrow: Job must be disputed to arbitrate"
        );
        require(
            job.arbiter == arbiter,
            "Escrow: Only the arbiter can arbitrate"
        );
        require(
            amount <= job.amount,
            "Escrow: The amount cannot be greater than the job amount"
        );
        job.status = State.COMPLETE;
        if (amount > 0)
            USDC.transferFrom(address(this), job.seller, job.partialOffer);
        if (amount < job.amount)
            // need to understand this
            USDC.transferFrom(
                address(this),
                job.seller,
                job.amount - job.partialOffer
            );
        emit Arbitrated(
            jobId
            // job.buyer,
            // job.seller,
            // job.arbiter,
            // job.amount,
            // opinionURI
        );
    }

    function reviewBuyer(
        uint256 jobId,
        uint8 score,
        string memory reviewURI
    ) external {
        _reviewBuyer(jobId, score, reviewURI, msg.sender);
    }

    function reviewBuyerFor(
        uint256 jobId,
        uint8 score,
        string memory reviewURI,
        address seller,
        string memory signature
    ) external {
        _reviewBuyer(jobId, score, reviewURI, seller);
    }

    // Multiple reviews are allowed at the moment. maybe we should limit it to one review per job?
    function _reviewBuyer(
        uint256 jobId,
        uint8 score,
        string memory reviewURI,
        address seller
    ) internal {
        Job storage job = jobs[jobId];
        require(
            job.status == State.COMPLETE,
            "Escrow: Job must complete to review"
        );
        require(
            job.seller == seller,
            "Escrow: Only the seller can review the buyer"
        );
        job.status = State.COMPLETE;
        emit Reviewed(
            jobId
            // job.buyer,
            // job.seller,
            // job.arbiter,
            // job.amount,
            // reviewURI
        );
    }

    function reviewSeller(
        uint256 jobId,
        uint8 score,
        string memory reviewURI
    ) external {
        _reviewSeller(jobId, score, reviewURI, msg.sender);
    }

    function reviewSellerFor(
        uint256 jobId,
        uint8 score,
        string memory reviewURI,
        address buyer,
        string memory signature
    ) external {
        _reviewSeller(jobId, score, reviewURI, buyer);
    }

    function _reviewSeller(
        uint256 jobId,
        uint8 score,
        string memory reviewURI,
        address buyer
    ) internal {
        Job storage job = jobs[jobId];
        require(
            job.status == State.COMPLETE,
            "Escrow: Job must complete to review"
        );
        require(
            job.buyer == buyer,
            "Escrow: Only the buyer can review the seller"
        );
        job.status = State.COMPLETE;
        emit Reviewed(
            jobId
            // job.buyer,
            // job.seller,
            // job.arbiter,
            // job.amount,
            // reviewURI
        );
    }

    function reviewArbiter(
        uint256 jobId,
        uint8 score,
        string memory reviewURI
    ) external {
        _reviewArbiter(jobId, score, reviewURI, msg.sender);
    }

    function reviewArbiterFor(
        uint256 jobId,
        uint8 score,
        string memory reviewURI,
        address reviewer,
        string memory signature
    ) external {
        _reviewArbiter(jobId, score, reviewURI, reviewer);
    }

    function _reviewArbiter(
        uint256 jobId,
        uint8 score,
        string memory reviewURI,
        address reviewer
    ) internal {
        Job storage job = jobs[jobId];
        require(
            job.status == State.COMPLETE &&
                job.arbitrated = true,
            "Escrow: Job must arbitrated to review"
        );
        require(
            job.buyer == reviewer || job.seller == reviewer,
            "Escrow: Only the buyer or seller can review the arbiter"
        );
        job.status = State.COMPLETE;
        emit Reviewed(
            jobId
            // job.buyer,
            // job.seller,
            // job.arbiter,
            // job.amount,
            // reviewURI
        );
    }

    // function

    // function deposit() public payable {
    //     require(msg.sender == buyer, "Only buyer can deposit");
    //     require(currentState == State.AWAITING_PAYMENT, "Already paid");
    //     amount += msg.value;
    //     if (amount == 2 ether) {
    //         currentState = State.AWAITING_DELIVERY;
    //     }
    // }

    // function confirmDelivery() public {
    //     require(msg.sender == seller, "Only seller can confirm delivery");
    //     require(
    //         currentState == State.AWAITING_DELIVERY,
    //         "Cannot confirm delivery"
    //     );
    //     seller.transfer(amount);
    //     amount = 0;
    //     currentState = State.COMPLETE;
    // }

    // function refundBuyer() public {
    //     require(msg.sender == arbiter, "Only arbiter can refund buyer");
    //     require(currentState == State.AWAITING_DELIVERY, "Cannot refund buyer");
    //     buyer.transfer(amount);
    //     amount = 0;
    //     currentState = State.REFUNDED;
    // }
}
