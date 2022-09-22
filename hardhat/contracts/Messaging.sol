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

// add the part where a message can be sent if you are a registered buyer/seller
contract Messaging is Ownable {
    Requests _requestsContract;

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

    function setRequestsContract(address requestsContract) public onlyOwner {
        _requestsContract = Requests(requestsContract);
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

    function sendMessageForJob(string memory message, uint256 jobId) external {}

    function sendMessageForOffer(string memory message, uint256 offerId)
        external
    {}

    function sendMessageTo(
        string memory _message,
        address payable _address,
        uint256 _requestId
    ) public payable {
        // Requests.Request memory _request = _requestsContract.getRequest(
        //     _requestId
        // );
        // Requests.Offer memory _offer = _requestsContract.getOffer();
        require(
            bytes(publicKeys[_address]).length > 0,
            "Recipient public key not added"
        );
        require(
            bytes(publicKeys[msg.sender]).length > 0,
            "You must register a public key to send a message"
        );
        if (_messagingFeeWhiteList[_address][msg.sender] > 0) {
            require(
                msg.value ==
                    _messagingFeeWhiteList[_address][msg.sender] +
                        _globalMessagingFee,
                "Incorrect messaging fee"
            );
        } else if (_messagingFee[_address] > 0) {
            require(
                msg.value == _messagingFee[_address] + _globalMessagingFee,
                "Incorrect messaging fee"
            );
        } else {
            require(
                msg.value == _globalMessagingFee,
                "Incorrect messaging fee"
            );
        }
        _address.transfer(msg.value - _globalMessagingFee);
        emit Message(msg.sender, _address, _message);
    }

    function withdraw(address payable _address, uint256 _amount)
        public
        onlyOwner
    {
        _address.transfer(_amount);
    }
}
