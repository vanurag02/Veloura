import React from "react";
import NewsLetter from "../components/NewsLetter";

const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 md:pt-10 md:pb-0">
      {/* Title */}
      <p className="text-[16px] font-semibold tracking-wider uppercase text-gray-600 mb-10">
        Contact Us
      </p>

      {/* Split — Image + Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
        {/* Image */}
        <img
          src="/images/contact_img.png"
          alt="Contact Clothify"
          className="w-full object-cover"
        />

        {/* Info */}
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-xl font-medium uppercase text-black mb-4">
              Our Store
            </p>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              54, MG Road, Koregaon Park <br />
              Pune, Maharashtra — 411001 <br />
              India
            </p>
          </div>

          <div className="w-10 h-px bg-gray-200" />

          <div>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Tel: +91 98765 43210 <br />
              Email: contact@clothify.com
            </p>
          </div>

          <div className="w-10 h-px bg-gray-200" />

          <div>
            <p className="text-xl font-medium text-black mb-4">
              Careers at Clothify
            </p>
            <p className="text-sm text-gray-500 leading-relaxed font-medium mb-6">
              We're always on the lookout for talented, passionate people. If
              you love fashion and want to be part of something meaningful, we'd
              love to hear from you.
            </p>
            <a
              href="mailto:careers@clothify.com"
              className="bg-white text-black text-[12px] border hover:bg-black hover:text-white font-medium tracking-[0.14em] uppercase px-7 py-3 transition-all ease-in-out duration-200 inline-block"
            >
              Explore Jobs
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsLetter />
    </div>
  );
};

export default Contact;
