"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BuyCreditsDropdown from "./BuyCreditsDropdown";
import { load } from "@cashfreepayments/cashfree-js";
import { enqueueSnackbar } from "notistack";
import { useSession } from "next-auth/react";

interface PaymentModalProps {
  creditBalance: number;
  isModalOpen: boolean;
  toggleModal: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  creditBalance,
  isModalOpen,
  toggleModal,
}) => {
  const [credits, setCredits] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [cashfree, setCashfree] = useState<any>(null);
  const [errors, setErrors] = useState<{ phone?: string; credits?: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: session } = useSession();

  const options = [1, 10, 25, 50, 100];

  useEffect(() => {
    const loadCashfree = async () => {
      const cashfreeInstance = await load({
        mode: "sandbox", // Switch to 'production' for production
      });
      setCashfree(cashfreeInstance);
    };
    loadCashfree();
  }, []);

  const validateInputs = () => {
    const newErrors: { phone?: string; credits?: string } = {};

    if (!credits) {
      newErrors.credits = "Please select the number of credits.";
    }

    if (paymentMethod === "cashfree") {
      if (!customerPhone) {
        newErrors.phone = "Please enter your phone number.";
      } else if (customerPhone.length !== 10) {
        newErrors.phone = "Please enter a valid 10-digit phone number.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    let result;

    if (paymentMethod === "cashfree") {
      try {
        const url =
          "https://0485-2401-4900-8841-8102-394c-7d29-4316-7a41.ngrok-free.app/user/cashfree";

        if (session?.user?.accessToken) {
          const accessToken = session?.user?.accessToken;

          const response = await axios.post(
            url,
            {
              amount,
              customerPhone,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          result = response?.data;
          console.log(result.data);
          initiateCashfreePayment(result.data);
        } else {
          setErrors({ credits: "User not authenticated" });
        }
      } catch (error) {
        setErrors({ credits: "Payment initiation failed. Please try again." });
        enqueueSnackbar("Payment failed. Please try again.", {
          variant: "warning",
        });
        // console.error("Payment failed", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const initiateCashfreePayment = (data: any) => {
    console.log("paymentttt");
    const checkoutOptions = {
      paymentSessionId: data?.sessionId,
      returnUrl: `https://0485-2401-4900-8841-8102-394c-7d29-4316-7a41.ngrok-free.app/user/status/${data?.orderId}`,
    };

    cashfree.checkout(checkoutOptions).then((result: any) => {
      if (result.status) {
        if (result.status === 200) {
          console.log("Payment successful, redirecting to localhost:3000");
          // window.location.href = "http://localhost:3000";
        } else if (result.error) {
          setErrors({ credits: result.error.message });
          console.log("Payment failed!");
        }
      } else {
        console.log("Unexpected response format", result);
      }
    });
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={toggleModal}
          className="absolute flex items-center justify-center top-4 right-4 bg-[#6366f1] rounded-full px-2 text-white font-medium hover:bg-indigo-600"
        >
          <span>x</span>
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Buy Credits
        </h2>

        {/* Credit Balance */}
        <div className="text-gray-700 mb-6">
          <div>
            <p className="text-sm font-medium">Credit Balance</p>
            <p className="text-2xl font-bold text-gray-900">{creditBalance}</p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <BuyCreditsDropdown
            options={options}
            onSelect={(option) => {
              setCredits(option);
              setAmount(option * 100);
              setErrors((prevErrors) => ({ ...prevErrors, credits: "" }));
            }}
          />
          {errors.credits && (
            <p className="text-red-500 text-sm">{errors.credits}</p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t my-6 mx-8"></div>

        {/* Payment Options */}
        <div className="space-y-2">
          <label className="flex items-center justify-between space-x-2 cursor-pointer border p-1.5 rounded">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStPSwjrCGLsxtGAtrogMziqQ-uSR0bqT7yFg&s"
              alt="Cashfree"
              className="h-6"
              width={80}
              height={20}
            />
            <input
              type="radio"
              name="payment"
              className="form-radio text-[#6366f1]"
              checked={paymentMethod === "cashfree"}
              onChange={() => setPaymentMethod("cashfree")}
            />
          </label>
        </div>

        {/* Mobile Number Input (conditional) */}
        {paymentMethod && (
          <div className="mt-4">
            <label
              htmlFor="customerPhone"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              id="customerPhone"
              type="text"
              placeholder="Enter your mobile number"
              value={customerPhone}
              onChange={(e) => {
                setCustomerPhone(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
              }}
              className={`w-full p-2 mt-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md outline-none`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
        )}

        {/* Buy Credits Button */}
        <div className="mt-6">
          <button
            type="button"
            className={`w-full py-3 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#6366f1] hover:bg-indigo-600"
            } text-white font-semibold rounded-lg transition`}
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Buy Credits"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
