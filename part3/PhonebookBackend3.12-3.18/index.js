require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
const Person = require('./models/person')
const { response } = require('express')




morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
morgancustom = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req, res),
  ].join(' ')
})
app.use(morgancustom)





// app.get('/',(req, res) => {
//   res.send('<h1>Hello World!!!</h1>')
// })

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info', (req, res, next) => {
  reqtime = new Date()
  Person.find({}).count()
    .then(count => {
      res.send(
        `<p>Phonebook has info ${count} people</p>
        <p>${reqtime}</p>`
      )
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (req, res, next) => {
  // const id = Number(req.params.id)
  Person.findById(req.params.id)
    .then(person => {
      if (person){
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }
  //  else if (persons.find(person => person.name === body.name)) {
  //   return res.status(400).json({
  //     error: 'name must be unique!'
  //   })
  // }
  // id = Math.floor(Math.random() * Math.floor(100000))
  // const person = {
  //   name: body.name,
  //   number: body.number,
  //   id,
  // }
  // persons = persons.concat(person)
  // res.json(person)
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savePerson => {
    res.json(savePerson)
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatePerson => {
      res.json(updatePerson)
    })
    .catch(error => next(error))
})


const unkownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unkown endpoint'})
}

app.use(unkownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id'})
  }
  next(error)
}
app.use(errorHandler)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
