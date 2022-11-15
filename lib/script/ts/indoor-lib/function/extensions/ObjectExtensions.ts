

interface PropertyDeference {
	key: string;
	self: any;
	another: any;
}

interface Object {
	/**
	 * 将对象彻底冻结(递归冻结), 同时跳过自引用字段, 例如 window.window, window.self
	 */
	deepFreeze(): void;
	// /**
	//  * ,
	//  * @param deep: 
	//  * @return 
	//  */
	/**
	 * 深度克隆对象, 可按需配置克隆深度. 同时跳过自引用字段, 例如 window.window, window.self
	 * @param depth 克隆深度, 0 表示不克隆. 默认正无限大
	 * @return 克隆得到的对象, 注意, 只是克隆对象自身可枚举属性
	 */
	deepClone(depth?: number): Object;

	/**
	 * 将自身的各个字段(以及后代级字段), 与其他对象比较, 发现不同立即上报, 
	 * 同时跳过自引用字段, 例如 window.window, window.self 
	 * @param this 
	 * @param another 
	 * @param defs 用来保存找到的不同属性信息, 没有则保持原样
	 * @param parentName 
	 */
	compareTo(this: Object, another: Object, defs: Array<PropertyDeference>, parentName?: string): void;
}

Object.prototype.deepFreeze = function (this: Object) {
	try {
		Object.freeze(this);
	} catch (e) {
		console.warn('常规冻结发生错误:', this, typeof this);
	}

	if ("object" == typeof (this) && null != this) {
		Object.values(this).forEach(v => {
			try {
				if (v != this && typeof (v) == 'object') {
					v?.deepFreeze();
				}
			} catch (e) {
				console.warn('深度冻结发生错误:', v, typeof (v));
			}
		});
	}
}

Object.prototype.deepClone = function (this: Object, depth: number = Number.MAX_SAFE_INTEGER) {

	// Date Regex 等无自有可枚举字段的对象, 以及 null string , 克隆结果为 this
	let obj = this; // default

	if ("object" == typeof (this) && null != this) {
		if (depth > 0) {
			const entries = Object.entries(this);
			if (entries.length > 0) {
				obj = {};
				entries.forEach(kv => {
					const key = kv[0];
					const value = kv[1];
					try {
						if (value != this) {
							//@ts-ignore  undefinded null 无法调用 deepClone
							obj[key] = value ? value.deepClone(depth - 1) : value;
						}
					} catch (e) { // 有些对象克隆异常,例如 window, 忽略继续
						console.warn("克隆出现错误,已忽略:",
							value, typeof value);
					}
				});
			}
		}
	}
	return obj;
}


Object.prototype.compareTo = function (this: Object, another: Object,
	refs: Array<PropertyDeference>, parentName: string = "root") {

	if (typeof this == 'object' && null != this && Object.entries(this).length > 0) {
		Object.entries(this).forEach(kv => {
			const k = kv[0];
			const v1 = kv[1];
			//		if (v1 != this) {
			//@ts-ignore
			const v2 = another[k];

			const t1 = typeof v1;
			const t2 = typeof v2;
			if (t1 != 'object' && t2 != 'object') { // 两者都不是 object
				if (v1 != v2) {
					//	console.log(`${parentName}.${k}`, v1, v2);
					//	yield [`${parentName}.${k}`, v1, v2];
					refs.push({
						key: `${parentName}.${k}`,
						self: v1,
						another: v2,
					} as PropertyDeference);
				}
			} else if (t1 != 'object' || t2 != 'object') { // 两者仅有一个不是 object
				// console.log(`${parentName}.${k}`, v1, v2);
				refs.push({
					key: `${parentName}.${k}`,
					self: v1,
					another: v2,
				} as PropertyDeference);
			} else { // 两者都有属性, 但要防止 null
				v1?.compareTo(v2, refs, `${parentName}.${k}`);
			}
			//		}
		});
	} else {
		if (this != another) {
			//console.log(`${parentName}`, this, another);
			refs.push({
				key: parentName,
				self: this,
				another: another,
			} as PropertyDeference);
		}
	}

	// {
	//       //@ts-ignore
	//       const v1 = first[p]; const v2 = second[p];

	//   }
}

window.addEventListener('load', evt => {
	console.log('call onload first');
});