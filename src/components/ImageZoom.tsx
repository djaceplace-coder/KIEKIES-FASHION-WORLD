import { useState, useRef, MouseEvent } from 'react';

export default function ImageZoom({ src, alt }: { src: string; alt: string }) {
  const [position, setPosition] = useState({ px: 0, py: 0, bgX: 0, bgY: 0 });
  const [showLoupe, setShowLoupe] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    
    const x = e.clientX - left;
    const y = e.clientY - top;

    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    setPosition({ px: x, py: y, bgX: xPercent, bgY: yPercent });
  };

  return (
    <div 
      className="relative w-full rounded-[32px] overflow-hidden cursor-crosshair bg-silk-cream border border-obsidian/5"
      onMouseEnter={() => setShowLoupe(true)}
      onMouseLeave={() => setShowLoupe(false)}
      onMouseMove={handleMouseMove}
    >
      <img referrerPolicy="no-referrer" 
        ref={imgRef} 
        src={src} 
        alt={alt} 
        className="w-full h-auto object-cover" 
      />
      
      {showLoupe && (
        <div 
          className="absolute pointer-events-none rounded-full border border-white/40 z-50 bg-no-repeat shadow-tactile-inset"
          style={{
            width: '180px',
            height: '180px',
            left: `${position.px}px`,
            top: `${position.py}px`,
            transform: 'translate(-50%, -50%)',
            backgroundImage: `url(${src})`,
            backgroundSize: '250%',
            backgroundPosition: `${position.bgX}% ${position.bgY}%`,
            backgroundColor: '#FAF9F6',
          }}
        >
          {/* Inner glass reflection */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.5)]"></div>
        </div>
      )}
    </div>
  );
}
