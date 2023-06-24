import React, { useRef, useEffect } from "react";
import p5 from "p5";

const Bezier = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let backgroundImage;

      p.preload = () => {
        backgroundImage = p.loadImage("/assets/road.jpg");
      };

      p.setup = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        p.createCanvas(width, height);
        p.image(backgroundImage, 0, 0, width, height);
      };

      p.draw = () => {
        // Решта коду для малювання кривої Безьє
        // p.background(255);
        p.stroke(0);
        p.strokeWeight(2);

        const p0 = { x: 0.25 * p.width, y: 0.5 * p.height };
        const p1 = { x: 0.5 * p.width, y: 0.25 * p.height };
        const p2 = { x: 0.75 * p.width, y: 0.75 * p.height };
        const p3 = { x: p.width, y: 0.5 * p.height };

        p.bezier(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
      };
    };

    new p5(sketch, canvasRef.current);
  }, []);

  return <div ref={canvasRef}></div>;
};

export default Bezier;
