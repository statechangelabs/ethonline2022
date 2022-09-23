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

    function getOffer(uint256 offerId) public view returns (Offer memory) {
        // console.log("Length of _offers: ", _offers.length);
        return _offers[offerId];
    }

    function makeRequest(
        uint256 _price,
        string memory _uri,
        address _arbiter
    ) external {
        _makeRequest(_price, _uri, _arbiter, msg.sender);
    }

    function makeRequestFor(
        uint256 _price,
        string memory _uri,
        address _arbiter,
        address _buyer
    ) external {
        _makeRequest(_price, _uri, _arbiter, _buyer);
    }

    function _makeRequest(
        uint256 _price,
        string memory _uri,
        address _arbiter,
        address _buyer
    ) internal {
        require(
            _buyerRegistry.acceptedTerms(_buyer),
            "Buyer has not accepted terms"
        );
        Request memory newRequest;
        newRequest.buyer = _buyer;
        newRequest.price = _price;
        newRequest.uri = _uri;
        newRequest.state = RequestState.OPEN;
        newRequest.arbiter = _arbiter;
        _requests.push(newRequest);
        emit NewRequest(_buyer, _requestId.current(), _price);
        _requestId.increment();
    }

    function makeOffer(
        uint256 __requestId,
        uint256 _price,
        string memory _uri,
        address _arbiter
    ) external {
        _makeOffer(__requestId, _price, _uri, _arbiter, msg.sender);
    }

    function makeOfferFor(
        uint256 __requestId,
        uint256 _price,
        string memory _uri,
        address _arbiter,
        address _seller
    ) external {
        _makeOffer(__requestId, _price, _uri, _arbiter, _seller);
    }

    function _makeOffer(
        uint256 requestId,
        uint256 _price,
        string memory _uri,
        address _arbiter,
        address _seller
    ) internal {
        require(
            _sellerRegistry.acceptedTerms(_seller),
            "Seller has not accepted terms"
        );
        Offer memory newOffer;
        newOffer.seller = _seller;
        newOffer.price = _price;
        newOffer.uri = _uri;
        newOffer.requestId = requestId;
        newOffer.state = OfferState.OPEN;
        newOffer.arbiter = _arbiter;
        _offers.push(newOffer);
        emit NewOffer(_seller, requestId, _offerId.current(), _price);
        _offerId.increment();
    }

    function acceptOffer(uint256 offerId) external {
        _acceptOffer(offerId, msg.sender);
    }

    function acceptOfferFor(uint256 offerId, address buyer) external {
        _acceptOffer(offerId, buyer);
    }

    function _acceptOffer(uint256 offerId, address _buyer) internal {
        // Request memory request;
        require(
            _buyerRegistry.acceptedTerms(_buyer),
            "Buyer has not accepted terms"
        );
        Offer memory _offer = getOffer(offerId);
        require(_offer.state == OfferState.OPEN, "Offer is not open");
        Request memory _request = _requests[_offer.requestId];
        require(_request.state == RequestState.OPEN, "Request is not open");
        require(
            _request.buyer == _buyer,
            "Only the buyer can accept the offer"
        );
        _offer.state = OfferState.ACCEPTED;
        _request.state = RequestState.ACCEPTED;

        // delegate call escrow to bid on the offer in this contracts context
        address _escrowAddress = address(_escrow);
        // console.log(_buyerRegistry.acceptedTerms(_buyer));
        (bool success, ) = _escrowAddress.delegatecall(
            abi.encodeWithSelector(
                _escrow.bid.selector,
                _offer.price,
                _offer.seller,
                _offer.arbiter
            )
        );
        require(success, "Escrow bid failed");
        // _escrowAddress.delegatecall(
        //     abi.encodeWithSignature(
        //         "bid(uint256,address,address)",
        //         _offer.price,
        //         _offer.seller,
        //         _offer.arbiter
        //     )
        // );
        emit OfferAccepted(_buyer, _offer.seller, _offer.requestId);
    }

    function withdrawRequest(uint256 requestId) external {
        Request memory _request = _requests[requestId];
        require(_request.state == RequestState.OPEN, "Request is not open");
        require(
            _request.buyer == msg.sender,
            "Only the buyer can withdraw the request"
        );
        _request.state = RequestState.WITHDRAWN;
        emit RequestWithdrawn(msg.sender, requestId);
    }

    function withdrawOffer(uint256 offerId) external {
        Offer memory _offer = getOffer(offerId);
        require(_offer.state == OfferState.OPEN, "Offer is not open");
        require(
            _offer.seller == msg.sender,
            "Only the seller can withdraw the offer"
        );
        _offer.state = OfferState.WITHDRAWN;
        emit OfferWithdrawn(msg.sender, offerId);
    }
}
