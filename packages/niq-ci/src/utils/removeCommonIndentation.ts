export function removeCommonIndentation(input: string): string {
  // We can't do this here else we'll destroy the indentation for the first
  // line, which may not start at 0.
  // input = input.trim()

  // Split into lines
  const lines = input.split('\n')

  // Find minimum indentation
  let minIndentation = Infinity
  for (const line of lines) {
    if (line.trim().length === 0) {
      // Skip empty lines
      continue
    }
    const indentation = line.search(/\S/)
    if (indentation < minIndentation) {
      minIndentation = indentation
    }
  }
  // Remove common indentation from each line
  const joined = lines.map(line => line.slice(minIndentation)).join('\n')
  // Trim in the final step
  return joined.trim()
}
