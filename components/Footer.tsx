"use client";
import "@/styles/globals.css";
import { Button } from "@nextui-org/react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="pt-10 pb-2 mt-12 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left mb-4 md:mb-0 flex flex-col items-center">
            <Image
              className=""
              alt="Logo"
              height={40}
              src="/logo.png"
              width={150}
            />
            <h3 className="text-3xl text-white font-semibold  rock-salt-regular ">
              Lorem Ipsum
            </h3>
            <p className="text-md text-gray-400 medula-one-regular ">
              Innovative solutions for modern problems
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <a href="./destek" className="text-xl text-gray-400 hover:text-pink-400 transition-colors medula-one-regular">
              Destek
            </a>
            <a href="#services" className="text-xl text-gray-400 hover:text-pink-400 transition-colors medula-one-regular">
              Services
            </a>
            <a href="#contact" className="text-xl text-gray-400 hover:text-pink-400 transition-colors medula-one-regular">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <p className="text-lg text-gray-400 medula-one-regular">
            &copy; 2024 Lorem Ipsum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
