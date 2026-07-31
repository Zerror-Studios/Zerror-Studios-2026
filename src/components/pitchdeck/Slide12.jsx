import React from 'react';

const Slide12 = () => {
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
            <p data-para-effect>Manifest had spent five years building content, SEO authority, and editorial infrastructure on WordPress, but the platform had become limiting in both design flexibility and performance.</p>
            <p data-para-effect>They needed a modern, fully custom publishing experience without risking years of accumulated data, rankings, URLs, and media assets during migration.</p>
          </div>
        </div>

        {/* Block 2 */}
        <div className="bg-black/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
          <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font w-32 flex items-center shrink-0">2</div>
          <div className="w-64 shrink-0">
            <h3 data-para-effect className="text-3xl primary-font">The Solution</h3>
          </div>
          <div className="flex-1 text-lg leading-tight space-y-4">
            <p data-para-effect>We engineered a fully custom publishing platform alongside a custom migration infrastructure capable of intelligently translating and transferring large-scale content, metadata, media assets, and relationships from WordPress without disruption.</p>
            <p data-para-effect>Every original URL structure and SEO signal was preserved while the new platform was rebuilt for speed, scalability, and editorial flexibility.</p>
          </div>
        </div>

        {/* Block 3 */}
        <div className="bg-black/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
          <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font w-32 flex items-center shrink-0">3</div>
          <div className="w-64 shrink-0">
            <h3 data-para-effect className="text-3xl primary-font">The Outcome</h3>
          </div>
          <div className="flex-1 text-lg leading-tight space-y-4">
            <p data-para-effect>The migration launched with zero downtime, zero broken links, and zero data loss. Post-launch, traffic increased by 200%, page speeds improved significantly, and the editorial team gained the flexibility to scale and innovate on a modern publishing system built for long-term growth.</p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Slide12;



