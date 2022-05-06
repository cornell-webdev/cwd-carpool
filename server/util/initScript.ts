import verifyDatabase from './verifyDatabase'

export default async () => {
  if (process.env.NODE_ENV !== 'development') {
    try {
      await verifyDatabase()
    } catch (error) {
      console.log('*** Error in production init script', error)
    }
  }
}
