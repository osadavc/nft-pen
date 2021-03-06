import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import BgGradients from "../components/Common/BgGradients";
import Footer from "../components/Common/Footer";
import Header from "../components/Common/Header";
import Intro from "../components/Home/Intro";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center px-3 pt-8 capitalize">
      <BgGradients />
      <div className="z-50 flex flex-col items-center">
        <Header />
        <Intro />
        <Footer />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

export default Home;
