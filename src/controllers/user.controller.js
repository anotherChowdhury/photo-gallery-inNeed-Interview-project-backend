import ErrorWithStatus from '../services/error.service'
import { createAccessToken } from '../services/token.service'
import * as userService from '../services/user.service'

export const register = async (req, res, next) => {
  const { name, email, password } = req.body

  if (!email || !name || !password) throw new ErrorWithStatus('name,email,passwod field is required', 400)

  try {
    await userService.register(name, email, password)
    res.status(201).json({
      message: 'User successfully registered'
    })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) throw new ErrorWithStatus('email,passwod field is required', 400)

  try {
    const userId = await userService.login(email, password)
    const accessToken = createAccessToken(userId)
    res.status(200).json({ accessToken, userId })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
