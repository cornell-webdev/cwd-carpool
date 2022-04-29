import { Document } from 'mongoose'
import {IRideDate} from './offer.type'
export interface IRequestDocument extends Document, IRequest {}

export interface IRequest {
  userId?: string
  location: string[]
  destination: string[]
  isRoundTrip: Boolean
  dates: IRideDate[]
  compensation: String
  numPeople: number
  details: string
  views: number
  rideFound: Boolean
  checkInInstructions?: string
}
