"use strict";
/**
 * 鉴于 Set 的强大, 但却不具备事件监听的特性.
 * 以弥补其不足. 由于 Set 本质上是函数, 而不是类, 要从
 * 它继承非常不容易. 这里采用的是简单明快的组合式设计.
 */
class LiveSet {
    /**
     * 准备内部 set , 以及各个回调函数集合
     * @param iterable 可枚举对象, 主要用来初始化内部 set, 参数
     * 与 Set 的构造函数参数一致
     */
    constructor(iterable) {
        this._innerSet = new Set(iterable);
        this._addCallbacks = new Set();
        this._deleteCallbacks = new Set();
        this._clearCallbacks = new Set();
    }
    //#region method: add delete clear
    /**
     * 添加项目到集合, 该条目可能已经包含
     * @param value 要添加的项目
     * @returns 成功为true, 失败为false(比如项目已经包含)
     * @remark 注意, 如果失败, 则相应的事件也不会引发
     */
    add(value) {
        let ok = false;
        if (Array.from(this._innerSet.values()).indexOf(value) == -1) {
            // 虽然 add 重复项被忽略, 但是为了决定是否引发事件,
            this._innerSet.add(value);
            this._addCallbacks.forEach(cb => cb({
                type: 'add',
                vary: value,
            }), this);
            ok = true;
        }
        return ok;
    }
    /**
     * 删除指定项目
     * @param value 要删除的项目
     * @returns 成功删除为 true, 否则为 false (比如集合不包含该项目)
     * @remark 注意, 如果失败, 则相应的事件也不会引发
     */
    delete(value) {
        const ok = this._innerSet.delete(value);
        if (ok) {
            this._deleteCallbacks.forEach(cb => cb({
                type: 'delete',
                vary: value,
            }), this);
        }
        return ok;
    }
    /**
     * 清空集合, 如果集合本身就是空的, 则返回失败, 也不引发相应事件
     * @return 成功返回 true, 否则为 false
     */
    clear() {
        const clone = new Set(this._innerSet);
        this._innerSet.clear();
        let ok = false;
        if (clone.size > 0) {
            this._clearCallbacks.forEach(cb => cb({
                type: 'clear',
                last: clone,
            }), this);
            ok = true;
        }
        return ok;
    }
    //#endregion
    //#region 事件的监听与撤销 add off clear
    /**
     * 监听事件: add item
     * @param callback 回调函数
     */
    onAdd(callback) {
        this._addCallbacks.add(callback);
        return this;
    }
    /**
     * 撤销监听事件: add item
     * @param callback 回调函数
     */
    offAdd(callback) {
        this._addCallbacks.delete(callback);
        return this;
    }
    /**
     * 监听事件: delete item
     * @param callback 回调函数
     */
    onDelete(callback) {
        this._deleteCallbacks.add(callback);
        return this;
    }
    /**
     * 撤销监听事件: delete item
     * @param callback 回调函数
     */
    offDelete(callback) {
        this._deleteCallbacks.delete(callback);
        return this;
    }
    /**
     * 监听事件: clear all items
     * @param callback 回调函数
     */
    onClear(callback) {
        this._clearCallbacks.add(callback);
        return this;
    }
    /**
     * 撤销监听事件: clear all items
     * @param callback 回调函数
     */
    offClear(callback) {
        this._clearCallbacks.delete(callback);
        return this;
    }
    //#endregion
    /**
     * 获取内部 set
     */
    get innerSet() {
        return this._innerSet;
    }
    /**
     * 使用某种对象(继承于Node的), 初始化一个 LiveSet 对象并返回
     * @param items 指定的用于初始化的元素集合
     * @returns 构造好的 LiveSet 对象
     */
    static fromNodeList(items) {
        const set = new LiveSet();
        items.forEach(item => {
            set._innerSet.add(item);
        });
        return set;
    }
}
// test
// (() => {
// 	console.log('begin demo');
// 	// const ls1 = new LiveSet();
// 	const f_add_1 = (evt: LiveSetEvent<string | number>) => {
// 		//@ts-ignore this:undefined
// 		console.log('first callback for add---:', evt, this);
// 	};
// 	const f_add_2 = function (evt: LiveSetEvent<string | number>) {
// 		//@ts-ignore this:undefined
// 		console.log('second callback for add-:', evt, this);
// 	};
// 	const f_add_3 = (evt: LiveSetEvent<string | number>) => {
// 		console.log('third callback for add:', evt);
// 	};
// 	const ls2 = new LiveSet([12, 23, 'ok', 34]);
// 	ls2.addEventListener('add', f_add_1)
// 		.addEventListener('add', f_add_2)
// 		.addEventListener('delete', evt => {
// 			console.log('first callback for delete:', evt);
// 		}).addEventListener('delete', evt => {
// 			console.log('second callback for delete:', evt);
// 		}).addEventListener('clear', evt => {
// 			console.log('first callback for clear:', evt);
// 		}).addEventListener('clear', evt => {
// 			console.log('second callback for clear:', evt);
// 		})
// 	ls2.add('hello,world');
// 	console.log('now set is:', ls2.innerSet);
// 	ls2.delete(23);
// 	console.log('now set is:', ls2.innerSet);
// 	ls2.clear();
// 	console.log('now set is:', ls2.innerSet);
// 	ls2.removeEventListener('add', f_add_2);
// 	ls2.removeEventListener('add', f_add_2);
// 	ls2.removeEventListener('add', f_add_3);
// 	console.log('after delete one add handler:', ls2.addCallbacks);
// }) ();
//# sourceMappingURL=live-set.js.map