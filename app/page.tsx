"use client";

import { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Footer from "./components/footer";
import Link from "next/link";
import { verifyMessage } from "ethers"; // Ensure Wallet and verifyMessage are imported

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [connect, setConnect] = useState(false);
  const [balance, setBalance] = useState("");
  const [message, setMessage] = useState("");
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
    } catch (error) {
      console.error(failMessage, error);
      alert("เชื่อมต่อไม่สำเร็จ ❌");
    }
  };

  const signmytext = async () => {
    // Ensure the wallet is connected
    if (!currentAccount) {
      alert("กรุณาเชื่อมต่อ wallet");
      return;
    }

    try {
      // Ensure Ethereum provider exists
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return;
      }

      // Create an ethers provider from MetaMask's injected provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();

      const recoveredAddress = verifyMessage(message, signature);
      const isValid = recoveredAddress === address;

      console.log(`Message is valid: ${isValid}`);
      alert(`✨Signed สำเร็จ! Signature: ${signature}`);
    } catch (error) {
      console.log("Error signing message:", error);
      alert("ทำรายการไม่สำเร็จ");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-cyan-100 to-blue-200">
      {/* Navbar Start */}

      <nav className=" border-gray-200">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
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
                    className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    href="/about"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Navbar end */}

        <div className="flex-grow flex flex-col items-center">
          {/* header */}
          <div className="flex justify-center flex-col items-center w-full">
            <h1 className="mt-20 mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Sign
              </span>{" "}
              Mytext
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl">
              ลอง Sign บางอย่างสิ!!!
            </p>
          </div>

          {/* Content */}
          <div className="flex justify-center md:flex-row flex-col w-full items-center mt-10">
            {connect ? (
              <>
                <div className="md:mr-10 block max-w-lm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 m-10 md:m-0">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    Address
                  </h5>
                  <p className="text-sm text-gray-700">{currentAccount} </p>
                </div>
                <div className="mt-10 md:mt-0 w-64 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    ยอดเงินคงเหลือ
                  </h5>
                  <p className="font-bold text-gray-700">{balance} ETH</p>
                </div>
              </>
            ) : (
              <p className="text-red-500">กรุณาเชื่อมต่อ MetaMask ❌</p>
            )}
          </div>

          <div className="flex w-full justify-center mt-10 ">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
              <form className="space-y-6" action="#">
                <h5 className="text-xl font-medium text-gray-900">Sign text</h5>
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    ข้อความของคุณ
                  </label>
                  <input
                    id="text"
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Hello world"
                    required
                  />
                </div>
                <button
                  onClick={signmytext}
                  type="button"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  SignNow
                </button>
                <div className="text-sm font-medium text-gray-500">
                  เป็นเพียง Project เพื่อการศึกษาเท่านั้น ไม่รับผิดชอบทุกกรณี{" "}
                  <a href="/about" className="text-blue-700 hover:underline">
                    อ่านเพิ่มเติม
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className=" md:pl-24 md:pr-24">
          <Footer />
        </div>
      </div>
    </>
  );
}
