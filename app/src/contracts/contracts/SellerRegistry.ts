/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
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

export declare namespace SellerRegistry {
  export type TermsInfoStruct = {
    key: PromiseOrValue<string>;
    value: PromiseOrValue<string>;
  };

  export type TermsInfoStructOutput = [string, string] & {
    key: string;
    value: string;
  };
}

export interface SellerRegistryInterface extends utils.Interface {
  functions: {
    "URI()": FunctionFragment;
    "acceptTerms(string)": FunctionFragment;
    "acceptTermsFor(address,string,bytes)": FunctionFragment;
    "acceptedTerms(address)": FunctionFragment;
    "addMetaSigner(address)": FunctionFragment;
    "currentTermsBlock()": FunctionFragment;
    "docTemplate()": FunctionFragment;
    "globalTerm(string)": FunctionFragment;
    "isMetaSigner(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "removeMetaSigner(address)": FunctionFragment;
    "renderer()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setGlobalRenderer(string)": FunctionFragment;
    "setGlobalTemplate(string)": FunctionFragment;
    "setGlobalTerm(string,string)": FunctionFragment;
    "setPolydocs(string,string,(string,string)[])": FunctionFragment;
    "setURI(string)": FunctionFragment;
    "termsUrl()": FunctionFragment;
    "termsUrlWithPrefix(string)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "URI"
      | "acceptTerms"
      | "acceptTermsFor"
      | "acceptedTerms"
      | "addMetaSigner"
      | "currentTermsBlock"
      | "docTemplate"
      | "globalTerm"
      | "isMetaSigner"
      | "owner"
      | "removeMetaSigner"
      | "renderer"
      | "renounceOwnership"
      | "setGlobalRenderer"
      | "setGlobalTemplate"
      | "setGlobalTerm"
      | "setPolydocs"
      | "setURI"
      | "termsUrl"
      | "termsUrlWithPrefix"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "URI", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "acceptTerms",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "acceptTermsFor",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "acceptedTerms",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "addMetaSigner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "currentTermsBlock",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "docTemplate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "globalTerm",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isMetaSigner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeMetaSigner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "renderer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setGlobalRenderer",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setGlobalTemplate",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setGlobalTerm",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setPolydocs",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      SellerRegistry.TermsInfoStruct[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setURI",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "termsUrl", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "termsUrlWithPrefix",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "URI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "acceptTerms",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptTermsFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "acceptedTerms",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addMetaSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentTermsBlock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "docTemplate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "globalTerm", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isMetaSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeMetaSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "renderer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGlobalRenderer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGlobalTemplate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGlobalTerm",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPolydocs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setURI", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "termsUrl", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "termsUrlWithPrefix",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "AcceptedTerms(address,string)": EventFragment;
    "GlobalRendererChanged(string)": EventFragment;
    "GlobalTemplateChanged(string)": EventFragment;
    "GlobalTermChanged(bytes32,bytes32)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "UpdatedURI(string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AcceptedTerms"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GlobalRendererChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GlobalTemplateChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GlobalTermChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdatedURI"): EventFragment;
}

export interface AcceptedTermsEventObject {
  sender: string;
  terms: string;
}
export type AcceptedTermsEvent = TypedEvent<
  [string, string],
  AcceptedTermsEventObject
>;

export type AcceptedTermsEventFilter = TypedEventFilter<AcceptedTermsEvent>;

export interface GlobalRendererChangedEventObject {
  _renderer: string;
}
export type GlobalRendererChangedEvent = TypedEvent<
  [string],
  GlobalRendererChangedEventObject
>;

export type GlobalRendererChangedEventFilter =
  TypedEventFilter<GlobalRendererChangedEvent>;

export interface GlobalTemplateChangedEventObject {
  _template: string;
}
export type GlobalTemplateChangedEvent = TypedEvent<
  [string],
  GlobalTemplateChangedEventObject
>;

export type GlobalTemplateChangedEventFilter =
  TypedEventFilter<GlobalTemplateChangedEvent>;

export interface GlobalTermChangedEventObject {
  _term: string;
  _value: string;
}
export type GlobalTermChangedEvent = TypedEvent<
  [string, string],
  GlobalTermChangedEventObject
>;

export type GlobalTermChangedEventFilter =
  TypedEventFilter<GlobalTermChangedEvent>;

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

export interface UpdatedURIEventObject {
  uri: string;
}
export type UpdatedURIEvent = TypedEvent<[string], UpdatedURIEventObject>;

export type UpdatedURIEventFilter = TypedEventFilter<UpdatedURIEvent>;

export interface SellerRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SellerRegistryInterface;

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
    URI(overrides?: CallOverrides): Promise<[string]>;

    acceptTerms(
      _newtermsUrl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    acceptTermsFor(
      _signer: PromiseOrValue<string>,
      _newtermsUrl: PromiseOrValue<string>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    acceptedTerms(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    addMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    currentTermsBlock(overrides?: CallOverrides): Promise<[BigNumber]>;

    docTemplate(overrides?: CallOverrides): Promise<[string]>;

    globalTerm(
      _term: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    isMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    removeMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renderer(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setGlobalRenderer(
      _newRenderer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setGlobalTemplate(
      _newDocTemplate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setGlobalTerm(
      _term: PromiseOrValue<string>,
      _value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setPolydocs(
      renderer: PromiseOrValue<string>,
      template: PromiseOrValue<string>,
      terms: SellerRegistry.TermsInfoStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setURI(
      _newURI: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    termsUrl(overrides?: CallOverrides): Promise<[string]>;

    termsUrlWithPrefix(
      prefix: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  URI(overrides?: CallOverrides): Promise<string>;

  acceptTerms(
    _newtermsUrl: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  acceptTermsFor(
    _signer: PromiseOrValue<string>,
    _newtermsUrl: PromiseOrValue<string>,
    _signature: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  acceptedTerms(
    _address: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  addMetaSigner(
    _signer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  currentTermsBlock(overrides?: CallOverrides): Promise<BigNumber>;

  docTemplate(overrides?: CallOverrides): Promise<string>;

  globalTerm(
    _term: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  isMetaSigner(
    _signer: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  removeMetaSigner(
    _signer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renderer(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setGlobalRenderer(
    _newRenderer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setGlobalTemplate(
    _newDocTemplate: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setGlobalTerm(
    _term: PromiseOrValue<string>,
    _value: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setPolydocs(
    renderer: PromiseOrValue<string>,
    template: PromiseOrValue<string>,
    terms: SellerRegistry.TermsInfoStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setURI(
    _newURI: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  termsUrl(overrides?: CallOverrides): Promise<string>;

  termsUrlWithPrefix(
    prefix: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    URI(overrides?: CallOverrides): Promise<string>;

    acceptTerms(
      _newtermsUrl: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    acceptTermsFor(
      _signer: PromiseOrValue<string>,
      _newtermsUrl: PromiseOrValue<string>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    acceptedTerms(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    addMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    currentTermsBlock(overrides?: CallOverrides): Promise<BigNumber>;

    docTemplate(overrides?: CallOverrides): Promise<string>;

    globalTerm(
      _term: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    isMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    removeMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    renderer(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setGlobalRenderer(
      _newRenderer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setGlobalTemplate(
      _newDocTemplate: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setGlobalTerm(
      _term: PromiseOrValue<string>,
      _value: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setPolydocs(
      renderer: PromiseOrValue<string>,
      template: PromiseOrValue<string>,
      terms: SellerRegistry.TermsInfoStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    setURI(
      _newURI: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    termsUrl(overrides?: CallOverrides): Promise<string>;

    termsUrlWithPrefix(
      prefix: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AcceptedTerms(address,string)"(
      sender?: null,
      terms?: null
    ): AcceptedTermsEventFilter;
    AcceptedTerms(sender?: null, terms?: null): AcceptedTermsEventFilter;

    "GlobalRendererChanged(string)"(
      _renderer?: PromiseOrValue<string> | null
    ): GlobalRendererChangedEventFilter;
    GlobalRendererChanged(
      _renderer?: PromiseOrValue<string> | null
    ): GlobalRendererChangedEventFilter;

    "GlobalTemplateChanged(string)"(
      _template?: PromiseOrValue<string> | null
    ): GlobalTemplateChangedEventFilter;
    GlobalTemplateChanged(
      _template?: PromiseOrValue<string> | null
    ): GlobalTemplateChangedEventFilter;

    "GlobalTermChanged(bytes32,bytes32)"(
      _term?: PromiseOrValue<BytesLike> | null,
      _value?: null
    ): GlobalTermChangedEventFilter;
    GlobalTermChanged(
      _term?: PromiseOrValue<BytesLike> | null,
      _value?: null
    ): GlobalTermChangedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "UpdatedURI(string)"(uri?: null): UpdatedURIEventFilter;
    UpdatedURI(uri?: null): UpdatedURIEventFilter;
  };

  estimateGas: {
    URI(overrides?: CallOverrides): Promise<BigNumber>;

    acceptTerms(
      _newtermsUrl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    acceptTermsFor(
      _signer: PromiseOrValue<string>,
      _newtermsUrl: PromiseOrValue<string>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    acceptedTerms(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    addMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    currentTermsBlock(overrides?: CallOverrides): Promise<BigNumber>;

    docTemplate(overrides?: CallOverrides): Promise<BigNumber>;

    globalTerm(
      _term: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    removeMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renderer(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setGlobalRenderer(
      _newRenderer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setGlobalTemplate(
      _newDocTemplate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setGlobalTerm(
      _term: PromiseOrValue<string>,
      _value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setPolydocs(
      renderer: PromiseOrValue<string>,
      template: PromiseOrValue<string>,
      terms: SellerRegistry.TermsInfoStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setURI(
      _newURI: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    termsUrl(overrides?: CallOverrides): Promise<BigNumber>;

    termsUrlWithPrefix(
      prefix: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    URI(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    acceptTerms(
      _newtermsUrl: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    acceptTermsFor(
      _signer: PromiseOrValue<string>,
      _newtermsUrl: PromiseOrValue<string>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    acceptedTerms(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    addMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    currentTermsBlock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    docTemplate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    globalTerm(
      _term: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeMetaSigner(
      _signer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renderer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setGlobalRenderer(
      _newRenderer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setGlobalTemplate(
      _newDocTemplate: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setGlobalTerm(
      _term: PromiseOrValue<string>,
      _value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setPolydocs(
      renderer: PromiseOrValue<string>,
      template: PromiseOrValue<string>,
      terms: SellerRegistry.TermsInfoStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setURI(
      _newURI: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    termsUrl(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    termsUrlWithPrefix(
      prefix: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
