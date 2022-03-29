const NoMetamask = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-3 cursor-pointer select-none text-5xl font-bold">
        NFT Pen
      </h1>
      <h3 className="mb-6 text-center text-base font-semibold text-gray-500">
        Metamask Is Not Detected, Install Metamask To Use NFT Pen
      </h3>
      <button
        className="rounded-md border border-gray-300 py-[0.4rem] px-3 text-sm font-medium text-gray-500"
        onClick={() => {
          window.open("https://metamask.io/download/");
        }}
      >
        Install Metamask
      </button>
    </div>
  );
};

export default NoMetamask;
