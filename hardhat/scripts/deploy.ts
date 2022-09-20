import { ethers } from "hardhat";

async function main() {

  const [owner, buyer, seller, arbiter] = await ethers.getSigners();
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy();

  await escrow.deployed();

  console.log(`Escrow deployed to ${escrow.address}`);

  console.log("Buyer address: ", buyer.address);
  console.log("Seller address: ", seller.address);
  console.log("Arbiter address: ", arbiter.address);


  // Happy Path 1: Buyer creates a job, deposits funds, seller accepts and delivers then buyer recieves and seller withdraws
  // Create a new job bid from the buyer
  console.log("Creating a new job bid from the buyer");
  const jobBid = await escrow.connect(buyer).bid(ethers.utils.parseUnits("1", "ether"), seller.address, arbiter.address);
  const jobBid_receipt = await jobBid.wait();
  const jobId_1 = parseInt(jobBid_receipt.logs[0].topics[1],16)
  console.log("Job bid created");

  // Accept the job bid from the seller
  console.log("Accepting the job bid from the seller");
  const bidAccept = await escrow.connect(seller).acceptBid(jobId_1);
  const bidAccept_receipt = await bidAccept.wait();

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
  const jobOffer = await escrow.connect(seller).offer(ethers.utils.parseUnits("1", "ether"), buyer.address, arbiter.address);
  const jobOffer_receipt_2 = await jobOffer.wait();
  const jobId_2 = parseInt(jobOffer_receipt_2.logs[0].topics[1],16)
  console.log("Job Offer created");

  // Accept the job bid from the seller
  console.log("Buyer Accepting the job bid from the seller");
  const bidAccept_2 = await escrow.connect(buyer).acceptOffer(jobId_2);
  const bidAccept_receipt_2 = await bidAccept_2.wait();
  console.log("Offer accepted");

  console.log("Seller asserts that the job is delivered.");
  const jobDelivered_2 = await escrow.connect(seller).assertDelivery(jobId_2);
  const jobDelivered_receipt_2 = await jobDelivered_2.wait();
  console.log("Job delivered");

  console.log("Buyer confirms the job delivery.");
  const jobConfirmed_2 = await escrow.connect(buyer).receiveDelivery(jobId_2);
  const jobConfirmed_receipt_2 = await jobConfirmed_2.wait();
  console.log("Delivery confirmed");


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
