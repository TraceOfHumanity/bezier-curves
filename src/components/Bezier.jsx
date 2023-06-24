import React, { useRef, useEffect } from "react";
import p5 from "p5";

const Bezier = () => {
  const canvasRef = useRef(null);
  const points = [];

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

      p.mousePressed = () => {
        if (p.keyIsDown(p.SHIFT)) {
          const point = { x: p.mouseX, y: p.mouseY };
          points.push(point);
        }
      };

      p.draw = () => {
        // p.background(0);
        p.stroke("red");
        p.strokeWeight(2);

        if (points.length > 1) {
          for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i];
            const p1 = points[i + 1];
            p.line(p0.x, p0.y, p1.x, p1.y);
          }
        }

        p.stroke(0, 255, 0);
        p.noFill();

        for (const point of points) {
          const size = 8;
          const halfSize = size / 2;
          const x = point.x - halfSize;
          const y = point.y - halfSize;
          p.rect(x, y, size, size);
        }

        if (points.length >= 4) {
          p.stroke(255, 0, 0);
          p.noFill();

          const p0 = points[0];
          const p1 = points[1];
          const p2 = points[2];
          const p3 = points[3];

          p.bezier(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        }
      };
    };

    new p5(sketch, canvasRef.current);
  }, []);

  return <div ref={canvasRef}></div>;
};

export default Bezier;
