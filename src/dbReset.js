import User from './models/users.model'
import Album from './models/albums.model'
import Photo from './models/photos.model'

import db from './ormConfig'
import sequelize, { Op } from 'sequelize'

async function dbReset() {
  try {
    await db.sync({ force: true })
    console.log('tables created')
  } catch (err) {
    console.log(err)
  }
}

dbReset()
