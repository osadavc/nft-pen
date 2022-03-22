import { expect } from "chai";
import { ethers } from "hardhat";

describe("CodePen NFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const CodePenNFT = await ethers.getContractFactory("CodePenNFT");
    const codePenNFT = await CodePenNFT.deploy();
    await codePenNFT.deployed();

    const recipient = "0xcd3b766ccdd6ae721141f452c550ca635964ce71";
    const metadataURI = "cid/test.png";

    let balance = await codePenNFT.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await codePenNFT.payToMint(
      recipient,
      metadataURI,
      {
        value: ethers.utils.parseEther("0.005"),
      }
    );

    await newlyMintedToken.wait();

    balance = await codePenNFT.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await codePenNFT.isContentOwned(metadataURI)).to.equal(true);
  });
});
