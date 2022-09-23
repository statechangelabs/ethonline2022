/** 
   WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW   
 N0xxxxxxxxxxxxxddxxxxxxxxxxxxxxxxxxxxxxxxxxxxx0N 
W0occcccccccc:,....';cccccccccccccccccccccccccco0 
W0lccccccc;'..  ..   .';:ccccccccccccccccccccccl0 
W0lccccc:'   .';::;'.   .,:ccccccccccccccccccccl0 
W0lccccc:.  'cccccccc,. ..;ccc:;:ccccccccccccccl0W
W0lccccc:. .;cccccccc:'.,;;;'.  ..,:cccccccccccl0W
W0lccccc:.  ,cccccccc:;'...  ....   .';ccccccccl0W
W0lccccc:.  ..,:cc:;'.   ..';:cc:;'.  .;cccccccl0W
W0lcccccc:,..  ....  ..';:ccccccccc;.  ,cccccccl0W
W0lccccccccc:;'.  ..,:;'.';cccccccc;.  ,cccccccl0W
W0lccccccccccccc::ccc:.  .':ccccccc,   ,cccccccl0W
W0lcccccccccccccccccc:'    .',::;'.   .;cccccccl0W
 0lcccccccccccccccccccc;'..    .   .';:ccccccccl0 
 Kocccccccccccccccccccccccc:,....';cccccccccccco0 
 WKOkkkkkkdlccccccccldkkkkkkkkkkkkkkkkkkkkkkkkOKW 
         XxlccccclokKNW                           
        WOlccccox0XW                              
       WKdccldOXW                                 
       NxlokKN                                    
      WKk0NW                                      
       WW                                         

 */
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BuyerRegistry.sol";
import "./SellerRegistry.sol";
import "./Requests.sol";
import "./Escrow.sol";

// add the part where a message can be sent if you are a registered buyer/seller
contract Messaging is Ownable {
    Requests _requestsContract;
    BuyerRegistry _buyerRegistry;
    SellerRegistry _sellerRegistry;
    Escrow _escrow;

    mapping(address => bytes) private publicKeys;
    mapping(address => string[]) private _messages;
    mapping(address => uint256) private _messagingFee;
    mapping(address => mapping(address => uint256))
        private _messagingFeeWhiteList;
    mapping(address => address[]) public messagingFeeSenders;
    uint256 private _globalMessagingFee;

    constructor() {
        _globalMessagingFee = 0; //0 ETH
        emit NewGlobalMessagingFee(_globalMessagingFee);
    }

    event Message(address _sender, address indexed _recepient, string _message);
    event NewPublicKey(address indexed _account, bytes _publicKey);
    event NewGlobalMessagingFee(uint256 _messagingFee);
    event NewMessagingFee(address indexed _account, uint256 _messagingFee);
    event NewWhitelistMessagingFee(
        address indexed _account,
        address fromAccount,
        uint256 _messagingFee
    );

    function setRequestsContract(address requestsContract) external onlyOwner {
        _requestsContract = Requests(requestsContract);
    }

    function setBuyerRegistry(address buyerRegistry) external onlyOwner {
        _buyerRegistry = BuyerRegistry(buyerRegistry);
    }

    function setSellerRegistry(address sellerRegistry) external onlyOwner {
        _sellerRegistry = SellerRegistry(sellerRegistry);
    }

    function setEscrow(address escrow) external onlyOwner {
        _escrow = Escrow(escrow);
    }

    function setGlobalMessagingFee(uint256 _newMessagingFee) public onlyOwner {
        _globalMessagingFee = _newMessagingFee;
        emit NewGlobalMessagingFee(_newMessagingFee);
    }

    function setPublicKey(bytes memory _public_key) public {
        publicKeys[msg.sender] = _public_key;
        emit NewPublicKey(msg.sender, _public_key);
    }

    function publicKeyOf(address _address) public view returns (bytes memory) {
        return publicKeys[_address];
    }

    function setMessagingFee(uint256 _newFee) public {
        _messagingFee[msg.sender] = _newFee;
        emit NewMessagingFee(msg.sender, _newFee);
    }

    function setWhiteListFee(address _from, uint256 _newFee) public {
        _messagingFeeWhiteList[msg.sender][_from] = _newFee;
        messagingFeeSenders[msg.sender].push(_from);
        emit NewWhitelistMessagingFee(msg.sender, _from, _newFee);
    }

    function messagingFeeFor(address _address) public view returns (uint256) {
        if (_messagingFeeWhiteList[_address][msg.sender] > 0) {
            return
                _messagingFeeWhiteList[_address][msg.sender] +
                _globalMessagingFee;
        } else if (_messagingFee[_address] > 0) {
            return _messagingFee[_address] + _globalMessagingFee;
        } else {
            return _globalMessagingFee;
        }
    }

    function globalMessagingFee() public view returns (uint256) {
        return _globalMessagingFee;
    }

    // validate that sender is a buyer and to whom the message is going is a valid seller
    function messageSeller(string memory _message, address _address) external {
        require(
            _buyerRegistry.acceptedTerms(msg.sender),
            "You are not a registered buyer"
        );
        require(
            _sellerRegistry.acceptedTerms(_address),
            "You are not messaging a registered seller"
        );
        require(
            bytes(publicKeys[_address]).length > 0,
            "Recipient public key not added"
        );
        require(
            bytes(publicKeys[msg.sender]).length > 0,
            "You must register a public key to send a message"
        );
        // _address.transfer(msg.value - _globalMessagingFee);
        emit Message(msg.sender, _address, _message);
    }

    // negotiation phase
    // validate that sender is a seller and to whom the message is going is a valid buyer and has a request placed
    // 1. offer exists
    // 2. sender is the seller
    // 3. receipient is the buyer on the request on the offer
    function messageBuyerAboutRequest(
        string memory message,
        address buyerAddress,
        uint256 requestId
    ) public {
        // Requests.Offer memory offer = _requestsContract.getOffer(offerId);
        // uint256 requestId = offer.requestId;
        Requests.Request memory request = _requestsContract.getRequest(
            requestId
        );
        require(request.state == Requests.RequestState.OPEN);
        require(
            _sellerRegistry.acceptedTerms(msg.sender),
            "You are not a registered seller"
        );
        require(
            _buyerRegistry.acceptedTerms(buyerAddress),
            "You are not messaging a registered buyer"
        );
        require(
            request.buyer == buyerAddress,
            "You are not messaging the buyer"
        );
        require(
            bytes(publicKeys[buyerAddress]).length > 0,
            "Recipient public key not added"
        );
        require(
            bytes(publicKeys[msg.sender]).length > 0,
            "You must register a public key to send a message"
        );
        emit Message(msg.sender, buyerAddress, message);
    }

    // accepted offer phase
    function sendMessageForJob(
        string memory message,
        address buyerAddress,
        uint256 jobId
    ) external {
        Escrow.Job memory job = _escrow.getJob(jobId);
        // Requests.Offer memory offer = _requestsContract.getOffer(offerId);
        // uint256 requestId = offer.requestId;
        // Requests.Request memory request = _requestsContract.getRequest(
        //     requestId
        // );
        require(
            _buyerRegistry.acceptedTerms(buyerAddress),
            "You are not messaging a registered buyer"
        );
        require(
            _sellerRegistry.acceptedTerms(job.seller),
            "Seller hasn't accepted terms"
        );
        require(job.buyer == buyerAddress, "You are not messaging the buyer");
        require(
            job.status != Escrow.State.AWAITING_ACCEPTANCE,
            "Job not accepted"
        );
        require(
            bytes(publicKeys[buyerAddress]).length > 0,
            "Recipient public key not added"
        );
        require(
            bytes(publicKeys[msg.sender]).length > 0,
            "You must register a public key to send a message"
        );
        emit Message(msg.sender, buyerAddress, message);
    }

    // function sendMessageTo(
    //     string memory _message,
    //     address payable _address,
    //     uint256 _requestId
    // ) public payable {
    //     // Requests.Request memory _request = _requestsContract.getRequest(
    //     //     _requestId
    //     // );
    //     // Requests.Offer memory _offer = _requestsContract.getOffer();
    //     require(
    //         bytes(publicKeys[_address]).length > 0,
    //         "Recipient public key not added"
    //     );
    //     require(
    //         bytes(publicKeys[msg.sender]).length > 0,
    //         "You must register a public key to send a message"
    //     );
    //     if (_messagingFeeWhiteList[_address][msg.sender] > 0) {
    //         require(
    //             msg.value ==
    //                 _messagingFeeWhiteList[_address][msg.sender] +
    //                     _globalMessagingFee,
    //             "Incorrect messaging fee"
    //         );
    //     } else if (_messagingFee[_address] > 0) {
    //         require(
    //             msg.value == _messagingFee[_address] + _globalMessagingFee,
    //             "Incorrect messaging fee"
    //         );
    //     } else {
    //         require(
    //             msg.value == _globalMessagingFee,
    //             "Incorrect messaging fee"
    //         );
    //     }
    //     _address.transfer(msg.value - _globalMessagingFee);
    //     emit Message(msg.sender, _address, _message);
    // }

    // function withdraw(address payable _address, uint256 _amount)
    //     public
    //     onlyOwner
    // {
    //     _address.transfer(_amount);
    // }
}
