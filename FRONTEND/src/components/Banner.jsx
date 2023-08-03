const Banner = () => {
  const slides = [
    { id: 1, src: '/images/banner/1.png', alt: 'Slide 1' },
    { id: 2, src: '/images/banner/2.png', alt: 'Slide 2' },
    { id: 3, src: '/images/banner/3.png', alt: 'Slide 3' },
  ];

  return (
    <div className="carousel">
      <div className="slides">
        {slides.map((slide) => (
          <div key={slide.id} className="slide">
            <img src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;