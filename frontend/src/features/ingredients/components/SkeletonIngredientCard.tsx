const SkeletonModal = () => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg">
      <div className="animate-pulse">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gray-600 h-12 w-12 rounded-full"></div>
          <div className="flex flex-col gap-2">
            <div className="bg-gray-600 h-5 w-32 rounded"></div>
            <div className="bg-gray-600 h-4 w-16 rounded"></div>
          </div>
        </div>

        {/* Divider */}
        <div className="bg-gray-600 h-[2px] w-full my-4 rounded"></div>

        {/* Nutritional Information Section */}
        <div>
          <div className="bg-gray-600 h-6 w-48 rounded mb-2"></div>
          <div className="bg-gray-600 h-4 w-32 rounded mb-4"></div>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-600 h-8 w-full rounded-lg"
              ></div>
            ))}
          </div>
        </div>

        {/* Allergens Section */}
        <div className="mt-6">
          <div className="bg-gray-600 h-6 w-24 rounded mb-4"></div>
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-600 h-12 w-12 rounded-full"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonModal;
