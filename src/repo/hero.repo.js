const { readFile, writeFile } = require('fs/promises')


/**
 * Class to perform database operations.
 */
class HeroRepo {

  /**
   * @param {file: string} file - Array of objects representing heroes in the database.
   */
  constructor({ file }) {
    this.file = file
  }


  /**
   * Read the text file and return all content.
   * @private
   * @returns {Promise<any>}
   */
  async _currentFileContent() {
    return JSON.parse(await readFile(this.file))
  }


  /**
   * If "id" is undefined, returns all heroes in the databases,
   * otherwise returns the hero with the ID passed as parameter.
   * @param {number?} id - the ID of the hero.
   * @returns {Promise<Object[]|Object>} - The hero(es) searched.
   */
  async find(id) {
    const all = await this._currentFileContent()
    if(!id) return all
    return all.find( ({ id }) => id === id )
  }


  /**
   * Save a new hero received as parameter in the database.
   * @param {Object} hero - Hero object
   * @returns {Promise<number>}
   */
  async create(hero) {
    const currentFile = await this._currentFileContent()
    currentFile.push(hero)
    await writeFile(this.file, JSON.stringify(currentFile))
    return hero.id
  }

}
module.exports = HeroRepo
