import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'




import authRoutes from './Routes/auth.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js'
import adminRoutes from './Routes/admin.routes.js'
import paymentRoutes from './Routes/payment.routes.js'
import userRoute from './Routes/user.routes.js'

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());



dotenv.config()
app.use("/api/auth",authRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/payment",paymentRoutes)
app.use("/api/users",userRoute)




// access http://localhost:5000/


app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`server working  on PORT ${PORT}`)

})