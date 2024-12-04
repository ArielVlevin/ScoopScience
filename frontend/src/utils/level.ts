export function getLevelColor(level: string) {
  switch (level) {
    case "Low":
      return "bg-green-500";
    case "Medium":
      return "bg-yellow-500";
    case "High":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}
