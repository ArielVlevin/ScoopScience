const SkeltonRecipeDetail = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full bg-gray-200 h-48 rounded-lg mb-6"></div>{" "}
      {/* Recipe Header */}
      <div className="grid md:grid-cols-2 gap-6 w-full mb-6">
        <div className="bg-gray-200 h-96 w-full rounded-lg"></div>{" "}
        {/* Recipe Image */}
        <div className="w-full h-full flex flex-col gap-4">
          <div className="bg-gray-200  h-full w-full rounded-lg"></div>{" "}
          {/* Ingredients */}
          <div className="bg-gray-200 h-10 w-full rounded-lg"></div>{" "}
          {/* Button 1 */}
          <div className="bg-gray-200 h-10 w-full rounded-lg"></div>{" "}
          {/* Button 2 */}
        </div>
      </div>
      <div className="bg-gray-200 h-64 w-full rounded-lg mb-6"></div>{" "}
      {/* Recipe Charts */}
      <div className="grid md:grid-cols-2 gap-6 w-full">
        <div className="bg-gray-200 h-96 w-full rounded-lg"></div>{" "}
        {/* Nutrition Table */}
        <div className="bg-gray-200 h-96 w-full rounded-lg"></div>{" "}
        {/* Recipe Instructions */}
      </div>
    </div>
  );
};

export default SkeltonRecipeDetail;
