import { Document } from 'mongoose'

export interface IOfferDocument extends Document, IOffer {}

export interface IRideDate {
  date: Date
  startTime: string
  endTime: string
}

export interface IOffer {
  userId?: string
  title: string
  location: string
  destination: string
  dates: IRideDate[]
  details: string
  imgs: string[]
  views: number
  AttendUserIds: string[]
  checkInInstructions?: string
}
