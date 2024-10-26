/* eslint-disable prefer-const */
export interface ForecastObject {
  labels: string[]
  datasets: [
    {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: string
    }
  ]
}
