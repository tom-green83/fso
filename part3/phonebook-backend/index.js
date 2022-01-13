require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(express.json())
morgan.token('req_body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req_body'))
app.use(cors())
app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
    
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      const responseText = `
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
        `
      response.send(responseText)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).json({error: 'ID not found'})
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then( () => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const newPerson = {number: request.body.number}
  Person.findByIdAndUpdate(id, newPerson, { new: true, runValidators: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        return response.status(400).json({
          error: 'Person has already been removed from phonebook'
        })
      }        
    })
    .catch(error => {
      console.log('not found')
      next(error)
    })
})

// Unknown endpoint handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}  
app.use(unknownEndpoint)

// Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)  
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}  
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})