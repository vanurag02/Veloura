import React from "react";

import NewsLetter from "../components/NewsLetter";

const values = [
  {
    number: "01",
    title: "Quality First",
    desc: "We source only the finest fabrics — Merino wool, organic cotton, and European linen — so every piece feels as good as it looks.",
  },
  {
    number: "02",
    title: "Timeless Design",
    desc: "Trends come and go. We design pieces that outlast the season — clean silhouettes and neutral palettes that work year after year.",
  },
  {
    number: "03",
    title: "Honest Pricing",
    desc: "No markups for the sake of it. You pay for the fabric, the craft, and the care — nothing else.",
  },
];

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 md:pt-10 md:pb-0">
      {/* Tag */}
      <p className="text-[16px] font-semibold tracking-wider uppercase text-gray-400 mb-10">
        Our Story
      </p>

      {/* Split — Image + Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-20">
        {/* Image */}
        <img
          src="/images/about_img.png"
          alt="About Clothify"
          className="w-full aspect-square object-cover"
        />

        {/* Text */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl font-normal text-gray-900 leading-tight">
            Clothing made with <em className="text-gray-400">intention,</em> not
            impulse.
          </h1>

          <div className="w-10 h-px bg-gray-300" />

          <p className="text text-gray-800 leading-relaxed font-light">
            Clothify was born from a simple frustration — too many clothes, not
            enough quality. We set out to build a brand that respects both the
            person wearing it and the craft behind it.
          </p>

          <p className="text text-gray-800 leading-relaxed font-light">
            Every piece we design starts with a question: will this still feel
            right five years from now? If the answer is yes, we make it. If not,
            we go back to the drawing board.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 border-t border-gray-200 pt-16 mb-20">
        {values.map((v) => (
          <div key={v.number}>
            <p className="text-6xl font-medium text-gray-300 mb-6">
              {v.number}
            </p>
            <p className="text-xl font-medium uppercase text-black mb-2">
              {v.title}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              {v.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <NewsLetter />
    </div>
  );
};

export default About;
