// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./Escrow.sol";

contract Review is Ownable {
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
    // struct Job {
    //     // uint jobId;
    //     uint256 amount;
    //     address buyer;
    //     address seller;
    //     address arbiter;
    //     State status;
    //     bool buyerAccepted;
    //     bool sellerAccepted;
    //     bool arbitrated;
    //     uint256 deliveryHeight;
    //     uint256 dueHeight;
    //     // uint8 buyerScore;
    //     // uint8 sellerScore;
    //     // uint8 arbiterBuyerScore;
    //     // uint8 arbiterSellerScore;
    //     // string sellerReviewUri;
    //     // string buyerReviewUri;
    //     // string arbiterReviewByBuyerUri;
    //     // string arbiterReviewBySellerUri;
    //     // string arbiterOpinionUri;
    //     uint256 partialOffer;
    //     address partialOfferer;
    //     string arbiterOpinionUri;
    // }

    struct JobReview {
        uint8 buyerScore;
        uint8 sellerScore;
        uint8 arbiterBuyerScore;
        uint8 arbiterSellerScore;
        string sellerReviewUri;
        string buyerReviewUri;
        string arbiterReviewByBuyerUri;
        string arbiterReviewBySellerUri;
    }

    // constructor(address )
    Escrow _escrow;
    // Job[] public jobs;
    mapping(uint256 => JobReview) public jobReviews;

    event Reviewed(
        uint256 indexed jobID
        // address buyer,
        // address seller,
        // address arbiter,
        // uint256 amount
    );

    function checkSigner(string memory Uri, bytes memory _signature)
        internal
        pure
        returns (address)
    {
        bytes32 hash = ECDSA.toEthSignedMessageHash(bytes(Uri));
        return ECDSA.recover(hash, _signature);
    }

    function setEscrow(address newEscrow) external onlyOwner {
        _escrow = Escrow(newEscrow);
    }

    function escrow() external view returns (address) {
        return address(_escrow);
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
        bytes memory signature
    ) external {
        require(
            seller ==
                checkSigner(
                    string(
                        abi.encodePacked(
                            "I am reviewing the buyer for job with id: ",
                            jobId
                        )
                    ),
                    signature
                )
        );
        _reviewBuyer(jobId, score, reviewURI, seller);
    }

    // Multiple reviews are allowed at the moment. maybe we should limit it to one review per job?
    function _reviewBuyer(
        uint256 jobId,
        uint8 score,
        string memory reviewURI,
        address seller
    ) internal {
        Escrow.Job memory job = _escrow.getJob(jobId);
        require(
            job.status == Escrow.State.COMPLETE,
            "Job must complete to review"
        );
        require(job.seller == seller, "Only the seller can review the buyer");
        require(score <= 5, "The score must be between 0 and 5");
        JobReview memory review;
        review.buyerScore = score;
        review.buyerReviewUri = reviewURI;
        jobReviews[jobId] = review;
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
        bytes memory signature
    ) external {
        require(
            buyer ==
                checkSigner(
                    string(
                        abi.encodePacked(
                            "I am reviewing the seller for job with id: ",
                            jobId
                        )
                    ),
                    signature
                )
        );
        _reviewSeller(jobId, score, reviewURI, buyer);
    }

    function _reviewSeller(
        uint256 jobId,
        uint8 score,
        string memory reviewURI,
        address buyer
    ) internal {
        Escrow.Job memory job = _escrow.getJob(jobId);
        require(
            job.status == Escrow.State.COMPLETE,
            "Job must complete to review"
        );
        require(job.buyer == buyer, "Only the buyer can review the seller");
        JobReview memory review;
        review.sellerScore = score;
        review.sellerReviewUri = reviewURI;
        jobReviews[jobId] = review;

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
        bytes memory signature
    ) external {
        require(
            reviewer ==
                checkSigner(
                    string(
                        abi.encodePacked(
                            "I am reviewing the arbiter for job with id: ",
                            jobId
                        )
                    ),
                    signature
                )
        );
        _reviewArbiter(jobId, score, reviewURI, reviewer);
    }

    function _reviewArbiter(
        uint256 jobId,
        uint8 score,
        string memory reviewURI,
        address reviewer
    ) internal {
        Escrow.Job memory job = _escrow.getJob(jobId);

        require(
            job.status == Escrow.State.COMPLETE && job.arbitrated == true,
            "Job must arbitrated to review"
        );
        require(
            job.buyer == reviewer || job.seller == reviewer,
            "Only the buyer or seller can review the arbiter"
        );

        if (job.buyer == reviewer) {
            JobReview memory review;
            review.arbiterBuyerScore = score;
            review.arbiterReviewByBuyerUri = reviewURI;
            jobReviews[jobId] = review;
        } else {
            JobReview memory review;
            review.arbiterSellerScore = score;
            review.arbiterReviewBySellerUri = reviewURI;
            jobReviews[jobId] = review;
        }
        emit Reviewed(
            jobId
            // job.buyer,
            // job.seller,
            // job.arbiter,
            // job.amount,
            // reviewURI
        );
    }
}
