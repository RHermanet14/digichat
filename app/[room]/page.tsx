"use client";
import React, {useRef, useEffect, useState, MouseEvent} from "react";

function BitmapCanvasConverter({bitmap}: {bitmap: ImageBitmap}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
  }, [bitmap]);
  return <canvas ref={ref} className="max-w-full border"/>;
}

export default function Room() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canDraw, setCanDraw] = useState<boolean>(false);
  const [images, setImages] = useState<ImageBitmap[]>([]);
  const currentKey = useRef<string>("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const keys = document.querySelectorAll("li");
    keys.forEach(key => {
      key.draggable = true;
      key.addEventListener('dragstart', () => currentKey.current = key.innerText);
    });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const {width, height} = canvas.getBoundingClientRect();

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [])

  const dropKey = (e: MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = (document.getElementById("pcolor") as HTMLInputElement).value;
      ctx.font = (Number((document.getElementById("psize") as HTMLInputElement).value) || 5).toString() + "px sans"
      ctx.textBaseline= "middle";
      ctx.textAlign = "center";
      const rect = canvas.getBoundingClientRect();
      ctx.fillText(currentKey.current, e.clientX - rect.left, e.clientY - rect.top);
  }

  const dragOver = async (event: MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
  }

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.strokeStyle = (document.getElementById("pcolor") as HTMLInputElement).value;
    ctx.lineWidth = Number((document.getElementById("psize") as HTMLInputElement).value) || 5;
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

  const stopDrawing = () => {
    setCanDraw(false);
  }

  const viewMessageHistory = (): React.JSX.Element[] => {
    // Receive and display previous messages from the chat
    // Array of either strings or bitmaps?
    //return messages.map(text => <div key={text}>{text}</div>);
    return images.map((image, index) => <BitmapCanvasConverter key={index} bitmap={image}/>); // temp fix
  }

  const sendMessage = async() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const bitmap = await createImageBitmap(canvas);
    setImages([bitmap, ...images])
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="min-h-0 flex-1 flex-col overflow-y-auto bg-white">
        {viewMessageHistory()}
      </div>
      <div className="flex min-h-0 flex-1 flex-col"> {/* Send Messages */}
        <input type="number" id="psize" name="psize" min="1" max="100" defaultValue="5"/>
        <input type="color" id="pcolor" name="pcolor" defaultValue="black"/>
        <div className="min-h-0 flex-1">
          <canvas ref={canvasRef}
            id = "canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onDrop={dropKey}
            onDragOver={dragOver}
            className="bg-white h-full w-full"
          />
        </div>
        
        <div id="keyboard" className="flex flex-col text-red-600 shrink-0">
          <ul id="rowone" className="flex gap-x-10">
            <li>`</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>0</li>
            <li>-</li>
            <li>=</li>
          </ul>
          <ul id="rowtwo" className="flex gap-x-10">
            <li>q</li>
            <li>w</li>
            <li>e</li>
            <li>r</li>
            <li>t</li>
            <li>y</li>
            <li>u</li>
            <li>i</li>
            <li>o</li>
            <li>p</li>
            <li>{`[`}</li>
            <li>{`]`}</li>
            <li>\</li>
          </ul>
          <ul id="rowthree" className="flex gap-x-10">
            <li>a</li>
            <li>s</li>
            <li>d</li>
            <li>f</li>
            <li>g</li>
            <li>h</li>
            <li>j</li>
            <li>k</li>
            <li>l</li>
            <li>;</li>
            <li>{"'"}</li>
          </ul>
          <ul id="rowfour" className="flex gap-x-10">
            <li>z</li>
            <li>x</li>
            <li>c</li>
            <li>v</li>
            <li>b</li>
            <li>n</li>
            <li>m</li>
            <li>,</li>
            <li>.</li>
            <li>/</li>
            <li>Shift</li>
          </ul>
        </div>
        <button onClick={sendMessage} className="shrink-0">Send</button>
      </div>
    </div>
  );
}
