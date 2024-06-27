import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import Content from './content';
import { data } from '../data';
import Canvas from './canvas';
import SwatchWrapper from './swatchWrapper';

function Banner() {
  const banner = useRef();
  const [activeData, setActiveData] = useState(data[0]);

  const handleSwatch = (item) => {
    if (activeData.id !== item.id) {
      setActiveData(item);
    }
  };

  useEffect(() => {
    gsap.to(banner.current, {
      background: activeData.background,
      ease: 'power3.inOut',
      duration: 0.8,
    });
    gsap.to('.logo', {
      color: activeData.headingColor,
      ease: 'power3.inOut',
      duration: 0.8,
    });

    return () => {};
  }, [activeData]);

  return (
    <div ref={banner} className="w-screen h-screen relative">
      <div className="logo absolute my-2 ml-6 text-left text-2xl font-bold tracking-widest md:ml-28 lg:ml-[12vw] lg:my-8">
        MISFIT.
      </div>
      <div className="w-full h-full flex justify-between items-center flex-col lg:flex-row-reverse">
        <Canvas activeData={activeData} swatchData={data} handleSwatch={handleSwatch} />
        <Content activeData={activeData} />
        <SwatchWrapper activeData={activeData} swatchData={data} handleSwatch={handleSwatch} />
      </div>
    </div>
  );
}

export default Banner;
