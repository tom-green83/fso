const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const typeDefs = require('./typeDefs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.SECRET
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()


// Initialise MongoDB if empty
// const { books, authors } = require('./testData')
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
    allAuthors: async () =>  await Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: async (root) => await Book.collection.countDocuments({ author: root._id })
  },
  Book: {
    author: async (root) => await Author.findById(root.author)
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const authorExists = await Author.findOne({ name: args.author })
      if (!authorExists) {
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }

      const author = await Author.findOne({ name: args.author })
      const newBook = new Book({ ...args, author: author._id })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo },{ new: true })
      if (!author) {
        throw new UserInputError('author not found', { invalidArgs: args })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (user) {
        throw new UserInputError('username already exists', { invalidArgs: args })
      }
      const newUser = new User({ ...args })
      try {
        newUser.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return newUser
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'password') {
        throw new UserInputError('invalid credentials', { invalidArgs: args })
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})