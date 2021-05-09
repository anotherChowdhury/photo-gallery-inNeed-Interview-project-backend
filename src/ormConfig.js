import { Sequelize } from 'sequelize'

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './photos.sqlite',
  logging: false
})

export default db
