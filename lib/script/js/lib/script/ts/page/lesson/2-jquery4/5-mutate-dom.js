"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            '/lib/css/default.css',
            '/page/lesson/2-jquery4/5-mutate-dom/index.css',
        ]
    ],
    main: () => {
        configMockButtons();
        function configMockButtons() {
            $('#use-attr').click(() => {
                $('div.chapter a[href*=wikipedia]').attr({
                    rel: 'external',
                    title: function (index, oldTitle) {
                        return `Learn more about ${$(this).text()} at Wikipedia`;
                    },
                    id: (index, oldId) => `wikilink-${index}`,
                    three: 'three-value',
                    four: 'four-value',
                });
            });
            $('#use-prop').click(() => {
                $('div.chapter a[href*=wikipedia]').prop({
                    one: 'one-value',
                    two: function (idx, oldV) {
                        return 'hey,this is value for ' + idx;
                    },
                    type: 'xixi',
                });
            });
            $('#view-result').click(() => {
                const arr_name = ['one', 'two', 'three', 'four', 'type', 'rel', 'id', 'title'];
                const anch = $('div.chapter a[href*=wikipedia]')[2];
                const jres = $('#result');
                jres.val('使用 domElement[prop-name] 获取\n');
                for (const p in anch) {
                    if (arr_name.includes(p)) {
                        jres.val(jres.val() + `${p}:${anch[p]}\n`);
                    }
                }
                jres.val(jres.val() + '\n使用 domElement.attributes[prop-name] 获取\n');
                for (const p in anch) {
                    if (arr_name.includes(p)) {
                        jres.val(jres.val() + `${p}:${anch.attributes[p]}\n`);
                    }
                }
                jres.val(jres.val() + '\n使用 $(...).attr() 获取\n');
                for (const p in anch) {
                    if (arr_name.includes(p)) {
                        jres.val(jres.val() + `${p}:${$(anch).attr(p)}\n`);
                    }
                }
                jres.val(jres.val() + '\n使用 $(...).prop() 获取\n');
                for (const p in anch) {
                    if (arr_name.includes(p)) {
                        jres.val(jres.val() + `${p}:${$(anch).prop(p)}\n`);
                    }
                }
                jres.val(jres.val() + "\n结论:使用attr或prop方法设置或添加的属性," +
                    "均为元素的一级属性,从获取到的结果上看, jquery的attr方法, " +
                    "是prop方法的子集.具体在html中是否显示, 得看浏览器");
            });
            $('#create-top-anchor').one('click', () => {
                $('<a id="top"/>').prependTo('body');
                $('<a href="#top">back to top</a>').appendTo('div.chapter p');
            });
            $('#transfer-footnote1').one('click', (evt) => {
                $('span.footnote')
                    .each((idx, ele) => {
                    const t = $(ele).text();
                    const n = idx + 1;
                    $(ele).text(`${n}.${t}`)
                        .before(`<a id="ref-${n}" 
              class="text-reference" href="#footnote-${n}"><sup>${n}</sup></a>`);
                })
                    .insertBefore('div#footer')
                    .css('text-indent', '2em')
                    .wrap(function (idx) {
                    const n = idx + 1;
                    return `<a id="footnote-${n}" href="#ref-${n}"/>`;
                });
            });
            $('#transfer-footnote2').one('click', (evt) => {
                $('span.footnote')
                    .insertBefore('div#footer')
                    .wrapAll('<ol id="notes"></ol>')
                    .wrap('<li></li>');
            });
            $('#transfer-footnote3').one('click', (evt) => {
                const jnotes = $('<ol id="notes"></ol>').insertBefore('#footer');
                $('span.footnote').each((idx, ele) => {
                    $(`<sup>${idx + 1}</sup>`).insertBefore(ele);
                    $(ele).appendTo(jnotes).wrap('<li></li>');
                });
            });
            $('#transfer-footnote4').one('click', (evt) => {
                const jnotes = $('<ol id="notes"></ol>').insertBefore('#footer');
                $('span.footnote').each((idx, ele) => {
                    const n = idx + 1;
                    $(ele)
                        .before(`
              <a href="#footnote-${n}" id="context-${n}" class="context">
                <sup>${idx + 1}</sup>
              </a>
            `)
                        .appendTo(jnotes)
                        .append(`
              &nbsp;<a href="#context-${n}">context</a>
            `)
                        .wrap(`
            <li id="footnote-${n}"/>
            `);
                });
            });
            $('#clone-elements-without-event').one('click', (evt) => {
                $('div.t-btns').clone(true, true).appendTo('body');
            });
            $('#clone-to-extrusive-reference').one('click', evt => {
                $('span.pull-quote').each(function (idx) {
                    const jpar = $(this).parent('p');
                    jpar.css('position', 'relative');
                    const jcopy = $(this).clone();
                    jcopy
                        .addClass('pulled')
                        .prependTo(jpar)
                        .find('span.drop')
                        .html('&hellip;')
                        .end()
                        .text(jcopy.text());
                });
            });
        }
    }
});
//# sourceMappingURL=5-mutate-dom.js.map