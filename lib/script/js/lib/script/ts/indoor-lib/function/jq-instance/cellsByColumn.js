"use strict";
($ => {
    $.fn.cellsByColumn = function () {
        let jcells_group = $();
        this.each(function () {
            const jtd = $(this).closest('td,th');
            if (jtd.length) {
                const colIdx = jtd[0].cellIndex + 1;
                const jcells = jtd.closest('table')
                    .find('td,th')
                    .filter(`:nth-child(${colIdx})`);
                jcells_group = jcells_group.add(jcells);
            }
        });
        return this.pushStack(jcells_group);
    };
})(jQuery);
//# sourceMappingURL=cellsByColumn.js.map