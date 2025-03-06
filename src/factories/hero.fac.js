const { join } = require('path')
const HeroRepo = require('./../repo/hero.repo')
const HeroService = require('./../services/hero.service')


const buildInstance = () => {

  const fileName = join(__dirname, '../../db', 'data.json')
  const heroRepo = new HeroRepo({ file: fileName })
  return new HeroService({ heroRepo })
}

module.exports = { buildInstance }
