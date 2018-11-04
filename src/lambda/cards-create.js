require('dotenv').config()

var faunadb = require('faunadb'),
  q = faunadb.query

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

export function handler(event, context, callback) {
  const data = JSON.parse(event.body)
  console.log('Function `cards-create` invoked', data)
  const cardItem = {
    data: data,
  }

  return client
    .query(q.Create(q.Ref('classes/cards'), cardItem))
    .then(response => {
      console.log('success', response)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      })
    })
    .catch(error => {
      console.log('error', error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify('There was an error, check the logs.'),
      })
    })
}
