
"use client";

import React, { useState } from "react";
import { HiRefresh } from "react-icons/hi";

interface PaymentModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isModalOpen,
  toggleModal,
}) => {
  const [credits, setCredits] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={toggleModal}
          className="absolute top-4 right-4 bg-[#6366f1] rounded-full px-2 text-white font-medium hover:bg-indigo-600"
        >
          {/* <FaRegTimesCircle /> */} X
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Buy Credits
        </h2>

        {/* Credit Balance */}
        <div className="text-gray-700 mb-6">
          <div>
            <p className="text-sm font-medium">Credit Balance</p>
            <p className="text-2xl font-bold text-gray-900">
              {credits.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <input
              type="number"
              placeholder="No. of credits"
              value={credits}
              onChange={(e) => setCredits(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-300 rounded-lg outline-none "
            />
          </div>

          <button className="text-indigo-500 flex items-center mx-auto z-10 cursor-pointer  ">
            <HiRefresh
              className="-my-8 border-2 border-gray-300 rounded-full cursor-pointer"
              size={22}
            />
          </button>

          <div className="flex items-center justify-between border-2 border-gray-300 p-3 rounded-lg">
            <input
              type="number"
              placeholder="Total Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-6 mx-8"></div>

        {/* Payment Options */}
        <div className="space-y-2">
          <label className="flex items-center justify-between space-x-2 cursor-pointer border p-1.5 rounded">
            <img
              src="https://razorpay.com/newsroom-content/uploads/2020/12/output-onlinepngtools-1-1.png"
              alt="Razorpay"
              className="h-6"
            />
            <input
              type="radio"
              name="payment"
              className="form-radio text-[#6366f1]"
            />
          </label>

          <label className="flex items-center justify-between space-x-2 cursor-pointer border p-1.5 rounded">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/05/Visa-Logo.png"
              alt="Visa"
              className="h-6"
            />
            <input
              type="radio"
              name="payment"
              className="form-radio text-[#6366f1]"
            />
          </label>

          <label className="flex items-center justify-between space-x-2 cursor-pointer border p-1.5 rounded">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/2560px-UPI-Logo-vector.svg.png"
              alt="UPI"
              className="h-6"
            />
            <input
              type="radio"
              name="payment"
              className="form-radio text-[#6366f1]"
            />
          </label>
        </div>

        {/* Buy Credits Button */}
        <div className="mt-6">
          <button
            type="button"
            className="w-full py-3 bg-[#6366f1] text-white font-semibold rounded-lg hover:bg-indigo-600 transition"
          >
            Buy Credits
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;