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
export function generateMockHistory(
  n: number,
  N: number,
  startTime: number,
  valueRange: [number, number]
): number[][] {
  return Array.from({ length: n }, (_, t) => {
    // 计算时间戳，这里是线性地生成时间戳
    const timestamp = startTime + t * 1000 // 假设时间步长为1000毫秒（1秒）

    // 为每个时间戳生成一个值（比如正态分布的值）
    const mean = valueRange[0] + (t / (n - 1)) * (valueRange[1] - valueRange[0])
    const sigma = 0.6

    return Array.from({ length: N }, (_, i) => {
      // 计算每个时间点的值，这里使用与时间相关的函数，模拟历史数据
      const x = -5 + (i / (N - 1)) * 10
      const p = Math.exp(-((x - mean) ** 2) / (2 * sigma ** 2))
      return p
    })
  })
}
