import Jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {

    const token = req.cookies.token
  
    if (!token) {
        return res.status(401).json({ success: false, message: 'token not found' })
    }

    try {
        const decode_token = Jwt.verify(token, process.env.JWT_SECRET)
        req.email = decode_token.email
        req.id = decode_token.id

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: 'token expair login again' })
    }
}

export default authMiddleware