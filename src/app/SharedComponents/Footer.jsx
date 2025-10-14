"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const pathName = usePathname();
  if (pathName.includes("dashboard")) {
    return <></>;
  }

  return (
    <footer className="mx-auto mt-10 max-w-7xl bg-base-200 text-base-content p-10 rounded">
      <div className="flex flex-col sm:flex-row justify-between items-start space-y-8 sm:space-y-0">
        {/* Left Section: Logo and Description */}
        <div className="flex flex-col text-center sm:text-left items-center sm:items-start flex-1">
          <Image
            src="https://i.ibb.co.com/z82hFLr/LOGO.jpg"
            alt="Logo"
            height={80}
            width={80}
          />
          <p className=" mt-4">
            <strong>Classy Touch</strong> - Your destination for the latest
            fashion trends!
          </p>
          <p>
            20, Udayan School road, Dakkhin Khan, Dhaka-1230, Dhaka, Bangladesh
          </p>
          <p>+880 1601-828841</p>
          <p>classytouch387@gmail.com</p>
        </div>

        {/* Center Section: Useful Links */}
        <nav className="flex flex-col w-full items-center flex-1 text-center">
          <h3 className="font-bold mb-2">Useful Links</h3>
          <div className="flex flex-col items-center gap-2">
            <a className="link link-hover" href="/about">
              About us
            </a>
            <a className="link link-hover" href="/privacy-policy">
              Privacy Policy
            </a>
            <a className="link link-hover" href="/terms">
              Terms and Conditions
            </a>
          </div>
        </nav>

        {/* Right Section: Social Media Icons */}
        <div className="flex flex-col w-full items-center flex-1 text-center">
          <h3 className="font-bold mb-2">Follow Us</h3>
          <div className="flex justify-center gap-4">
            <a
              href="https://web.facebook.com/Classy.Touch.official?mibextid=ZbWKwL&_rdc=1&_rdr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.instagram.com/class.ytouch/?igsh=cWhvMDNmMHN5aDlp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Divider and Copyright */}
      <hr id="footer-divider" className="my-8 border-gray-300" />
      <div className="text-center">
        <p>
          &copy; {new Date().getFullYear()} - All rights reserved by Classy
          Touch - Designed and Developed by -{" "}
          <a
            className="text-blue-500 underline"
            target="_blank"
            href="https://mahmud-dev.netlify.app/"
          >
            Mahmud
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
