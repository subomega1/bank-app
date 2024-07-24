import express from 'express'
import {protectAdminRoute} from '../midleware/protectAdmin.js'
import { getUsersForAdmin } from '../controller/getUsersForAdminController.js'

const router = express.Router()

router.get('/', protectAdminRoute, getUsersForAdmin)

export default router