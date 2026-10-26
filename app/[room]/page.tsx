"use client";
import React, {useRef, useEffect, MouseEvent} from "react";
export default function Room() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  })

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {

  }

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {

  }

  const stopDrawing = (e: MouseEvent<HTMLCanvasElement>) => {

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
        <canvas onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          className="bg-red-600"
        />
      </div>
    </div>
  );
}
