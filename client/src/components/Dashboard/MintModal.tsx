import { Dialog } from "@headlessui/react";
import { FC } from "react";

interface MintModalProps {
  mintNFT: () => void;
  NFTNameInputRef: React.Ref<HTMLInputElement>;
}

const MintModal: FC<MintModalProps> = ({ mintNFT, NFTNameInputRef }) => {
  return (
    <div className="z-[2000] flex flex-col items-center justify-center">
      <Dialog.Title as="h2" className="text-xl font-semibold">
        Mint The NFT
      </Dialog.Title>
      <Dialog.Description as="p" className="mt-1 text-center capitalize">
        type a name for your NFT and click on mint button
      </Dialog.Description>

      <input
        type="text"
        placeholder="NFT Name"
        className="mt-4 w-full rounded border border-gray-200 py-3 px-4"
        ref={NFTNameInputRef}
      />
      <button
        className="mt-3 w-full rounded border border-gray-200 py-2 px-4 font-medium"
        onClick={mintNFT}
      >
        Mint NFT
      </button>
    </div>
  );
};

export default MintModal;
