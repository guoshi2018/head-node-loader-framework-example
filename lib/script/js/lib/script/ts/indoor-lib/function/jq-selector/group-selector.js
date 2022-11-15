"use strict";
($ => {
    $.extend($.expr.pseudos, {
        group: function (element, index, matches, set) {
            matches[10] = matches[10] || 0;
            const num = typeof matches[3] == 'string' ? parseInt(matches[3], 10) : matches[3];
            let ok = false;
            if (!isNaN(num) && num != 0) {
                console.log(matches[10]);
                const absNum = Math.abs(num);
                const ok1 = matches[10] % (absNum * 2) < absNum;
                const ok2 = num > 0;
                ok = (ok1 && ok2) || (!ok1 && !ok2);
            }
            matches[10]++;
            console.log(matches[10], set);
            return ok;
        },
    });
})(jQuery);
//# sourceMappingURL=group-selector.js.map