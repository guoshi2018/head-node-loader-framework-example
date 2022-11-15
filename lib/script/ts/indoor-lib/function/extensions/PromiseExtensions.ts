


interface Promise<T> {
	/**
	 * Promise对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，
	 * 都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。因此，我们可以提供
	 * 一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。
	 * @param onFulfilled : FulFilled状态的回调函数
	 * @param onRejected :Rejected状态的回调函数
	 * @method:done方法的使用，可以像then方法那样用，提供Fulfilled和Rejected状态的回调函数，
	 * 也可以不提供任何参数。但不管怎样，done都会捕捉到任何可能出现的错误，并向全局抛出。
	 * @example:
	 *      asyncFunc()
						.then(f1)
						.catch(r1)
						.then(f2)
						.done();
	 */
	done<TResult1 = T, TResult2 = never>(this: Promise<T>, onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): void;

	/**
	 * 用于指定不管Promise对象最后状态如何，都会执行的操作。
	 * 它与done方法的最大区别，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。
	 * @param  callback :回调函数
	 * @example:服务器使用Promise处理请求，然后使用finally方法关掉服务器。
	 * server.listen(0)
		.then(function () {
			// run test
		})
		.finally2(server.stop);
		@remark finally 方法已经被实现
	 */
	finally2(callback: () => void): void;
}


Promise.prototype.done = function (onfulfilled?, onrejected?) {
	this.then(onfulfilled, onrejected)
		.catch(function (reason) {
			// 抛出一个全局错误
			setTimeout(() => { throw reason }, 0);
		});
};



Promise.prototype.finally2 = function (callback) {
	let P = this.constructor as PromiseConstructor;
	return this.then(
		value => P.resolve(callback()).then(() => value),
		reason => P.resolve(callback()).then(() => { throw reason })
	);
};