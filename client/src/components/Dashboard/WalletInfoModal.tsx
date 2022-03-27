import { Dialog } from "@headlessui/react";
import Spinner from "components/Common/Spinner";
import { FC } from "react";
import { WalletError } from "../../types/walletError";

interface WalletInfoModalProps {
  walletError: WalletError;
  switchToPolygon: () => void;
}

const WalletInfoModal: FC<WalletInfoModalProps> = ({
  walletError,
  switchToPolygon,
}) => {
  return (
    <div className="z-[2000] flex flex-col items-center justify-center">
      {walletError && (
        <Dialog.Title as="h2" className="text-xl font-semibold">
          {walletError != "loading" ? "Wallet Error" : "Loading"}
        </Dialog.Title>
      )}

      {!walletError && <Spinner />}

      {walletError == "loading" && (
        <Dialog.Description className="mt-3 text-center capitalize">
          If You See A Metamask Popup, Please Accept That, That'll be needed to
          mint your NFT
        </Dialog.Description>
      )}

      {walletError == "wrong_network" && (
        <>
          <Dialog.Description className="mt-3 text-center capitalize">
            Your wallet is connected to a different network, please connect your
            wallet to the polygon mumbai testnet
          </Dialog.Description>

          <button
            className="mt-3 w-full rounded border border-gray-200 py-2 px-4 font-medium"
            onClick={switchToPolygon}
          >
            Switch Network
          </button>
        </>
      )}
    </div>
  );
};

export default WalletInfoModal;
