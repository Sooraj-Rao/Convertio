import { ExternalLink, Github, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GrMenu } from "react-icons/gr";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/logo2.png";
import { MdDeveloperBoard } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="  w-full bg-white/90  shadow-[0px_0px_10px_-4px] shadow-black py-1 flex justify-between mb-10 items-center sm:px-10 px-3">
      <Link className="   " href={"/"}>
        <Image alt="" src={logo} height={200} width={200} />
      </Link>
      <div className=" md:flex hidden gap-x-10 ">
        <Navigtion mobile={false} />
      </div>
      <div className="  flex gap-x-4">
        <Link href={"https://github.com/Sooraj-Rao/Convertio"} target="_blank">
          <Button
            variant="link"
            className=" py-2 bg-slate-200  px-4 rounded md:flex hidden items-center gap-x-1"
          >
            <Github />
            <span>Github</span>
          </Button>
        </Link>
        <Link href={"https://sooraj-rao.vercel.app"} target="_blank">
          <Button
            variant="link"
            className=" py-2  bg-slate-200 px-4 rounded md:flex hidden items-center gap-x-1"
          >
            {/* <SquareArrowOutUpRight /> */}
            <ExternalLink />
            <span>Developer</span>
          </Button>
        </Link>
      </div>
      <Sheet>
        <SheetTrigger className="block md:hidden p-3 ">
          <span className="text-2xl">
            <GrMenu />
          </span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <div>
              <Navigtion mobile={true} />
            </div>
          </SheetHeader>
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;

export const Navigtion = ({ mobile }: any) => {
  return (
    <div className={`flex ${mobile && "flex-col"} `}>
      <Link href={"/"}>
        <Button variant="link">Home</Button>
      </Link>
      <Link href={"/about"}>
        <Button variant="link">About</Button>
      </Link>
      <Link href={"/privacy-policy"}>
        <Button variant="link">Privacy Policy</Button>
      </Link>
    </div>
  );
};
