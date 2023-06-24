import React, { useRef, useEffect } from "react";
import p5 from "p5";

const Bezier = () => {
  const canvasRef = useRef(null);
  const curves = [];
  let currentCurve = null;
  let selectedPoint = null;
  const history = [];

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
        if (p.keyIsDown(p.CONTROL)) {
          // Створення нової кривої Безьє при натисканні Ctrl
          currentCurve = { points: [] };
          curves.push(currentCurve);
        }
        if (p.keyIsDown(p.SHIFT) && currentCurve !== null) {
          // Додавання точок до поточної кривої Безьє при натисканні Shift
          const point = { x: p.mouseX, y: p.mouseY };
          currentCurve.points.push(point);
          history.push({ curveIndex: curves.length - 1, point });
        } else {
          // Вибір точки для перетягування або активування
          let isPointSelected = false;
          for (let i = 0; i < curves.length; i++) {
            const curve = curves[i];
            for (let j = 0; j < curve.points.length; j++) {
              const point = curve.points[j];
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
                selectedPoint = { curveIndex: i, pointIndex: j };
                isPointSelected = true;
                break;
              }
            }
            if (isPointSelected) {
              break;
            }
          }
        }
      };

      p.mouseDragged = () => {
        if (selectedPoint !== null) {
          const { curveIndex, pointIndex } = selectedPoint;
          curves[curveIndex].points[pointIndex].x = p.mouseX;
          curves[curveIndex].points[pointIndex].y = p.mouseY;
        }
      };

      p.mouseReleased = () => {
        selectedPoint = null;
      };

      p.keyPressed = () => {
        if (p.keyIsDown(p.DELETE) && selectedPoint !== null) {
          // Видалення точки при натисканні клавіші Delete
          const { curveIndex, pointIndex } = selectedPoint;
          curves[curveIndex].points.splice(pointIndex, 1);
          selectedPoint = null;
        }
      };

      p.draw = () => {
        p.background(backgroundImage);
        p.stroke("red");
        p.strokeWeight(2);
        p.noFill();

        for (let i = 0; i < curves.length; i++) {
          const curve = curves[i];
          for (let j = 0; j < curve.points.length; j++) {
            const point = curve.points[j];
            const size = 10;
            const halfSize = size / 2;
            const x = point.x - halfSize;
            const y = point.y - halfSize;
            if (
              selectedPoint !== null &&
              i === selectedPoint.curveIndex &&
              j === selectedPoint.pointIndex
            ) {
              p.stroke("green"); // Зелений колір для активної точки
              p.strokeWeight(4);
            } else {
              p.stroke("red");
              p.strokeWeight(2);
            }
            p.rect(x, y, size, size);
          }
        }

        for (let i = 0; i < curves.length; i++) {
          const curve = curves[i];
          if (curve.points.length >= 2) {
            p.stroke(255, 0, 0);
            p.stroke("blue");
            p.strokeWeight(3);
            // p.noFill();

            const controlPoints = [];
            for (let j = 0; j < curve.points.length; j++) {
              const point = curve.points[j];
              controlPoints.push(point.x, point.y);
            }

            p.beginShape();
            p.curveVertex(controlPoints[0], controlPoints[1]);

            for (let j = 0; j < controlPoints.length - 1; j += 2) {
              p.curveVertex(
                controlPoints[j],
                controlPoints[j + 1],
                controlPoints[j + 2],
                controlPoints[j + 3]
              );
            }

            p.curveVertex(
              controlPoints[controlPoints.length - 2],
              controlPoints[controlPoints.length - 1]
            );
            p.endShape();
          }
        }
      };
    };

    new p5(sketch, canvasRef.current);
  }, [curves]);

  return <div ref={canvasRef}></div>;
};

export default Bezier;
