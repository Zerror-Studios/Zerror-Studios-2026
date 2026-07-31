import React from 'react';

const Slide16 = () => {
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
            <p data-para-effect>Deveshe Dreams operates on limited handcrafted collections with premium positioning, scarcity-based releases, and pre-order workflows.</p>
            <p data-para-effect>Traditional platforms like Shopify and WooCommerce are designed for volume retail and couldn't support the brand's unique operational model or communicate the exclusivity and artistry central to the experience.</p>
          </div>
        </div>

        {/* Block 2 */}
        <div className="bg-black/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
          <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font w-32 flex items-center shrink-0">2</div>
          <div className="w-64 shrink-0">
            <h3 data-para-effect className="text-3xl primary-font">The Solution</h3>
          </div>
          <div className="flex-1 text-lg leading-tight space-y-4">
            <p data-para-effect>We engineered a completely custom e-commerce platform tailored specifically to the brand's workflow and positioning.</p>
            <p data-para-effect>Beyond the storefront experience, the system included collection-based releases, pre-order handling, real-time inventory tracking, production workflow management, customer automation, and analytics, all managed through a unified backend designed around the business itself.</p>
          </div>
        </div>

        {/* Block 3 */}
        <div className="bg-black/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
          <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font w-32 flex items-center shrink-0">3</div>
          <div className="w-64 shrink-0">
            <h3 data-para-effect className="text-3xl primary-font">The Outcome</h3>
          </div>
          <div className="flex-1 text-lg leading-tight space-y-4">
            <p data-para-effect>The platform drove 165% traffic growth, 350% year-over-year revenue growth, significantly higher average order values, and strong repeat customer retention.</p>
            <p data-para-effect>More importantly, the digital experience finally aligned with the brand's premium identity, allowing every interaction to communicate craftsmanship, scarcity, and intentional design.</p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Slide16;



