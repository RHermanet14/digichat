"use client";
import React, {useRef, useEffect, useState, MouseEvent} from "react";
export default function Room() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canDraw, setCanDraw] = useState<boolean>(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  })

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setCanDraw(true);
  }

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!canDraw) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  const stopDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    setCanDraw(false);
  }

  const viewMessageHistory = () => {
    // Receive and display previous messages from the chat
    return <p></p>
  }

  return (
    <div className="">
      <div>
        {viewMessageHistory()}
      </div>
      <div> {/* Send Messages */}
        <div className="">
          <button>Type</button>
          <button>Draw</button>
        </div>
        <input className="bg-blue-700"></input>
        <canvas ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="bg-red-600"
        />
      </div>
    </div>
  );
}
