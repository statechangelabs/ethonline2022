/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace Requests {
  export type OfferStruct = {
    seller: PromiseOrValue<string>;
    price: PromiseOrValue<BigNumberish>;
    uri: PromiseOrValue<string>;
    requestId: PromiseOrValue<BigNumberish>;
    state: PromiseOrValue<BigNumberish>;
    arbiter: PromiseOrValue<string>;
  };

  export type OfferStructOutput = [
    string,
    BigNumber,
    string,
    BigNumber,
    number,
    string
  ] & {
    seller: string;
    price: BigNumber;
    uri: string;
    requestId: BigNumber;
    state: number;
    arbiter: string;
  };

  export type RequestStruct = {
    buyer: PromiseOrValue<string>;
    price: PromiseOrValue<BigNumberish>;
    uri: PromiseOrValue<string>;
    state: PromiseOrValue<BigNumberish>;
    arbiter: PromiseOrValue<string>;
  };

  export type RequestStructOutput = [
    string,
    BigNumber,
    string,
    number,
    string
  ] & {
    buyer: string;
    price: BigNumber;
    uri: string;
    state: number;
    arbiter: string;
  };
}

export interface RequestsInterface extends utils.Interface {
  functions: {
    "_offers(uint256)": FunctionFragment;
    "_requests(uint256)": FunctionFragment;
    "acceptOffer(uint256)": FunctionFragment;
    "getOffer(uint256)": FunctionFragment;
    "getRequest(uint256)": FunctionFragment;
    "makeOffer(uint256,uint256,string,address)": FunctionFragment;
    "makeRequest(uint256,string,address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setBuyerRegistry(address)": FunctionFragment;
    "setEscrow(address)": FunctionFragment;
    "setSellerRegistry(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawOffer(uint256)": FunctionFragment;
    "withdrawRequest(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_offers"
      | "_requests"
      | "acceptOffer"
      | "getOffer"
      | "getRequest"
      | "makeOffer"
      | "makeRequest"
      | "owner"
      | "renounceOwnership"
      | "setBuyerRegistry"
      | "setEscrow"
      | "setSellerRegistry"
      | "transferOwnership"
      | "withdrawOffer"
      | "withdrawRequest"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "_offers",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "_requests",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "acceptOffer",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getOffer",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRequest",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "makeOffer",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "makeRequest",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setBuyerRegistry",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setEscrow",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setSellerRegistry",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawOffer",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawRequest",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "_offers", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_requests", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "acceptOffer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getOffer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRequest", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "makeOffer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "makeRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBuyerRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setEscrow", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setSellerRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawOffer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawRequest",
    data: BytesLike
  ): Result;

  events: {
    "NewOffer(address,uint256,uint256,uint256)": EventFragment;
    "NewRequest(address,uint256,uint256)": EventFragment;
    "OfferAccepted(address,address,uint256)": EventFragment;
    "OfferWithdrawn(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "RequestWithdrawn(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewOffer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewRequest"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OfferAccepted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OfferWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestWithdrawn"): EventFragment;
}

export interface NewOfferEventObject {
  _seller: string;
  _requestId: BigNumber;
  _offerId: BigNumber;
  _price: BigNumber;
}
export type NewOfferEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber],
  NewOfferEventObject
>;

export type NewOfferEventFilter = TypedEventFilter<NewOfferEvent>;

export interface NewRequestEventObject {
  _buyer: string;
  _requestId: BigNumber;
  _price: BigNumber;
}
export type NewRequestEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  NewRequestEventObject
>;

export type NewRequestEventFilter = TypedEventFilter<NewRequestEvent>;

export interface OfferAcceptedEventObject {
  _buyer: string;
  _seller: string;
  _requestId: BigNumber;
}
export type OfferAcceptedEvent = TypedEvent<
  [string, string, BigNumber],
  OfferAcceptedEventObject
>;

export type OfferAcceptedEventFilter = TypedEventFilter<OfferAcceptedEvent>;

export interface OfferWithdrawnEventObject {
  _seller: string;
  _offerId: BigNumber;
}
export type OfferWithdrawnEvent = TypedEvent<
  [string, BigNumber],
  OfferWithdrawnEventObject
>;

export type OfferWithdrawnEventFilter = TypedEventFilter<OfferWithdrawnEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface RequestWithdrawnEventObject {
  _buyer: string;
  _requestId: BigNumber;
}
export type RequestWithdrawnEvent = TypedEvent<
  [string, BigNumber],
  RequestWithdrawnEventObject
>;

export type RequestWithdrawnEventFilter =
  TypedEventFilter<RequestWithdrawnEvent>;

export interface Requests extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RequestsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    _offers(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, BigNumber, number, string] & {
        seller: string;
        price: BigNumber;
        uri: string;
        requestId: BigNumber;
        state: number;
        arbiter: string;
      }
    >;

    _requests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, number, string] & {
        buyer: string;
        price: BigNumber;
        uri: string;
        state: number;
        arbiter: string;
      }
    >;

    acceptOffer(
      offerId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getOffer(
      offerId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[Requests.OfferStructOutput]>;

    getRequest(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[Requests.RequestStructOutput]>;

    makeOffer(
      requestId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _uri: PromiseOrValue<string>,
      _arbiter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    makeRequest(
      _price: PromiseOrValue<BigNumberish>,
      _uri: PromiseOrValue<string>,
      _arbiter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setBuyerRegistry(
      buyerRegistry: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setEscrow(
      escrow: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setSellerRegistry(
      sellerRegistry: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawOffer(
      offerId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawRequest(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  _offers(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, string, BigNumber, number, string] & {
      seller: string;
      price: BigNumber;
      uri: string;
      requestId: BigNumber;
      state: number;
      arbiter: string;
    }
  >;

  _requests(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, string, number, string] & {
      buyer: string;
      price: BigNumber;
      uri: string;
      state: number;
      arbiter: string;
    }
  >;

  acceptOffer(
    offerId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getOffer(
    offerId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<Requests.OfferStructOutput>;

  getRequest(
    requestId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<Requests.RequestStructOutput>;

  makeOffer(
    requestId: PromiseOrValue<BigNumberish>,
    _price: PromiseOrValue<BigNumberish>,
    _uri: PromiseOrValue<string>,
    _arbiter: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  makeRequest(
    _price: PromiseOrValue<BigNumberish>,
    _uri: PromiseOrValue<string>,
    _arbiter: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setBuyerRegistry(
    buyerRegistry: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setEscrow(
    escrow: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setSellerRegistry(
    sellerRegistry: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawOffer(
    offerId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawRequest(
    requestId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    _offers(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, BigNumber, number, string] & {
        seller: string;
        price: BigNumber;
        uri: string;
        requestId: BigNumber;
        state: number;
        arbiter: string;
      }
    >;

    _requests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, number, string] & {
        buyer: string;
        price: BigNumber;
        uri: string;
        state: number;
        arbiter: string;
      }
    >;

    acceptOffer(
      offerId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getOffer(
      offerId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<Requests.OfferStructOutput>;

    getRequest(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<Requests.RequestStructOutput>;

    makeOffer(
      requestId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _uri: PromiseOrValue<string>,
      _arbiter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    makeRequest(
      _price: PromiseOrValue<BigNumberish>,
      _uri: PromiseOrValue<string>,
      _arbiter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setBuyerRegistry(
      buyerRegistry: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setEscrow(
      escrow: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setSellerRegistry(
      sellerRegistry: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawOffer(
      offerId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawRequest(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "NewOffer(address,uint256,uint256,uint256)"(
      _seller?: PromiseOrValue<string> | null,
      _requestId?: PromiseOrValue<BigNumberish> | null,
      _offerId?: PromiseOrValue<BigNumberish> | null,
      _price?: null
    ): NewOfferEventFilter;
    NewOffer(
      _seller?: PromiseOrValue<string> | null,
      _requestId?: PromiseOrValue<BigNumberish> | null,
      _offerId?: PromiseOrValue<BigNumberish> | null,
      _price?: null
    ): NewOfferEventFilter;

    "NewRequest(address,uint256,uint256)"(
      _buyer?: PromiseOrValue<string> | null,
      _requestId?: PromiseOrValue<BigNumberish> | null,
      _price?: null
    ): NewRequestEventFilter;
    NewRequest(
      _buyer?: PromiseOrValue<string> | null,
      _requestId?: PromiseOrValue<BigNumberish> | null,
      _price?: null
    ): NewRequestEventFilter;

    "OfferAccepted(address,address,uint256)"(
      _buyer?: PromiseOrValue<string> | null,
      _seller?: PromiseOrValue<string> | null,
      _requestId?: PromiseOrValue<BigNumberish> | null
    ): OfferAcceptedEventFilter;
    OfferAccepted(
      _buyer?: PromiseOrValue<string> | null,
      _seller?: PromiseOrValue<string> | null,
      _requestId?: PromiseOrValue<BigNumberish> | null
    ): OfferAcceptedEventFilter;

    "OfferWithdrawn(address,uint256)"(
      _seller?: PromiseOrValue<string> | null,
      _offerId?: PromiseOrValue<BigNumberish> | null
    ): OfferWithdrawnEventFilter;
    OfferWithdrawn(
      _seller?: PromiseOrValue<string> | null,
      _offerId?: PromiseOrValue<BigNumberish> | null
    ): OfferWithdrawnEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "RequestWithdrawn(address,uint256)"(
      _buyer?: PromiseOrValue<string> | null,
      _requestId?: PromiseOrValue<BigNumberish> | null
    ): RequestWithdrawnEventFilter;
    RequestWithdrawn(
      _buyer?: PromiseOrValue<string> | null,
      _requestId?: PromiseOrValue<BigNumberish> | null
    ): RequestWithdrawnEventFilter;
  };

  estimateGas: {
    _offers(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _requests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    acceptOffer(
      offerId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getOffer(
      offerId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRequest(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    makeOffer(
      requestId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _uri: PromiseOrValue<string>,
      _arbiter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    makeRequest(
      _price: PromiseOrValue<BigNumberish>,
      _uri: PromiseOrValue<string>,
      _arbiter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setBuyerRegistry(
      buyerRegistry: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setEscrow(
      escrow: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setSellerRegistry(
      sellerRegistry: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawOffer(
      offerId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawRequest(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _offers(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _requests(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    acceptOffer(
      offerId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getOffer(
      offerId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRequest(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    makeOffer(
      requestId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      _uri: PromiseOrValue<string>,
      _arbiter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    makeRequest(
      _price: PromiseOrValue<BigNumberish>,
      _uri: PromiseOrValue<string>,
      _arbiter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setBuyerRegistry(
      buyerRegistry: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setEscrow(
      escrow: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setSellerRegistry(
      sellerRegistry: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawOffer(
      offerId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawRequest(
      requestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
