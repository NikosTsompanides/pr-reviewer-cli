export function trimDiff(diff: string, maxLines: number = 100): string {
  const lines = diff.split("\n");
  if (lines.length > maxLines) {
    return lines.slice(0, maxLines).join("\n") + "\n[Diff truncated...]";
  }
  return diff;
}
