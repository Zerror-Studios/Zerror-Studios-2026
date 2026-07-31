import React from 'react';

const Slide14 = () => {
  return (
    <section className="h-screen w-full snap-start flex flex-col justify-center px-10 md:px-24 bg-[#E5E5E5] text-blue-700 relative">

      <div className="w-full space-y-4">

        {/* Block 1 */}
        <div className="bg-black/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
          <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font flex items-center w-32 shrink-0">1</div>
          <div className="w-64 shrink-0">
            <h3 data-para-effect className="text-3xl primary-font">The Problem</h3>
          </div>
          <div className="flex-1 text-lg leading-tight space-y-4">
            <p data-para-effect>Salman Khan Films needed a digital presence that reflected their position as one of Bollywood's leading production houses. Most entertainment websites rely heavily on design trends that age quickly, making it difficult to create something that feels modern today while remaining relevant years later.</p>
            <p data-para-effect>The challenge was to build a sophisticated, cinematic experience without sacrificing timelessness.</p>
          </div>
        </div>

        {/* Block 2 */}
        <div className="bg-black/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
          <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font w-32 flex items-center shrink-0">2</div>
          <div className="w-64 shrink-0">
            <h3 data-para-effect className="text-3xl primary-font">The Solution</h3>
          </div>
          <div className="flex-1 text-lg leading-tight space-y-4">
            <p data-para-effect>We designed and developed a completely custom showcase website rooted in cinematic storytelling and restrained visual design.</p>
            <p data-para-effect>Every interaction from typography and spacing to animations and transitions was carefully crafted to communicate elegance, confidence, and premium brand positioning without relying on temporary design trends or visual excess.</p>
          </div>
        </div>

        {/* Block 3 */}
        <div className="bg-black/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
          <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font w-32 flex items-center shrink-0">3</div>
          <div className="w-64 shrink-0">
            <h3 data-para-effect className="text-3xl primary-font">The Outcome</h3>
          </div>
          <div className="flex-1 text-lg leading-tight space-y-4">
            <p data-para-effect>The platform continues to remain visually contemporary years after launch, adapting seamlessly across multiple film releases and portfolio updates without requiring redesign.</p>
            <p data-para-effect>The result is a timeless digital experience that reinforces the production house's prestige while sustaining long-term brand relevance.</p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Slide14;



