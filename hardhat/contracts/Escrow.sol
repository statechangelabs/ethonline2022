// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@polydocs/contracts/contracts/interfaces/MetadataURI.sol";

contract Escrow is MetadataURI {
    using Counters for Counters.Counter;
    // address public buyer;
    // address public seller;
    // address public arbiter;
    // uint public amount;
    // Counters private _counter;
    event BidCreated(
        uint256 indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint256 amount
    );
    event OfferCreated(
        uint256 indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint256 amount
    );

    event BidAccepted(
        uint256 indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint256 amount
    );

    event OfferAccepted(
        uint256 indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint256 amount
    );

    event Delivered(
        uint256 indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint256 amount
    );

    event Receipt(
        uint256 indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint256 amount
    );

    event Refunded(
        uint256 indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint256 amount
    );

    event Cancelled(
        uint256 indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint256 amount
    );

    Counters.Counter private _counter;
    enum State {
        AWAITING_ACCEPTANCE,
        AWAITING_DELIVERY,
        AWAITING_RECEIPT,
        COMPLETE,
        REFUNDED,
        CANCELLED,
        IN_DISPUTE,
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
        uint256 deliveryHeight;
        uint256 dueHeight;
        string sellerReviewUri;
        string buyerReviewUri;
        string arbiterReviewByBuyerUri;
        string arbiterReviewBySellerUri;
        string arbiterOpinionUri;
    }

    uint256 reviewBlocks = 1000;

    Job[] public jobs;
    IERC20 private USDC;

    // State public currentState;

    constructor() {
        USDC = IERC20(0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174);
        // buyer = _buyer;
        // seller = _seller;
        // arbiter = _arbiter;
        // amount = 0;
        // currentState = State.AWAITING_PAYMENT;
    }

    // when buyer is initiating the job for a specific amount and for a specific seller
    function bid(
        uint256 amount,
        address seller,
        address arbiter
    ) public {
        Job memory newJob;
        _counter.increment();
        newJob.amount = amount;
        newJob.buyer = msg.sender;
        newJob.status = State.AWAITING_ACCEPTANCE;
        newJob.seller = seller;
        newJob.arbiter = arbiter;
        newJob.buyerAccepted = true;
        newJob.sellerAccepted = false;
        jobs.push(newJob);
        USDC.transferFrom(msg.sender, address(this), amount);
        // require(condition, "Escrow: condition");
        emit BidCreated(
            _counter.current(),
            msg.sender,
            seller,
            arbiter,
            amount
        );
        // return _counter.current();
    }

    function acceptBid(uint256 jobId) public {
        Job storage job = jobs[jobId];
        require(
            msg.sender == job.seller,
            "Escrow: Only the seller can accept the bid"
        );
        job.sellerAccepted = true;
        require(job.buyerAccepted && job.sellerAccepted);
        job.status = State.AWAITING_DELIVERY;
        emit BidAccepted(jobId, job.buyer, job.seller, job.arbiter, job.amount);
    }

    function offer(
        uint256 amount,
        address buyer,
        address arbiter
    ) public {
        Job memory newJob;
        _counter.increment();
        newJob.amount = amount;
        newJob.buyer = buyer;
        newJob.status = State.AWAITING_ACCEPTANCE;
        newJob.seller = msg.sender;
        newJob.arbiter = arbiter;
        newJob.buyerAccepted = false;
        newJob.sellerAccepted = true;
        jobs.push(newJob);

        emit OfferCreated(
            _counter.current(),
            buyer,
            msg.sender,
            arbiter,
            amount
        );
    }

    function offerAccepted(uint256 jobId) external {
        _offerAccepted(jobId, msg.sender);
    }

    function offerAccepted(
        uint256 jobId,
        address buyer,
        string memory signature
    ) external {
        _offerAccepted(jobId, buyer);
    }

    function _offerAccepted(uint256 jobId, address buyer) internal {
        Job storage job = jobs[jobId];
        require(
            msg.sender == job.buyer,
            "Escrow: Only the buyer can accept the offer"
        );
        job.buyerAccepted = true;
        require(job.buyerAccepted && job.sellerAccepted);
        USDC.transferFrom(msg.sender, address(this), job.amount);
        job.status = State.AWAITING_DELIVERY;
        emit OfferAccepted(
            jobId,
            job.buyer,
            job.seller,
            job.arbiter,
            job.amount
        );
    }

    function assertDelivery(uint256 jobId) public {
        Job storage job = jobs[jobId];
        require(
            msg.sender == job.seller,
            "Escrow: Only the seller can assert delivery"
        );
        job.status = State.AWAITING_RECEIPT;
        emit Delivered(jobId, job.buyer, job.seller, job.arbiter, job.amount);
    }

    function receiveDelivery(uint256 jobId) public {
        Job storage job = jobs[jobId];
        require(
            msg.sender == job.buyer,
            "Escrow: Only the buyer can receive delivery"
        );
        job.status = State.COMPLETE;
        USDC.transferFrom(address(this), job.seller, job.amount);
        emit Receipt(jobId, job.buyer, job.seller, job.arbiter, job.amount);
    }

    function cancel(uint256 jobId) public {
        Job storage job = jobs[jobId];
        if (msg.sender == job.seller) {
            require(
                job.status == State.AWAITING_DELIVERY ||
                    job.status == State.AWAITING_RECEIPT ||
                    job.status == State.AWAITING_ACCEPTANCE
            );
            if (job.buyerAccepted) {
                job.status = State.REFUNDED;
                // USDC.transfer(address(this), job.buyer, job.amount);
                emit Refunded(
                    jobId,
                    job.buyer,
                    job.seller,
                    job.arbiter,
                    job.amount
                );
            } else {
                job.status = State.CANCELLED;
                emit Cancelled(
                    jobId,
                    job.buyer,
                    job.seller,
                    job.arbiter,
                    job.amount
                );
            }
        } else if (msg.sender == job.buyer) {
            if (job.status == State.AWAITING_ACCEPTANCE) {
                if (job.buyerAccepted) {
                    job.status = State.CANCELLED;
                    emit Cancelled(
                        jobId,
                        job.buyer,
                        job.seller,
                        job.arbiter,
                        job.amount
                    );
                    // USDC.transfer(address(this), job.buyer, job.amount);
                } else {
                    job.status = State.CANCELLED;
                    emit Cancelled(
                        jobId,
                        job.buyer,
                        job.seller,
                        job.arbiter,
                        job.amount
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

    function partialCompletion(uint256 jobId, uint256 amount) public {
        Job storage job = jobs[jobId];
        require(
            msg.sender == job.seller || msg.sender == job.buyer,
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
                job.partialOfferer != msg.sender,
                "Escrow: Cannot offer the same amount twice"
            );
            //settle it
            job.status = State.COMPLETE;
            emit Completed(
                jobId,
                job.buyer,
                job.seller,
                job.arbiter,
                job.amount
            );
            if (job.partialOffer > 0 && job.partialOffer <= job.amount)
                USDC.transferFrom(address(this), job.seller, job.partialOffer);
            if (job.partialOffer < job.amount)
                USDC.transferFrom(
                    address(this).job.seller,
                    job.amount - job.partialOffer
                );
            job.partialOffer = amount;
        } else {
            job.partialOffer = amount;
            job.partialOfferer = msg.sender;
            emit PartialOffered(jobId, msg.sender, amount);
        }
    }

    function dispute(uint256 jobId) public {
        Job storage job = jobs[jobId];
        require(msg.sender == job.buyer, "Escrow: Only the buyer can dispute");
        job.status = State.DISPUTED;
        emit Disputed(jobId, job.buyer, job.seller, job.arbiter, job.amount);
    }

    function arbitrate(
        uint256 jobId,
        uint256 amount,
        string opinionURI
    ) {
        Job storage job = jobs[jobId];
        require(
            job.status == State.DISPUTED,
            "Escrow: Job must be disputed to arbitrate"
        );
        require(
            job.arbiter == msg.sender,
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
            USDC.transferFrom(
                address(this).job.seller,
                job.amount - job.partialOffer
            );
        emit Arbitrated(
            jobId,
            job.buyer,
            job.seller,
            job.arbiter,
            job.amount,
            opinionURI
        );
    }

    function reviewBuyer(
        uint256 jobId,
        uint8 score,
        string reviewURI
    ) public {
        Job storage job = jobs[jobId];
        require(
            job.status == State.COMPLETE,
            "Escrow: Job must complete to review"
        );
        require(
            job.seller == msg.sender,
            "Escrow: Only the seller can review the buyer"
        );
        job.status = State.COMPLETE;
        emit Reviewed(
            jobId,
            job.buyer,
            job.seller,
            job.arbiter,
            job.amount,
            opinionURI
        );
    }

    function reviewSeller(
        uint256 jobId,
        uint8 score,
        string reviewURI
    ) public {
        Job storage job = jobs[jobId];
        require(
            job.status == State.COMPLETE,
            "Escrow: Job must complete to review"
        );
        require(
            job.buyer == msg.sender,
            "Escrow: Only the buyer can review the seller"
        );
        job.status = State.COMPLETE;
        emit Reviewed(
            jobId,
            job.buyer,
            job.seller,
            job.arbiter,
            job.amount,
            opinionURI
        );
    }

    function reviewArbiter(
        uint256 jobId,
        uint8 score,
        string reviewURI
    ) public {
        Job storage job = jobs[jobId];
        require(
            job.status == State.COMPLETE &&
                job.arbitrated = true,
            "Escrow: Job must arbitrated to review"
        );
        require(
            job.buyer == msg.sender || job.seller == msg.sender,
            "Escrow: Only the buyer or seller can review the arbiter"
        );
        job.status = State.COMPLETE;
        emit Reviewed(
            jobId,
            job.buyer,
            job.seller,
            job.arbiter,
            job.amount,
            opinionURI
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
