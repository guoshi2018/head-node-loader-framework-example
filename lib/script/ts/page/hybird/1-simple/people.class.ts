

export default class People {
	private _name: string;
	private _age: number;

	public constructor(name: string, age: number) {
		this._name = name;
		this._age = age;
	}
	public introself() {
		console.log(`hello, I am ${this._name}, now my age is ${this._age}`);
	}

	public set Age(age: number) {
		this._age = age;
	}
}

