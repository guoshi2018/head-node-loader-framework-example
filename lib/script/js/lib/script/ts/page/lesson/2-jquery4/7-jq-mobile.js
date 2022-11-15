"use strict";
JscssLoader.getInstance().startEntry({
    globalRes: '/lib/script/json/mobile-global.json',
    debug: true,
    privateRes: [
        [
            '/page/lesson/2-jquery4/7-use-plugin/main.css',
            '/lib/external-core/jquery-plugin/jquery.mobile-1.4.5/jquery.mobile-1.4.5.css',
            '/lib/external-core/jquery-plugin/jquery.mobile-1.4.5/jquery.mobile-1.4.5.js',
        ]
    ],
    main: () => {
        function configBooks() {
            const imgBaseUrl = '/lib/image/jpg/7-use-plugin';
            const books = [{
                    filename: '(01).jpg',
                    title: 'asp+sql server之动态网站',
                    author: '龙马工作室',
                }, {
                    filename: '(02).jpg',
                    title: '软件设计师考试疑难问题解答',
                    author: '王勇,张友生',
                }, {
                    filename: '(03).jpg',
                    title: '21天学通C++',
                    author: 'Jesse Liberty',
                }, {
                    filename: '(04).jpg',
                    title: '编程高手箴言',
                    author: '梁肇新',
                }, {
                    filename: '(05).jpg',
                    title: '计算机系统结构',
                    author: '郑伟民 汤志忠',
                }, {
                    filename: '(06).jpg',
                    title: 'ASP.NET MVC 5 高级编程(第五版)',
                    author: 'Jon Galloway,Brad Wilson',
                }, {
                    filename: '(07).jpg',
                    title: '从零开始 SQL Server中文版基础培训教程',
                    author: '老虎工作室',
                }, {
                    filename: '(08).jpg',
                    title: 'Red Hat Linux9 全面掌握',
                    author: '易丽贵',
                }, {
                    filename: '(09).jpg',
                    title: 'ASP.NET 2.0 高级编程',
                    author: 'Bill Evjen,Scott Hanselman Devin Rader',
                }, {
                    filename: '(10).jpg',
                    title: '.NET 框架程序设计(修订版)',
                    author: 'Jeffrey Richter',
                }, {
                    filename: '(11).jpg',
                    title: '软件设计师考试历年试题分析与解答',
                    author: '考试研究组',
                }, {
                    filename: '(12).jpg',
                    title: 'DotNetNuke4 高级编程',
                    author: 'Shaun Walker,Joe Brinkman,Bruce Hopkins',
                }, {
                    filename: '(13).jpg',
                    title: 'Java编程一步到位',
                    author: '王铁敬',
                }, {
                    filename: '(14).jpg',
                    title: 'Windows核心编程',
                    author: 'Jeffrey Richter',
                }];
            const jdivBook = $('<div data-role="page"/>')
                .appendTo('body')
                .append('<div data-role="header"><h4>Select a book</h4></div>');
            const jul = $('<ul/>');
            books.forEach(book => {
                $(`
					<li>
						<a href="${imgBaseUrl}/${book.filename}" title="${book.author}">${book.title}</a>
					</li>
					`).appendTo(jul);
            });
            $('<div data-role="content"/>').wrapInner(jul).appendTo(jdivBook);
        }
    }
});
//# sourceMappingURL=7-jq-mobile.js.map