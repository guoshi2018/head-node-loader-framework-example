"use strict";
JscssLoader.getInstance().startEntry({
    debug: true,
    privateRes: [
        [
            '/lib/css/default.css'
        ]
    ],
    main: () => {
        $('span:contains(language)').addClass('emphasized');
        $('div.poem-stanza').addClass('highlight');
    }
});
//# sourceMappingURL=1-intro.js.map