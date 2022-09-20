import { ethers } from "hardhat";

async function main() {

  const [owner, buyer, seller, arbiter] = await ethers.getSigners();
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy();

  await escrow.deployed();

  console.log("\n\n");
  console.log(`Escrow deployed to ${escrow.address}`);
  console.log("Buyer address: ", buyer.address);
  console.log("Seller address: ", seller.address);
  console.log("Arbiter address: ", arbiter.address);
  console.log("\n\n");


  // Happy Path 1: Buyer creates a job, deposits funds, seller accepts and delivers then buyer recieves and seller withdraws
  console.log("Happy Path 1: Buyer creates a job, deposits funds, seller accepts and delivers then buyer recieves and seller withdraws");
  console.log("Creating a new job bid from the buyer");
  const jobBid = await escrow.connect(buyer).bid(ethers.utils.parseUnits("1", "ether"), seller.address, arbiter.address);
  const jobBid_receipt = await jobBid.wait();
  const jobId_1 = parseInt(jobBid_receipt.logs[0].topics[1],16)
  console.log("Job bid created");

  // Accept the job bid from the seller
  console.log("Accepting the job bid from the seller");
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
  console.log("Happy Path 2: Seller creates a job, buyer accepts, seller delivers then buyer recieves and seller withdraws")
  const jobOffer = await escrow.connect(seller).offer(ethers.utils.parseUnits("1", "ether"), buyer.address, arbiter.address);
  const jobOffer_receipt_2 = await jobOffer.wait();
  const jobId_2 = parseInt(jobOffer_receipt_2.logs[0].topics[1],16)
  console.log("Job Offer created");

  // Accept the job bid from the seller
  console.log("Buyer Accepting the job bid from the seller");
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
  console.log("Happy Path 3: Buyer creates a job, deposits funds, seller accepts but cancels the job later");
  console.log("Creating a new job bid from the buyer");
  const jobBid_2 = await escrow.connect(buyer).bid(ethers.utils.parseUnits("1", "ether"), seller.address, arbiter.address);
  const jobBid_receipt_2 = await jobBid_2.wait();
  const jobId_3 = parseInt(jobBid_receipt_2.logs[0].topics[1],16)
  console.log("Job bid created");

  // Accept the job bid from the seller
  console.log("Accepting the job bid from the seller");
  const bidAccept_2 = await escrow.connect(seller).acceptBid(jobId_1);
  const bidAccept_receipt_2 = await bidAccept_2.wait();
  console.log("Job bid accepted");

  console.log("Seller cancels the job.");
  const jobCancelled = await escrow.connect(seller).cancel(jobId_3);
  const jobCancelled_receipt = await jobCancelled.wait();
  console.log("Job cancelled by seller");

  console.log("\n-------------------\n");

  // Happy Path 4: Buyer creates a job but cancels before seller accepts
  console.log("Happy Path 4: Buyer creates a job but cancels before seller accepts");
  console.log("Creating a new job bid from the buyer");
  const jobBid_3 = await escrow.connect(buyer).bid(ethers.utils.parseUnits("1", "ether"), seller.address, arbiter.address);
  const jobBid_receipt_3 = await jobBid_3.wait();
  const jobId_4 = parseInt(jobBid_receipt_3.logs[0].topics[1],16);
  console.log("Job bid created");

  console.log("Buyer cancels the job.");
  const jobCancelled_2 = await escrow.connect(buyer).cancel(jobId_4);
  const jobCancelled_receipt_2 = await jobCancelled_2.wait();
  console.log("Job cancelled by buyer");

  console.log("\n-------------------\n");
  // Happy Path 5: Buyer creates a job, deposits funds, seller accepts but cancels the job later

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
