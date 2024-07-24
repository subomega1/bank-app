import express from 'express'
import { login , logout } from '../controller/authcontroller.js'
import { verifyOtp } from '../controller/verify-otpController.js'

const router = express.Router()

router.post('/login', login )
router.post('/verify-otp', verifyOtp )
router.post('/logout', logout )


export default router
