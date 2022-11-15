var GuoshiDemo;
(function (GuoshiDemo) {
    class Hello {
        static say() {
            console.log('hello,world');
        }
    }
    GuoshiDemo.Hello = Hello;
})(GuoshiDemo || (GuoshiDemo = {}));
