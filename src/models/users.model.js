import db from '../ormConfig'

console.log('In user')

const Users = db.define(
  'users',
  {
    uid: { type: db.Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: db.Sequelize.STRING(50) },
    email: { type: db.Sequelize.STRING(100), unique: true },
    password: { type: db.Sequelize.STRING }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  }
)

export default Users
