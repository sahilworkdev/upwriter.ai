import React from "react";

function Features() {
  return (
    <div className="container-wrapper bg-[--primary-color-blue]">
      <section className="content-container flex justify-between py-20">
        <div className="w-2/3 space-y-12">
          <h2 className="text-5xl md:text-7xl w-10/12 font-bold">
            Save Your Time,
            <br /> Your Money,
            <br /> Elevate your Content
          </h2>
          <p className="mt-4 w-full text-balance md:w-3/4">
            Experience the simplicity of writing, powered by BUXA AI. <br />
            Achieve improved results and enhance your writing assurance,
            regardless of your writing purpose: inform, persuade, educating,
            entertaining, or self-expression!
          </p>
          <button className="bg-white text-black px-4 py-2 rounded-md mt-4">
            Learn more
          </button>
        </div>
        <div className="w-1/2">
          <img className="sticky top-0"
            src="https://placehold.co/500x500"
            alt="Graph showing system activity"
          />
        </div>
      </section>
    </div>
  );
}

export default Features;
