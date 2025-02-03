import type { LocationObject } from './locationObject'

/* eslint-disable prefer-const */
export interface UserObject {
  id: Number
  firstName: string
  lastName: string
  age: number
  lastLogin: string
  locations: [LocationObject]
}
