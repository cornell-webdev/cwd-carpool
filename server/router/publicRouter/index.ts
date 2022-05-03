import express from 'express'
import authRouter from './authRouter'
import offerRouter from './offerRouter'
import requestRouter from './requestRouter'

const publicRouter = express.Router()

publicRouter.use('/auth', authRouter)
publicRouter.use('/offer', offerRouter)
publicRouter.use('/request', requestRouter)

export default publicRouter
