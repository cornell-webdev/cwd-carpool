import { Document } from 'mongoose'

export interface IOfferDocument extends Document, IOffer {}

export interface IRideDate {
  date: Date
  startTime: string
  endTime: string
}

export interface IOffer {
  userId?: string
  location: string[]
  destination: string[]
  isRoundTrip: Boolean
  dates: IRideDate[]
  expCompensation: String
  details: string
  views: number
  AttendUserIds: string[]
  numSpots: number
  checkInInstructions?: string
}
