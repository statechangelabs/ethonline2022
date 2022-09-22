// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./BuyerRegistry.sol";
import "./SellerRegistry.sol";
import "./Escrow.sol";

// buyer has a request with a uri and a price in array of requests
// seller offers a price on the request and a Uri, seller can also make multiple offers on the same request
contract Requests is Ownable {
    Escrow _escrow;
    BuyerRegistry _buyerRegistry;
    SellerRegistry _sellerRegistry;
    using Counters for Counters.Counter;
    Counters.Counter private _requestId;
    Counters.Counter private _offerId;

    enum RequestState {
        OPEN,
        WITHDRAWN,
        ACCEPTED
    }
    enum OfferState {
        OPEN,
        WITHDRAWN,
        ACCEPTED
    }
    struct Request {
        address buyer;
        uint256 price;
        string uri;
        RequestState state;
        address arbiter;
    }
    struct Offer {
        address seller;
        uint256 price;
        string uri;
        uint256 requestId;
        OfferState state;
        address arbiter;
    }
    Request[] public _requests;
    Offer[] public _offers;
    // mapping(address => Request[]) private _requests;
    // mapping(address => Offer[]) private _offers;
    // mapping(address => mapping(address => uint256)) private _offersIndex;
    // mapping(address => mapping(address => uint256)) private _requestsIndex;

    event NewRequest(
        address indexed _buyer,
        uint256 indexed _requestId,
        uint256 _price
    );
    event NewOffer(
        address indexed _seller,
        uint256 indexed _requestId,
        uint256 indexed _offerId,
        uint256 _price
    );

    event OfferAccepted(
        address indexed _buyer,
        address indexed _seller,
        uint256 indexed _requestId
    );

    event RequestWithdrawn(address indexed _buyer, uint256 indexed _requestId);

    event OfferWithdrawn(address indexed _seller, uint256 indexed _offerId);

    function setEscrow(address escrow) external onlyOwner {
        _escrow = Escrow(escrow);
    }

    function setBuyerRegistry(address buyerRegistry) external onlyOwner {
        _buyerRegistry = BuyerRegistry(buyerRegistry);
    }

    function setSellerRegistry(address sellerRegistry) external onlyOwner {
        _sellerRegistry = SellerRegistry(sellerRegistry);
    }

    function getRequest(uint256 requestId)
        public
        view
        returns (Request memory)
    {
        return _requests[requestId];
    }

    function makeRequest(
        uint256 _price,
        string memory _uri,
        address _arbiter
    ) external {
        require(
            _buyerRegistry.acceptedTerms(msg.sender),
            "Buyer has not accepted terms"
        );
        Request memory newRequest;
        newRequest.buyer = msg.sender;
        newRequest.price = _price;
        newRequest.uri = _uri;
        newRequest.state = RequestState.OPEN;
        newRequest.arbiter = _arbiter;
        _requests.push(newRequest);
        emit NewRequest(msg.sender, _requestId.current(), _price);
        _requestId.increment();
    }

    function makeOffer(
        uint256 requestId,
        uint256 _price,
        string memory _uri,
        address _arbiter
    ) external {
        require(
            _sellerRegistry.acceptedTerms(msg.sender),
            "Seller has not accepted terms"
        );
        Offer memory newOffer;
        newOffer.seller = msg.sender;
        newOffer.price = _price;
        newOffer.uri = _uri;
        newOffer.requestId = requestId;
        newOffer.state = OfferState.OPEN;
        newOffer.arbiter = _arbiter;
        emit NewOffer(msg.sender, requestId, _offerId.current(), _price);
        _offerId.increment();
    }

    function acceptOffer(uint256 offerId) external {
        // Request memory request;
        require(
            _buyerRegistry.acceptedTerms(msg.sender),
            "Buyer has not accepted terms"
        );
        Offer storage _offer = _offers[offerId];
        require(_offer.state == OfferState.OPEN, "Offer is not open");
        Request storage _request = _requests[_offer.requestId];
        require(_request.state == RequestState.OPEN, "Request is not open");
        require(
            _request.buyer == msg.sender,
            "Only the buyer can accept the offer"
        );
        _offer.state = OfferState.ACCEPTED;
        _request.state = RequestState.ACCEPTED;

        _escrow.bid(_offer.price, _offer.seller, _offer.arbiter);
        emit OfferAccepted(msg.sender, _offer.seller, _offer.requestId);
    }

    function withdrawRequest(uint256 requestId) external {
        Request storage _request = _requests[requestId];
        require(_request.state == RequestState.OPEN, "Request is not open");
        require(
            _request.buyer == msg.sender,
            "Only the buyer can withdraw the request"
        );
        _request.state = RequestState.WITHDRAWN;
        emit RequestWithdrawn(msg.sender, requestId);
    }

    function withdrawOffer(uint256 offerId) external {
        Offer storage _offer = _offers[offerId];
        require(_offer.state == OfferState.OPEN, "Offer is not open");
        require(
            _offer.seller == msg.sender,
            "Only the seller can withdraw the offer"
        );
        _offer.state = OfferState.WITHDRAWN;
        emit OfferWithdrawn(msg.sender, offerId);
    }
}
