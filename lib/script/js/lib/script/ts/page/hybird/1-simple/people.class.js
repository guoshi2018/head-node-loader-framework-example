export default class People {
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }
    introself() {
        console.log(`hello, I am ${this._name}, now my age is ${this._age}`);
    }
    set Age(age) {
        this._age = age;
    }
}
//# sourceMappingURL=people.class.js.map