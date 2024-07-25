import { IceCreamConeIcon } from "@/components/icons/icon";

export default function Loading() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background">
      <div className="relative h-32 w-32 animate-bounce">
        <div className="absolute inset-0 flex items-center justify-center">
          <IceCreamConeIcon className="h-20 w-20 text-primary" />
        </div>
      </div>
      <p className="mt-4 text-muted-foreground animate-pulse">Loading...</p>
    </div>
  )
}