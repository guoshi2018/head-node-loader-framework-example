"use strict";
class Padery {
    constructor(name) {
        this.Name = name;
    }
    sayHello() {
        console.log(`hello, my name is ${this.Name}`);
    }
}
class Pitty extends Padery {
    constructor(age, name) {
        super(name);
        this.Age = age;
    }
    eat() {
        console.log(`${this.Name} eat ${this.Age} every dinner`);
    }
}
//# sourceMappingURL=temp.js.map