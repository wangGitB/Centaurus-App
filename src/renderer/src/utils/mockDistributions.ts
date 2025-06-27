export function generateMockDistributions(n: number, N: number): number[][] {
  return Array.from({ length: n }, (_, t) => {
    const mean = -2 + (t / (n - 1)) * 4
    const sigma = 0.6
    return Array.from({ length: N }, (_, i) => {
      const x = -5 + (i / (N - 1)) * 10
      const p = Math.exp(-((x - mean) ** 2) / (2 * sigma ** 2))
      return p
    })
  })
}
