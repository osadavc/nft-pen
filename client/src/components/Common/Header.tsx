import Button from "./Button";

const Header = () => {
  return (
    <>
      <h1 className="text-5xl font-bold">NFT Pen</h1>

      <div className="mt-5 flex space-x-3 from-teal-700 via-red-600 to-zinc-50">
        <Button onClick={() => {}}>Login With Google</Button>
        <Button onClick={() => {}}>NFT Collection</Button>
      </div>
    </>
  );
};

export default Header;
