/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Requests, RequestsInterface } from "../../contracts/Requests";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_offerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "NewOffer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "NewRequest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
    ],
    name: "OfferAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_offerId",
        type: "uint256",
      },
    ],
    name: "OfferWithdrawn",
    type: "event",
  },
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
        internalType: "address",
        name: "_buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_requestId",
        type: "uint256",
      },
    ],
    name: "RequestWithdrawn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_offers",
    outputs: [
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "enum Requests.OfferState",
        name: "state",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "arbiter",
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
    name: "_requests",
    outputs: [
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
      {
        internalType: "enum Requests.RequestState",
        name: "state",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "arbiter",
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
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "acceptOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "getOffer",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "seller",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "requestId",
            type: "uint256",
          },
          {
            internalType: "enum Requests.OfferState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "arbiter",
            type: "address",
          },
        ],
        internalType: "struct Requests.Offer",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "getRequest",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
          {
            internalType: "enum Requests.RequestState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "arbiter",
            type: "address",
          },
        ],
        internalType: "struct Requests.Request",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
      {
        internalType: "address",
        name: "_arbiter",
        type: "address",
      },
    ],
    name: "makeOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
      {
        internalType: "address",
        name: "_arbiter",
        type: "address",
      },
    ],
    name: "makeRequest",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "address",
        name: "buyerRegistry",
        type: "address",
      },
    ],
    name: "setBuyerRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "escrow",
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
        name: "sellerRegistry",
        type: "address",
      },
    ],
    name: "setSellerRegistry",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "withdrawOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "withdrawRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5062000032620000266200003860201b60201c565b6200004060201b60201c565b62000104565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b61290480620001146000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c8063bff60c0f11610097578063c815729d11610066578063c815729d14610277578063dc27650d14610293578063ea0e5cdd146102af578063f2fde38b146102cb576100f5565b8063bff60c0f146101db578063bffa28041461020f578063c10c35461461022b578063c58343ef14610247576100f5565b8063715018a6116100d3578063715018a61461017b57806374899a7e146101855780638610f045146101a15780638da5cb5b146101bd576100f5565b80632d461c41146100fa5780634579268a1461012f5780634e74a77e1461015f575b600080fd5b610114600480360381019061010f91906119b4565b6102e7565b60405161012696959493929190611b38565b60405180910390f35b610149600480360381019061014491906119b4565b610408565b6040516101569190611ca0565b60405180910390f35b61017960048036038101906101749190611cee565b6105d1565b005b61018361061d565b005b61019f600480360381019061019a91906119b4565b610631565b005b6101bb60048036038101906101b691906119b4565b6107d6565b005b6101c561097b565b6040516101d29190611d1b565b60405180910390f35b6101f560048036038101906101f091906119b4565b6109a4565b604051610206959493929190611d7e565b60405180910390f35b61022960048036038101906102249190611f0d565b610abf565b005b61024560048036038101906102409190611cee565b610dca565b005b610261600480360381019061025c91906119b4565b610e16565b60405161026e9190612001565b60405180910390f35b610291600480360381019061028c91906119b4565b610fd5565b005b6102ad60048036038101906102a89190611cee565b611441565b005b6102c960048036038101906102c49190612023565b61148d565b005b6102e560048036038101906102e09190611cee565b611698565b005b600781815481106102f757600080fd5b90600052602060002090600502016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001015490806002018054610346906120d5565b80601f0160208091040260200160405190810160405280929190818152602001828054610372906120d5565b80156103bf5780601f10610394576101008083540402835291602001916103bf565b820191906000526020600020905b8154815290600101906020018083116103a257829003601f168201915b5050505050908060030154908060040160009054906101000a900460ff16908060040160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905086565b610410611889565b6007828154811061042457610423612106565b5b90600052602060002090600502016040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820180546104ad906120d5565b80601f01602080910402602001604051908101604052809291908181526020018280546104d9906120d5565b80156105265780601f106104fb57610100808354040283529160200191610526565b820191906000526020600020905b81548152906001019060200180831161050957829003601f168201915b50505050508152602001600382015481526020016004820160009054906101000a900460ff16600281111561055e5761055d611ac1565b5b60028111156105705761056f611ac1565b5b81526020016004820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050919050565b6105d961171b565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b61062561171b565b61062f6000611799565b565b60006006828154811061064757610646612106565b5b906000526020600020906004020190506000600281111561066b5761066a611ac1565b5b8160030160009054906101000a900460ff16600281111561068f5761068e611ac1565b5b146106cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106c690612181565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610761576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161075890612213565b60405180910390fd5b60018160030160006101000a81548160ff0219169083600281111561078957610788611ac1565b5b0217905550813373ffffffffffffffffffffffffffffffffffffffff167f10c02eaa24e3bee4debbdd50f5031fd7790afc43db2972df473eb49cf528d0f160405160405180910390a35050565b6000600782815481106107ec576107eb612106565b5b90600052602060002090600502019050600060028111156108105761080f611ac1565b5b8160040160009054906101000a900460ff16600281111561083457610833611ac1565b5b14610874576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086b9061227f565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610906576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108fd90612311565b60405180910390fd5b60018160040160006101000a81548160ff0219169083600281111561092e5761092d611ac1565b5b0217905550813373ffffffffffffffffffffffffffffffffffffffff167fe79a2b74049aac2661ef1f29587692b91005c0faa808d1e678f7e1dccc8011e860405160405180910390a35050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600681815481106109b457600080fd5b90600052602060002090600402016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001015490806002018054610a03906120d5565b80601f0160208091040260200160405190810160405280929190818152602001828054610a2f906120d5565b8015610a7c5780601f10610a5157610100808354040283529160200191610a7c565b820191906000526020600020905b815481529060010190602001808311610a5f57829003601f168201915b5050505050908060030160009054906101000a900460ff16908060030160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905085565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630e0d7f07336040518263ffffffff1660e01b8152600401610b1a9190611d1b565b602060405180830381865afa158015610b37573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b5b9190612369565b610b9a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b91906123e2565b60405180910390fd5b610ba26118fd565b33816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505083816020018181525050828160400181905250600081606001906002811115610c0657610c05611ac1565b5b90816002811115610c1a57610c19611ac1565b5b8152505081816080019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600681908060018154018082558091505060019003906000526020600020906004020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002019081610ce891906125ae565b5060608201518160030160006101000a81548160ff02191690836002811115610d1457610d13611ac1565b5b021790555060808201518160030160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050610d6c600461185d565b3373ffffffffffffffffffffffffffffffffffffffff167fcfabdc46ef2e2629eecaebeed6d3d69b8c859443e040d8aba7976e08a0aa55f586604051610db29190612680565b60405180910390a3610dc4600461186b565b50505050565b610dd261171b565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b610e1e6118fd565b60068281548110610e3257610e31612106565b5b90600052602060002090600402016040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282018054610ebb906120d5565b80601f0160208091040260200160405190810160405280929190818152602001828054610ee7906120d5565b8015610f345780601f10610f0957610100808354040283529160200191610f34565b820191906000526020600020905b815481529060010190602001808311610f1757829003601f168201915b505050505081526020016003820160009054906101000a900460ff166002811115610f6257610f61611ac1565b5b6002811115610f7457610f73611ac1565b5b81526020016003820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050919050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630e0d7f07336040518263ffffffff1660e01b81526004016110309190611d1b565b602060405180830381865afa15801561104d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110719190612369565b6110b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110a7906123e2565b60405180910390fd5b6000600782815481106110c6576110c5612106565b5b90600052602060002090600502019050600060028111156110ea576110e9611ac1565b5b8160040160009054906101000a900460ff16600281111561110e5761110d611ac1565b5b1461114e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111459061227f565b60405180910390fd5b6000600682600301548154811061116857611167612106565b5b906000526020600020906004020190506000600281111561118c5761118b611ac1565b5b8160030160009054906101000a900460ff1660028111156111b0576111af611ac1565b5b146111f0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111e790612181565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611282576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112799061270d565b60405180910390fd5b60028260040160006101000a81548160ff021916908360028111156112aa576112a9611ac1565b5b021790555060028160030160006101000a81548160ff021916908360028111156112d7576112d6611ac1565b5b0217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166310fc66d683600101548460000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168560040160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff1660e01b81526004016113879392919061272d565b600060405180830381600087803b1580156113a157600080fd5b505af11580156113b5573d6000803e3d6000fd5b5050505081600301548260000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fc61554a8874c3c1f71da4d831e9effd4b5f892f7f89e2eb898dd63a57d4c4fb860405160405180910390a4505050565b61144961171b565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630e0d7f07336040518263ffffffff1660e01b81526004016114e89190611d1b565b602060405180830381865afa158015611505573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115299190612369565b611568576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161155f906127b0565b60405180910390fd5b611570611889565b33816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505083816020018181525050828160400181905250848160600181815250506000816080019060028111156115de576115dd611ac1565b5b908160028111156115f2576115f1611ac1565b5b81525050818160a0019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050611638600561185d565b853373ffffffffffffffffffffffffffffffffffffffff167f46e1b315f97f163946a7669290cc0a878c4cd6fed201b139c7afe5828354cd8d8760405161167f9190612680565b60405180910390a4611691600561186b565b5050505050565b6116a061171b565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361170f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161170690612842565b60405180910390fd5b61171881611799565b50565b611723611881565b73ffffffffffffffffffffffffffffffffffffffff1661174161097b565b73ffffffffffffffffffffffffffffffffffffffff1614611797576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161178e906128ae565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081600001549050919050565b6001816000016000828254019250508190555050565b600033905090565b6040518060c00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081526020016060815260200160008152602001600060028111156118da576118d9611ac1565b5b8152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6040518060a00160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001606081526020016000600281111561194757611946611ac1565b5b8152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b6119918161197e565b811461199c57600080fd5b50565b6000813590506119ae81611988565b92915050565b6000602082840312156119ca576119c9611974565b5b60006119d88482850161199f565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611a0c826119e1565b9050919050565b611a1c81611a01565b82525050565b611a2b8161197e565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611a6b578082015181840152602081019050611a50565b60008484015250505050565b6000601f19601f8301169050919050565b6000611a9382611a31565b611a9d8185611a3c565b9350611aad818560208601611a4d565b611ab681611a77565b840191505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60038110611b0157611b00611ac1565b5b50565b6000819050611b1282611af0565b919050565b6000611b2282611b04565b9050919050565b611b3281611b17565b82525050565b600060c082019050611b4d6000830189611a13565b611b5a6020830188611a22565b8181036040830152611b6c8187611a88565b9050611b7b6060830186611a22565b611b886080830185611b29565b611b9560a0830184611a13565b979650505050505050565b611ba981611a01565b82525050565b611bb88161197e565b82525050565b600082825260208201905092915050565b6000611bda82611a31565b611be48185611bbe565b9350611bf4818560208601611a4d565b611bfd81611a77565b840191505092915050565b611c1181611b17565b82525050565b600060c083016000830151611c2f6000860182611ba0565b506020830151611c426020860182611baf565b5060408301518482036040860152611c5a8282611bcf565b9150506060830151611c6f6060860182611baf565b506080830151611c826080860182611c08565b5060a0830151611c9560a0860182611ba0565b508091505092915050565b60006020820190508181036000830152611cba8184611c17565b905092915050565b611ccb81611a01565b8114611cd657600080fd5b50565b600081359050611ce881611cc2565b92915050565b600060208284031215611d0457611d03611974565b5b6000611d1284828501611cd9565b91505092915050565b6000602082019050611d306000830184611a13565b92915050565b60038110611d4757611d46611ac1565b5b50565b6000819050611d5882611d36565b919050565b6000611d6882611d4a565b9050919050565b611d7881611d5d565b82525050565b600060a082019050611d936000830188611a13565b611da06020830187611a22565b8181036040830152611db28186611a88565b9050611dc16060830185611d6f565b611dce6080830184611a13565b9695505050505050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611e1a82611a77565b810181811067ffffffffffffffff82111715611e3957611e38611de2565b5b80604052505050565b6000611e4c61196a565b9050611e588282611e11565b919050565b600067ffffffffffffffff821115611e7857611e77611de2565b5b611e8182611a77565b9050602081019050919050565b82818337600083830152505050565b6000611eb0611eab84611e5d565b611e42565b905082815260208101848484011115611ecc57611ecb611ddd565b5b611ed7848285611e8e565b509392505050565b600082601f830112611ef457611ef3611dd8565b5b8135611f04848260208601611e9d565b91505092915050565b600080600060608486031215611f2657611f25611974565b5b6000611f348682870161199f565b935050602084013567ffffffffffffffff811115611f5557611f54611979565b5b611f6186828701611edf565b9250506040611f7286828701611cd9565b9150509250925092565b611f8581611d5d565b82525050565b600060a083016000830151611fa36000860182611ba0565b506020830151611fb66020860182611baf565b5060408301518482036040860152611fce8282611bcf565b9150506060830151611fe36060860182611f7c565b506080830151611ff66080860182611ba0565b508091505092915050565b6000602082019050818103600083015261201b8184611f8b565b905092915050565b6000806000806080858703121561203d5761203c611974565b5b600061204b8782880161199f565b945050602061205c8782880161199f565b935050604085013567ffffffffffffffff81111561207d5761207c611979565b5b61208987828801611edf565b925050606061209a87828801611cd9565b91505092959194509250565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806120ed57607f821691505b602082108103612100576120ff6120a6565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f52657175657374206973206e6f74206f70656e00000000000000000000000000600082015250565b600061216b601383611a3c565b915061217682612135565b602082019050919050565b6000602082019050818103600083015261219a8161215e565b9050919050565b7f4f6e6c79207468652062757965722063616e207769746864726177207468652060008201527f7265717565737400000000000000000000000000000000000000000000000000602082015250565b60006121fd602783611a3c565b9150612208826121a1565b604082019050919050565b6000602082019050818103600083015261222c816121f0565b9050919050565b7f4f66666572206973206e6f74206f70656e000000000000000000000000000000600082015250565b6000612269601183611a3c565b915061227482612233565b602082019050919050565b600060208201905081810360008301526122988161225c565b9050919050565b7f4f6e6c79207468652073656c6c65722063616e2077697468647261772074686560008201527f206f666665720000000000000000000000000000000000000000000000000000602082015250565b60006122fb602683611a3c565b91506123068261229f565b604082019050919050565b6000602082019050818103600083015261232a816122ee565b9050919050565b60008115159050919050565b61234681612331565b811461235157600080fd5b50565b6000815190506123638161233d565b92915050565b60006020828403121561237f5761237e611974565b5b600061238d84828501612354565b91505092915050565b7f427579657220686173206e6f74206163636570746564207465726d7300000000600082015250565b60006123cc601c83611a3c565b91506123d782612396565b602082019050919050565b600060208201905081810360008301526123fb816123bf565b9050919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026124647fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612427565b61246e8683612427565b95508019841693508086168417925050509392505050565b6000819050919050565b60006124ab6124a66124a18461197e565b612486565b61197e565b9050919050565b6000819050919050565b6124c583612490565b6124d96124d1826124b2565b848454612434565b825550505050565b600090565b6124ee6124e1565b6124f98184846124bc565b505050565b5b8181101561251d576125126000826124e6565b6001810190506124ff565b5050565b601f8211156125625761253381612402565b61253c84612417565b8101602085101561254b578190505b61255f61255785612417565b8301826124fe565b50505b505050565b600082821c905092915050565b600061258560001984600802612567565b1980831691505092915050565b600061259e8383612574565b9150826002028217905092915050565b6125b782611a31565b67ffffffffffffffff8111156125d0576125cf611de2565b5b6125da82546120d5565b6125e5828285612521565b600060209050601f8311600181146126185760008415612606578287015190505b6126108582612592565b865550612678565b601f19841661262686612402565b60005b8281101561264e57848901518255600182019150602085019450602081019050612629565b8683101561266b5784890151612667601f891682612574565b8355505b6001600288020188555050505b505050505050565b60006020820190506126956000830184611a22565b92915050565b7f4f6e6c79207468652062757965722063616e2061636365707420746865206f6660008201527f6665720000000000000000000000000000000000000000000000000000000000602082015250565b60006126f7602383611a3c565b91506127028261269b565b604082019050919050565b60006020820190508181036000830152612726816126ea565b9050919050565b60006060820190506127426000830186611a22565b61274f6020830185611a13565b61275c6040830184611a13565b949350505050565b7f53656c6c657220686173206e6f74206163636570746564207465726d73000000600082015250565b600061279a601d83611a3c565b91506127a582612764565b602082019050919050565b600060208201905081810360008301526127c98161278d565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061282c602683611a3c565b9150612837826127d0565b604082019050919050565b6000602082019050818103600083015261285b8161281f565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612898602083611a3c565b91506128a382612862565b602082019050919050565b600060208201905081810360008301526128c78161288b565b905091905056fea2646970667358221220af5df87286c181576e926a0c28894d7aacd170ea77cd782f35453fa187fd0e4a64736f6c63430008110033";

type RequestsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RequestsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Requests__factory extends ContractFactory {
  constructor(...args: RequestsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Requests> {
    return super.deploy(overrides || {}) as Promise<Requests>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Requests {
    return super.attach(address) as Requests;
  }
  override connect(signer: Signer): Requests__factory {
    return super.connect(signer) as Requests__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RequestsInterface {
    return new utils.Interface(_abi) as RequestsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Requests {
    return new Contract(address, _abi, signerOrProvider) as Requests;
  }
}
