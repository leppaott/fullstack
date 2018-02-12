const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)
