export const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 z-50">
      <div className="text-center">
        {/* Animated circles */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600 animate-spin"></div>
          </div>
        </div>

        {/* Website name */}
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Ceylonway
          </span>
        </h1>

        {/* Loading text */}
        <p className="text-gray-600 text-sm tracking-widest uppercase">
          Loading your experience
        </p>

        {/* Animated dots */}
        <div className="mt-6 flex justify-center gap-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
};
