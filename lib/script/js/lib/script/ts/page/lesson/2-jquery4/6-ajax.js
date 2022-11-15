"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            '/lib/css/default.css',
            '/page/lesson/2-jquery4/6-ajax/index.css',
        ]
    ],
    main: () => {
        const jdict = $('#dictionary');
        configTermClick();
        configAjaxProcess();
        configMockButtons();
        function configTermClick() {
            $('body').on('click', 'h3.term', function () {
                $(this).siblings('.definition').slideToggle();
            });
        }
        function configAjaxProcess() {
            const jloading = $('<div id="loading">Loading...</div>')
                .insertBefore(jdict);
            $(document).ajaxStart(() => {
                jdict.slideUp();
                jloading.show();
            }).ajaxStop(() => {
                jloading.hide();
                jdict.slideDown();
            });
        }
        function configMockButtons() {
            $('#letter-a .button').click(evt => {
                jdict.load('/page/lesson/2-jquery4/6-server-side/a.html');
            });
            $('#letter-b .button').click(() => {
                jdict.empty();
                $.getJSON('/page/lesson/2-jquery4/6-server-side/b.json', data => {
                    $.each(data, function (entryIndex, entry) {
                        var html = '<div class="entry">';
                        html += '<h3 class="term">' + entry['term'] + '</h3>';
                        html += '<div class="part">' + entry['part'] + '</div>';
                        html += '<div class="definition">';
                        html += entry['definition'];
                        if (entry['quote']) {
                            html += '<div class="quote">';
                            $.each(entry['quote'], function (lineIndex, line) {
                                html += '<div class="quote-line">' + line + '</div>';
                            });
                            if (entry['author']) {
                                html += '<div class="quote-author">' + entry['author'] + '</div>';
                            }
                            html += '</div>';
                        }
                        html += '</div>';
                        html += '</div>';
                        jdict.append(html);
                    });
                });
            });
            $('#letter-c .button').click(() => {
                $.getScript('/page/lesson/2-jquery4/6-server-side/c.js');
            });
            $('#letter-d .button').click(() => {
                jdict.empty();
                $.get('/page/lesson/2-jquery4/6-server-side/d.xml', function (data) {
                    $(data).find('entry').each(function () {
                        var $entry = $(this);
                        var html = '<div class="entry">';
                        html += '<h3 class="term">' + $entry.attr('term') + '</h3>';
                        html += '<div class="part">' + $entry.attr('part') + '</div>';
                        html += '<div class="definition">';
                        html += $entry.find('definition').text();
                        var $quote = $entry.find('quote');
                        if ($quote.length) {
                            html += '<div class="quote">';
                            $quote.find('line').each(function () {
                                html += '<div class="quote-line">' + $(this).text() + '</div>';
                            });
                            if ($quote.attr('author')) {
                                html += '<div class="quote-author">' + $quote.attr('author') + '</div>';
                            }
                            html += '</div>';
                        }
                        html += '</div>';
                        html += '</div>';
                        jdict.append($(html));
                    });
                });
            });
            $('#letter-e a').click(function (evt) {
                evt.preventDefault();
                const server_page = '/page/lesson/2-jquery4/6-server-side/e.php';
                const reqData = {
                    term: $(this).text(),
                };
                $.get(server_page, reqData, data => {
                    jdict.html(data);
                }).fail(jqXHR => {
                    jdict.html('An error occured: ' + jqXHR.status)
                        .append(jqXHR.responseText);
                });
            });
            $('#letter-f form').submit(function (evt) {
                evt.preventDefault();
                const server_page = '/page/lesson/2-jquery4/6-server-side/f.php';
                const formValues = $(this).serialize();
                $.get(server_page, formValues, data => {
                    jdict.html(data);
                });
            });
        }
    },
});
//# sourceMappingURL=6-ajax.js.map