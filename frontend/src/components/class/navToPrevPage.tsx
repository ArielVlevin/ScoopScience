import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "../icons/icon";

const BackToPrevPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <div
      className="flex items-center mb-2 cursor-pointer text-gray-500 hover:text-gray-700 font-medium "
      onClick={handleBack}
    >
      <ArrowLeftIcon className="size-4" />
      <a className="text-sm ">Back</a>
    </div>
  );
};

export default BackToPrevPage;
