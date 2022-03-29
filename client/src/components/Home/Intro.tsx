import Image from "next/image";
import Button from "../Common/Button";
import * as env from "config";

const Intro = () => {
  return (
    <div>
      <h2 className="mt-14 max-w-[900px] text-center text-4xl font-bold">
        Mint Any Code Pen as a NFT and view it on open sea as a working demo !
      </h2>

      <div className="mt-4 flex items-center justify-center">
        <Button
          onClick={() => {
            window.open(
              `https://testnets.opensea.io/collection/${env.collectionName}`
            );
          }}
          width={250}
        >
          View The NFT Collection
        </Button>
      </div>

      <div className="relative mt-6 h-[500px] overflow-hidden rounded-md border border-zinc-300">
        <Image src="/images/screenshot.png" layout="fill" />
      </div>
    </div>
  );
};

export default Intro;
