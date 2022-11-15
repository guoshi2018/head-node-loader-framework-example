"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            '/lib/css/default.css',
            '/page/lesson/2-jquery4/9-adv-selector/index.css',
        ], [
            '/lib/script/js/indoor-lib/function/jq-selector/group-selector.js',
            '/lib/script/js/indoor-lib/function/jq-instance/cellsByColumn.js'
        ]
    ],
    main: () => {
        addStripForRow();
        configHyperlink();
        testDomElementStack();
        function addStripForRow() {
            $('#news tbody').find('tr.alt').removeClass('alt');
            $('#news tbody').each(function () {
                $(this).children(':visible:has(td):odd').addClass('alt');
            });
        }
        function configHyperlink() {
            const jlink = $('#topics a').click(function (evt) {
                const jele = $(this);
                const topic = jele.text();
                $('#news tr').show();
                evt.preventDefault();
                jele.siblings('a.selected').removeClass('selected');
                jele.addClass('selected');
                if (topic != 'All') {
                    $('#news tr td:nth-child(4)').filter(function () {
                        return $(this).text() != topic;
                    }).parent('tr').hide();
                    $('tbody tr:nth-child(1)').not(function () {
                        return $(this).siblings('tr:visible').length > 0;
                    }).hide();
                }
                addStripForRow();
            });
        }
        function showJqueryObjectProperties() {
            const jele1 = $('#release');
            const jele2 = $('#release', '#topics');
            const jele3 = jele1.nextAll();
            threeProp(jele1, 'jele1');
            threeProp(jele2, 'jele2');
            threeProp(jele3, 'jele3');
            function threeProp(jq, name) {
                console.log(`${name} length:${jq.length}, props:`, {
                    context: jq.context, selector: jq.selector, prevObject: jq.prevObject,
                });
                if (jq.prevObject) {
                    console.log(`prevObject html of ${name}:${jq.prevObject.html()}`);
                }
            }
        }
        function testCustomGroupSelector(num) {
            $('#news tr').filter(`:group(${num})`).addClass('alt');
        }
        function testDomElementStack() {
            const jrel = $('#release');
            console.log('是否相等:', $('#release').nextAll().prevObject === jrel, jrel.nextAll().prevObject === jrel);
            const jnext = jrel.nextAll();
            console.log(jnext.prevObject === jrel.nextAll().end(), jnext.prevObject === jnext.end(), jnext.addBack().prevObject === jnext);
            $('#news td').click(function () {
                $('#news td.active').removeClass('active');
                const jcells = $(this).cellsByColumn();
                console.log(jcells.prevObject.text(), jcells.length);
                jcells.addClass('active');
            });
        }
    }
});
//# sourceMappingURL=9-adv-selector.js.map