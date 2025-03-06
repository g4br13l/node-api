const http = require('http')
const httpConfig = require('../../httpConfig')
const heroFactory = require('./../factories/hero.fac')
const Hero = require('./../entities/hero')


const HeroService = heroFactory.buildInstance()



const heroRoutes = {

  '/heroes:POST': async (request, response) => {
    // async iterator
    for await (const currHero of request) {

      const heroObj = JSON.parse(currHero)
      const heroEntity = new Hero(heroObj)
      const { error, valid } = heroEntity.isValid()
      if (!valid) {
        response.writeHead(400, httpConfig.defaultHeader)
        response.write(JSON.stringify({ error: error.join(',') }))
        return response.end()
      }
      const id = await HeroService.create(heroEntity)
      response.writeHead(201, httpConfig.defaultHeader)
      response.write(JSON.stringify({ success: 'User created successfully', id }))
      return response.end()
    }
  },

  '/heroes:GET': async (request, response) => {

    const { id } = request.queryString
    console.log('(heroRoutes) id:', id)

    const heroes = await HeroService.find(id)
    response.write(JSON.stringify({ results: heroes }))

    response.end()
  }

}

module.exports = heroRoutes
