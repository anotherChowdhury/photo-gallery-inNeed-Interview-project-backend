class Crud {
  constructor(model) {
    this.model = model
  }

  async create(args) {
    return await this.model.create(args)
  }

  async getById(id) {
    return await this.model.findbyPK(id)
  }

  async update(conditions, updatedFields) {
    return await this.model.update(updatedFields, conditions)
  }

  async delete(id) {
    const obj = await this.getById(id)
    if (!obj) throw new Error('Not Found')
    return await obj.destroy()
  }

  async get(conditions) {
    return await this.model.findAll(conditions)
  }
}

export default Crud
