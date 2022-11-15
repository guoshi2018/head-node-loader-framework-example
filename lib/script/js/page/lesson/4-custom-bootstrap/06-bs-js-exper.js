"use strict";
JscssLoader.getInstance().startEntry({
    globalRes: null,
    debug: true,
    privateRes: [
        [
            '/page/lesson/4-custom-bootstrap/06-bs-js-exper/index.css',
        ],
        [
            '/lib/script/js/indoor-lib/function/guoshi/tool.js',
            '/lib/script/js/indoor-lib/custom-bootstrap5.2/bustom-bootstrap5.2.bundler.js',
            '/lib/script/js/indoor-lib/guoshi-demo/guoshi.bundler.js',
        ]
    ],
    main: () => {
        openLastDetails();
        window.scrollTo(0, document.body.clientHeight);
        testUtilSwipe();
        temp();
        function testDeclareFile() {
            const one = new GuoshiDemo.Util.Hello('precream');
            one.intro();
            one.please({
                name: 'williams',
                age: 29
            });
            const two = new GuoshiDemo.Util.Heavy('maryie', -18.3);
            two.please({
                salary: 19923,
                name: 'lcip',
                age: 49,
            });
        }
        function testUtilIndex() {
            const Student = class {
            };
            const uIndex = CustomBootstrap.Util.Index;
            const testToType = () => {
                const paragraph = 'The quick brown fox jumps over the lazy dog, I think so. It barked.';
                const regex = /\s[A-Z]/g;
                const found = paragraph.match(regex);
                console.log(found);
                ['', 'hello', '18', '0', 0, 15, -3, true, false, null, false, undefined,
                    new Date(), "1981-12-23", new GuoshiDemo.Util.Hello('guoshi').intro(), _tryShowJson,
                    /\s[1-2]{2,5}java$/, { a: 18, b: "hey" }, JscssLoader, new Student()
                ].forEach(item => {
                    const t1 = uIndex.toType_Orig(item);
                    const t2 = uIndex.toType(item);
                    const t3 = uIndex.toType(item, false);
                    console.warn(item, `toType_Orig() is <${t1}>`);
                    console.info(item, `toType() is <${t2}>,toType(lowercase=false) is <${t3}>`);
                    if (t1 != t2) {
                        console.log("------------------- one deference founded");
                    }
                });
            };
            const testIsElement = () => {
                const ele1 = document.getElementById('test-disabled-attr-empty-str');
                const ele2 = document.getElementById('no-such-id');
                const obj = {};
                obj.nodeType = "fake it";
                [ele1, ele2, obj].forEach(v => {
                    const ok_orig = uIndex.isElement_orig(v);
                    const ok_newly = uIndex.isElement(v);
                    const ok_html = uIndex.isHTMLElement(v);
                    console.log(v, `is element ? orig:${ok_orig},newly:${ok_newly}; is html element ? ${ok_html}`);
                });
            };
            const testGetUID = () => {
                ['a', 'b', 'c', 'd'].forEach(item => {
                    console.log(uIndex.getUID(item));
                });
            };
            const testGetSelector = () => {
                const ele = document.querySelector('.test-sundry-getSelector');
                if (ele) {
                    [...ele.children].forEach(chd => {
                        const c = chd;
                        const sel_org = uIndex.getSelector_orig(c);
                        const sel = uIndex.getSelector(c);
                        const cls = sel_org === sel ? '' : 'border border-3 border-warning';
                        const suffix = `. result: <span class="${cls}">[getSelector_orig]=【${sel_org}】,[getSelector]=【${sel}】</span>`;
                        c.innerHTML += suffix;
                    });
                }
            };
            const testGetTransitionDurationFromElement = () => {
                const wrapp = document.querySelector('.test-sundry-getDuration');
                [...wrapp.children].forEach(chd => {
                    const c = chd;
                    const res_one = uIndex.getTransitionDurationFromElement(c);
                    const res_two = uIndex.getTransitionDuraDelay(c);
                    c.innerHTML = `${c.className}, orig-method【${res_one}】，new-method【${res_two}】`;
                });
            };
            const testIsDisabled = () => {
                const showDefrence = (ele, assignedValue) => {
                    const d_one = uIndex.isDisabled_orig(ele);
                    const d_two = uIndex.isDisabled(ele);
                    console.log(`assign to ${assignedValue}, isDisabled: orig【${d_one}】,new【${d_two}】`);
                };
                const js_btninfos = new Map([
                    ['test-disabled-NaN', NaN],
                    ['test-disabled-false', false],
                    ['test-disabled-empty-string', ''],
                    ['test-disabled-0', 0],
                    ['test-disabled-undefined', undefined],
                    ['test-disabled-other', 'undefined'],
                ]);
                [...js_btninfos.entries()].forEach(item => {
                    document.getElementById(item[0]).addEventListener('click', function (evt) {
                        this.disabled = item[1];
                        showDefrence(this, item[1]);
                    });
                });
                [
                    "test-disabled-only-attr",
                    "test-disabled-attr-empty-str",
                    "test-disabled-attr-false",
                    "test-disabled-class",
                ].forEach(id => {
                    const btn = document.getElementById(id);
                    showDefrence(btn, id);
                });
            };
            const testIsVisible = () => {
                const par = document.querySelector('.test-sundry-isVisible');
                const dbg_result = par.querySelector('.dbg-result');
                par.querySelectorAll('span').forEach(span => {
                    const vis_orig = uIndex.isVisible_orig(span);
                    const vis_newly = uIndex.isVisible(span);
                    const cls = vis_orig != vis_newly ? "border border-warning border-3" : "";
                    const result = `${span.innerText || span.getAttribute('style')} -- <span class="${cls}">orig【${vis_orig}】,newly【${vis_newly}】</span>`;
                    const ele_li = document.createElement('li');
                    ele_li.innerHTML = result;
                    dbg_result.appendChild(ele_li);
                });
            };
            const testFindShadowRoot = () => {
                var parent = document.querySelector('.js-parent'), child = document.querySelector('.js-child'), shadowHost = document.querySelector('.js-shadowHost');
                console.log(parent?.getRootNode().nodeName);
                console.log(child?.getRootNode().nodeName);
                var shadowRoot = shadowHost?.attachShadow({ mode: 'open' });
                shadowRoot.innerHTML = '<style>div{background:#2bb8aa;}</style>'
                    + '<div class="js-shadowChild">content</div>';
                var shadowChild = shadowRoot.querySelector('.js-shadowChild');
                console.log(shadowChild?.getRootNode() === shadowRoot);
                console.log(shadowChild?.getRootNode({ composed: false }) === shadowRoot);
                console.log(shadowChild?.getRootNode({ composed: true }).nodeName);
                console.log(shadowRoot.getRootNode() === shadowRoot);
                console.log(shadowRoot.getRootNode({ composed: false }) === shadowRoot);
                console.log(shadowRoot.getRootNode({ composed: true }).nodeName);
                const fsr = uIndex.findShadowRoot;
                const fsr_org = uIndex.findShadowRoot_orig;
                [fsr, fsr_org].forEach(f => {
                    console.log(`${f.name} testing start.`);
                    console.assert(f(parent) === null);
                    console.assert(f(child) === null);
                    console.assert(f(shadowHost) === null);
                    console.assert(f(shadowRoot) === shadowRoot);
                    console.assert(f(shadowChild) === shadowRoot);
                    console.log(`${f.name} testing completed`);
                });
            };
            const testGetNextElement = () => {
                const result_ul = document.querySelector('.next-element-result');
                const handleResult = (fun, arr, cur, for_next, cycled) => {
                    const result = fun(arr, cur, for_next, cycled);
                    const next = for_next ? "next" : "prev";
                    const cycle = cycled ? "cycle" : "uncycle";
                    const text = `[${arr}],【${fun.name}】,current=${cur},${next},${cycle}--->${result}`;
                    const li = document.createElement('li');
                    li.textContent = text;
                    result_ul?.appendChild(li);
                };
                if (result_ul) {
                    [[], [0], [0, 1], [0, 1, 2], [0, 1, 2, 3, 4, 5]].forEach(arr => {
                        [-1, 0, 1, 2, 5].forEach(cur => {
                            [true, false].forEach(cycled => {
                                [true, false].forEach(for_next => {
                                    handleResult(uIndex.getNextActiveElement, arr, cur, for_next, cycled);
                                    handleResult(uIndex.nextItem, arr, cur, for_next, cycled);
                                });
                            });
                        });
                    });
                }
            };
            testToType();
        }
        function testDomManipulator() {
            const domMpl = CustomBootstrap.Dom.Manipulator;
            const ele_user = document.querySelector("#user");
            ele_user.dataset.bs;
            ele_user.dataset.bsUser;
            ele_user.dataset.bsPwd;
            ele_user.dataset.bspwd;
            ele_user.dataset.oligan;
            ele_user.dataset.bsOk;
            _tryShowJson("bs-json1", ele_user.dataset.bsJson1);
            _tryShowJson("bs-json2", ele_user.dataset.bsJson2);
            ele_user.dataset.anotherPowerSetting = '{"k":123,"tom":"1981-10-23"}';
            domMpl.setDataAttribute(ele_user, "monika", 'sit down');
            console.log(domMpl.getDataAttributes(ele_user));
            console.log(domMpl.getDataAttribute(ele_user, "json1"));
            console.log(domMpl.getDataAttribute(ele_user, "json2"));
            console.log(domMpl.getDataAttribute(ele_user, 'no-such-key'));
            domMpl.removeDataAttribute(ele_user, "json2");
            console.log('this is the end of demo1');
        }
        function testUtilBackdrop() {
            const btn_create = document.querySelector('.test-util-backdrop-create');
            const btn_show = document.querySelector('.test-util-backdrop-show');
            const btn_hide = document.querySelector('.test-util-backdrop-hide');
            const btn_dispose = document.querySelector('.test-util-backdrop-dispose');
            const bd_ctn = document.querySelector('#backdrop-container');
            [btn_create, btn_show, btn_hide, btn_dispose, bd_ctn].forEach(item => {
                console.assert(item !== null, "至少一个 html 对象获取错误");
            });
            let bd = null;
            const cfg = {
                isAnimated: true,
                rootElement: bd_ctn,
                clickCallback: function (evt) {
                    console.log('element of backdrop  clicked');
                    btn_hide.click();
                },
            };
            btn_create.addEventListener('click', (evt) => {
                if (!bd) {
                    bd = new CustomBootstrap.Util.Backdrop(cfg);
                }
            });
            btn_show.addEventListener('click', (evt) => {
                if (bd) {
                    bd.show(() => {
                        console.log('backdrop show...');
                    });
                }
            });
            btn_hide.addEventListener('click', (evt) => {
                if (bd) {
                    bd.hide(() => {
                        console.log('backdrop hidden');
                    });
                }
            });
            btn_dispose.addEventListener('click', (evt) => {
                if (bd) {
                    bd.dispose();
                }
            });
        }
        function testDomEventHandlerManager() {
            const LstWrp = CustomBootstrap.Dom.EventHandler.ListenerWrapper;
            const hMgr = CustomBootstrap.Dom.EventHandler.Manager;
            const testTypeRecognition = () => {
                ;
                const one = { a: 100 };
                const two = { a: 200, b: 'hello' };
                const three = { a: 300, b: 'world', c: true };
                [one, two, three].forEach(item => {
                    console.log(item, ': typeof is', typeof item, ', toType_Orig() is ', CustomBootstrap.Util.Index.toType_Orig(item), ', toType() is ', CustomBootstrap.Util.Index.toType(item));
                });
                console.log("结论:类型获取, 任何对象, 不可能返回 interface 或 type 所指定. ");
            };
            const test_emptyEventType = () => {
                const hilihi = document.getElementById('hilihi');
                hilihi.addEventListener('', evt => {
                    console.log("empty event type come", evt);
                });
                hilihi.dispatchEvent(new CustomEvent('', {
                    detail: '空事件类型, 也是有响应的!',
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                }));
            };
            const test_mgr_on_off_trigger = () => {
                const outer = document.querySelector('.test-manager-on-off-trigger .outer');
                const middle = document.querySelector('.test-manager-on-off-trigger .middle');
                const inner1 = document.querySelector('.test-manager-on-off-trigger .inner1');
                const inner2 = document.querySelector('.test-manager-on-off-trigger .inner2');
                const iptEvtType = document.querySelector('.test-manager-on-off-trigger .event-type');
                const btnOn = document.querySelector('.test-manager-on-off-trigger .to-on');
                const btnOne = document.querySelector('.test-manager-on-off-trigger .to-one');
                const btnOff = document.querySelector('.test-manager-on-off-trigger .to-off');
                const btnOffAll = document.querySelector('.test-manager-on-off-trigger .to-off-all');
                const trigger1 = document.querySelector('.test-manager-on-off-trigger .bubbles-true');
                const trigger2 = document.querySelector('.test-manager-on-off-trigger .bubbles-false');
                const btnShowReg = document.querySelector('.test-manager-on-off-trigger .show-registry');
                [outer, middle, inner1, inner2, iptEvtType, btnOn, btnOne, btnOff, btnOffAll, trigger1, trigger2, btnShowReg]
                    .forEach(item => {
                    console.assert(item != null, '发现一个 null, 请检查拼写是否有误');
                });
                let customType = iptEvtType.value;
                const config = () => {
                    const createWrapperOptions = (ele, dlgSelector, batch) => {
                        let options = {
                            element: ele,
                            evtType: customType,
                            clientListener: _showEventInfo,
                        };
                        if (dlgSelector) {
                            options = Object.assign(options, {
                                dlgSelector,
                            });
                        }
                        if (batch) {
                            Reflect.deleteProperty(options, "clientListener");
                            Reflect.deleteProperty(options, "dlgSelector");
                        }
                        return options;
                    };
                    btnShowReg.addEventListener('click', evt => {
                        console.log(LstWrp.wrapperRegistry);
                    });
                    iptEvtType.addEventListener('input', evt => {
                        customType = iptEvtType.value;
                    });
                    btnOn.addEventListener('click', evt => {
                        hMgr.on(createWrapperOptions(middle, '[class^=inner]'));
                    });
                    btnOne.addEventListener('click', evt => {
                        hMgr.one(createWrapperOptions(middle, '[class^=inner]'));
                    });
                    btnOff.addEventListener('click', evt => {
                        hMgr.off(createWrapperOptions(middle, '[class^=inner]'));
                    });
                    btnOffAll.addEventListener('click', evt => {
                        hMgr.off(createWrapperOptions(middle, "...", true));
                    });
                    trigger1.addEventListener('click', evt => {
                        hMgr.trigger(inner1, customType, {
                            detail: "via first trigger, bubbles:true",
                            bubbles: true
                        });
                    });
                    trigger2.addEventListener('click', evt => {
                        hMgr.trigger(inner2, customType, {
                            detail: "via first trigger, bubbles:true",
                            bubbles: true
                        });
                    });
                };
                config();
            };
        }
        function testUtilFocustrap() {
            const fm = document.querySelector('.ndemo-util-focustrap form');
            const btn_act = document.querySelector('.ndemo-util-focustrap .do-active');
            const btn_dea = document.querySelector('.ndemo-util-focustrap .do-deactive');
            const fct = new CustomBootstrap.Util.FocusTrap({
                autofocus: true,
                element: fm,
            });
            btn_act.addEventListener('click', () => fct.activate());
            btn_dea.addEventListener('click', () => fct.deactivate());
        }
        function testUtilSwipe() {
        }
        function _tryShowJson(desc, jsonStr) {
            try {
                const json = JSON.parse(jsonStr || '');
                console.log(`success for ${desc}:`, json);
            }
            catch (err) {
                console.log(`fail to json for ${desc}:`, err);
                console.log('now change it:');
                jsonStr = jsonStr?.replace(/\'/g, '\"');
                try {
                    const json = JSON.parse(jsonStr || '');
                    console.log(`success for ${desc}:`, json);
                }
                catch (err) {
                    console.log(`unexpected error for :${desc}`, err);
                }
            }
        }
        function _showEventInfo(evt) {
            evt.preventDefault();
            const ct = evt.currentTarget;
            console.log("type:", evt.type, "current tag:", ct.tagName, "this tag:", this.tagName, "path length:", evt.composedPath().length, "current step:", evt.eventPhase, "bubbles:", evt.bubbles, "detail:", evt.detail);
        }
        function temp() {
            const o = Object.assign({}, {
                a: 100,
                abc: {
                    a: 1,
                    b: 2,
                    c: 3,
                },
            }, {
                aa: 200,
                abc: {
                    a: -1,
                    d: 90,
                }
            });
            console.log(o);
        }
    }
});
//# sourceMappingURL=06-bs-js-exper.js.map