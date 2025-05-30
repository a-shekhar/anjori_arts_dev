import React, { useState, useEffect } from "react";
import { Footprints, Users, Package } from "lucide-react";


const Footer = () => {
     const [visitorCount, setVisitorCount] = useState(0);
     const [activeUsersCount, setActiveUsersCount] = useState(0);

    /* useEffect(() => {
         fetch('/analytics/unique-visitors')
           .then(res => res.json())
           .then(result => {
             if (result && result.success && result.data != null) {
               setVisitorCount(result.data);
             } else {
               setVisitorCount(0);
             }
           })
           .catch(() => setVisitorCount(0));
       }, []); */

   useEffect(() => {
            fetch('/analytics/total-visitors')
              .then(res => res.json())
              .then(result => {
                if (result && result.success && result.data != null) {
                  setVisitorCount(result.data);
                } else {
                  setVisitorCount(0);
                }
              })
              .catch(() => setVisitorCount(0));
          }, []);

   useEffect(() => {
     fetch('/analytics/active-users')
       .then(res => res.json())
       .then(result => {
         if (result && result.success && result.data != null) {
           setActiveUsersCount(result.data);
         } else {
           setActiveUsersCount(0);
         }
       })
       .catch(() => setActiveUsersCount(0));
   }, []);



  return (
    <footer className="bg-[#0b1120] text-white py-6 px-4 md:px-8 text-sm">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">

        {/* Stats - Top on mobile, right on desktop */}
        <div className="self-start text-center md:text-right space-y-2 order-1 md:order-3">
          <p className="flex items-center justify-center md:justify-end gap-2 text-purple-300">
            <Footprints size={16} className="animate-pulse" />
             Visitors:  {visitorCount !== null ? visitorCount : 0}
          </p>
          <p className="flex items-center justify-center md:justify-end gap-2 text-purple-300">
            <Users size={16} className="animate-bounce" />
            Active Users: {activeUsersCount !== null ? activeUsersCount : 0}
          </p>
          <p className="flex items-center justify-center md:justify-end gap-2 text-yellow-400">
            <Package size={16} className="animate-pulse" />
            Orders Delivered: 0
          </p>
        </div>

        {/* Contact - Middle on mobile, left on desktop */}
        <div className="self-start text-center md:text-left order-2 md:order-1">
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
              href="tel:+918051960916"
              className="text-blue-400 hover:underline"
            >
              +91 80519 60916
            </a>
          </p>

          <p>
                {" "}
               <a href="/about-us" className="text-blue-400 hover:underline">
                    About Us
                  </a>
          </p>

        </div>

        {/* Legal + Version - Bottom on mobile, center on desktop */}
        <div className="self-start text-center order-3 md:order-2">
          <p className="mb-1">© 2025 Anjori Arts. All rights reserved.</p>
          <p className="mb-2">
           🛠️ App <span className="font-semibold">Version: 0.7</span>
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
