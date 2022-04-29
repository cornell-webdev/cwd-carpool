import express from 'express'
import Offer from '../../models/Offer'
import endOfDay from 'date-fns/endOfDay'
import startOfDay from 'date-fns/startOfDay'
import User from '../../models/User'
import { IOffer } from '../../types/offer.type'
import sendTicketEmail from '../../util/email/sendTicketEmail'

const offerRouter = express.Router()

// offerRouter.get('/trending', async (req, res) => {
//   try {
//     const docs = await Event.find({
//       dates: {
//         $elemMatch: {
//           date: {
//             $gte: startOfDay(new Date()),
//           },
//         },
//       },
//     })
//       .sort({ likedUserIds: -1 })
//       .limit(10)
//     res.send(docs)
//   } catch (e) {
//     res.status(500).send(e)
//   }
// })

offerRouter.get('/search', async (req, res) => {
  try {
    if (!req.query?.query || req.query.query === '') {
      res.send([])
    } else {
      const users = await User.find({
        name: { $regex: req.query.query as string, $options: 'i' },
      })
      const uniqueOffers: IOffer[] = []
      const offerIds: { [id: string]: boolean } = {}
      const userPromises = users.map(async (user) => {
        const offers = await Offer.find({ userId: user?._id })
        offers?.forEach((offer) => {
          offerIds[offer?._id.toString()] = true
          uniqueOffers.push(offer)
        })
      })
      await Promise.all(userPromises)
      const offers = await Offer.find({
        $or: [
          // { details: { $regex: req.query.query as string, $options: 'i' } },
          { title: { $regex: req.query.query as string, $options: 'i' } },
          { location: { $regex: req.query.query as string, $options: 'i' } },
        ],
      })
      offers.forEach((offer) => {
        if (!offerIds[offer?._id.toString()]) {
          uniqueOffers.push(offer)
        }
      })
      res.send(uniqueOffers)
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

offerRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Offer.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

offerRouter.get('/', async (req, res) => {
  try {
    const dateQuery = req.query.date
      ? {
          dates: {
            $elemMatch: {
              date: {
                $gte: startOfDay(new Date(req.query.date as string)),
                $lt: endOfDay(new Date(req.query.date as string)),
              },
            },
          },
        }
      : {}

    const tagQuery =
      req.query.tagId !== 'undefined'
        ? {
            tagId: req.query.tagId as string,
          }
        : {}

    const query = {
      ...dateQuery,
      ...tagQuery,
    }

    const docs = await Offer.find(query).sort({ isTicketed: -1 })
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

offerRouter.put('/:id', async (req, res) => {
  try {
    const doc = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

offerRouter.delete('/', async (req, res) => {
  try {
    const result = await Offer.findByIdAndDelete(req.body)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

offerRouter.post('/increment-views', async (req, res) => {
  try {
    const event = await Offer.findById(req.body._id)
    if (event) {
      const doc = await Offer.findByIdAndUpdate(
        req.body._id,
        { views: event.views + 1 },
        {
          new: true,
        }
      )
      res.send(doc)
    } else {
      res.status(400).send('Invalid event id')
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

export default offerRouter
