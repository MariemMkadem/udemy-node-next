import User from '../models/user';
import { hashPassword, comparePassword } from '../utils/auth';
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name) return res.status(400).send('Name is required')
    if (!password || password.length < 6) {
      return res.status(400).send("Password is required and should be min 6 characters long")
    }
    let userExsist = await User.findOne({ email }).exec()
    if (userExsist) return res.status(400).send("Email is taken")

    //hashPassword 
    const hashedPassword = await hashPassword(password)

    //register
    const user = await new User({
      name,
      email,
      password: hashedPassword
    }).save()
    console.log(user)

    return res.json({ ok: true })

  }
  catch (err) {
    console.log(err);
    return res.status(400).send('Error,Try again')
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).exec()
    if (!user) return res.status(400).send('No user found')

    const match = await comparePassword(password, user.password)

    //create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    })

    //return user and token to client , exculde hashed password
    user.password = undefined;

    //send token in cookie 
    res.cookie('token', token, {
      httpOnly: true,
      // secure: true, // only works in https
    })
    res.json(user)

  }
  catch (err) {
    console.log(err)
    return res.status(400).send('Error. Try again')

  }


}

export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.json({ message: 'Sign out success' })
  }
  catch (err) {
    console.log(err)
  }

}