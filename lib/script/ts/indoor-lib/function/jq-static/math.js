(function ($) {
    //为$添加函数的第一种方法, 需要d.ts中对应声明, 否则有警告
    $.gx_sum1 = function (arr) {
        var total = 0;
        arr.forEach(function (v) {
            //		const s = typeof (v);
            total += typeof v == 'string' ? parseFloat(v.trim()) : v;
        });
        return total;
    };
    $.gx_avg1 = function (arr) {
        return arr.length > 0 ? $.gx_sum1(arr) / arr.length : 0;
    };
    //第二种方法, 这是定义json对象的风格:
    $.extend({
        gx_sum2: function (arr) {
            var total = 0;
            arr.forEach(function (v) {
                //		const s = typeof (v);
                total += typeof v == 'string' ? parseFloat(v.trim()) : v;
            });
            return total;
        },
        gx_avg2: function (arr) {
            //由于引用到gx_sum2, .d.ts中还是得声明它
            return arr.length > 0 ? $.gx_sum2(arr) / arr.length : 0;
        }
    });
    //第三种方法,避免污染命名空间,采用封装到一个对象的方法, 不过需要.d.ts中声明
    $.gx_math = {
        sum: function (arr) {
            var total = 0;
            arr.forEach(function (v) {
                //		const s = typeof (v);
                total += typeof v == 'string' ? parseFloat(v.trim()) : v;
            });
            return total;
        },
        avg: function (arr) {
            return arr.length > 0 ? $.gx_math.sum(arr) / arr.length : 0;
        }
    };
    //第四种方法,见guoshi.ts
})(jQuery);
