const { ApolloServer, gql } = require('apollo-server')
const { v4: uuid } = require('uuid')
require('dotenv').config()
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const typeDefs = require('./typeDefs')
// const resolvers = require('./resolvers')


const { books, authors } = require('./testData')
// Initialise MongoDB if empty
// authors.map(async(author) => {
//   const newAuthor = new Author(author)
//   await newAuthor.save()
// })
// books.map(async (book) => {
//   const author = await Author.findOne({ name: book.author })
//   const newBook = new Book({ ...book, author: author })
//   await newBook.save()
// })

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filteredBooks = await Book.find({}).populate('author')
      if (args.author) {
        filteredBooks = filteredBooks.filter(book => book.author.name===args.author)
      }
      if (args.genre) {
        filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre))
      }
      return filteredBooks
    },
    allAuthors: async () =>  await Author.find({})
  },
  Author: {
    bookCount: async (root) => await Book.collection.countDocuments({ author: root._id })
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorExists = await Author.findOne({ name: args.author })
      if (!authorExists) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
      }

      const author = await Author.findOne({ name: args.author })
      const newBook = new Book({ ...args, author: author._id })
      await newBook.save()
      return newBook
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo },{ new: true })
      if (!author) {
        return null
      }
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})