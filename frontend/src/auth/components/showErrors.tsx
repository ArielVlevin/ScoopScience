import { Card, CardContent, CardTitle } from "@/components/ui";
import { CircleAlertIcon, TriangleAlertIcon } from "lucide-react";

type ShowErrorsProps = {
  errors: { [key: string]: string };
};
export function ShowErrors({ errors }: ShowErrorsProps) {
  return (
    <>
      {errors.email || errors.password || errors.username ? (
        <Card className="w-full max-w-md rounded-md  shadow shadow-red-900 ">
          <div className="flex gap-2">
            <div className="flex items-center justify-center ml-4">
              <TriangleAlertIcon className="size-7 text-red-700 " />
            </div>
            <div className="mt-4">
              <CardTitle className="text-red-700 text-lg  ">Errors</CardTitle>

              <CardContent>
                {errors.username && (
                  <div className="flex gap-2 size-full mb-2">
                    <div className="flex items-center justify-center ">
                      <CircleAlertIcon className="size-3 text-red-700" />
                    </div>
                    <p className="text-gray-500 text-sm ">{errors.username}</p>
                  </div>
                )}
                {errors.email && (
                  <div className="flex gap-2 size-full mb-2">
                    <div className="flex items-center justify-center ">
                      <CircleAlertIcon className="size-3 text-red-700" />
                    </div>
                    <p className="text-gray-500 text-sm ">{errors.email}</p>
                  </div>
                )}
                {errors.password && (
                  <div className="flex  gap-2 size-full mb-2">
                    <div className="flex items-center justify-center ">
                      <CircleAlertIcon className="size-3 text-red-700" />
                    </div>
                    <p className="text-gray-500 text-sm ">{errors.password}</p>
                  </div>
                )}
              </CardContent>
            </div>
          </div>
        </Card>
      ) : null}
    </>
  );
}
