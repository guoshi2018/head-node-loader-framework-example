
namespace GuoshiDemo {
	export namespace Util {
		// interface Student {
		// 	name: string,
		// 	age: number,
		// }
		export class Hello {
			protected _me: string;
			constructor(me: string) {
				this._me = me;
			};
			public intro() {
				console.log(`hello,world. my name is ${this._me}`);
			}
			public please(stu: Student) {
				console.log(`${this._me} say: please sit down `, stu);
			}
		}
		// export class Hey extends Hello {
		// 	protected _pitty: number;
		// 	constructor(me: string, pitty: number) {
		// 		super(me);
		// 		this._pitty = pitty;
		// 	}

		// 	public override please(wk: Worker): void {
		// 		console.log(`${this._me} is now a worker, salary is ${this._pitty}`, wk);
		// 	}
		// }
	}
}
