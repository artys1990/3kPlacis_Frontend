import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

function CarImageGallery({
  images = [],
  altPrefix = "Car photo",
  autoPlayInterval = 4000,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const trackRef = useRef(null);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToIndex = useCallback((i) => setActiveIndex(i), []);

  // Auto-play: advances on an interval, paused when hovering, lightbox open, manually toggled off, or only 1 image
  useEffect(() => {
    if (!isAutoPlaying || isHovering || isLightboxOpen || images.length <= 1)
      return;

    autoPlayTimerRef.current = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(autoPlayTimerRef.current);
  }, [
    isAutoPlaying,
    isHovering,
    isLightboxOpen,
    images.length,
    autoPlayInterval,
    goToNext,
  ]);

  // Manual navigation (thumbnail click / arrow click) resets the timer so it doesn't
  // jump again right after the user just picked something
  const handleManualNav =
    (fn) =>
    (...args) => {
      clearInterval(autoPlayTimerRef.current);
      fn(...args);
    };

  const openLightbox = () => {
    setIsLightboxOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsLightboxVisible(true));
    });
  };

  const closeLightbox = () => {
    setIsLightboxVisible(false);
    setTimeout(() => setIsLightboxOpen(false), 200);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    function handleKeyDown(e) {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") closeLightbox();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, goToPrev, goToNext]);

  useEffect(() => {
    setIsTransitioning(true);
    const t = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(t);
  }, [activeIndex]);

  if (!images.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
        No photos available
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full 2xl:max-w-5xl flex-col gap-2 2xl:flex-row 2xl:gap-3 lg:max-w-3xl sm:gap-1">
      {/* Main image */}
      <div className="group relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-lg">
        <div
          ref={trackRef}
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((img, i) => (
            <img
              key={img + i}
              //src={"/" + img}
              src={img}
              alt={`${altPrefix} ${i + 1}`}
              className="h-full w-full flex-shrink-0 cursor-zoom-in object-contain"
              onClick={openLightbox}
              draggable={false}
            />
          ))}
        </div>

        <button
          onClick={openLightbox}
          className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-white opacity-100 transition-opacity duration-200 sm:right-3 sm:top-3 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Expand size={18} className="sm:h-5 sm:w-5" />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={handleManualNav(goToPrev)}
              aria-label="Previous photo"
              className="absolute left-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-100 transition-opacity duration-200 hover:bg-black/60 sm:left-3 sm:h-12 sm:w-12 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft size={26} className="sm:h-8 sm:w-8" />
            </button>
            <button
              onClick={handleManualNav(goToNext)}
              aria-label="Next photo"
              className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-100 transition-opacity duration-200 hover:bg-black/60 sm:right-3 sm:h-12 sm:w-12 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight size={26} className="sm:h-8 sm:w-8" />
            </button>
          </>
        )}

        <span
          className={`absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-xs text-white transition-opacity duration-200 sm:bottom-3 sm:right-3 ${
            isTransitioning ? "opacity-60" : "opacity-100"
          }`}
        >
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnails — below image on mobile, right column on lg+ */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 self-center 2xl:grid-cols-2 2xl:content-start 2xl:gap-3 2xl:w-32 2xl:max-h-[28rem] 2xl:overflow-y-auto 2xl:p-1 2xl:w-72">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => handleManualNav(goToIndex)(i)}
              className={`aspect-[4/3] w-full overflow-hidden rounded-md border-2 transition-all duration-200 ${
                i === activeIndex
                  ? "my-border-color-gold opacity-100 scale-100"
                  : "border-transparent opacity-70 scale-[0.97] hover:opacity-100 hover:scale-100"
              }`}
            >
              <img
                src={img}
                alt={`${altPrefix} thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-opacity duration-200 ${
            isLightboxVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:scale-110 hover:bg-white/20 sm:right-6 sm:top-6"
          >
            <X size={26} className="sm:h-8 sm:w-8" />
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:scale-105 hover:bg-white/20 sm:left-5 sm:h-14 sm:w-14"
            >
              <ChevronLeft size={28} className="sm:h-9 sm:w-9" />
            </button>
          )}

          <img
            key={images[activeIndex]}
            src={images[activeIndex]}
            loading="lazy"
            alt={`${altPrefix} ${activeIndex + 1}`}
            className="max-h-[85vh] max-w-[92vw] object-contain sm:max-h-[90vh] sm:max-w-[90vw]"
            style={{ animation: `lightboxFade 300ms ease-out` }}
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:scale-105 hover:bg-white/20 sm:right-5 sm:h-14 sm:w-14"
            >
              <ChevronRight size={28} className="sm:h-9 sm:w-9" />
            </button>
          )}

          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80 sm:bottom-5">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}

      <style>{`
        @keyframes lightboxFade {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isLightboxOpen, setIsLightboxOpen] = useState(false);
//   const [isLightboxVisible, setIsLightboxVisible] = useState(false);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const trackRef = useRef(null);

//   const goToPrev = useCallback(() => {
//     setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   }, [images.length]);

//   const goToNext = useCallback(() => {
//     setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   }, [images.length]);

//   const goToIndex = useCallback((i) => setActiveIndex(i), []);

//   const openLightbox = () => {
//     setIsLightboxOpen(true);
//     requestAnimationFrame(() => {
//       requestAnimationFrame(() => setIsLightboxVisible(true));
//     });
//   };

//   const closeLightbox = () => {
//     setIsLightboxVisible(false);
//     setTimeout(() => setIsLightboxOpen(false), 200);
//   };

//   useEffect(() => {
//     if (!isLightboxOpen) return;
//     function handleKeyDown(e) {
//       if (e.key === "ArrowLeft") goToPrev();
//       if (e.key === "ArrowRight") goToNext();
//       if (e.key === "Escape") closeLightbox();
//     }
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isLightboxOpen, goToPrev, goToNext]);

//   useEffect(() => {
//     setIsTransitioning(true);
//     const t = setTimeout(() => setIsTransitioning(false), 300);
//     return () => clearTimeout(t);
//   }, [activeIndex]);

//   if (!images.length) {
//     return (
//       <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
//         No photos available
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-2 sm:gap-3">
//       {/* Main image */}
//       <div className="group relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-lg">
//         <div
//           ref={trackRef}
//           className="flex h-full transition-transform duration-300 ease-out"
//           style={{ transform: `translateX(-${activeIndex * 100}%)` }}
//         >
//           {images.map((img, i) => (
//             <img
//               key={img}
//               src={"/" + img}
//               alt={`${altPrefix} ${i + 1}`}
//               className="h-full w-full flex-shrink-0 cursor-zoom-in object-contain"
//               onClick={openLightbox}
//               draggable={false}
//             />
//           ))}
//         </div>

//         {/* Expand icon — always visible on mobile (no hover), hover-reveal on desktop */}
//         <button
//           onClick={openLightbox}
//           className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-white opacity-100 transition-opacity duration-200 sm:right-3 sm:top-3 sm:opacity-0 sm:group-hover:opacity-100"
//         >
//           <Expand size={18} className="sm:h-5 sm:w-5" />
//         </button>

//         {images.length > 1 && (
//           <>
//             <button
//               onClick={goToPrev}
//               aria-label="Previous photo"
//               className="absolute left-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-100 transition-opacity duration-200 hover:bg-black/60 sm:left-3 sm:h-12 sm:w-12 sm:opacity-0 sm:group-hover:opacity-100"
//             >
//               <ChevronLeft size={26} className="sm:h-8 sm:w-8" />
//             </button>
//             <button
//               onClick={goToNext}
//               aria-label="Next photo"
//               className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-100 transition-opacity duration-200 hover:bg-black/60 sm:right-3 sm:h-12 sm:w-12 sm:opacity-0 sm:group-hover:opacity-100"
//             >
//               <ChevronRight size={26} className="sm:h-8 sm:w-8" />
//             </button>
//           </>
//         )}

//         <span
//           className={`absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-xs text-white transition-opacity duration-200 sm:bottom-3 sm:right-3 ${
//             isTransitioning ? "opacity-60" : "opacity-100"
//           }`}
//         >
//           {activeIndex + 1} / {images.length}
//         </span>
//       </div>

//       {/* Thumbnail strip */}
//       {images.length > 1 && (
//         <div className="mx-auto grid w-full max-w-xl grid-cols-4 gap-2 sm:gap-3">
//           {images.map((img, i) => (
//             <button
//               key={img}
//               onClick={() => goToIndex(i)}
//               className={`aspect-[4/3] w-full overflow-hidden rounded-md border-2 transition-all duration-200 ${
//                 i === activeIndex
//                   ? "my-border-color-gold opacity-100 scale-100"
//                   : "border-transparent opacity-70 scale-[0.97] hover:opacity-100 hover:scale-100"
//               }`}
//             >
//               <img
//                 src={"/" + img}
//                 alt={`${altPrefix} thumbnail ${i + 1}`}
//                 className="h-full w-full object-cover"
//               />
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Lightbox */}
//       {isLightboxOpen && (
//         <div
//           className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-opacity duration-200 ${
//             isLightboxVisible ? "opacity-100" : "opacity-0"
//           }`}
//           onClick={closeLightbox}
//         >
//           <button
//             onClick={closeLightbox}
//             aria-label="Close"
//             className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:scale-110 hover:bg-white/20 sm:right-6 sm:top-6"
//           >
//             <X size={26} className="sm:h-8 sm:w-8" />
//           </button>

//           {images.length > 1 && (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 goToPrev();
//               }}
//               aria-label="Previous photo"
//               className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:scale-105 hover:bg-white/20 sm:left-5 sm:h-14 sm:w-14"
//             >
//               <ChevronLeft size={28} className="sm:h-9 sm:w-9" />
//             </button>
//           )}

//           <img
//             key={images[activeIndex]}
//             src={"/" + images[activeIndex]}
//             alt={`${altPrefix} ${activeIndex + 1}`}
//             className="max-h-[85vh] max-w-[92vw] object-contain sm:max-h-[90vh] sm:max-w-[90vw]"
//             style={{ animation: `lightboxFade 300ms ease-out` }}
//             onClick={(e) => e.stopPropagation()}
//           />

//           {images.length > 1 && (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 goToNext();
//               }}
//               aria-label="Next photo"
//               className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:scale-105 hover:bg-white/20 sm:right-5 sm:h-14 sm:w-14"
//             >
//               <ChevronRight size={28} className="sm:h-9 sm:w-9" />
//             </button>
//           )}

//           <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80 sm:bottom-5">
//             {activeIndex + 1} / {images.length}
//           </span>
//         </div>
//       )}

//       <style>{`
//         @keyframes lightboxFade {
//           from { opacity: 0; transform: scale(0.97); }
//           to { opacity: 1; transform: scale(1); }
//         }
//       `}</style>
//     </div>
//   );
// }

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
//   const [isLightboxOpen, setIsLightboxOpen] = useState(false);
//   const [isLightboxVisible, setIsLightboxVisible] = useState(false); // controls fade-in
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const trackRef = useRef(null);

//   const goToPrev = useCallback(() => {
//     setDirection(-1);
//     setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   }, [images.length]);

//   const goToNext = useCallback(() => {
//     setDirection(1);
//     setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   }, [images.length]);

//   const goToIndex = useCallback(
//     (i) => {
//       setDirection(i > activeIndex ? 1 : -1);
//       setActiveIndex(i);
//     },
//     [activeIndex],
//   );

//   // Open lightbox with a fade-in (double rAF ensures the transition class applies after mount)
//   const openLightbox = () => {
//     setIsLightboxOpen(true);
//     requestAnimationFrame(() => {
//       requestAnimationFrame(() => setIsLightboxVisible(true));
//     });
//   };

//   const closeLightbox = () => {
//     setIsLightboxVisible(false);
//     setTimeout(() => setIsLightboxOpen(false), 200); // matches transition duration
//   };

//   // Keyboard nav
//   useEffect(() => {
//     if (!isLightboxOpen) return;
//     function handleKeyDown(e) {
//       if (e.key === "ArrowLeft") goToPrev();
//       if (e.key === "ArrowRight") goToNext();
//       if (e.key === "Escape") closeLightbox();
//     }
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isLightboxOpen, goToPrev, goToNext]);

//   // Brief "isTransitioning" flag so we can fade the counter/thumbnail sync smoothly
//   useEffect(() => {
//     setIsTransitioning(true);
//     const t = setTimeout(() => setIsTransitioning(false), 300);
//     return () => clearTimeout(t);
//   }, [activeIndex]);

//   if (!images.length) {
//     return (
//       <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
//         No photos available
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-2">
//       {/* Main image with sliding track */}
//       <div className="group relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-lg">
//         <div
//           ref={trackRef}
//           className="flex h-full transition-transform duration-300 ease-out"
//           style={{ transform: `translateX(-${activeIndex * 100}%)` }}
//         >
//           {images.map((img, i) => (
//             <img
//               key={img}
//               src={"/" + img}
//               alt={`${altPrefix} ${i + 1}`}
//               className="h-full w-full flex-shrink-0 cursor-zoom-in object-contain"
//               onClick={openLightbox}
//               draggable={false}
//             />
//           ))}
//         </div>

//         {/* Expand icon */}
//         <button
//           onClick={openLightbox}
//           className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
//         >
//           <Expand size={18} />
//         </button>

//         {images.length > 1 && (
//           <>
//             <button
//               onClick={goToPrev}
//               className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity duration-200 hover:bg-black/60 group-hover:opacity-100"
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <button
//               onClick={goToNext}
//               className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity duration-200 hover:bg-black/60 group-hover:opacity-100"
//             >
//               <ChevronRight size={20} />
//             </button>
//           </>
//         )}

//         <span
//           className={`absolute bottom-3 right-3 rounded bg-black/50 px-2 py-1 text-xs text-white transition-opacity duration-200 ${
//             isTransitioning ? "opacity-60" : "opacity-100"
//           }`}
//         >
//           {activeIndex + 1} / {images.length}
//         </span>
//       </div>

//       {/* Thumbnail strip */}
//       {images.length > 1 && (
//         <div className="flex gap-2 overflow-x-auto pb-1">
//           {images.map((img, i) => (
//             <button
//               key={img}
//               onClick={() => goToIndex(i)}
//               className={`h-16 w-20 shrink-0 overflow-hidden rounded border-2 transition-all duration-200 ${
//                 i === activeIndex
//                   ? "border-blue-600 opacity-100 scale-100"
//                   : "border-transparent opacity-70 scale-[0.97] hover:opacity-100 hover:scale-100"
//               }`}
//             >
//               <img
//                 src={"/" + img}
//                 alt={`${altPrefix} thumbnail ${i + 1}`}
//                 className="h-full w-full object-cover"
//               />
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Lightbox */}
//       {isLightboxOpen && (
//         <div
//           className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-opacity duration-200 ${
//             isLightboxVisible ? "opacity-100" : "opacity-0"
//           }`}
//           onClick={closeLightbox}
//         >
//           <button
//             onClick={closeLightbox}
//             className="absolute right-5 top-5 text-white transition-transform duration-150 hover:scale-110"
//           >
//             <X size={28} />
//           </button>

//           {images.length > 1 && (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 goToPrev();
//               }}
//               className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 hover:scale-105"
//             >
//               <ChevronLeft size={28} />
//             </button>
//           )}

//           <img
//             key={images[activeIndex]}
//             src={"/" + images[activeIndex]}
//             alt={`${altPrefix} ${activeIndex + 1}`}
//             className="max-h-[90vh] max-w-[90vw] object-contain transition-all duration-300 ease-out"
//             style={{
//               animation: `lightboxFade 300ms ease-out`,
//             }}
//             onClick={(e) => e.stopPropagation()}
//           />

//           {images.length > 1 && (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 goToNext();
//               }}
//               className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 hover:scale-105"
//             >
//               <ChevronRight size={28} />
//             </button>
//           )}

//           <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/80">
//             {activeIndex + 1} / {images.length}
//           </span>
//         </div>
//       )}

//       {/* Keyframes for lightbox image swap */}
//       <style>{`
//         @keyframes lightboxFade {
//           from { opacity: 0; transform: scale(0.97); }
//           to { opacity: 1; transform: scale(1); }
//         }
//       `}</style>
//     </div>
//   );
// }

export default CarImageGallery;
