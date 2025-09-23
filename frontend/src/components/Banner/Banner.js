import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      image: "/images/banner-1.jpg",
      subtitle: "✨ New Collection",
      title: "Summer Fashion",
      text: "Discover the latest trends in summer fashion with our exclusive collection. Up to 50% off on selected items.",
      buttonText: "Shop Now",
      buttonLink: "/shop",
      badge: "50% OFF",
      badgeColor: "bg-red-500"
    },
    {
      id: 2,
      image: "/images/banner-2.jpg",
      subtitle: "🔥 Special Offer",
      title: "Electronics Sale",
      text: "Upgrade your tech with our amazing electronics sale. Premium quality at unbeatable prices.",
      buttonText: "Explore",
      buttonLink: "/electronics",
      badge: "HOT DEAL",
      badgeColor: "bg-orange-500"
    },
    {
      id: 3,
      image: "/images/banner-3.jpg",
      subtitle: "⚡ Limited Time",
      title: "Sports & Fitness",
      text: "Gear up for your fitness journey with our premium sports equipment and activewear collection.",
      buttonText: "Get Started",
      buttonLink: "/sports",
      badge: "NEW ARRIVAL",
      badgeColor: "bg-green-500"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length, isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="banner mt-8 mb-8 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-purple-500 rounded-full animate-spin animation-delay-2000"></div>
            <div className="absolute top-20 right-20 w-24 h-24 border-4 border-blue-500 rounded-full animate-ping animation-delay-1000"></div>
            <div className="absolute bottom-20 left-20 w-20 h-20 border-4 border-pink-500 rounded-full animate-pulse"></div>
          </div>

          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={slide.id} className="min-w-full relative group">
                <div className="relative h-96 md:h-[500px] overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

                  {/* Floating Badge */}
                  <div className={`absolute top-6 left-6 ${slide.badgeColor} text-white px-4 py-2 rounded-full font-bold text-sm animate-bounce shadow-lg`}>
                    {slide.badge}
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-6">
                      <div className="max-w-2xl text-white">
                        <div className="mb-4">
                          <p className="text-purple-300 text-lg font-medium uppercase tracking-wider mb-2 animate-fadeInUp">
                            {slide.subtitle}
                          </p>
                          <h1 className="text-5xl md:text-7xl font-bold uppercase mb-4 animate-fadeInUp animation-delay-200">
                            {slide.title}
                          </h1>
                        </div>
                        <p className="text-xl font-medium mb-8 animate-fadeInUp animation-delay-400 hidden md:block leading-relaxed">
                          {slide.text}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-600">
                          <a
                            href={slide.buttonLink}
                            className="group/btn bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-bold uppercase px-8 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
                          >
                            {slide.buttonText}
                            <i className="fas fa-arrow-right transition-transform duration-300 group-hover/btn:translate-x-1"></i>
                          </a>
                          <button className="group/btn2 border-2 border-white text-white text-lg font-bold uppercase px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2">
                            <i className="fas fa-play transition-transform duration-300 group-hover/btn2:scale-110"></i>
                            Watch Video
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white scale-125 shadow-lg'
                    : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                }`}
              >
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-white rounded-full animate-ping"></div>
                )}
              </button>
            ))}
          </div>

          {/* Enhanced Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <i className="fas fa-chevron-left text-xl"></i>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <i className="fas fa-chevron-right text-xl"></i>
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-5000 ease-linear"
              style={{
                width: isAutoPlaying ? '100%' : '0%',
                animation: isAutoPlaying ? 'progressShrink 5s linear infinite' : 'none'
              }}
            ></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progressShrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default Banner;
