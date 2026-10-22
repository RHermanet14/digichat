"use client";
export default function Home() {
  function getChatrooms(numRooms: number) {
    const addChar = (index: number): string => {
      return String.fromCharCode("A".charCodeAt(0) + index);
    }
    return <div>
      {Array.from({length: numRooms}).map((_,index) => (
        <button key={index}
          className="flex items-center border border-black text-black font-mono bg-linear-to-b from-white to-gray-500 min-h-20"
          onClick={() => console.log("Button Clicked")}
        >
          <div className="flex items-center border border-black min-h-20">
            <p>{addChar(index)}</p>
            <p>Pen image</p>
          </div>
          <p>Chat Room {addChar(index)}</p>
          <div className="flex border border-black justify-center items-center">
            <p>Person image</p>
            <p>0/16</p>
          </div>
        </button>
      ))}
    </div>
  }
  return (
    <div className="flex flex-col flex-1 bg-mauve-400 font-sans justify-center">
      <div className="bg-linear-to-b from-blue-400 via-blue-700 to-blue-800 p-6"/>
      <div className="flex items-center justify-center">
        {getChatrooms(4)}
      </div>
      <div className="bg-linear-to-b from-blue-800 via-blue-700 to-blue-400 p-6 flex justify-center items-center space-x-5">
        <button className="text-black font-mono border-white border bg-linear-to-b from-gray-500 to-white">Go back</button>
        <button className="text-black font-mono border-white border bg-linear-to-b from-gray-500 to-white">Join</button>
      </div>
    </div>
  );
}
