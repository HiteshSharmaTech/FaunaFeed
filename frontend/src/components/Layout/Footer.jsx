import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function ListItem({ to="#",text }) {
  return ( <li>
    <Link to={to} className="hover:text-green-600 hover:underline transition-colors">
      {text}
    </Link>
    </li>
  )
}

const Footer = () => {
  return (
    <div className="w-full">
      {/* First subsection with light green background */}
      <div className="bg-[#CEDDD1] px-8 py-7">
        <div className="max-w-6xl mx-auto">
          {/* Logo Section */}
          <Logo style={"mb-8"} extraStyle={"w-9 h-9"}/>

          {/* Four columns in same line */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">About</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <ListItem text={"Who we are"} to="/about"/>
                <ListItem text={"Our Story"} to="/about"/>
                <ListItem text={"Gallery"} to="/gallery"/>
              </ul>
            </div>

            {/* Service Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Service</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <ListItem text={"Nature"} to="/nature"/>
                <ListItem text={"Donation"} to="/donate"/>
                <ListItem text={"Action"} to="/action"/>
              </ul>
            </div>

            {/* Policies Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Policies</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <ListItem text={"Terms & Conditions"} to="/termsandconditions"/>
                <ListItem text={"Service"} to="/service"/>
                <ListItem text={"Destination"} to="/destination"/>
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Contact Info</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2 hover:text-green-600 cursor-pointer">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>Chicago, USA</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-green-600 cursor-pointer">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span>Greener@Gmail.Com</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-green-600 cursor-pointer">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span>5011515-5555</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second subsection with complementary green background */}
      <div className="bg-[#0a575e] px-8 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="text-white text-sm mb-4 md:mb-0">
           <Link to="/copyright" className="hover:underline"> © 2024 Ecology Copyright </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <Link
              to="https://www.facebook.com"
              className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors group"
            >
              <Facebook className="w-4 h-4 text-[#0A575E] group-hover:text-white" />
            </Link>

            <Link
              to="https://www.google.com"
              className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors group"
            >
              <span className="text-[#0A575E] group-hover:text-white font-bold text-xl">
                G
              </span>
            </Link>

            <Link
              to="https://instagram.com"
              className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors group"
            >
              <Instagram className="w-4 h-4 text-[#0A575E] group-hover:text-white" />
            </Link>

            <Link
              to="https://x.com"
              className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-[#24A3F1] transition-colors group"
            >
              <Twitter className="w-4 h-4 text-[#0A575E] group-hover:text-white" />
            </Link>

            <Link
              to="https://youtube.com"
              className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors group"
            >
              <Youtube className="w-4 h-4 text-[#0A575E] group-hover:text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
