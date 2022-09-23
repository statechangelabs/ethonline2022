import { ethers } from "hardhat";
console.log("Starting");
async function main2() {
    const [owner, _buyer, _seller, _arbiter] = await ethers.getSigners();

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

    console.log("Escrow deployed to:", escrow.address);
    console.log("Requests deployed to:", requests.address);
    console.log("Messaging deployed to:", messaging.address);
    console.log("BuyerRegistry deployed to:", buyerRegistry.address);
    console.log("SellerRegistry deployed to:", sellerRegistry.address);


    // Buyer creates a request, seller creates an offer, buyer accepts offer and funds escrow

    console.log("Buyer creates a request");
    const request_1 = await requests.makeRequest(bidAmount, "My job request", _arbiter.address);
    const request_1_receipt = await request_1.wait();
    const request_id_1 = parseInt(request_1_receipt.logs[0].topics[1], 16);
    console.log("Request ID:", request_id_1);

    console.log("Seller creates an offer");
    const offer_1 = await requests.makeOffer(request_id_1, bidAmount, "This is my offer", _arbiter.address);
    const offer_1_receipt = await offer_1.wait();
    const offer_id_1 = parseInt(offer_1_receipt.logs[0].topics[1], 16);
    console.log("Offer ID:", offer_id_1);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main2().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
