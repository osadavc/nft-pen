import { Dialog } from "@headlessui/react";
import { Dispatch, FC, SetStateAction } from "react";
import { IFrameContent } from "types/iframeContent";
import { MintingStatus } from "types/mintingStatus";
import * as env from "config";

interface MintModalProps {
  mintNFT: () => void;
  iframeContent: IFrameContent;
  setIframeContent: Dispatch<SetStateAction<IFrameContent>>;
  mintingStatus: MintingStatus;
  nftId?: number;
}

const MintModal: FC<MintModalProps> = ({
  mintNFT,
  iframeContent,
  setIframeContent,
  mintingStatus,
  nftId,
}) => {
  return (
    <div className="z-[2000] flex flex-col items-center justify-center">
      {!mintingStatus ? (
        <>
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
        </>
      ) : (
        <>
          {mintingStatus != "FINISHED" && (
            <Dialog.Title
              as="h2"
              className="mb-1 text-center text-xl font-semibold"
            >
              Please Wait (Don't Close This Window Or This Popup)
            </Dialog.Title>
          )}

          {mintingStatus == "CHECKS" && (
            <Dialog.Description as="p" className="mt-1 text-center capitalize">
              checking some things to make sure you are ready to mint
            </Dialog.Description>
          )}

          {mintingStatus == "UPLOADING_DATA" && (
            <Dialog.Description as="p" className="mt-1 text-center capitalize">
              uploading your data to IPFS
            </Dialog.Description>
          )}

          {mintingStatus == "MINTING" && (
            <Dialog.Description as="p" className="mt-1 text-center capitalize">
              Minting Your NFT
            </Dialog.Description>
          )}

          {mintingStatus == "FINISHING" && (
            <Dialog.Description as="p" className="mt-1 text-center capitalize">
              Minted The NFT, Finishing Some things
            </Dialog.Description>
          )}

          {mintingStatus == "FINISHED" && (
            <>
              <Dialog.Title
                as="h2"
                className="mb-1 text-center text-xl font-semibold"
              >
                Finally, Finished Minting The NFT
              </Dialog.Title>

              {nftId && (
                <button
                  className="mt-3 w-full rounded border border-gray-200 py-2 px-4 font-medium"
                  onClick={() => {
                    window.open(
                      `https://testnets.opensea.io/assets/mumbai/${env.contractAddress}/${nftId}`
                    );
                  }}
                >
                  View The NFT
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MintModal;
