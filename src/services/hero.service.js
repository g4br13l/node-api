//const {  } = require('HeroRepo')

/**
 * Class that represents the service of Hero (Application Layer).
 */
class HeroService {

  /**
   * Constructor of class
   * @param {HeroRepo} heroRepo - Service to be injected
   */
  constructor({ heroRepo }) {
    this.heroRepo = heroRepo
  }


  /**
   * Returns a hero with the ID passed as parameter, or all heroes in database.
   * @param {number?} id
   * @returns {Promise<*>}
   */
  async find(id) {
    return this.heroRepo.find(id)
  }

  /**
   * Creates a hero in the database
   * @param {Hero} hero - The Hero object to be created
   * @returns {Promise<number>} - The Hero created
   */
  async create(hero) {
    return this.heroRepo.create(hero)
  }

}

module.exports = HeroService
