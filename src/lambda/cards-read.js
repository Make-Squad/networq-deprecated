require('dotenv').config()

var faunadb = require('faunadb'),
  q = faunadb.query

var getId = urlPath => {
  return urlPath.match(/([^\/]*)\/*$/)[0]
}

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

export function handler(event, context, callback) {
  console.log(event)
  let id = getId(event.path)
  console.log(`Function 'cards-read' invoked. Read id: ${id}`)
  if (id.indexOf('%20') !== -1) {
    id = decodeURI(id)
    return client
    .query(q.Paginate(q.Match(q.Ref('indexes/cards_by_name'), id)))
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
  } else {
    return client
    .query(q.Get(q.Ref(`classes/cards/${id}`)))
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
        body: JSON.stringify(error),
      })
    })
  }
}
