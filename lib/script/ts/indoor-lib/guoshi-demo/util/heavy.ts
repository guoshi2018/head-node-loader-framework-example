/// <reference path="./hello.ts" />
namespace GuoshiDemo {
	export namespace Util {
		// interface Student {
		// 	name: string,
		// 	age: number,
		// }

		// declare class Hello {
		// 	protected _me: string;
		// 	constructor(me: string);
		// 	public intro(): void;
		// 	public please(stu: Student): void;
		// }


		export class Heavy extends Hello {
			protected _pitty: number;
			constructor(me: string, pitty: number) {
				super(me);
				this._pitty = pitty;
			}

			public override please(wk: Worker): void {
				console.log(`${this._me} is now a worker, salary is ${this._pitty}`, wk);
			}
		}



	}
}
