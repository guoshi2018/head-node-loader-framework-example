"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            '/lib/css/common.css',
            '/page/lesson/2-jquery4/2-select-ele/index.css',
        ]
    ],
    main: () => {
        $('#hor-list').click(() => {
            $('#selected-plays > li').toggleClass('horizontal');
        });
        $('#bk-list').click(() => {
            $('#selected-plays li:not(.horizontal)').toggleClass('sub-level');
        });
        $('#link-style').click(() => {
            $('a[href^="mailto:"]').toggleClass('mailto');
            $('a[href$=".pdf"]').toggleClass('pdflink');
            $('a[href^="http"][href*="henry"]').toggleClass('henrylink');
        });
        $('#eq-firstli-bold').click(() => {
            $('li:eq(1)').toggleClass('bold italic ');
        });
        $('#nth-firstli-bold').click(() => {
            $('li:nth-child(2)').toggleClass('bold italic');
        });
        $('#odd-tr-alt-global').click(() => {
            $('tbody > tr:even').toggleClass('odd');
        });
        $('#odd-tr-alt-local').click(() => {
            $('tbody > tr:nth-child(odd)').toggleClass('odd');
        });
        $('#henry-highlight').click(() => {
            $('tbody > tr > td:contains(Henry)').toggleClass('highlight');
        });
        $('#filter-link').click(() => {
            const jqExternal_links = $('a').filter(function (idx, ele) {
                const anchor = ele;
                console.log(idx, anchor.href, anchor.host, anchor.hostname, location.hostname);
                return anchor.hostname != location.hostname;
            });
            console.log('result is :', jqExternal_links.length);
            jqExternal_links.toggleClass('external');
        });
        $('#henry-next').click(() => {
            const t = $('td:contains(Henry),td:contains(Tragedy)');
            t.next().toggleClass('highlight');
            t.prev().toggleClass('highlight');
        });
        $('#get-anchor-dom').click(() => {
            const anc2 = $('a').get(2);
            const anc3 = $('a')[3];
            console.log(anc2, anc3);
        });
    }
});
//# sourceMappingURL=2-select-ele.js.map