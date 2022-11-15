import { commonFun } from "./fun.js";
import People from "./people.class.js";
import f3 from "./3.js";
function windowLoadedHandler(evt) {
    console.log('2.ts: ready !');
    commonFun('congratulations');
    document.querySelector('.test .two')?.addEventListener('click', function (evt) {
        console.log('two button click');
        document.querySelectorAll('script').forEach(scrp => {
            scrp.remove();
        });
        this.addEventListener('click', (evt) => {
            const p = new People('similsy', 28);
            p.introself();
            f3();
        });
    }, {
        once: true,
    });
}
window.addEventListener('load', windowLoadedHandler);
function testNumberExtension() {
    const a = 18.11111111111111111111111111111113;
    const b = 18.111111111111111111111111111111;
    console.log('.......................', a.asEqual(b));
}
function testObjectExtension() {
    const obj = {
        a: 1,
        b: {
            c: 'hel',
            d: false,
            kitty: true,
            e: new Date(),
            critical: undefined,
            f: {
                f1: 123,
                f2: /^hello$/i,
                f3: null,
            },
            g: [1, 2, 3, 'see you'],
            h: [-1, -2, {}, new Date(), {
                    h1: 28,
                    h2: {
                        a: 1,
                        b: 'bili',
                        c: [1, 2, 3],
                    }
                }, true, null],
            haha: {
                "click": [
                    {
                        "type": "click",
                        "origType": "click",
                        "guid": 1,
                        "selector": "[data-dismiss=\"alert\"]",
                        "needsContext": false,
                        "namespace": "alert.bs.data-api"
                    },
                    {
                        "type": "click",
                        "origType": "click",
                        "guid": 2,
                        "selector": "[data-toggle^=\"button\"]",
                        "needsContext": false,
                        "namespace": "bs.button.data-api"
                    },
                    {
                        "type": "click",
                        "origType": "click",
                        "guid": 4,
                        "selector": "[data-slide], [data-slide-to]",
                        "needsContext": false,
                        "namespace": "bs.carousel.data-api"
                    },
                    {
                        "type": "click",
                        "origType": "click",
                        "guid": 6,
                        "selector": "[data-toggle=\"collapse\"]",
                        "needsContext": false,
                        "namespace": "bs.collapse.data-api"
                    },
                    {
                        "type": "click",
                        "origType": "click",
                        "guid": 9,
                        "selector": "[data-toggle=\"dropdown\"]",
                        "needsContext": false,
                        "namespace": "bs.data-api.dropdown"
                    },
                    {
                        "type": "click",
                        "origType": "click",
                        "guid": 10,
                        "selector": ".dropdown form",
                        "needsContext": false,
                        "namespace": "bs.data-api.dropdown"
                    },
                    {
                        "type": "click",
                        "origType": "click",
                        "guid": 11,
                        "selector": "[data-toggle=\"modal\"]",
                        "needsContext": false,
                        "namespace": "bs.data-api.modal"
                    },
                    {
                        "type": "click",
                        "origType": "click",
                        "guid": 13,
                        "selector": "[data-toggle=\"tab\"], [data-toggle=\"pill\"], [data-toggle=\"list\"]",
                        "needsContext": false,
                        "namespace": "bs.data-api.tab"
                    },
                    {
                        "type": "click",
                        "origType": "click",
                        "guid": 8,
                        "namespace": "bs.data-api.dropdown"
                    }
                ],
                "focusout": [
                    {
                        "type": "focusout",
                        "origType": "blur",
                        "guid": 3,
                        "selector": "[data-toggle^=\"button\"]",
                        "needsContext": false,
                        "namespace": "bs.button.data-api"
                    }
                ],
                "focusin": [
                    {
                        "type": "focusin",
                        "origType": "focus",
                        "guid": 3,
                        "selector": "[data-toggle^=\"button\"]",
                        "needsContext": false,
                        "namespace": "bs.button.data-api"
                    }
                ],
                "keydown": [
                    {
                        "type": "keydown",
                        "origType": "keydown",
                        "guid": 7,
                        "selector": "[data-toggle=\"dropdown\"]",
                        "needsContext": false,
                        "namespace": "bs.data-api.dropdown"
                    },
                    {
                        "type": "keydown",
                        "origType": "keydown",
                        "guid": 7,
                        "selector": ".dropdown-menu",
                        "needsContext": false,
                        "namespace": "bs.data-api.dropdown"
                    }
                ],
                "keyup": [
                    {
                        "type": "keyup",
                        "origType": "keyup",
                        "guid": 8,
                        "namespace": "bs.data-api.dropdown"
                    }
                ]
            }
        },
        d: /^java{script}$/,
    };
    const dt = (new Date());
    const nl = null;
    const rg = /[amd]+.\s$/i;
    const fun = () => { };
    const str = "hello,world";
    [obj, dt, nl, rg, fun, str, window].forEach(v => {
    });
    const defs = [];
    const windowClone = window.deepClone();
    console.log(window, windowClone);
    window.compareTo(windowClone, defs, "window");
}
//# sourceMappingURL=2.js.map