

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-80 bg-white flex justify-center items-center z-50 backdrop-blur-8" id="loadingOverlay">
      <div className="border-8 border-solid border-gray-300 border-t-8  rounded-full w-12 h-12 animate-spin"></div>
    </div>
  );
}
