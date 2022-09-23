import { ethers } from "hardhat";
console.log("Starting");
async function main2() {
    const [owner, _buyer, _seller, _arbiter] = await ethers.getSigners();
    const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "authorizer",
          type: "address",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "nonce",
          type: "bytes32",
        },
      ],
      name: "AuthorizationCanceled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "authorizer",
          type: "address",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "nonce",
          type: "bytes32",
        },
      ],
      name: "AuthorizationUsed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Blacklisted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address payable",
          name: "relayerAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "functionSignature",
          type: "bytes",
        },
      ],
      name: "MetaTransactionExecuted",
      type: "event",
    },
    { anonymous: false, inputs: [], name: "Pause", type: "event" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "newRescuer",
          type: "address",
        },
      ],
      name: "RescuerChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32",
        },
      ],
      name: "RoleAdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleGranted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleRevoked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "UnBlacklisted",
      type: "event",
    },
    { anonymous: false, inputs: [], name: "Unpause", type: "event" },
    {
      inputs: [],
      name: "APPROVE_WITH_AUTHORIZATION_TYPEHASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "BLACKLISTER_ROLE",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "CANCEL_AUTHORIZATION_TYPEHASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "DECREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "DEPOSITOR_ROLE",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "DOMAIN_SEPARATOR",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "EIP712_VERSION",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "INCREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "META_TRANSACTION_TYPEHASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "PAUSER_ROLE",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "PERMIT_TYPEHASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "RESCUER_ROLE",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "TRANSFER_WITH_AUTHORIZATION_TYPEHASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "WITHDRAW_WITH_AUTHORIZATION_TYPEHASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
        { internalType: "uint256", name: "validAfter", type: "uint256" },
        { internalType: "uint256", name: "validBefore", type: "uint256" },
        { internalType: "bytes32", name: "nonce", type: "bytes32" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "approveWithAuthorization",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "authorizer", type: "address" },
        { internalType: "bytes32", name: "nonce", type: "bytes32" },
      ],
      name: "authorizationState",
      outputs: [
        {
          internalType: "enum GasAbstraction.AuthorizationState",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "blacklist",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "blacklisters",
      outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "authorizer", type: "address" },
        { internalType: "bytes32", name: "nonce", type: "bytes32" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "cancelAuthorization",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        {
          internalType: "uint256",
          name: "subtractedValue",
          type: "uint256",
        },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "decrement", type: "uint256" },
        { internalType: "uint256", name: "validAfter", type: "uint256" },
        { internalType: "uint256", name: "validBefore", type: "uint256" },
        { internalType: "bytes32", name: "nonce", type: "bytes32" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "decreaseAllowanceWithAuthorization",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "user", type: "address" },
        { internalType: "bytes", name: "depositData", type: "bytes" },
      ],
      name: "deposit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "userAddress", type: "address" },
        { internalType: "bytes", name: "functionSignature", type: "bytes" },
        { internalType: "bytes32", name: "sigR", type: "bytes32" },
        { internalType: "bytes32", name: "sigS", type: "bytes32" },
        { internalType: "uint8", name: "sigV", type: "uint8" },
      ],
      name: "executeMetaTransaction",
      outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
      name: "getRoleAdmin",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "uint256", name: "index", type: "uint256" },
      ],
      name: "getRoleMember",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
      name: "getRoleMemberCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "hasRole",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "increment", type: "uint256" },
        { internalType: "uint256", name: "validAfter", type: "uint256" },
        { internalType: "uint256", name: "validBefore", type: "uint256" },
        { internalType: "bytes32", name: "nonce", type: "bytes32" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "increaseAllowanceWithAuthorization",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "newName", type: "string" },
        { internalType: "string", name: "newSymbol", type: "string" },
        { internalType: "uint8", name: "newDecimals", type: "uint8" },
        {
          internalType: "address",
          name: "childChainManager",
          type: "address",
        },
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "initialized",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "isBlacklisted",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "nonces",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pausers",
      outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "permit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract IERC20",
          name: "tokenContract",
          type: "address",
        },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "rescueERC20",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "rescuers",
      outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "bytes32", name: "role", type: "bytes32" },
        { internalType: "address", name: "account", type: "address" },
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
        { internalType: "uint256", name: "validAfter", type: "uint256" },
        { internalType: "uint256", name: "validBefore", type: "uint256" },
        { internalType: "bytes32", name: "nonce", type: "bytes32" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "transferWithAuthorization",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "unBlacklist",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "newName", type: "string" },
        { internalType: "string", name: "newSymbol", type: "string" },
      ],
      name: "updateMetadata",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
        { internalType: "uint256", name: "validAfter", type: "uint256" },
        { internalType: "uint256", name: "validBefore", type: "uint256" },
        { internalType: "bytes32", name: "nonce", type: "bytes32" },
        { internalType: "uint8", name: "v", type: "uint8" },
        { internalType: "bytes32", name: "r", type: "bytes32" },
        { internalType: "bytes32", name: "s", type: "bytes32" },
      ],
      name: "withdrawWithAuthorization",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
    const buyer = await ethers.getImpersonatedSigner("0xF7fF442a8184E113476b68F5d2cFEE57ad1ae6DE");
    const seller = await ethers.getImpersonatedSigner("0xf6736A845fD69c4ceb24Bb09C4089273F3690543");
    const arbiter = await ethers.getImpersonatedSigner("0x90f14e3282977416286085e0d90210A400bEFD22");
    const USDC_ADDRESS = "0xe11A86849d99F524cAC3E7A0Ec1241828e332C62";
    const USDC = new ethers.Contract(USDC_ADDRESS, abi, buyer);
  


    const Escrow = await ethers.getContractFactory("Escrow");
    const Requests = await ethers.getContractFactory("Requests");
    const Messaging = await ethers.getContractFactory("Messaging");
    const BuyerRegistry = await ethers.getContractFactory("BuyerRegistry");
    const SellerRegistry = await ethers.getContractFactory("SellerRegistry");

    const escrow = await Escrow.deploy();
    const requests = await Requests.deploy();
    const messaging = await Messaging.deploy();
    const buyerRegistry = await BuyerRegistry.deploy();
    const sellerRegistry = await SellerRegistry.deploy();

    const bidAmount = ethers.utils.parseUnits("1", "ether");

    console.log("Buyer Address: ", buyer.address);
    console.log("Seller Address: ", seller.address);
    console.log("Arbiter Address: ", arbiter.address);
    console.log("\n------------------------------------\n");
    console.log("Escrow deployed to:", escrow.address);
    console.log("Requests deployed to:", requests.address);
    console.log("Messaging deployed to:", messaging.address);
    console.log("BuyerRegistry deployed to:", buyerRegistry.address);
    console.log("SellerRegistry deployed to:", sellerRegistry.address);
    console.log("\n------------------------------------\n");

    console.log("Setting Buyer Registry Address in Requests Contract");
    const set_buyer_registry_requests = await requests.setBuyerRegistry(buyerRegistry.address);
    const set_buyer_registry_requests_receipt = await set_buyer_registry_requests.wait();
    console.log("Buyer Registry Address set in Requests Contract");
    console.log("Setting Seller Registry Address in Requests Contract");
    const set_seller_registry_requests = await requests.setSellerRegistry(sellerRegistry.address);
    const set_seller_registry_requests_receipt = await set_seller_registry_requests.wait();
    console.log("Seller Registry Address set in Requests Contract");
    console.log("Setting Escrow Address in Requests Contract");
    const set_escrow_requests = await requests.setEscrow(escrow.address);
    const set_escrow_requests_receipt = await set_escrow_requests.wait();
    console.log("Escrow Address set in Requests Contract");

    console.log("Setting Buyer Registry Address in Escrow Contract: ", buyerRegistry.address);
    const set_buyer_registry_escrow = await escrow.setBuyerRegistry(buyerRegistry.address);
    const set_buyer_registry_escrow_receipt = await set_buyer_registry_escrow.wait();
    console.log("Buyer Registry Address set in Escrow Contract");
    console.log("Setting Seller Registry Address in Escrow Contract: ", sellerRegistry.address);
    const set_seller_registry_escrow = await escrow.setSellerRegistry(sellerRegistry.address);
    const set_seller_registry_escrow_receipt = await set_seller_registry_escrow.wait();
    console.log("Seller Registry Address set in Escrow Contract");

    console.log("\n------------------------------------\n");

    // Buyer and seller accept registry terms, buyer creates a request, seller creates an offer, buyer accepts offer and funds escrow
    console.log("Buyer and seller ready to accept respective registry terms");
    const buyer_terms_to_accept = await buyerRegistry.termsUrl();
    const seller_terms_to_accept = await sellerRegistry.termsUrl();
    console.log("Terms to accept by buyer:", buyer_terms_to_accept);
    console.log("Terms to accept by seller:", seller_terms_to_accept);

    const buyer_accepting_terms = await buyerRegistry.connect(buyer).acceptTerms(buyer_terms_to_accept);
    const buyer_accepting_terms_receipt = await buyer_accepting_terms.wait();
    console.log("Buyer accepted terms:", buyer_accepting_terms_receipt.status);
    const seller_accepting_terms = await sellerRegistry.connect(seller).acceptTerms(seller_terms_to_accept);
    const seller_accepting_terms_receipt = await seller_accepting_terms.wait();
    console.log("Seller accepted terms:", seller_accepting_terms_receipt.status);
    
    console.log("Buyer is going to create a request");
    const request_1 = await requests.connect(buyer).makeRequest(bidAmount, "My job", _arbiter.address);
    const request_1_receipt = await request_1.wait();
    const request_id_1 = parseInt(request_1_receipt.logs[0].topics[2], 16);
    console.log("Request ID:", request_id_1);

    console.log("Seller is going to create an offer");
    const offer_1 = await requests.connect(seller).makeOffer(request_id_1, bidAmount, "This is my offer", _arbiter.address);
    const offer_1_receipt = await offer_1.wait();
    const offer_id_1 = parseInt(offer_1_receipt.logs[0].topics[2], 16);
    console.log("Offer ID:", offer_id_1);

    console.log("Checking if buyer and seller have accepted terms");
    const buyer_accepted_terms = await buyerRegistry.acceptedTerms(buyer.address);
    console.log("Buyer accepted terms:", buyer_accepted_terms);
    console.log("Checking if seller accepted sellerregistry terms");
    const seller_accepted_terms = await sellerRegistry.acceptedTerms(seller.address);
    console.log("Seller accepted terms:", seller_accepted_terms);

    // const message_to_sign_1 = "I am hiring";
    // const sign = await buyer.signMessage(message_to_sign_1);

    console.log("Buyer is accepting offer");
    const accept_offer_1 = await requests.connect(buyer).acceptOffer(offer_id_1);
    const accept_offer_1_receipt = await accept_offer_1.wait();
    console.log("Buyer accepted offer:", accept_offer_1_receipt.status);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main2().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
