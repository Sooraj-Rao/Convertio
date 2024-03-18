import Dropzone from "@/components/dropzone";
import { HomeData } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <div className="sm:space-y-16 space-y-4 pb-8">
        <div className="space-y-6 p-2">
          <h1 className=" text-2xl md:text-5xl font-medium text-center">
            {HomeData.title}
          </h1>
          <p className="text-gray-700 sm:block hidden text-md md:text-lg text-center md:px-24 xl:px-44 2xl:px-52">
            {HomeData.description}
          </p>
          <p className="text-gray-700 sm:hidden text-xs  text-center">
            {HomeData.Mobdescription}
          </p>
        </div>

        <Dropzone />
      </div>
      <footer className="sm:hidden fixed   bottom-2 left-1/2 -translate-x-1/2 text-xs font-medium sm:text-base">
        <h1>
          Developed by
          <Link
            href={"https://sooraj-rao.vercel.app"}
            className=" pl-1 hover:underline text-blue-700"
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
