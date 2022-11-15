

namespace GuoshiDemo {
	export namespace Util {
		export interface Student {
			name: string;
			age: number;
		}

		export interface Worker extends Student {
			salary: number;
		}
	}
}