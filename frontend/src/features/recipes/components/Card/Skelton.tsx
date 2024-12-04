import { cardClass } from "./style";

const SkeltonCard = () => {
  return (
    <div className={cardClass}>
      <div className="animate-pulse">
        <div className="bg-gray-200 h-40 rounded-lg"></div>

        <div className="p-4 flex flex-col gap-4 ">
          <div className="grid   grid-cols-2 gap-4">
            <div className="bg-gray-200 h-5 rounded-lg "></div>
            <div className="bg-gray-200 h-5 rounded-lg"></div>
          </div>
          <div>
            <div className="bg-gray-200 h-8 rounded-lg mb-2"></div>
            <div className="bg-gray-200 h-5 rounded-lg "></div>
          </div>
          <div className="grid   grid-cols-5 gap-4">
            <div className="bg-gray-200 h-5 rounded-lg"></div>
            <div className="bg-gray-200 h-5 rounded-lg"></div>
            <div className="bg-gray-200 h-5 rounded-lg"></div>
            <div className="bg-gray-200 h-5 rounded-lg"></div>
            <div className="bg-gray-200 h-5 rounded-lg"></div>
          </div>
          <div>
            <div className="bg-gray-200 h-8 rounded-lg mb-2"></div>
            <div className="bg-gray-200 h-8 rounded-lg mb-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeltonCard;
