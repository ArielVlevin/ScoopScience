import { HeartIcon } from "@/components/icons/icon";

type CardImgProps = {
  src: string;
  alt?: string;
  onHeartClick: () => void;
  isHeartFilled?: boolean;
};

export const CardImg: React.FC<CardImgProps> = ({
  src,
  alt,
  onHeartClick,
  isHeartFilled = false,
}) => {
  return (
    <div className="relative">
      <div className="w-full h-auto aspect-video">
        <img
          loading="lazy"
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <button
        onClick={onHeartClick}
        className="absolute top-4 right-4 text-red-500"
        aria-label="Favorite"
      >
        <HeartIcon className="w-6 h-6" fill={isHeartFilled ? "red" : "none"} />
      </button>
    </div>
  );
};
