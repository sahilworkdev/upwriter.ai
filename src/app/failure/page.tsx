"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 10000);

    // Redirect after countdown reaches 0
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 15000);

    // Cleanup both timers if the component unmounts
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="w-full h-full relative flex flex-row justify-center pt-10">
      <div className="flex flex-col items-center overflow-y-scroll overflow-x-hidden overflow-hidden-scrollable px-3 max-w-[100%] w-[100%]">
        <div className="w-full bg-white p-3">
          <div className="text-2xl text-center w-full font-medium pb-2">
            Payment Not Successful
          </div>
          <div className="text-xl text-center w-full font-medium pb-2">
            Please try again later
          </div>
        </div>
        <div>
          <Image
            src="https://icon-library.com/images/failed-icon/failed-icon-7.jpg"
            alt="failure"
            width={150}
            height={150}
          />
        </div>
        <div className="flex flex-col w-full gap-2 sm:w-[100%] bg-white rounded">
          <div className="text-center text-gray-700 ">
            Redirecting in {countdown} seconds...
          </div>
          <Link href="/">
            <div className="w-full flex flex-row justify-center items-center gap-2 bg-primary p-3 rounded">
              <div>Click here to go now</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;