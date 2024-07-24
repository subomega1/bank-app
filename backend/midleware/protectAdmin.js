import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'



export const protectAdminRoute = async (req, res, next) => {

    try {
        const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" })
    }    
      const decoded =jwt.verify(token, process.env.JWT_SECRET)
      if (!decoded) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" })
    }
       const user = await User.findById(decoded.userId).select("-password")
       if (!user) {
        return res.status(401).json({ error: "user not found" })
    }
        if (user.role !== "admin") {
            return res.status(401).json({ error: "Unauthorized admin" })
        }
    
        req.user = user
        next()

        
    } catch (error) {
        console.log("error in protectRoute", error.message)
        return res.status(401).json({ error: "Unauthorized" })
        
    }


}