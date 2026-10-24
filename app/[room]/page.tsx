"use client";
export default function Room() {
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
        <canvas className="bg-red-600">

        </canvas>
      </div>
    </div>
  );
}
