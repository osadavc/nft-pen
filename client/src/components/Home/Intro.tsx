import Button from "../Common/Button";

const Intro = () => {
  return (
    <div>
      <h2 className="mt-14 max-w-[900px] text-center text-4xl font-bold">
        Mint Any Code Pen as a NFT and view it on open sea as a working demo !
      </h2>

      <div className="mt-4 flex items-center justify-center">
        <Button onClick={() => {}} width={250}>
          View The NFT Collection
        </Button>
      </div>

      <div className="mt-6 h-[500px] rounded-md border border-zinc-300"></div>
    </div>
  );
};

export default Intro;
