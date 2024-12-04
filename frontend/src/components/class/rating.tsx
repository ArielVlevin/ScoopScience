import { Rating } from "@smastrom/react-rating";

type RatingWithAmountProps = {
  value?: number;
  style?: React.CSSProperties;
  amount?: number;
};

export function RatingWithAmount({
  value = 5,
  style = { maxWidth: 80 },
  amount = 0,
}: RatingWithAmountProps) {
  return (
    <div className="flex ">
      <Rating style={style} value={value} readOnly />
      <span className="text-gray-500 text-[11px] text-center ">({amount})</span>
    </div>
  );
}
