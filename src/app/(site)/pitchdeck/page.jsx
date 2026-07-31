import React from 'react';
import Slide01 from '@/components/pitchdeck/Slide01';
import Slide02 from '@/components/pitchdeck/Slide02';
import Slide03 from '@/components/pitchdeck/Slide03';
import Slide04 from '@/components/pitchdeck/Slide04';
import Slide05 from '@/components/pitchdeck/Slide05';
import Slide06 from '@/components/pitchdeck/Slide06';
import Slide07 from '@/components/pitchdeck/Slide07';
import Slide08 from '@/components/pitchdeck/Slide08';
import Slide09 from '@/components/pitchdeck/Slide09';
import Slide10 from '@/components/pitchdeck/Slide10';
import Slide11 from '@/components/pitchdeck/Slide11';
import Slide12 from '@/components/pitchdeck/Slide12';
import Slide13 from '@/components/pitchdeck/Slide13';
import Slide14 from '@/components/pitchdeck/Slide14';
import Slide15 from '@/components/pitchdeck/Slide15';
import Slide16 from '@/components/pitchdeck/Slide16';
import Slide17 from '@/components/pitchdeck/Slide17';
import Slide18 from '@/components/pitchdeck/Slide18';

import PaginationSidebar from '@/components/pitchdeck/PaginationSidebar';
import { Link } from 'next-view-transitions';
import { RiCloseLine } from '@remixicon/react';

const PitchDeckPage = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      <Link 
        href="/" 
        className="fixed top-3 right-3 z-[100] w-10 h-10 bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-colors cursor-pointer group"
        title="Close Pitch Deck"
      >
      <RiCloseLine size={18}/>
      </Link>
      
      <PaginationSidebar />
      <main data-lenis-prevent className="flex-1 h-screen  overflow-y-scroll scroll-smooth scroller_none snap-y snap-mandatory">
        <div id="slide-01"><Slide01 /></div>
        <div id="slide-02"><Slide02 /></div>
        <div id="slide-03"><Slide03 /></div>
        <div id="slide-04"><Slide04 /></div>
        <div id="slide-05"><Slide05 /></div>
        <div id="slide-06"><Slide06 /></div>
        <div id="slide-07"><Slide07 /></div>
        <div id="slide-08"><Slide08 /></div>
        <div id="slide-09"><Slide09 /></div>
        <div id="slide-10"><Slide10 /></div>
        <div id="slide-11"><Slide11 /></div>
        <div id="slide-12"><Slide12 /></div>
        <div id="slide-13"><Slide13 /></div>
        <div id="slide-14"><Slide14 /></div>
        <div id="slide-15"><Slide15 /></div>
        <div id="slide-16"><Slide16 /></div>
        <div id="slide-17"><Slide17 /></div>
        <div id="slide-18"><Slide18 /></div>
      </main>
    </div>
  );
};

export default PitchDeckPage;