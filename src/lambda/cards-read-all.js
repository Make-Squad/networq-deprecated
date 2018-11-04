require('dotenv').config()

var faunadb = require('faunadb'),
  q = faunadb.query

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

export function handler(event, context, callback) {
  console.log('Function `cards-read-all` invoked')
  return client
    .query(q.Paginate(q.Match(q.Ref('indexes/all_cards'))))
    .then(response => {
      const cardRefs = response.data
      console.log('Cards refs', cardRefs)
      console.log(`${cardRefs.length} cards found`)
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getAllTodoDataQuery = cardRefs.map(ref => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllTodoDataQuery).then(ret => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret),
        })
      })
    })
    .catch(error => {
      console.log('error', error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      })
    })
}
