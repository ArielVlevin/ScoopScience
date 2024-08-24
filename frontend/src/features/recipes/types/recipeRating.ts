export type RecipeRating = {
  likes: number;
  likesUsers: [{ user_id: number }];
  ratingValue: number;
  ratingAmount: number;
  ratingUsers: [
    {
      user_id: number;
      ratingValue: number;
    }
  ];
};
