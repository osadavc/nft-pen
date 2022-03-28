import { Dialog } from "@headlessui/react";
import { Dispatch, FC, SetStateAction } from "react";
import { IFrameContent } from "types/iframeContent";

interface MintModalProps {
  mintNFT: () => void;
  iframeContent: IFrameContent;
  setIframeContent: Dispatch<SetStateAction<IFrameContent>>;
}

const MintModal: FC<MintModalProps> = ({
  mintNFT,
  iframeContent,
  setIframeContent,
}) => {
  return (
    <div className="z-[2000] flex flex-col items-center justify-center">
      <Dialog.Title as="h2" className="text-xl font-semibold">
        Mint The NFT
      </Dialog.Title>
      <Dialog.Description as="p" className="mt-1 text-center capitalize">
        type a name for your NFT and click on mint button
      </Dialog.Description>

      <label className="mt-4 mb-1 ml-2 w-full text-left font-semibold">
        NFT Name
      </label>
      <input
        type="text"
        className="w-full rounded border border-gray-200 py-3 px-4"
        placeholder="Type Your NFT Name Here"
        value={iframeContent.penTitle}
        onChange={(e) => {
          setIframeContent((prevState) => ({
            ...prevState,
            penTitle: e.target.value,
          }));
        }}
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
