import React from 'react';
import HeroScene from "@/components/Scene/HeroScene.jsx";


const Slide01 = () => {
    return (
        <section className="w-full h-full">
            <div className="site-background  site-background-desktop  fixed bg_blue top-0 left-0   w-full h-screen z-[1]">
                <HeroScene />
            </div>
            <div className="w-full p-5 h-full    bg_blue flex items-end text-white">
                <h1 data-para-effect className="text-6xl z-10  primary-font">
                    Great ideas often get lost between
                    design and development. Few can
                    do both, fewer still do it fast.
                </h1>
            </div>
        </section>
    );
};

export default Slide01;
