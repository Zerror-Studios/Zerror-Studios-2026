import React from 'react';

const Slide10 = () => {
  return (
    <section className="h-screen w-full snap-start flex flex-col justify-center px-10 md:px-24 bg-[#E5E5E5] text-blue-700 relative">

      <div className="w-full  space-y-4">

        {/* Block 1 */}
        <div className="bg-black/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
          <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font   flex items-center  w-32 shrink-0">1</div>
          <div className="w-64 shrink-0">
            <h3 data-para-effect className="text-3xl  primary-font">The Problem</h3>
          </div>
          <div className="flex-1 text-lg leading-tight space-y-4 ">
            <p data-para-effect>RPSG Media launched three international publishing brands in India, but standard WordPress templates couldn't support the scale, speed, or premium editorial experience required.</p>
            <p data-para-effect>While the backend infrastructure remained unified and scalable, every editorial workflow and frontend experience was tailored specifically to each publication's content style, audience, and publishing needs.</p>
          </div>
        </div>

        {/* Block 2 */}
        <div className="bg-black/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
          <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font w-32 flex items-center  shrink-0">2</div>
          <div className="w-64 shrink-0">
            <h3 data-para-effect className="text-3xl  primary-font">The Solution</h3>
          </div>
          <div className="flex-1 text-lg leading-tight space-y-4 ">
            <p data-para-effect>We designed and developed a completely custom CMS and custom built websites for The Hollywood Reporter, Esquire, and Robb Report.</p>
            <p data-para-effect>Each publication had entirely different operational needs from breaking news publishing to luxury product curation while still needing to maintain the prestige and identity of globally recognized media brands.</p>
          </div>
        </div>

        {/* Block 3 */}
        <div className="bg-black/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
          <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font w-32 flex items-center  shrink-0">3</div>
          <div className="w-64 shrink-0">
            <h3 data-para-effect className="text-3xl  primary-font">The Outcome</h3>
          </div>
          <div  className="flex-1 text-lg leading-tight space-y-4 ">
            <p data-para-effect>The platform now supports 500+ editors publishing seamlessly at scale and delivers sophisticated digital experiences to over 3M+ monthly users.</p>
            <p data-para-effect>Within 12 months, all three publications achieved category-leading rankings, powered by infrastructure designed to enable editorial excellence rather than restrict it.</p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Slide10;

