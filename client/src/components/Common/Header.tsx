import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";

const Header = () => {
  const router = useRouter();

  const isDashboard = router.pathname === "/dashboard";

  return (
    <>
      <Link href="/">
        <h1 className="cursor-pointer select-none text-5xl font-bold">
          NFT Pen
        </h1>
      </Link>

      <div className="mt-5 flex space-x-3 from-teal-700 via-red-600 to-zinc-50">
        {!isDashboard ? (
          <>
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Login With Google
            </Button>
            <Button onClick={() => {}}>NFT Collection</Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Log Out
            </Button>
            <Button onClick={() => {}}>Minted Pens</Button>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
