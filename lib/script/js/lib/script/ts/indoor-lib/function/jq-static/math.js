"use strict";
($ => {
    $.gx_sum1 = (arr) => {
        let total = 0;
        arr.forEach(v => {
            total += typeof v == 'string' ? parseFloat(v.trim()) : v;
        });
        return total;
    };
    $.gx_avg1 = (arr) => {
        return arr.length > 0 ? $.gx_sum1(arr) / arr.length : 0;
    };
    $.extend({
        gx_sum2: (arr) => {
            let total = 0;
            arr.forEach(v => {
                total += typeof v == 'string' ? parseFloat(v.trim()) : v;
            });
            return total;
        },
        gx_avg2: (arr) => {
            return arr.length > 0 ? $.gx_sum2(arr) / arr.length : 0;
        }
    });
    $.gx_math = {
        sum: (arr) => {
            let total = 0;
            arr.forEach(v => {
                total += typeof v == 'string' ? parseFloat(v.trim()) : v;
            });
            return total;
        },
        avg: (arr) => {
            return arr.length > 0 ? $.gx_math.sum(arr) / arr.length : 0;
        }
    };
})(jQuery);
//# sourceMappingURL=math.js.map