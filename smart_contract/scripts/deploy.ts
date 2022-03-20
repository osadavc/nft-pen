import { ethers } from "hardhat";

const main = async () => {
  const CodePenNFT = await ethers.getContractFactory("CodePenNFT");
  const codePenNFT = await CodePenNFT.deploy();

  await codePenNFT.deployed();

  console.log("CodePenNFT deployed to:", codePenNFT.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
