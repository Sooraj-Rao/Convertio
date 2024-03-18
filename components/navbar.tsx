"use client";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GrMenu } from "react-icons/gr";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/logo.png";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

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
      <Sheet open={isSidebarOpen}>
        <SheetTrigger onClick={toggleSidebar} className="block md:hidden p-3 ">
          <span className="text-2xl">
            <GrMenu />
          </span>
        </SheetTrigger>
        <SheetContent onClick={closeSidebar}>
          <SheetHeader>
            <SheetDescription>
              <Navigtion mobile={true} />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;

export const Navigtion = ({ mobile }: any) => {
  const path = usePathname();

  const ButtonLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Privacy-Policy",
      href: "/privacy-policy",
    },
  ];

  return (
    <div className={`flex ${mobile && "flex-col gap-y-3"} `}>
      {ButtonLinks?.map((item, i) => {
        const { title, href } = item;
        const isIndex = href == path;
        return (
          <Link key={i} href={href}>
            <Button
              className={` text-lg sm:text-sm ${isIndex ? "underline" : ""}`}
              variant="link"
            >
              {title}
            </Button>
          </Link>
        );
      })}
        <Link href={"https://sooraj-rao.vercel.app"} target="_blank">
          <Button
            variant="link"
            className=" py-2  bg-slate-200 px-4 rounded  sm:hidden items-center gap-x-1"
          >
            <ExternalLink />
            <span>Developer</span>
          </Button>
        </Link>
    </div>
  );
};
