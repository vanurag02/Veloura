import React from "react";
import NewsLetter from "../components/NewsLetter";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 md:pt-10 md:pb-0 border-t border-gray-300">
      {/* =============== 1. PAGE TITLE =============== */}
      <p className="text-[16px] font-semibold tracking-wider uppercase text-gray-400 mb-10">
        Contact Us
      </p>

      {/* =============== 2. MAIN SECTION (IMAGE + CONTACT INFO) - TWO COLUMN RESPONSIVE LAYOUT =============== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
        {/* ================= IMAGE ================= */}
        <img
          src="/images/contact_img.png"
          alt="Contact Clothify"
          className="w-full object-cover"
        />

        {/* ================= CONTACT INFO ================= */}
        <div className="flex flex-col gap-8">
          {/* -------- STORE DETAILS -------- */}
          <div>
            <p className="text-xl font-medium text-black mb-4">Our Store</p>

            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              54, MG Road, Koregaon Park <br />
              Pune, Maharashtra — 411001 <br />
              India
            </p>
          </div>

          {/* DIVIDER */}
          <div className="w-10 h-px bg-gray-200" />

          {/* -------- CONTACT DETAILS -------- */}
          <div>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Tel: +91 98765 43210 <br />
              Email: contact@veloura.com
            </p>
          </div>

          {/* DIVIDER */}
          <div className="w-10 h-px bg-gray-200" />

          {/* -------- CAREERS SECTION -------- */}
          <div>
            <p className="text-xl font-medium text-black mb-4">
              Careers at Veloura
            </p>

            <p className="text-sm text-gray-500 leading-relaxed font-medium mb-6">
              We’re looking for driven individuals who value creativity,
              quality, and attention to detail. Be part of Veloura and help us
              redefine modern fashion retail.
            </p>

            {/* CTA BUTTON */}
            <a
              href="mailto:careers@clothify.com"
              className="bg-white text-black text-[12px] border hover:bg-black hover:text-white font-medium tracking-[0.14em] uppercase px-7 py-3 transition-all duration-200 inline-block"
            >
              Explore Jobs
            </a>
          </div>
        </div>
      </div>

      {/* =============== 3. NEWSLETTER SECTION (REUSABLE COMPONENT) =============== */}
      <NewsLetter />
    </div>
  );
};

export default Contact;

/* =========================================================
   COMPONENT SUMMARY

   1. THIS COMPONENT REPRESENTS THE CONTACT PAGE.

   2. MAIN SECTIONS:
      - PAGE TITLE
      - IMAGE + CONTACT INFORMATION
      - CAREERS SECTION
      - NEWSLETTER COMPONENT

   3. CORE FUNCTIONALITY:
      - DISPLAYS STORE DETAILS (ADDRESS)
      - DISPLAYS CONTACT INFO (PHONE, EMAIL)
      - PROVIDES CAREERS CTA (EMAIL LINK)

   4. UI STRUCTURE:
      - RESPONSIVE GRID LAYOUT
      - VISUAL DIVIDERS FOR CLEAN SEPARATION
      - CONSISTENT TYPOGRAPHY

   5. REUSABILITY:
      - NEWSLETTER COMPONENT ADDED FOR ENGAGEMENT

   6. IMPROVEMENT NOTES:
      - FIX EMAIL MISMATCH (veloura vs clothify)
      - ADD IMAGE FALLBACK
      - ADD GOOGLE MAP EMBED (HIGH VALUE IMPROVEMENT)

========================================================= */
