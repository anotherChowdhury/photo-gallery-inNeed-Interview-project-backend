import db from '../ormConfig'
import User from './users.model'

console.log('In almubs')

const Albums = db.define(
  'albums',
  {
    aid: { type: db.Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: db.Sequelize.STRING, allowNull: true },
    description: { type: db.Sequelize.STRING, allowNull: true },
    is_public: { type: db.Sequelize.BOOLEAN, allowNull: false, defaultValue: true }
  },
  {
    indexes: [
      {
        unique: false,
        fields: ['user_id']
      }
    ]
  }
)

User.hasMany(Albums, { foreignKey: 'user_id' })
Albums.belongsTo(User, { foreignKey: 'user_id' })

// Albums.options = {
//   indexes: [
//     {
//       unique: 'false',
//       fields: ['user_id']
//     }
//   ]
// }

export default Albums
