import express from 'express'
import Offer from '../../models/Offer'

const offerRouter = express.Router()

offerRouter.post('/', async (req, res) => {
  try {
    const offer = await new Offer({
      ...req.body,
      userId: req.user?._id,
    }).save()
    res.send(offer)
  } catch (e) {
    res.status(500).send(e)
  }
})

// offerRouter.get('/', async (req, res) => {
//   try {
//     const linkedOrgs = await Org.find({ linkedUserIds: req.user?._id })
//     const linkedEventQueries = linkedOrgs?.map((org) => ({
//       orgId: org?._id,
//     }))
//     const query = { $or: [{ userId: req.user?._id }, ...linkedEventQueries] }
//     const myEvents = await Event.find(query).sort({ createdAt: -1 })
//     res.send(myEvents)
//   } catch (e) {
//     res.status(500).send(e)
//   }
// })

// offerRouter.get('/liked-events', async (req, res) => {
//   try {
//     const events = await Event.find({ likedUserIds: req.user?._id })
//     res.send(events)
//   } catch (e) {
//     res.status(500).send(e)
//   }
// })

offerRouter.delete('/', async (req, res) => {
  try {
    const result = await Offer.findByIdAndDelete(req?.body?._id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

offerRouter.put('/:id/update', async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(offer)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default offerRouter
