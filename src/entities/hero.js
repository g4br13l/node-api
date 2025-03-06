/**
 * Hero entity
 * @constructor
 * @param {number?} id - Hero ID.
 * @param {string} name - Hero name
 * @param {number} age - Hero age
 * @param {string} power - hero power
 */

class Hero {

  constructor({ id, name, age, power }) {
    this.id = id || Math.floor(Math.random() * 100) + Date.now()
    this.name = name
    this.age = age
    this.power = power
  }

  isValid() {
    console.log('(Hero Entity) this.power:', this.power)
    const propNames = Object.getOwnPropertyNames(this)
    const invalidProps = propNames
      .map(prop => (!!this[prop] ? true : `"${prop}" is invalid!`))
      .filter(prop => prop !== true)
    console.log('invalidProps:', invalidProps)
    return {
      valid: invalidProps.length === 0,
      error: invalidProps
    }
  }
}

module.exports = Hero
