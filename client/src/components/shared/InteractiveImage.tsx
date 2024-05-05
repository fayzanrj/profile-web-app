/**
 * InteractiveImage Component:
 * - Renders an interactive image that moves with the movement of the mouse
 * -
 */

import React, { useState, useEffect } from "react";
import qrcodeImage from "../../assets/qrcode-image.png";

const InteractiveImage: React.FC = () => {
  // State to track mouse position
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Adding event listener to mousemove
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Calculating the center of the screen viewport
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Calculating skew values based on mouse position
  const skewX = ((centerX - mousePosition.x) / centerX) * 20;
  const skewY = ((centerY - mousePosition.y) / centerY) * 20;

  // Calculating scale
  const distanceX = Math.abs(mousePosition.x - centerX);
  const distanceY = Math.abs(mousePosition.y - centerY);
  const scale =
    1 - (Math.max(distanceX, distanceY) / Math.max(centerX, centerY)) * 0.2;

  // Calculating translation values
  const translationX = (mousePosition.x - centerX) * 0.1;
  const translationY = (mousePosition.y - centerY) * 0.1;

  return (
    <div className="relative w-full h-full overflow-hidden perspective ">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Image */}
        <img
          src={qrcodeImage}
          alt="Interactive Image"
          className="object-cover transition-transform origin-center transform w-[30rem] h-[30rem]"
          style={{
            transform: `perspective(1000px) rotateX(${skewY}deg) rotateY(${-skewX}deg) scale(${scale}) translateX(${translationX}px) translateY(${translationY}px)`,
          }}
        />
      </div>
    </div>
  );
};

export default InteractiveImage;
