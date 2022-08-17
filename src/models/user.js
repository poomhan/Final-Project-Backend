const {Schema} = require("mongoose");
const mongoose = require("mongoose");
const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  birthdate: Date,
  gender: String,
  height: Number,
  weight: Number
}, {
  timestamps: true,
  _id: true,
  methods: {
    me (cb) {
      return mongoose.model('users').findOne({ email: this.email }, cb)
    },
    async createUser () {
      const model = mongoose.model('users')
      const user = await model.findOne({ email: this.email })
      if (user) throw new Error(`email (${this.email}) has profile already`)
      return model.create({ email: this.email, name: this.name })
    }
  },
  statics: {
    async updateUser (email, { name, birthdate, gender, height, weight }) {
      return this.updateOne({email}, { name, birthdate, gender, height, weight })
    }
  }
})

const User = mongoose.model('users', userSchema)

module.exports = User
