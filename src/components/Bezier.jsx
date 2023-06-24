import React, { useRef, useEffect } from "react";
import p5 from "p5";

const Bezier = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(400, 400);
      };

      p.draw = () => {
        p.background(220);
        p.stroke(0);
        p.strokeWeight(2);

        const p0 = { x: 100, y: 200 };
        const p1 = { x: 200, y: 100 };
        const p2 = { x: 300, y: 300 };
        const p3 = { x: 400, y: 200 };

        p.bezier(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
      };
    };

    new p5(sketch, canvasRef.current);
  }, []);

  return <div ref={canvasRef}></div>;
};

export default Bezier;
