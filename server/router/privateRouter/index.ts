import express from 'express'
import passport from 'passport'
import userRouter from './userRouter'
import offerRouter from './offerRouter'
import requestRouter from './requestRouter'

const privateRouter = express.Router()

// authorization
privateRouter.use(passport.authenticate('jwt', { session: false }))

// routes
privateRouter.use('/user', userRouter)
privateRouter.use('/offer', offerRouter)
privateRouter.use('/request', requestRouter)

export default privateRouter
