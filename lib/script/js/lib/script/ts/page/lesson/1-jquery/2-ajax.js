"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [],
    main: () => {
        const remote_domain = "https://localhost:7018/";
        base_demo();
        function base_demo() {
            $('.base_demo input[type="button"]').click(function () {
                console.log('start to ajax by get');
                let jresult = $('div.ajax-result').empty();
                let jtitle = $('<h1>').appendTo(jresult);
                let jcontent = $('<h5>').appendTo(jresult);
                let jtail = $('<addr>').appendTo(jresult);
                $.ajax({
                    async: true,
                    cache: true,
                    url: remote_domain + "WeatherForecast",
                    type: "GET",
                })
                    .done(data => {
                    jtitle.text(data.code);
                    jcontent.text(data.message);
                })
                    .fail((xhr, status, error) => {
                    jtitle.text(status);
                    jcontent.text("info:" + error + ",xhr:" + JSON.stringify(xhr));
                })
                    .always(function (xhr, status) {
                    jtail.text("complete.status:" + status + ",xhr:" + JSON.stringify(xhr));
                    console.log('context:', xhr);
                });
                console.log('look here');
            });
        }
    }
});
//# sourceMappingURL=2-ajax.js.map