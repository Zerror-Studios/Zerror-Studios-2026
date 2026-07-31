import React from 'react';

const Slide17 = () => {
  return (
    <section className="h-screen w-full snap-start p-1 relative">
      <div className="w-full p-5 md:p-10 h-full bg-black flex flex-col justify-center text-white">
        <div className="w-[85%] space-y-6">
          <h2 data-para-effect className="text-7xl md:text-8xl primary-font leading-tight">
            Synthesis: <span className="opacity-50">Why This <br /> Matters</span>
          </h2>
          
          <div data-para-effect className="text-3xl leading-tight opacity-90">
            <p>We build systems designed for your business.</p>
            <p>Not websites forced into templates.</p>
          </div>

          <p data-para-effect className="text-xl leading-tight opacity-70  max-w-5xl">
            These aren't template-based website projects. They're custom-built infrastructure projects. RPSG Media needed custom websites plus custom CMS reflecting three distinct brands. Manifest needed intelligent migration preserving five years of value. Salman Khan needed timeless prestige design, not trend-following. Deveshe needed infrastructure designed for her business model, not forced into generic platforms. In each case, we rejected templates and built exactly what that business needed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Slide17;


