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
    }, 1000);

    // Redirect after countdown reaches 0
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 10000);

    // Cleanup both timers if the component unmounts
    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="w-full h-full relative flex flex-row justify-center pt-10">
      <div className="flex flex-col items-center overflow-y-scroll overflow-x-hidden overflow-hidden-scrollable px-3 max-w-[100%] w-[100%]">
        <div className="w-full bg-white  p-3">
          <div className="text-2xl text-center w-full font-medium pb-5">
            Payment Successful
          </div>
        </div>
        <div>
          <Image
            src="https://www.pngall.com/wp-content/uploads/12/Green-Check-PNG-Images-HD.png"
            alt="Success"
            width={150}
            height={150}
          />
        </div>

        <div className="flex flex-col w-full gap-2 sm:w-[100%] bg-white  p-5 rounded">
          <div className="text-center text-gray-800 ">
            Redirecting in {countdown} seconds...
          </div>
          <Link href="/">
            <div className="w-full flex flex-row justify-center items-center gap-2 bg-primary  text-light-800  p-3 rounded">
              <div>Click here to go now</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;