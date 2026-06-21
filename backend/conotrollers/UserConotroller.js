import userModel from "../modles/UserModel.js";
import Jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt from 'bcrypt'


const createToken = (id, email) => {
    return Jwt.sign({ id: id, email: email }, process.env.JWT_SECRET)
}

const singIn = async (req, res) => {


    try {
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter valid email" })
        }

        const existUser = await userModel.findOne({ email: email })
        if (existUser) {
            return res.json({ success: false, message: "user already exist" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            email: email,
            password: hashPassword
        })

        await newUser.save()
        const token = createToken(newUser._id, newUser.email)
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.json({ success: true, message: 'singin successfull', token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }
}

const login = async (req, res) => {

    const { email, password } = req.body

    try {
        const existUser = await userModel.findOne({ email: email })

        if (!existUser) {
            return res.json({ success: false, message: "User Not Exist" })
        }

        const checkPassword = await bcrypt.compare(password, existUser.password)
        if (!checkPassword) {
            return res.json({ success: false, message: "Password is wrong" })
        }
        const token = createToken(existUser._id, existUser.email)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.json({ success: true, message: 'login successfull' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }
}


const logout = async (req, res) => {

    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.json({ success: true, message: `${req.email} logout` })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }
}

const check = async (req, res) => {
    const id = req.id

    try {
        const user = await userModel.findById(id)
        const email = user.email
        res.json({ success: true, email: email })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "some error" })
    }

}


export { singIn, login, check, logout }