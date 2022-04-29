import { model, Schema } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'
import { IUserDocument } from '../types/user.type'
import Offer from './Offer'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    offerIds: {
      type: [String],
      default: [],
    },
    requestIds: {
      type: [String],
      default: [],
    },
    authProvider: {
      // 'google'
      type: String,
    },
    providerId: {
      type: String,
    },
    providerData: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
)

userSchema.virtual('Offers', {
  ref: Offer,
  localField: 'OfferIds',
  foreignField: '_id',
  justOne: false,
  autopopulate: true,
})

userSchema.virtual('Requests', {
  ref: Offer,
  localField: 'RequestIds',
  foreignField: '_id',
  justOne: false,
  autopopulate: true,
})

userSchema.plugin(autopopulate)

export default model<IUserDocument>('User', userSchema)
