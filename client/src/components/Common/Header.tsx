import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal from "./Modal";
import MintedPensModal from "components/Dashboard/MintedPensModal";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const isDashboard = router.pathname === "/dashboard";

  const [isMintedPensModalOpen, setIsMintedPensModalOpen] = useState(false);

  return (
    <>
      <Link href="/">
        <h1 className="cursor-pointer select-none text-5xl font-bold">
          NFT Pen
        </h1>
      </Link>

      <Modal
        isOpen={isMintedPensModalOpen}
        setIsOpen={setIsMintedPensModalOpen}
      >
        <MintedPensModal />
      </Modal>

      <div className="mt-5 flex space-x-3 from-teal-700 via-red-600 to-zinc-50">
        {!isDashboard ? (
          <>
            {session ? (
              <Button
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                Go To Dashboard
              </Button>
            ) : (
              <Button
                onClick={() => {
                  signIn("google", {
                    callbackUrl: `${window.location.origin}/dashboard`,
                  });
                }}
              >
                Login With Google
              </Button>
            )}
            <Button onClick={() => {}}>NFT Collection</Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                signOut({
                  callbackUrl: `${window.location.origin}`,
                });
              }}
            >
              Log Out
            </Button>
            <Button
              onClick={() => {
                setIsMintedPensModalOpen((prevState) => !prevState);
              }}
            >
              Minted Pens
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
