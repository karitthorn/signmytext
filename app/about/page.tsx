
"use client";

import { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Footer from "../components/footer";
import Link from "next/link";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [connect, setConnect] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [balance, setBalance] = useState("");
  const failMessage = "Unable to connect (recheck install Metamask)";
  const susMessage = "เชื่อมต่อสำเร็จ🎉";

  const connectWallet = async () => {
    try {
      const providerOptions = {};
      const web3Modal = new Web3Modal({
        cacheProvider: true, //เปิดไว้ให้จำการใช้ครั้งก่อน
        providerOptions,
      });
      
      const provider = await web3Modal.connect();
      const ethersProvider = new ethers.BrowserProvider(provider); // Updated for ethers v6
      const accounts = await ethersProvider.listAccounts(); //คืนค่าเป็น array
      setCurrentAccount(accounts[0].address); // maybe eth
      setConnect(true);
      const balance = await ethersProvider.getBalance(accounts[0].address);
      setBalance(ethers.formatEther(balance)); // Updated usage of formatEther
      console.log(currentAccount);
    } catch (error) {
      console.error(failMessage, error);
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-gradient-to-r from-cyan-200 to-blue-300 ">
        {/* Navbar Start */}

        <nav className=" border-gray-200">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                SignMytext
              </span>
            </Link>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button
                onClick={connectWallet}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                {connect ? susMessage : "Connect MetaMask"}
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-cta"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-gray-900 md:hover:text-blue-700"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 md:p-0 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Navbar end */}
        <div className="flex justify-center w-full">
        <div className="md:m-10 block max-w-lm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 m-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  About
                </h5>
                <p className="text-sm text-gray-700">SignMytext เป็นเพียง Project เพื่อการศึกษาเท่านั้นการกระทำในเว็ปนี้ไม่รับผิดชอบทุกกรณี{" "}<br/>
                ท่านสามารถตรวจสอบโค้ดได้ใน Github <br/>
                การลงทุนมีความเสี่ยง ท่านอาจจะสูญเสียเงินได้ทั้งจำนวน
                </p>
              </div>
              </div>

        {/* footer */}
         <div className="sticky bottom-10 md:pl-36 md:pr-36 mt-96 ">
          <Footer />
        </div>
 
      </div>

              

      
    </>
  );
}
