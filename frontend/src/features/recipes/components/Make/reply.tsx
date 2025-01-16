import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import PageBox from "@/components/pages/pageBox";

const CompletionForm = () => {
  const [rating, setRating] = useState(0);

  return (
    <PageBox className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Recipe Completion</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="image-upload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload an image of your result:
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
          />
        </div>
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Add a comment or feedback:
          </label>
          <Textarea id="comment" placeholder="Your thoughts on the recipe..." />
        </div>
        <div>
          <p className="block text-sm font-medium text-gray-700 mb-2">
            Rate the recipe:
          </p>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer ${
                  star <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <Button className="w-full">Submit</Button>
      </div>
    </PageBox>
  );
};

export default CompletionForm;
