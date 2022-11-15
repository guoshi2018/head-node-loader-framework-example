//自定义的Number对象扩展
interface Number {
    /**
     * 与给定的另一个 number 是否可以视同相等, 以两个给定 number 的差值, 是否足够小为准
     */
    asEqual: (another: number) => boolean;
}

Object.defineProperties(Number.prototype, {
    asEqual: {
        value: function (another: number): boolean {
            return Math.abs(this - another) < Number.EPSILON;
        },
        writable: false,
        configurable: false,
        enumerable: true,
    }
})

// 这样也可以
// Number.prototype.asEqual = function (this: number, another: number): boolean {
//     return Math.abs(this - another) < Number.EPSILON;
// };