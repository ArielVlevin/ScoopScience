import { postData } from "@/services/apiFunctions";

type postRatingProps = {
  _id: number;
  ratingValue: number;
};
type data = postRatingProps;
export function postRating(data: data, id: number) {
  const axi = `/recipes/id/${id}/rate`;
  return postData<data>(axi, data);
}
