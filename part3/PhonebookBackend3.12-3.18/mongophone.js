const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb://phonebook:${password}@192.168.30.188:27017/phonebook`

const add_phonebook = (name, number) => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  const Phonebook = mongoose.model('Phonebook', phoneSchema)
  const phonebook = new Phonebook({
    name: name,
    number: number,
  })
  phonebook.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
}

const list_phonebook = () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  const Phonebook = mongoose.model('Phonebook', phoneSchema)
  Phonebook.find({}).then(result => {
    result.forEach(phonebook => {
      console.log(phonebook.name, phonebook.number)
    })
    mongoose.connection.close()
  })
}

if ( process.argv.length === 3 ) {
  console.log('phonebook:')
  list_phonebook()
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  add_phonebook(name, number)
} else {
  console.log('Please provide the full arguments: node mongo.js <password> <name> <number>')
  process.exit(1)
}