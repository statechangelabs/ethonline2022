import { ethers } from "hardhat";
console.log("Starting");

async function main2() {
  const [owner, _buyer, _seller, _arbiter] = await ethers.getSigners();
  const buyer = await ethers.getImpersonatedSigner(
    "0xF7fF442a8184E113476b68F5d2cFEE57ad1ae6DE"
  );
  const seller = await ethers.getImpersonatedSigner("0xf6736A845fD69c4ceb24Bb09C4089273F3690543");
  const arbiter = await ethers.getImpersonatedSigner("0x90f14e3282977416286085e0d90210A400bEFD22");
  // const buyer = new ethers.Wallet(process.env.AKSHAYKEY, owner.provider);
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy();
  const escrowAddress = escrow.address;
  await escrow.deployed();

  console.log("\n\n");
  console.log(`Escrow deployed to ${escrow.address}`);
  console.log("Buyer address: ", buyer.address);
  console.log("Seller address: ", seller.address);
  console.log("Arbiter address: ", arbiter.address);
  console.log("\n\n");
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

  const USDC_ADDRESS = "0xe11A86849d99F524cAC3E7A0Ec1241828e332C62";
  const USDC = new ethers.Contract(USDC_ADDRESS, abi, buyer);
  const bidAmount = ethers.utils.parseUnits("1", "ether");

  // Happy Path 1: Buyer creates a job, deposits funds, seller accepts and delivers then buyer recieves and seller withdraws
  console.log(
    "Happy Path 1: Buyer creates a job, deposits funds, seller accepts and delivers then buyer recieves and seller withdraws"
  );
  console.log("Creating a new job bid from the buyer");
  const checkAllowance = await USDC.allowance(buyer.address, escrow.address);
  // checking allowance before approval
  console.log("Allowance: ", checkAllowance.toString());
  // buyer approves USDC contract to spend 1 USDC
  const usdcTxn = await USDC.approve(escrowAddress, bidAmount);
  await usdcTxn.wait();
  // checking allowance after approval
  const checkAllowance2 = await USDC.allowance(buyer.address, escrow.address);
  console.log("Allowance: ", checkAllowance2.toString());

  const jobBid = await escrow
    .connect(buyer)
    .bid(bidAmount, seller.address, arbiter.address);
  const jobBid_receipt = await jobBid.wait();
  // console.log(jobBid_receipt.logs[2] );
  const jobId_1 = parseInt(jobBid_receipt.logs[2].topics[1]);
  console.log("Job bid created");

  // Accept the job bid from the seller
  console.log("Accepting the job bid from the seller");
  console.log({ jobId_1 });
  const bidAccept = await escrow.connect(seller).acceptBid(jobId_1);
  const bidAccept_receipt = await bidAccept.wait();
  console.log("Job bid accepted");

  console.log("Asserting that the job is delivered.");
  const jobDelivered = await escrow.connect(seller).assertDelivery(jobId_1);
  const jobDelivered_receipt = await jobDelivered.wait();
  console.log("Job delivered");

  console.log("Buyer confirms the job delivery.");
  const jobConfirmed = await escrow.connect(buyer).receiveDelivery(jobId_1);
  const jobConfirmed_receipt = await jobConfirmed.wait();
  console.log("Delivery confirmed");

  console.log("\n-------------------\n");

  // Happy Path 2: Seller creates a job, buyer accepts, seller delivers then buyer recieves and seller withdraws
  console.log(
    "Happy Path 2: Seller creates a job, buyer accepts, seller delivers then buyer recieves and seller withdraws"
  );
  const jobOffer = await escrow
    .connect(seller)
    .offer(
      ethers.utils.parseUnits("1", "ether"),
      buyer.address,
      arbiter.address
    );
  const jobOffer_receipt_2 = await jobOffer.wait();
  const jobId_2 = parseInt(jobOffer_receipt_2.logs[0].topics[1], 16);
  console.log(jobOffer_receipt_2.logs[0]);
  console.log("Job Offer created");
  
  // Buyer allows escrow contract to spend 1 USDC
  const usdcTxn_2 = await USDC.approve(escrowAddress, bidAmount);
  await usdcTxn_2.wait();
  

  // Accept the job bid from the seller
  console.log("Buyer Accepting the job offer from the seller");
  const offerAccept = await escrow.connect(buyer).acceptOffer(jobId_2);
  const offerAccept_receipt = await offerAccept.wait();
  console.log("Offer accepted");

  console.log("Seller asserts that the job is delivered.");
  const jobDelivered_2 = await escrow.connect(seller).assertDelivery(jobId_2);
  const jobDelivered_receipt_2 = await jobDelivered_2.wait();
  console.log("Job delivered");

  console.log("Buyer confirms the job delivery.");
  const jobConfirmed_2 = await escrow.connect(buyer).receiveDelivery(jobId_2);
  const jobConfirmed_receipt_2 = await jobConfirmed_2.wait();
  console.log("Delivery confirmed");

  console.log("\n-------------------\n");

  // Happy Path 3: Buyer creates a job, deposits funds, seller accepts but cancels the job later
  console.log(
    "Happy Path 3: Buyer creates a job, deposits funds, seller accepts but cancels the job later"
  );
  const buyer_balance_before = await USDC.balanceOf(buyer.address);
  console.log("Buyer balance before: ", buyer_balance_before.toString());
  const usdcTxn_3 = await USDC.approve(escrowAddress, bidAmount);
  await usdcTxn_3.wait();
  console.log("Creating a new job bid from the buyer");
  const jobBid_2 = await escrow
    .connect(buyer)
    .bid(
      ethers.utils.parseUnits("1", "ether"),
      seller.address,
      arbiter.address
    );
  const jobBid_receipt_2 = await jobBid_2.wait();
  const jobId_3 = parseInt(jobBid_receipt_2.logs[2].topics[1], 16);
  console.log("Job bid created");

  // Accept the job bid from the seller
  console.log("Accepting the job bid from the seller");
  const bidAccept_2 = await escrow.connect(seller).acceptBid(jobId_1);
  const bidAccept_receipt_2 = await bidAccept_2.wait();
  console.log("Job bid accepted");

  const buyer_balance_during = await USDC.balanceOf(buyer.address);
  console.log("Buyer balance during the process: ", buyer_balance_during.toString());

  console.log("Seller cancels the job.");
  const jobCancelled = await escrow.connect(seller).cancel(jobId_3);
  const jobCancelled_receipt = await jobCancelled.wait();
  console.log("Job cancelled by seller");

  const buyer_balance_after = await USDC.balanceOf(buyer.address);
  console.log("Buyer balance after: ", buyer_balance_after.toString());
  if (buyer_balance_after.toString() === buyer_balance_before.toString()) {
    console.log("Buyer balance is the same after seller cancelled the job");
  }
  
  console.log("\n-------------------\n");

  // Happy Path 4: Buyer creates a job but cancels before seller accepts
  console.log(
    "Happy Path 4: Buyer creates a job but cancels before seller accepts"
  );
  console.log("Creating a new job bid from the buyer");
  const usdcTxn_4 = await USDC.approve(escrowAddress, bidAmount);
  await usdcTxn_4.wait();
  const jobBid_3 = await escrow
    .connect(buyer)
    .bid(
      ethers.utils.parseUnits("1", "ether"),
      seller.address,
      arbiter.address
    );
  const jobBid_receipt_3 = await jobBid_3.wait();
  const jobId_4 = parseInt(jobBid_receipt_3.logs[2].topics[1], 16);
  console.log("Job bid created");

  console.log("Buyer cancels the job.");
  const jobCancelled_2 = await escrow.connect(buyer).cancel(jobId_4);
  const jobCancelled_receipt_2 = await jobCancelled_2.wait();
  console.log("Job cancelled by buyer");

  console.log("\n-------------------\n");
  // Happy Path 5: Buyer creates a job, deposits funds, seller accepts and delivers but buyer disputes the job and arbiter rules in favour of seller.
  console.log(
    "Happy Path 5: Buyer creates a job, deposits funds, seller accepts and delivers but buyer disputes the job and arbiter rules in favour of seller."
  );
  console.log("Creating a new job bid from the buyer");
  const usdcTxn_5 = await USDC.approve(escrowAddress, bidAmount);
  await usdcTxn_5.wait();

  const buyer_balance_before_2 = await USDC.balanceOf(buyer.address);
  console.log("Buyer balance before: ", buyer_balance_before_2.toString());
  const seller_balance_before_2 = await USDC.balanceOf(seller.address);
  console.log("Seller balance before: ", seller_balance_before_2.toString()); 

  const jobBid_4 = await escrow
    .connect(buyer)
    .bid(
      ethers.utils.parseUnits("1", "ether"),
      seller.address,
      arbiter.address
    );
  const jobBid_receipt_4 = await jobBid_4.wait();
  const jobId_5 = parseInt(jobBid_receipt_4.logs[2].topics[1], 16);
  console.log("Job bid created");

  console.log("Accepting the job bid from the seller");
  const bidAccept_3 = await escrow.connect(seller).acceptBid(jobId_5);
  const bidAccept_receipt_3 = await bidAccept_3.wait();
  console.log("Job bid accepted");

  console.log("Seller asserts that the job is delivered.");
  const jobDelivered_3 = await escrow.connect(seller).assertDelivery(jobId_5);
  const jobDelivered_receipt_3 = await jobDelivered_3.wait();
  console.log("Job delivered");

  console.log("Buyer disputes the job delivery.");
  const jobDisputed = await escrow.connect(buyer).dispute(jobId_5);
  const jobDisputed_receipt = await jobDisputed.wait();
  console.log("Job disputed by buyer");

  console.log("Arbiter ruling in favour of the seller.");
  const jobRuled = await escrow
    .connect(arbiter)
    .arbitrate(
      jobId_5,
      ethers.utils.parseUnits("1", "ether"),
      "I side with seller!"
    );
  const jobRuled_receipt = await jobRuled.wait();
  console.log("Job ruled by arbiter in favor of seller");

  const ruling = await escrow.connect(arbiter).arbiterOpinionUris(jobId_5);
  console.log("Arbiter ruling: ", ruling);

  const buyer_balance_after_2 = await USDC.balanceOf(buyer.address);
  console.log("Buyer balance after: ", buyer_balance_after_2.toString());
  const seller_balance_after_2 = await USDC.balanceOf(seller.address);
  console.log("Seller balance before: ", seller_balance_after_2.toString()); 

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main2().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
