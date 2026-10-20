export default function Home() {
  function getChatrooms() {
    return <div>Hello</div>
  }
  return (
    <div className="flex flex-col flex-1 bg-mauve-400 font-sans justify-center">
      <div className="bg-linear-to-b from-blue-400 via-blue-700 to-blue-800 p-6"/>
      <div className="flex items-center justify-center">
        {getChatrooms()}
      </div>
      <div className="bg-linear-to-b from-blue-800 via-blue-700 to-blue-400 p-6 flex justify-center items-center space-x-5">
        <button className="">Go back</button>
        <button className="text-black font-mono border-white border bg-linear-to-b from-gray-500 to-white">Join</button>
      </div>
    </div>
  );
}
