import db from '../ormConfig'
import { STRING, BIGINT } from 'sequelize'

import Album from '../models/albums.model'

console.log('In phootos')

const Photos = db.define(
  'photos',
  {
    pid: { type: BIGINT, autoIncrement: true, primaryKey: true },
    image_link: { type: STRING, allowNull: false }
  },
  {
    indexes: [
      {
        unique: false,
        fields: ['album_id']
      }
    ]
  }
)

Album.hasMany(Photos, { foreignKey: 'album_id' })
Photos.belongsTo(Album, { foreignKey: 'album_id' })

// Photos.options = {
// indexes: [
//   {
//     unique: 'false',
//     fields: ['album_id']
//   }
// ]
// }

export default Photos
