import type { ConstraintObject } from '@/stores/interface/constraint'

/* eslint-disable prefer-const */
export interface LocationObject {
  id: number
  lon: number
  lat: number
  name: string
  constraints?: [ConstraintObject]
}
