const http = require('http')
const heroRoutes = require('./routes/hero.route')
const httpConfig = require('./../httpConfig')



const routes = {
  ...heroRoutes,
  default: (request, response) => {
    response.writeHead(200, httpConfig.defaultHeader)
    response.write('Hello from Default Route!')
    response.end()
  },
}


const handleError = response => {
  return error => {
    console.log('Error in this request!*** \n', error)
    response.writeHead(500, httpConfig.defaultHeader)
    response.write( JSON.stringify({ error: 'Internal Server Error.' }))
    return response.end()
  }
}

const handler = (request, response) => {

  const { url, method } = request
  const [ first, route, id ] = url.split('/')

  request.queryString = { id: isNaN(id) ? id : Number(id) }

  const key = `/${route}:${method}`
  //console.log({ first, route, id, method, queryString: request.queryString, key })

  const chosenRoute = routes[key] || routes.default
  return chosenRoute(request, response).catch(handleError(response))
}


http.createServer(handler).listen(httpConfig.port, () => {
  console.log('server running at:', httpConfig.port)
})
