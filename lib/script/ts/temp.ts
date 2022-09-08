class Padery {
	public Name: string;
	public constructor(name: string) {
		this.Name = name;
	}
	public sayHello() {
		console.log(`hello, my name is ${this.Name}`);
	}
}

class Pitty extends Padery {
	public Age: number;
	public constructor(age: number, name: string) {
		super(name);
		this.Age = age;
	}
	public eat() {
		console.log(`${this.Name} eat ${this.Age} every dinner`);
	}
}


// const p = new Pitty(19, 'holy');
// const ele = new HTMLButtonElement();
// p.eat()