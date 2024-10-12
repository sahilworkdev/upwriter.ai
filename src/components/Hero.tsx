import React from "react";
import Image from "next/image";
import heroImg1 from "../../public/images/bg-images/hero-image-1.png"

const Hero = () => {
  return (
    <div className="container-wrapper ">
      <section className="content-container  py-20">
        <h1 className=" text-6xl md:text-8xl lg:text-9xl md:text-start text-center font-bold">
          <span className="leading-8">
            Best <span className="text-green-500">Writing</span>
            <br /> Assistant Software
          </span>
          <p className=" mt-4 text-sm font-thin tracking-widest">
            Much more than those repetitive basic AI copywriter.
          </p>
        </h1>
      </section>
      <section className=" content-container flex  justify-around space-x-2 py-10">
        <div className=" p-8 w-1/2 rounded-3xl text-center relative">
          <Image
            src={heroImg1}
            alt="Description of the image"
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
          />
          <div>

          <p className="text-2xl font-bold">80k</p>
          <p className="text-4xl font-bold mt-2">97</p>
          <p className="mt-4">We</p>
          <p className="mt-2">BUXA AI</p>
          </div>
        </div>
        <div className="bg-green-500 p-8 w-1/3 rounded-3xl text-center relative">
          <p className="text-2xl font-bold">S</p>
          <p className="text-4xl font-bold mt-2">94</p>
          <p className="mt-4">S</p>
          <img
            src="https://placehold.co/200x100"
            alt="Graph showing system activity"
            className="mt-4 mx-auto"
          />
          {/* <div className="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-transparent border-l-[50px] border-l-green-500"></div> */}
        </div>
      </section>
      <div className="content-container flex gap-8 justify-between">
        <h1>logoImg 1</h1>
        <h1>logoImg 2</h1>
        <h1>logoImg 3</h1>
        <h1>logoImg 4</h1>
      </div>
    </div>
  );
};

export default Hero;
