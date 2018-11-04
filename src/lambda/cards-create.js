require('dotenv').config()
var faunadb = require('faunadb'),
  q = faunadb.query

/* configure faunaDB Client with our secret */
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

/* export our lambda function as named "handler" export */
export function handler(event, context, callback) {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body)
  console.log('Function `cards-create` invoked', data)
  const cardItem = {
    data: data,
  }
  /* construct the fauna query */
  return client
    .query(q.Create(q.Ref('classes/cards'), cardItem))
    .then(response => {
      console.log('success', response)
      /* Success! return the response with statusCode 200 */
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      })
    })
    .catch(error => {
      console.log('error', error)
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      })
    })
}
