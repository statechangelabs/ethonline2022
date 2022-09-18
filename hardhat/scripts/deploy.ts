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

  // Create a new job bid from the buyer
  console.log("Creating a new job bid from the buyer");
  
  const jobBid = await escrow.connect(buyer).bid(ethers.utils.parseUnits("1", "ether"), seller.address, arbiter.address);
  const jobBid_receipt = await jobBid.wait();
  const jobId_1 = parseInt(jobBid_receipt.logs[0].topics[1],16)
  console.log("Job bid created");


  // const jobBid_2 = await escrow.connect(buyer).bid(ethers.utils.parseUnits("1", "ether"), seller.address, arbiter.address);
  // const jobBid_receipt_2 = await jobBid_2.wait();
  // // console.log(jobBid_receipt_2);
  // console.log("Job bid created");

  // Accept the job bid from the seller
  // console.log("Accepting the job bid from the seller");
  // const bidAccept = escrow.connect(seller).acceptBid()


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
