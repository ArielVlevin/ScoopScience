export function calculateOverrun(
  volumeMix: number,
  volumeIceCream: number
): number {
  if (volumeMix <= 0 || volumeIceCream <= 0) {
    throw new Error("Volumes must be greater than zero.");
  }

  const overrun = ((volumeIceCream - volumeMix) / volumeMix) * 100;
  return overrun;
}
