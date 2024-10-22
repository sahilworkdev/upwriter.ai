import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div className="container-fluid">
      <div className="container-wrapper bg-[--primary-color-blue]">
        <section className="content-container  md:flex justify-between  py-10  relative">
          <div className=" space-y-12 w-5/6 md:w-1/2 m-auto   md:m-0">
            <h2 className="text-5xl md:text-7xl  font-bold">
              Meet Your AI Writing Assistant
            </h2>
            <img
              src="https://placehold.co/500x300"
              alt="Graph showing system activity"
              className="mt-4 mx-auto"
            />
          </div>
          <div className="w-5/6 md:w-1/2   p-8 m-auto flex flex-col justify-around items-center ">
            <div className="text-center md:text-left m-auto mb-8 w-2/3 ">
              <Link
                className="font-semibold text-xl hover:underline  mb-4"
                href="/features"
              >
                View All Features
              </Link>

              <p className=" w-5/6 text-center md:text-left md:w-2/3">
                An AI Writer for Students, CEOs, and Everyone in Between. The
                Best content writer for any Purpose. Buxa AI writes it.
              </p>
            </div>
            <div className=" space-y-6">
              <div className=" hover:bg-[#6f5dfa]  flex gap-12  rounded-xl p-6">
                {" "}
                <img
                  src="https://placehold.co/30x30"
                  alt="Graph showing system activity"
                />
                <span>
                  {" "}
                  <h1 className="font-semibold text-2xl">
                    Write A Story Script
                  </h1>
                  <p>Streamlining storyline through Buxa AI</p>
                </span>
              </div>
              <div className=" hover:bg-[#6f5dfa] flex gap-12 rounded-xl p-6">
                <img
                  src="https://placehold.co/30x30"
                  alt="Graph showing system activity"
                />
                <span>
                  <h1 className="font-semibold text-2xl">Write A Message</h1>
                  <p>Craft impactful auto-messages effortlessly</p>
                </span>
              </div>
              <div className=" hover:bg-[#6f5dfa] flex gap-12 rounded-xl p-6">
                {" "}
                <img
                  src="https://placehold.co/30x30"
                  alt="Graph showing system activity"
                />
                <span>
                  <h1 className="font-semibold text-2xl">
                    Write Advertisement Content
                  </h1>
                  <p>Effortlessly creating ads offers precisely</p>
                </span>
              </div>
            </div>
          </div>

          {/* <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[50px] border-b-transparent border-r-[50px] border-r-purple-600"></div> */}
        </section>
      </div>
    </div>
  );
};

export default About;
