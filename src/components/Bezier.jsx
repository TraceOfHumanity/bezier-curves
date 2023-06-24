import React, { useRef, useEffect } from "react";
import p5 from "p5";

const Bezier = () => {
  const canvasRef = useRef(null);
  const points = [];
  let selectedPoint = null;

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
        } else {
          for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const size = 8;
            const halfSize = size / 2;
            const x = point.x - halfSize;
            const y = point.y - halfSize;
            if (
              p.mouseX >= x &&
              p.mouseX <= x + size &&
              p.mouseY >= y &&
              p.mouseY <= y + size
            ) {
              selectedPoint = i;
              break;
            }
          }
        }
      };

      p.mouseDragged = () => {
        if (selectedPoint !== null) {
          points[selectedPoint].x = p.mouseX;
          points[selectedPoint].y = p.mouseY;
        }
      };

      p.mouseReleased = () => {
        selectedPoint = null;
      };

      p.draw = () => {
        p.background(backgroundImage);
        p.stroke("red");
        p.strokeWeight(1);

        for (let i = 0; i < points.length - 1; i++) {
          const p0 = points[i];
          const p1 = points[i + 1];
          p.line(p0.x, p0.y, p1.x, p1.y);
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

        if (points.length >= 2) {
          p.stroke(255, 0, 0);
          p.stroke("blue");
          p.strokeWeight(2);

          p.noFill();

          const controlPoints = [];
          for (let i = 0; i < points.length; i++) {
            const point = points[i];
            controlPoints.push(point.x, point.y);
          }

          p.beginShape();
          p.curveVertex(controlPoints[0], controlPoints[1]);

          for (let i = 0; i < controlPoints.length - 2; i += 2) {
            p.curveVertex(
              controlPoints[i],
              controlPoints[i + 1],
              controlPoints[i + 2],
              controlPoints[i + 3]
            );
          }

          p.curveVertex(
            controlPoints[controlPoints.length - 2],
            controlPoints[controlPoints.length - 1]
          );
          p.endShape();
        }
      };
    };

    new p5(sketch, canvasRef.current);
  }, []);

  return <div ref={canvasRef}></div>;
};

export default Bezier;
