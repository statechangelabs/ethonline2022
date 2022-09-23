/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Review, ReviewInterface } from "../../contracts/Review";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "jobID",
        type: "uint256",
      },
    ],
    name: "Reviewed",
    type: "event",
  },
  {
    inputs: [],
    name: "escrow",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "jobReviews",
    outputs: [
      {
        internalType: "uint8",
        name: "buyerScore",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "sellerScore",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "arbiterBuyerScore",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "arbiterSellerScore",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "sellerReviewUri",
        type: "string",
      },
      {
        internalType: "string",
        name: "buyerReviewUri",
        type: "string",
      },
      {
        internalType: "string",
        name: "arbiterReviewByBuyerUri",
        type: "string",
      },
      {
        internalType: "string",
        name: "arbiterReviewBySellerUri",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "score",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reviewURI",
        type: "string",
      },
    ],
    name: "reviewArbiter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "score",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reviewURI",
        type: "string",
      },
      {
        internalType: "address",
        name: "reviewer",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "reviewArbiterFor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "score",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reviewURI",
        type: "string",
      },
    ],
    name: "reviewBuyer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "score",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reviewURI",
        type: "string",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "reviewBuyerFor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "score",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reviewURI",
        type: "string",
      },
    ],
    name: "reviewSeller",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "score",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "reviewURI",
        type: "string",
      },
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "reviewSellerFor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newEscrow",
        type: "address",
      },
    ],
    name: "setEscrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5062000032620000266200003860201b60201c565b6200004060201b60201c565b62000104565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b612e3c80620001146000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a4d7ca6a11610071578063a4d7ca6a14610151578063b3deb5f91461016d578063c10c354614610189578063d174757f146101a5578063e2fdcc17146101dc578063f2fde38b146101fa576100b4565b8063715018a6146100b95780638c965f67146100c35780638da5cb5b146100df57806394d31500146100fd5780639c895d36146101195780639e843d7814610135575b600080fd5b6100c1610216565b005b6100dd60048036038101906100d89190611a28565b61022a565b005b6100e761023b565b6040516100f49190611ad8565b60405180910390f35b61011760048036038101906101129190611bc0565b610264565b005b610133600480360381019061012e9190611bc0565b6102d7565b005b61014f600480360381019061014a9190611a28565b61034a565b005b61016b60048036038101906101669190611bc0565b61035b565b005b61018760048036038101906101829190611a28565b6103ce565b005b6101a3600480360381019061019e9190611c73565b6103df565b005b6101bf60048036038101906101ba9190611ca0565b61042b565b6040516101d3989796959493929190611d5b565b60405180910390f35b6101e46106c7565b6040516101f19190611ad8565b60405180910390f35b610214600480360381019061020f9190611c73565b6106f1565b005b61021e610774565b61022860006107f2565b565b610236838383336108b6565b505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b61028d856040516020016102789190611e93565b60405160208183030381529060405282610bc6565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16146102c457600080fd5b6102d085858585610be7565b5050505050565b610300856040516020016102eb9190611f2b565b60405160208183030381529060405282610bc6565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161461033757600080fd5b610343858585856108b6565b5050505050565b61035683838333610eb0565b505050565b6103848560405160200161036f9190611fc3565b60405160208183030381529060405282610bc6565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16146103bb57600080fd5b6103c785858585610eb0565b5050505050565b6103da83838333610be7565b505050565b6103e7610774565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60026020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900460ff16908060000160029054906101000a900460ff16908060000160039054906101000a900460ff169080600101805461049a90612018565b80601f01602080910402602001604051908101604052809291908181526020018280546104c690612018565b80156105135780601f106104e857610100808354040283529160200191610513565b820191906000526020600020905b8154815290600101906020018083116104f657829003601f168201915b50505050509080600201805461052890612018565b80601f016020809104026020016040519081016040528092919081815260200182805461055490612018565b80156105a15780601f10610576576101008083540402835291602001916105a1565b820191906000526020600020905b81548152906001019060200180831161058457829003601f168201915b5050505050908060030180546105b690612018565b80601f01602080910402602001604051908101604052809291908181526020018280546105e290612018565b801561062f5780601f106106045761010080835404028352916020019161062f565b820191906000526020600020905b81548152906001019060200180831161061257829003601f168201915b50505050509080600401805461064490612018565b80601f016020809104026020016040519081016040528092919081815260200182805461067090612018565b80156106bd5780601f10610692576101008083540402835291602001916106bd565b820191906000526020600020905b8154815290600101906020018083116106a057829003601f168201915b5050505050905088565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6106f9610774565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610768576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161075f906120bb565b60405180910390fd5b610771816107f2565b50565b61077c61131b565b73ffffffffffffffffffffffffffffffffffffffff1661079a61023b565b73ffffffffffffffffffffffffffffffffffffffff16146107f0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e790612127565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bf22c457866040518263ffffffff1660e01b81526004016109139190612156565b61018060405180830381865afa158015610931573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610955919061231f565b90506003600781111561096b5761096a61234d565b5b816080015160078111156109825761098161234d565b5b146109c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109b9906123c8565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff16816040015173ffffffffffffffffffffffffffffffffffffffff1614610a34576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a2b9061245a565b60405180910390fd5b60058460ff161115610a7b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a72906124ec565b60405180910390fd5b610a8361180e565b84816000019060ff16908160ff1681525050838160a00181905250806002600088815260200190815260200160002060008201518160000160006101000a81548160ff021916908360ff16021790555060208201518160000160016101000a81548160ff021916908360ff16021790555060408201518160000160026101000a81548160ff021916908360ff16021790555060608201518160000160036101000a81548160ff021916908360ff1602179055506080820151816001019081610b4b91906126b8565b5060a0820151816002019081610b6191906126b8565b5060c0820151816003019081610b7791906126b8565b5060e0820151816004019081610b8d91906126b8565b50905050857f969160ae384f3a18ae5b2b990d953d5cdefa2a16a5ac574612cfc9f4dfe6142760405160405180910390a2505050505050565b600080610bd284611323565b9050610bde818461135e565b91505092915050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bf22c457866040518263ffffffff1660e01b8152600401610c449190612156565b61018060405180830381865afa158015610c62573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c86919061231f565b905060036007811115610c9c57610c9b61234d565b5b81608001516007811115610cb357610cb261234d565b5b14610cf3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cea906123c8565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff1614610d65576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d5c906127fc565b60405180910390fd5b610d6d61180e565b84816020019060ff16908160ff1681525050838160800181905250806002600088815260200190815260200160002060008201518160000160006101000a81548160ff021916908360ff16021790555060208201518160000160016101000a81548160ff021916908360ff16021790555060408201518160000160026101000a81548160ff021916908360ff16021790555060608201518160000160036101000a81548160ff021916908360ff1602179055506080820151816001019081610e3591906126b8565b5060a0820151816002019081610e4b91906126b8565b5060c0820151816003019081610e6191906126b8565b5060e0820151816004019081610e7791906126b8565b50905050857f969160ae384f3a18ae5b2b990d953d5cdefa2a16a5ac574612cfc9f4dfe6142760405160405180910390a2505050505050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bf22c457866040518263ffffffff1660e01b8152600401610f0d9190612156565b61018060405180830381865afa158015610f2b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f4f919061231f565b905060036007811115610f6557610f6461234d565b5b81608001516007811115610f7c57610f7b61234d565b5b148015610f915750600115158160e001511515145b610fd0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fc790612868565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff16148061103d57508173ffffffffffffffffffffffffffffffffffffffff16816040015173ffffffffffffffffffffffffffffffffffffffff16145b61107c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611073906128fa565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff16816020015173ffffffffffffffffffffffffffffffffffffffff16036111cf576110bb61180e565b84816040019060ff16908160ff1681525050838160c00181905250806002600088815260200190815260200160002060008201518160000160006101000a81548160ff021916908360ff16021790555060208201518160000160016101000a81548160ff021916908360ff16021790555060408201518160000160026101000a81548160ff021916908360ff16021790555060608201518160000160036101000a81548160ff021916908360ff160217905550608082015181600101908161118391906126b8565b5060a082015181600201908161119991906126b8565b5060c08201518160030190816111af91906126b8565b5060e08201518160040190816111c591906126b8565b50905050506112e7565b6111d761180e565b84816060019060ff16908160ff1681525050838160e00181905250806002600088815260200190815260200160002060008201518160000160006101000a81548160ff021916908360ff16021790555060208201518160000160016101000a81548160ff021916908360ff16021790555060408201518160000160026101000a81548160ff021916908360ff16021790555060608201518160000160036101000a81548160ff021916908360ff160217905550608082015181600101908161129f91906126b8565b5060a08201518160020190816112b591906126b8565b5060c08201518160030190816112cb91906126b8565b5060e08201518160040190816112e191906126b8565b50905050505b847f969160ae384f3a18ae5b2b990d953d5cdefa2a16a5ac574612cfc9f4dfe6142760405160405180910390a25050505050565b600033905090565b600061132f8251611385565b826040516020016113419291906129de565b604051602081830303815290604052805190602001209050919050565b600080600061136d85856114e5565b9150915061137a81611536565b819250505092915050565b6060600082036113cc576040518060400160405280600181526020017f300000000000000000000000000000000000000000000000000000000000000081525090506114e0565b600082905060005b600082146113fe5780806113e790612a3c565b915050600a826113f79190612ab3565b91506113d4565b60008167ffffffffffffffff81111561141a576114196118fd565b5b6040519080825280601f01601f19166020018201604052801561144c5781602001600182028036833780820191505090505b5090505b600085146114d9576001826114659190612ae4565b9150600a856114749190612b18565b60306114809190612b49565b60f81b81838151811061149657611495612b7d565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a856114d29190612ab3565b9450611450565b8093505050505b919050565b60008060418351036115265760008060006020860151925060408601519150606086015160001a905061151a87828585611702565b9450945050505061152f565b60006002915091505b9250929050565b6000600481111561154a5761154961234d565b5b81600481111561155d5761155c61234d565b5b03156116ff57600160048111156115775761157661234d565b5b81600481111561158a5761158961234d565b5b036115ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115c190612bf8565b60405180910390fd5b600260048111156115de576115dd61234d565b5b8160048111156115f1576115f061234d565b5b03611631576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161162890612c64565b60405180910390fd5b600360048111156116455761164461234d565b5b8160048111156116585761165761234d565b5b03611698576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161168f90612cf6565b60405180910390fd5b6004808111156116ab576116aa61234d565b5b8160048111156116be576116bd61234d565b5b036116fe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116f590612d88565b60405180910390fd5b5b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08360001c111561173d576000600391509150611805565b601b8560ff16141580156117555750601c8560ff1614155b15611767576000600491509150611805565b60006001878787876040516000815260200160405260405161178c9493929190612dc1565b6020604051602081039080840390855afa1580156117ae573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036117fc57600060019250925050611805565b80600092509250505b94509492505050565b604051806101000160405280600060ff168152602001600060ff168152602001600060ff168152602001600060ff168152602001606081526020016060815260200160608152602001606081525090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61188681611873565b811461189157600080fd5b50565b6000813590506118a38161187d565b92915050565b600060ff82169050919050565b6118bf816118a9565b81146118ca57600080fd5b50565b6000813590506118dc816118b6565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611935826118ec565b810181811067ffffffffffffffff82111715611954576119536118fd565b5b80604052505050565b600061196761185f565b9050611973828261192c565b919050565b600067ffffffffffffffff821115611993576119926118fd565b5b61199c826118ec565b9050602081019050919050565b82818337600083830152505050565b60006119cb6119c684611978565b61195d565b9050828152602081018484840111156119e7576119e66118e7565b5b6119f28482856119a9565b509392505050565b600082601f830112611a0f57611a0e6118e2565b5b8135611a1f8482602086016119b8565b91505092915050565b600080600060608486031215611a4157611a40611869565b5b6000611a4f86828701611894565b9350506020611a60868287016118cd565b925050604084013567ffffffffffffffff811115611a8157611a8061186e565b5b611a8d868287016119fa565b9150509250925092565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611ac282611a97565b9050919050565b611ad281611ab7565b82525050565b6000602082019050611aed6000830184611ac9565b92915050565b611afc81611ab7565b8114611b0757600080fd5b50565b600081359050611b1981611af3565b92915050565b600067ffffffffffffffff821115611b3a57611b396118fd565b5b611b43826118ec565b9050602081019050919050565b6000611b63611b5e84611b1f565b61195d565b905082815260208101848484011115611b7f57611b7e6118e7565b5b611b8a8482856119a9565b509392505050565b600082601f830112611ba757611ba66118e2565b5b8135611bb7848260208601611b50565b91505092915050565b600080600080600060a08688031215611bdc57611bdb611869565b5b6000611bea88828901611894565b9550506020611bfb888289016118cd565b945050604086013567ffffffffffffffff811115611c1c57611c1b61186e565b5b611c28888289016119fa565b9350506060611c3988828901611b0a565b925050608086013567ffffffffffffffff811115611c5a57611c5961186e565b5b611c6688828901611b92565b9150509295509295909350565b600060208284031215611c8957611c88611869565b5b6000611c9784828501611b0a565b91505092915050565b600060208284031215611cb657611cb5611869565b5b6000611cc484828501611894565b91505092915050565b611cd6816118a9565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611d16578082015181840152602081019050611cfb565b60008484015250505050565b6000611d2d82611cdc565b611d378185611ce7565b9350611d47818560208601611cf8565b611d50816118ec565b840191505092915050565b600061010082019050611d71600083018b611ccd565b611d7e602083018a611ccd565b611d8b6040830189611ccd565b611d986060830188611ccd565b8181036080830152611daa8187611d22565b905081810360a0830152611dbe8186611d22565b905081810360c0830152611dd28185611d22565b905081810360e0830152611de68184611d22565b90509998505050505050505050565b600081905092915050565b7f4920616d20726576696577696e67207468652073656c6c657220666f72206a6f60008201527f6220776974682069643a20000000000000000000000000000000000000000000602082015250565b6000611e5c602b83611df5565b9150611e6782611e00565b602b82019050919050565b6000819050919050565b611e8d611e8882611873565b611e72565b82525050565b6000611e9e82611e4f565b9150611eaa8284611e7c565b60208201915081905092915050565b7f4920616d20726576696577696e672074686520627579657220666f72206a6f6260008201527f20776974682069643a2000000000000000000000000000000000000000000000602082015250565b6000611f15602a83611df5565b9150611f2082611eb9565b602a82019050919050565b6000611f3682611f08565b9150611f428284611e7c565b60208201915081905092915050565b7f4920616d20726576696577696e6720746865206172626974657220666f72206a60008201527f6f6220776974682069643a200000000000000000000000000000000000000000602082015250565b6000611fad602c83611df5565b9150611fb882611f51565b602c82019050919050565b6000611fce82611fa0565b9150611fda8284611e7c565b60208201915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061203057607f821691505b60208210810361204357612042611fe9565b5b50919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006120a5602683611ce7565b91506120b082612049565b604082019050919050565b600060208201905081810360008301526120d481612098565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612111602083611ce7565b915061211c826120db565b602082019050919050565b6000602082019050818103600083015261214081612104565b9050919050565b61215081611873565b82525050565b600060208201905061216b6000830184612147565b92915050565b600080fd5b6000815190506121858161187d565b92915050565b60008151905061219a81611af3565b92915050565b600881106121ad57600080fd5b50565b6000815190506121bf816121a0565b92915050565b60008115159050919050565b6121da816121c5565b81146121e557600080fd5b50565b6000815190506121f7816121d1565b92915050565b6000610180828403121561221457612213612171565b5b61221f61018061195d565b9050600061222f84828501612176565b60008301525060206122438482850161218b565b60208301525060406122578482850161218b565b604083015250606061226b8482850161218b565b606083015250608061227f848285016121b0565b60808301525060a0612293848285016121e8565b60a08301525060c06122a7848285016121e8565b60c08301525060e06122bb848285016121e8565b60e0830152506101006122d084828501612176565b610100830152506101206122e684828501612176565b610120830152506101406122fc84828501612176565b610140830152506101606123128482850161218b565b6101608301525092915050565b6000610180828403121561233657612335611869565b5b6000612344848285016121fd565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4a6f62206d75737420636f6d706c65746520746f207265766965770000000000600082015250565b60006123b2601b83611ce7565b91506123bd8261237c565b602082019050919050565b600060208201905081810360008301526123e1816123a5565b9050919050565b7f4f6e6c79207468652073656c6c65722063616e2072657669657720746865206260008201527f7579657200000000000000000000000000000000000000000000000000000000602082015250565b6000612444602483611ce7565b915061244f826123e8565b604082019050919050565b6000602082019050818103600083015261247381612437565b9050919050565b7f5468652073636f7265206d757374206265206265747765656e203020616e642060008201527f3500000000000000000000000000000000000000000000000000000000000000602082015250565b60006124d6602183611ce7565b91506124e18261247a565b604082019050919050565b60006020820190508181036000830152612505816124c9565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261256e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612531565b6125788683612531565b95508019841693508086168417925050509392505050565b6000819050919050565b60006125b56125b06125ab84611873565b612590565b611873565b9050919050565b6000819050919050565b6125cf8361259a565b6125e36125db826125bc565b84845461253e565b825550505050565b600090565b6125f86125eb565b6126038184846125c6565b505050565b5b818110156126275761261c6000826125f0565b600181019050612609565b5050565b601f82111561266c5761263d8161250c565b61264684612521565b81016020851015612655578190505b61266961266185612521565b830182612608565b50505b505050565b600082821c905092915050565b600061268f60001984600802612671565b1980831691505092915050565b60006126a8838361267e565b9150826002028217905092915050565b6126c182611cdc565b67ffffffffffffffff8111156126da576126d96118fd565b5b6126e48254612018565b6126ef82828561262b565b600060209050601f8311600181146127225760008415612710578287015190505b61271a858261269c565b865550612782565b601f1984166127308661250c565b60005b8281101561275857848901518255600182019150602085019450602081019050612733565b868310156127755784890151612771601f89168261267e565b8355505b6001600288020188555050505b505050505050565b7f4f6e6c79207468652062757965722063616e207265766965772074686520736560008201527f6c6c657200000000000000000000000000000000000000000000000000000000602082015250565b60006127e6602483611ce7565b91506127f18261278a565b604082019050919050565b60006020820190508181036000830152612815816127d9565b9050919050565b7f4a6f62206d757374206172626974726174656420746f20726576696577000000600082015250565b6000612852601d83611ce7565b915061285d8261281c565b602082019050919050565b6000602082019050818103600083015261288181612845565b9050919050565b7f4f6e6c7920746865206275796572206f722073656c6c65722063616e2072657660008201527f6965772074686520617262697465720000000000000000000000000000000000602082015250565b60006128e4602f83611ce7565b91506128ef82612888565b604082019050919050565b60006020820190508181036000830152612913816128d7565b9050919050565b7f19457468657265756d205369676e6564204d6573736167653a0a000000000000600082015250565b6000612950601a83611df5565b915061295b8261291a565b601a82019050919050565b600061297182611cdc565b61297b8185611df5565b935061298b818560208601611cf8565b80840191505092915050565b600081519050919050565b600081905092915050565b60006129b882612997565b6129c281856129a2565b93506129d2818560208601611cf8565b80840191505092915050565b60006129e982612943565b91506129f58285612966565b9150612a0182846129ad565b91508190509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612a4782611873565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612a7957612a78612a0d565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000612abe82611873565b9150612ac983611873565b925082612ad957612ad8612a84565b5b828204905092915050565b6000612aef82611873565b9150612afa83611873565b9250828203905081811115612b1257612b11612a0d565b5b92915050565b6000612b2382611873565b9150612b2e83611873565b925082612b3e57612b3d612a84565b5b828206905092915050565b6000612b5482611873565b9150612b5f83611873565b9250828201905080821115612b7757612b76612a0d565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f45434453413a20696e76616c6964207369676e61747572650000000000000000600082015250565b6000612be2601883611ce7565b9150612bed82612bac565b602082019050919050565b60006020820190508181036000830152612c1181612bd5565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265206c656e67746800600082015250565b6000612c4e601f83611ce7565b9150612c5982612c18565b602082019050919050565b60006020820190508181036000830152612c7d81612c41565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265202773272076616c60008201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b6000612ce0602283611ce7565b9150612ceb82612c84565b604082019050919050565b60006020820190508181036000830152612d0f81612cd3565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265202776272076616c60008201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b6000612d72602283611ce7565b9150612d7d82612d16565b604082019050919050565b60006020820190508181036000830152612da181612d65565b9050919050565b6000819050919050565b612dbb81612da8565b82525050565b6000608082019050612dd66000830187612db2565b612de36020830186611ccd565b612df06040830185612db2565b612dfd6060830184612db2565b9594505050505056fea26469706673582212205f2ced0ec6264f6433976605417d60c83fb79e77090042be9c6bb0ef2673058264736f6c63430008110033";

type ReviewConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ReviewConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Review__factory extends ContractFactory {
  constructor(...args: ReviewConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Review> {
    return super.deploy(overrides || {}) as Promise<Review>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Review {
    return super.attach(address) as Review;
  }
  override connect(signer: Signer): Review__factory {
    return super.connect(signer) as Review__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReviewInterface {
    return new utils.Interface(_abi) as ReviewInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Review {
    return new Contract(address, _abi, signerOrProvider) as Review;
  }
}