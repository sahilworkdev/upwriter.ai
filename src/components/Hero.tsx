import React from "react";
import Image from "next/image";
// import heroImg1 from "../../public/images/bg-images/hero-image-1.png";
import lex from "../../public/images/brandLogos/lex.svg";
import astrix from "../../public/images/brandLogos/astrix.svg";
import btc from "../../public/images/brandLogos/btc.svg";
import DownArrow from "../../public/images/DownArrow.svg";
import Hero2 from "../../public/images/hero2.svg";
import Hero1 from "../../public/images/hero1.svg";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="container-wrapper ">
      <section className="content-container  py-20">
        <h1 className=" text-6xl md:text-[5.34rem] lg:text-9xl md:text-start text-center font-bold">
          <span className="leading-8">
            Best <span className="text-green-500">Writing</span> Assistant
            Software
          </span>
          <p className=" mt-4 text-sm font-thin tracking-widest">
            Much more than those repetitive basic AI copywriter.
          </p>
        </h1>
      </section>
      <section className="content-container flex gap-4 sm:gap-10 justify-center flex-row  items-center">
        <div className="max-w-[90%]">
          <Image
            src={Hero1}
            alt="Description of the image"
            // objectFit="cover"
            height={400}
          />
        </div>
        <div className="relative">
          <Image
            src={Hero2}
            alt="Graph showing system activity"
            className="mx-auto"
            // objectFit="contain"
            // height={220}
            width={400}
          />
          <div className="h-[25%] w-[25%] flex justify-end items-start absolute object-contain top-0 right-0">
            <Image
              src={DownArrow}
              alt="Graph showing system activity"
              className="w-full"
              objectFit="contain"
              // height={120}
              // width={110}
            />
          </div>
          {/* <div className="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-transparent border-l-[50px] border-l-green-500"></div> */}
        </div>
      </section>
      <div className="content-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center items-center pt-6">
        <Link href="https://app.astrix.live/" target="_blank">
          <Image src={astrix} alt="astrix logo" width={190} height={190} />
        </Link>
        <Link href="https://btcwires.com/" target="_blank">
          <Image src={btc} alt="btc logo" width={190} height={190} />
        </Link>
        <Link href="https://lex.live/" target="_blank">
          <Image src={lex} alt="lexai logo" width={190} height={190} />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
