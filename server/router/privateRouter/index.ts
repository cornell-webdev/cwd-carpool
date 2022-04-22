import express from 'express'
import passport from 'passport'
import userRouter from './userRouter'
import offerRouter from './offerRouter'
import orgRouter from './orgRouter'
import ticketRouter from './ticketRouter'

const privateRouter = express.Router()

// authorization
privateRouter.use(passport.authenticate('jwt', { session: false }))

// routes
privateRouter.use('/user', userRouter)
privateRouter.use('/offer', offerRouter)
privateRouter.use('/org', orgRouter)
privateRouter.use('/ticket', ticketRouter)

export default privateRouter
