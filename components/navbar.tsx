import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className=" h-20 bg-black/90 text-white flex justify-between items-center px-10">
      <div>
        <h1>Logo</h1>
      </div>
      <div className=" flex gap-x-10">
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>About</Link>
        <Link href={"/"}>Privacy Policy</Link>
      </div>
      <button className=" hover:bg-slate-800 p-2 rounded flex items-center gap-x-1">
        <Github className=" text-white" />
        <span>Github</span>
      </button>
    </div>
  );
};

export default Navbar;
