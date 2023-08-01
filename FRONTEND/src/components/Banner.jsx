//hago el banner
//https://www.youtube.com/watch?v=IEJKZV5Htt8&list=PLQHg_3LIshW2Fekd1sUCQtFhN4M0dSDnv&index=2&ab_channel=MiguelLopez

import React from 'react';

 const Banner = () => {
  return (
    <div className="carousel">
      <div className="slides">
        {/* Slide 1 */}
        <div className="slide">
          <img src="/images/banner/1.png" alt="Slide 1" />
        </div>
        {/* Slide 2 */}
        <div className="slide">
          <img src="/images/banner/2.png" alt="Slide 2" />
        </div>
        {/* Slide 3 */}
        <div className="slide">
          <img src="/images/banner/3.png" alt="Slide 3" />
        </div>
      </div>
    </div>
  );
};
export default Banner;