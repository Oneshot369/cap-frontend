import type { LocationObject } from './locationObject'

/* eslint-disable prefer-const */
export interface UserObject {
  id: Number
  username: string
  firstName: string
  lastName: string
  age: number
  lastLogin: string
  locations: [LocationObject]
}
