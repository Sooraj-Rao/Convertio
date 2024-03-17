import Dropzone from "@/components/dropzone";
import { HomeData, MobileHomeData } from "@/utils/helper";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <div className="sm:space-y-16 space-y-4 pb-8">
        <div className="space-y-6">
          <h1 className=" text-lg md:text-5xl font-medium text-center">
            {HomeData.title}
          </h1>
          <p className="text-gray-700 sm:block hidden text-md md:text-lg text-center md:px-24 xl:px-44 2xl:px-52">
            {HomeData.description}
          </p>
          <p className="sm:hidden  text-gray-700 text-sm  text-center ">
            {MobileHomeData.description}
          </p>
        </div>

        <Dropzone />
      </div>
      <footer className="sm:hidden fixed font-mono bottom-2 left-1/2 -translate-x-1/2 text-xs sm:text-base">
        <h1>
          Developed by
          <Link
            href={"https://sooraj-rao.vercel.app"}
            className=" pl-1 hover:underline text-blue-900"
            target="_blank"
          >
            Sooraj
          </Link>
        </h1>
      </footer>
    </div>
  );
};

export default Home;
