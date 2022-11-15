"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            '/lib/css/default.css',
            '/page/lesson/2-jquery4/12-adv-dom-oper/index.css',
        ]
    ],
    main: () => {
        const Sort_Key = 'sort-key';
        const Sort_Key_Object = 'sort-key-object';
        const Sort_Key_Array = 'sort-key-array';
        const Key_Type = 'key-type';
        const SortKeyMethods = {
            alpha: jele => {
                let key = jele.find(`span.${Sort_Key}`).text();
                const sep = key == '' ? '' : ' ';
                key += sep + jele.text();
                return key.toUpperCase();
            },
            numeric: jele => {
                const num = jele.text().replace(/^[^\d.]*/, '');
                let key = parseFloat(num);
                if (isNaN(key)) {
                    key = 0;
                }
                return key;
            },
            date: jele => {
                const key = Date.parse('1 ' + jele.text());
                return key;
            }
        };
        createElementTersely();
        function configTableOneSortable1() {
            const jtable = $('table#t-1');
            const jheaders = jtable.find('thead th').slice(1);
            jheaders.wrapInner('<a href="#"/>').addClass('sort');
            jheaders.on('click', function (evt) {
                evt.preventDefault();
                const column = $(this).index();
                const rows = jtable.find('tbody > tr').get();
                rows.sort((a, b) => {
                    let keyA = $(a).children('td').eq(column).text();
                    keyA = keyA.trim().toUpperCase();
                    let keyB = $(b).children('td').eq(column).text();
                    keyB = keyB.trim().toUpperCase();
                    return keyA > keyB ? 1 : (keyA == keyB ? 0 : -1);
                });
                rows.forEach(row => {
                    jtable.children('tbody').append(row);
                });
            });
        }
        function configTableOneSortable2() {
            const jtable = $('table#t-1');
            const jheaders = jtable.find('thead th').slice(1);
            jheaders.wrapInner('<a href="#"/>').addClass('sort');
            jheaders.on('click', function (evt) {
                evt.preventDefault();
                const column = $(this).index();
                const rows = jtable.find('tbody > tr').each(function () {
                    const key = $(this).children('td').eq(column).text();
                    $(this).data(Sort_Key, key.trim().toUpperCase());
                }).get();
                rows.sort((a, b) => {
                    let keyA = $(a).data(Sort_Key);
                    let keyB = $(b).data(Sort_Key);
                    return keyA > keyB ? 1 : (keyA == keyB ? 0 : -1);
                });
                rows.forEach(row => {
                    jtable.children('tbody').append(row);
                });
            });
        }
        function configTableOneSortable3() {
            const jtable = $('table#t-1');
            const jheaders = jtable.find('thead th').slice(1);
            jheaders.wrapInner('<a href="#"/>').addClass('sort');
            jheaders.on('click', function (evt) {
                evt.preventDefault();
                const column = $(this).index();
                const rows = jtable.find('tbody > tr').each(function () {
                    const jtr = $(this);
                    const jtd = jtr.children('td').eq(column);
                    let key = jtd.find(`span.${Sort_Key}`).text();
                    const sep = key == '' ? '' : ' ';
                    key += sep + jtr.children('td').eq(column).text();
                    jtr.data(Sort_Key, key.trim().toUpperCase());
                }).get();
                rows.sort((a, b) => {
                    let keyA = $(a).data(Sort_Key);
                    let keyB = $(b).data(Sort_Key);
                    return keyA > keyB ? 1 : (keyA == keyB ? 0 : -1);
                });
                rows.forEach(row => {
                    jtable.children('tbody').append(row);
                });
            });
        }
        function configTableOneSortable4() {
            const jtable = $('table#t-1');
            const jheaders = jtable.find('thead th').slice(1);
            jheaders
                .each((idx, ele) => {
                $(ele).data(Key_Type, ele.className.replace(/^sort-/, ''));
            })
                .wrapInner('<a href="#"/>')
                .addClass('sort');
            jheaders.on('click', function (evt) {
                evt.preventDefault();
                const jheader = $(this);
                const column = jheader.index();
                const keyType = jheader.data(Key_Type);
                if (typeof SortKeyMethods[keyType] == 'function') {
                    const rows = jtable.find('tbody > tr').each(function () {
                        const jtr = $(this);
                        const jtd = jtr.children('td').eq(column);
                        jtr.data(Sort_Key, SortKeyMethods[keyType](jtd));
                    }).get();
                    rows.sort((a, b) => {
                        let keyA = $(a).data(Sort_Key);
                        let keyB = $(b).data(Sort_Key);
                        return keyA > keyB ? 1 : (keyA == keyB ? 0 : -1);
                    });
                    rows.forEach(row => {
                        jtable.children('tbody').append(row);
                    });
                }
                else {
                    console.log('对应的关键字获取方法找不到');
                }
            });
        }
        function configTableOneSortable5() {
            const jtable = $('table#t-1');
            const jheaders = jtable.find('thead th').slice(1);
            jheaders
                .each((idx, ele) => {
                $(ele).data(Key_Type, ele.className.replace(/^sort-/, ''));
            })
                .wrapInner('<a href="#"/>')
                .addClass('sort');
            jheaders.on('click', function (evt) {
                evt.preventDefault();
                const jheader = $(this);
                let sort_asc = 1;
                if (jheader.hasClass('sorted-asc')) {
                    sort_asc = -1;
                }
                const column = jheader.index();
                const keyType = jheader.data(Key_Type);
                if (typeof SortKeyMethods[keyType] == 'function') {
                    const rows = jtable.find('tbody > tr').each(function () {
                        const jtr = $(this);
                        const jtd = jtr.children('td').eq(column);
                        jtr.data(Sort_Key, SortKeyMethods[keyType](jtd));
                    }).get();
                    rows.sort((a, b) => {
                        let keyA = $(a).data(Sort_Key);
                        let keyB = $(b).data(Sort_Key);
                        return (keyA > keyB ? 1 : (keyA == keyB ? 0 : -1)) * sort_asc;
                    });
                    rows.forEach(row => {
                        jtable.children('tbody').append(row);
                    });
                    jheaders.removeClass('sorted-asc sorted-desc');
                    jheader.addClass(sort_asc == 1 ? 'sorted-asc' : 'sorted-desc');
                }
                else {
                    console.log('对应的关键字获取方法找不到');
                }
            });
        }
        function configTableOneSortableByMyself1() {
            const jtable = $('table#t-1');
            const jheaders = jtable.find('thead th').slice(1);
            jheaders.wrapInner('<a href="#"/>').addClass('sort');
            const props = [''];
            jheaders.each((idx, td) => {
                props.push(td.innerText);
            });
            jtable.find('tbody tr').each((idx, tr) => {
                const jtr = $(tr);
                const keys = {};
                jtr.children('td').each((colIdx, td) => {
                    const jtd = $(td);
                    let v = jtd.find(`span.${Sort_Key}`).text();
                    const sep = v == '' ? '' : ' ';
                    keys[props[colIdx]] = v + sep + jtd.text().toUpperCase();
                });
                jtr.data(Sort_Key_Object, keys);
            });
            jheaders.on('click', function (evt) {
                evt.preventDefault();
                const jtd = $(this);
                let sortAsc = 1;
                if (jtd.hasClass('sorted-asc')) {
                    sortAsc = -1;
                }
                const column = jtd.index();
                const rows = jtable.find('tbody > tr').get();
                rows.sort((a, b) => {
                    const keyA = $(a).data(Sort_Key_Object)[props[column]];
                    const keyB = $(b).data(Sort_Key_Object)[props[column]];
                    const rst = keyA > keyB ? 1 : (keyA == keyB ? 0 : -1);
                    return rst * sortAsc;
                });
                rows.forEach(row => {
                    jtable.children('tbody').append(row);
                });
                jheaders.removeClass('sorted-asc sorted-desc');
                jtd.addClass(sortAsc == 1 ? 'sorted-asc' : 'sorted-desc');
            });
        }
        function configTableOneSortableByMyself2() {
            const jtable = $('table#t-1');
            const jheaders = jtable.find('thead th').slice(1);
            const methods = [];
            jheaders
                .wrapInner('<a href="#"/>')
                .each((idx, td) => {
                const method = SortKeyMethods[td.className.replace(/^sort-/, '')];
                if (typeof method != 'function') {
                    throw new Error('发现没有合适的关键字获取方法');
                }
                methods[idx] = method;
            })
                .addClass('sort');
            jtable.find('tbody tr').each((idx, tr) => {
                const jtr = $(tr);
                const keys = [];
                jtr.children('td').slice(1).each((colIdx, td) => {
                    keys[colIdx] = methods[colIdx]($(td));
                });
                jtr.data(Sort_Key_Array, keys);
                console.log(keys);
            });
            jheaders.on('click', function (evt) {
                evt.preventDefault();
                const jtd = $(this);
                let sortAsc = 1;
                if (jtd.hasClass('sorted-asc')) {
                    sortAsc = -1;
                }
                const column = jtd.index() - 1;
                const rows = jtable.find('tbody > tr').get();
                rows.sort((a, b) => {
                    const keyA = $(a).data(Sort_Key_Array)[column];
                    const keyB = $(b).data(Sort_Key_Array)[column];
                    const rst = keyA > keyB ? 1 : (keyA == keyB ? 0 : -1);
                    return rst * sortAsc;
                });
                rows.forEach(row => {
                    jtable.children('tbody').append(row);
                });
                jheaders.removeClass('sorted-asc sorted-desc');
                jtd.addClass(sortAsc == 1 ? 'sorted-asc' : 'sorted-desc');
            });
        }
        function configTableTwoSortable() {
            const jtable = $('table#t-2');
            const jheaders = jtable.find('thead th').slice(1);
            jheaders
                .wrapInner('<a href="#"/>')
                .addClass('sort');
            jheaders.on('click', function (evt) {
                evt.preventDefault();
                const jtd = $(this);
                let sortAsc = 1;
                if (jtd.hasClass('sorted-asc')) {
                    sortAsc = -1;
                }
                const rows = jtable.find('tbody > tr').get();
                const sortKey = jtd.data('sort').key;
                rows.sort((a, b) => {
                    const keyA = $(a).data('book')[sortKey];
                    const keyB = $(b).data('book')[sortKey];
                    const rst = keyA > keyB ? 1 : (keyA == keyB ? 0 : -1);
                    return rst * sortAsc;
                });
                rows.forEach(row => {
                    jtable.children('tbody').append(row);
                });
                jheaders.removeClass('sorted-asc sorted-desc');
                jtd.addClass(sortAsc == 1 ? 'sorted-asc' : 'sorted-desc');
            });
        }
        function configTableThreeSortable() {
            const imgBaseUrl = '/lib/image/jpg/12-adv-dom-oper';
            function buildRow(row) {
                const authors = [];
                row.authors.forEach(name => {
                    authors.push(name.first_name + ' ' + name.last_name);
                });
                const html = `
				<tr>
					<td><img src="${imgBaseUrl}/${row.img}"/></td>
					<td>${row.title}</td>
					<td>${authors.join(', ')}</td>
					<td>${row.published}</td>
					<td>${row.price}</td>
				</tr>
				`;
                return html;
            }
            function buildRows(rows) {
                const trs = rows.map(buildRow);
                return trs.join('');
            }
            $.getJSON('/lib/script/json/12-adv-dom-oper/books.json', (data) => {
                const jtable3 = $('table#t-3');
                jtable3.find('tbody').html(buildRows(data));
            });
        }
        function createElementTersely() {
            $('table').each(function (idx) {
                const jtable = $(this);
                $('<h3></h3>', {
                    id: 'table-title-' + (idx + 1),
                    class: 'table-title',
                    text: `This is h3 caption for table${idx + 1}`,
                    data: {
                        index: idx,
                        a: 18,
                        b: 'good',
                    },
                    click: function (evt) {
                        evt.preventDefault();
                        jtable.fadeToggle();
                    },
                    css: {
                        glowColor: '#00ff00',
                        color: '#ff0000',
                    }
                }).insertBefore(jtable);
            });
        }
    }
});
//# sourceMappingURL=12-adv-dom-oper.js.map