import User from '../models/users.model'
import bcrypt from 'bcrypt'
import ErrorWithStatus from './error.service'

export const register = async (name, email, password) => {
  const isRegistered = await getUserByEmail(email)
  if (isRegistered) throw new ErrorWithStatus('User is already regisered', 400)
  const hashedPassword = await bcrypt.hash(password, 12)
  return await User.create({
    name,
    email,
    password: hashedPassword
  })
}

export const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } })
}

export const getUserById = async (id) => {
  return await User.findByPk(id)
}

export const login = async (email, password) => {
  const user = await getUserByEmail(email)
  if (!user) throw new ErrorWithStatus('Wrong Credentials', 400)

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new ErrorWithStatus('Wrong Credentials', 400)

  return user.uid
}
