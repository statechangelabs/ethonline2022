// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Escrow {
    // address public buyer;
    // address public seller;
    // address public arbiter;
    // uint public amount;
    // Counters private _counter;
    event BidCreated(
        uint indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint amount
    );
    event OfferCreated(
        uint indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint amount
    );

    event BidAccepted(
        uint indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint amount
    );

    event OfferAccepted(
        uint indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint amount
    );

    event Delivered(
        uint indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint amount
    );

    event Receipt(
        uint indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint amount
    );

    event Refunded(
        uint indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint amount
    );

    event Cancelled(
        uint indexed jobID,
        address buyer,
        address seller,
        address arbiter,
        uint amount
    );

    Counters private _counter;
    enum State {
        AWAITING_ACCEPTANCE,
        AWAITING_DELIVERY,
        AWAITING_RECEIPT,
        COMPLETE,
        REFUNDED,
        CANCELLED
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
    }

    Job[] public jobs;

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

    function offerAccepted(uint256 jobId) public {
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
        USDC.transfer(address(this), job.seller, job.amount);
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
