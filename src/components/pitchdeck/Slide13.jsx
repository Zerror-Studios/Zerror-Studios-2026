import React from 'react';

const Slide13 = () => {
  return (
    <section className="w-full h-full ">
      <div className="w-full p-5 md:p-10 h-full bg-black flex flex-col justify-center text-white">
        <div className="w-[85%] space-y-6">
          <h2 data-para-effect className="text-6xl primary-font leading-none">
            Synthesis: <span className="opacity-50">Why This <br /> Matters</span>
          </h2>

          <div data-para-effect className="text-2xl italic opacity-60 leading-tight">
            <p>We build systems designed for your business.</p>
            <p>Not websites forced into templates.</p>
          </div>

          <p data-para-effect className="  leading-tight opacity-70  max-w-3xl">
            These aren't template-based website projects. They're custom-built infrastructure projects. RPSG Media needed custom websites plus custom CMS reflecting three distinct brands. Manifest needed intelligent migration preserving five years of value. Salman Khan needed timeless prestige design, not trend-following. Deveshe needed infrastructure designed for her business model, not forced into generic platforms. In each case, we rejected templates and built exactly what that business needed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Slide13;
