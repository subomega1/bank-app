import jwt from 'jsonwebtoken'

const generateToken = (userId,res) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
    res.cookie('token', token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
       
    })
    
}

export default generateToken