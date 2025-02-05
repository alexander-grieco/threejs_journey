// classes use Pascal case (first letter of all words are capitalized)
export default class Robot {
    constructor(name, legs) {
        this.name = name
        this.lets = legs

        console.log(`I am ${name}. Thank you creator.`)
        this.sayHi()
    }
    sayHi() {
        console.log(`Hello, my name is ${this.name}.`)
    }
}
