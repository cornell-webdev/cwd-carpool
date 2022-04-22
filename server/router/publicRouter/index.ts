import express from 'express'
import authRouter from './authRouter'
import offerRouter from './offerRouter'

const publicRouter = express.Router()

publicRouter.use('/auth', authRouter)
publicRouter.use('/offer', offerRouter)

export default publicRouter
