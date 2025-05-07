import React from "react";
import { Footprints, Users, Package } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0b1120] text-white py-6 px-4 md:px-8 text-sm">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Contact - Left on all */}
        <div className="self-start order-1 md:order-2">
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:anjoriarts@gmail.com"
              className="text-blue-400 hover:underline"
            >
              anjoriarts@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:+919876543210"
              className="text-blue-400 hover:underline"
            >
              +91 98765 43210
            </a>
          </p>
        </div>

        {/* Stats - Middle on mobile, right on desktop */}
        <div className="self-start md:text-right space-y-2 order-1 md:order-3">
          <p className="flex items-center justify-start md:justify-end gap-2 text-purple-300">
            <Footprints size={16} className="animate-pulse" />
            Visitors: 1024
          </p>
          <p className="flex items-center justify-start md:justify-end gap-2 text-purple-300">
            <Users size={16} className="animate-bounce" />
            Active Users: 1
          </p>
          <p className="flex items-center justify-start md:justify-end gap-2 text-yellow-400">
            <Package size={16} className="animate-pulse" />
            Orders Delivered: 0
          </p>
        </div>

        {/* Version & Legal - Bottom on mobile, center on desktop */}
        <div className="self-start text-center order-3 md:order-2">
          <p className="mb-1">© 2025 Anjori Arts. All rights reserved.</p>
          <p className="mb-2">
            App <span className="font-semibold">Version: 0.1</span>
          </p>
          <div className="space-x-4">
            <a
              href="/terms"
              className="text-gray-400 hover:text-gray-300 underline"
            >
              Terms & Conditions
            </a>
            <a
              href="/privacy"
              className="text-gray-400 hover:text-gray-300 underline"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
