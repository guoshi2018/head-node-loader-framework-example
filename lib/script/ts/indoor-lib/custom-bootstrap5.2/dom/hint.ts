

namespace CustomBootstrap.Dom {
	export class Hint {
		private static _div: HTMLDivElement;
		/**
		 * 提示 element 尚未填写的 div.
		 */
		public static get div() {
			if (!this._div) {
				this._div = document.createElement('div');
				this._div.textContent = 'element field forgotten.';
			}
			return this._div;
		}
	}
}