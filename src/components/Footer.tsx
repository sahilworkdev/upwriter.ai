import React from "react";
import Logo from "../../public/images/Buxa logo 2.svg";
import Image from "next/image";
import Link from "next/link";
import Instagram from "../../public/images/social-media-logos/Instagram.svg";
import Twitter from "../../public/images/social-media-logos/Twitter.svg";
import Facebook from "../../public/images/social-media-logos/Facebook.svg";
// import Linkedin from "../../public/images/social-media-logos/Linkedin.svg";
import Youtube from "../../public/images/social-media-logos/Youtube.svg";

const socialIcons = [
  { name: "Instagram", link: "", src: Instagram },
  { name: "Twitter", link: "", src: Twitter },
  { name: "Facebook", link: "", src: Facebook },
  // { name: "Linkedin", link: "", src: Linkedin },
  { name: "Youtube", link: "", src: Youtube },
];

const quickLinks = [
  { item: "Support", link: "/" },
  { item: "Terms", link: "/" },
  { item: "Tutorials", link: "/" },
  { item: "Affiliates", link: "/" },
];

const company = [
  {item:"About", link:"/"},
  {item:"Privacy Policy", link:"/"},
  {item:"Careers", link:"/"}
]

const Footer = () => {
  return (
    <div className="container-wrapper py-10  ">
      <footer className=" bg-gray-900 content-container  rounded-xl text-white p-10 mb-10">
        <div className=" mx-auto md:flex   ">
          <div className="mb-10 md:mb-0 md:w-1/2">
            <div className="flex flex-col  justify-center items-center md:items-start">
              <div className="text-2xl font-bold text-green-500">
                <Link className="flex" href="/">
                  <Image src={Logo} width={100} height={100} alt="" />
                </Link>
              </div>
              <p className="mt-4  md:w-3/4 opacity-50">
                BUXA AI builds AI writing software with love. Our AI writing app
                is a team of expert engineers, designers and also thought leader
                students from all around the world.
              </p>
            </div>
          </div>
          <div className="flex space-x-8 mb-8 md:mb-2 px-4">
            <div className="md:w-1/5 flex flex-col items-center">
              <h3 className="font-bold text-xl">Quick Links</h3>
              <ul className="mt-2 space-y-4 ">
                {quickLinks.map((item) => (
                  <li key={item.link}>
                    <Link href={item.link}  className="text-white">
                      {item.item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/5 flex flex-col items-center">
              <h3 className="font-bold text-xl">Company</h3>
              <ul className="mt-2 space-y-2">
                {
                  company.map((item)=>(
                    <li key={item.link}>
                  <Link href={item.link}  className="text-white">
                    {item.item} 
                  </Link>
                </li>

                  ))
                }
              </ul>
            </div>
            <div className="w-1/2 md:w-3/5 ">
              <h3 className="font-bold text-xl ">Get It Free</h3>
              <p className="mt-2 opacity-50">
                Our Product is free to use. Get started now and experience the
                power of AI writing.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center md:justify-start items-center mb-10  gap-4">
          {socialIcons.map((icon) => {
            return (
              <Link href="icon.link" key={icon.link} className="text-white ml-4">
                <Image src={icon.src} width={20} height={20} alt={icon.name} />
              </Link>
            );
          })}
        </div>
        <div className="text-center w-5/6  md:w-full opacity-50"> 
          <p className="">
            Copyright © 2024 Buxa AI Inc. All rights reserved. The world's first AI
            writing app & keyboard powered by Open AI's API.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
