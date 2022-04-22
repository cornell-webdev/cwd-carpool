import { model, Schema } from 'mongoose'
import { IOfferDocument } from '../types/offer.type'
import User from './User'

const offerSchema = new Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    dates: {
      type: [
        {
          date: {
            type: Date,
            required: true,
          },
          startTime: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 4,
          },
          endTime: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 4,
          },
        },
      ],
      required: true,
    },
    details: {
      type: String,
      default: '',
    },
    imgs: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    attendUserIds: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

offerSchema.virtual('AttendUsers', {
  ref: User,
  localField: 'AttendUserIds',
  foreignField: '_id',
  justOne: false,
  autopopulate: true,
})

offerSchema.virtual('user', {
  ref: User,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

offerSchema.plugin(require('mongoose-autopopulate'))

export default model<IOfferDocument>('Offer', offerSchema)
