




/*********************************************************************************************************
 * 页面的入口文件，是前端页面文件（例如cshtml或html）中唯一包含的<script >标签中，entry属性指定的js脚本文件
 * 
 * 使用方法：
 *      1、在前端页面文件末尾，加入以下标签（普通html页面，则不需要@section，其他类型的页面文件，请参考相关文档）：
				@section custom_javascript{ 
							 <script src="<jscss-loader.js文件的全路径>" entry="<本js文件的全路径>"></script>
				}      
 *      2、找到main方法中，按照提示写入代码。
 * 
* 调试完毕，可考虑将 true改为false, 以关闭加载的调试信息
* *******************************************************************************************************/


JscssLoader.getInstance().startEntry({

	//globalRes: 默认包含必要脚本的文件 '/lib/script/json/global.json',一般不用修改
	//null 或 空字符串 '' 或 输入路劲不存在, 则放弃公共先决资源文件的加载
	globalRes: null,

	//是否启用调试
	debug: true, //默认false

	//在此添加本入口文件需要包含的js css文件全路径,默认[]
	//页面用到的js文件列表的数组,排列顺序必须保证:组内无依赖关系,后面的组可依赖于前面的组,反之则不然
	//必要时,查看global.json(或在此指定的其替代文件), 以免重复加载(虽然自动忽略)
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

	//业务主逻辑函数,默认hello,world,并打印当前的入口文件路径
	main: () => {
		//to do
		//new SizeWatcher(".show-child-w", 'w');

		openLastDetails();
		window.scrollTo(0, document.body.clientHeight);

		//testDeclareFile();
		// start to test custom bootstrap typescript.
		//testDomManipulator();
		//testUtilIndex();
		//testDomEventHandlerManager();
		//testUtilBackdrop();
		//testUtilFocustrap();
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
				})
			};
			const testIsElement = () => {
				const ele1 = document.getElementById('test-disabled-attr-empty-str');
				const ele2 = document.getElementById('no-such-id');
				const obj: Record<string, string> = {};
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
				})
			}
			const testGetSelector = () => {
				const ele = document.querySelector('.test-sundry-getSelector');
				if (ele) {
					[...ele.children].forEach(chd => {
						const c = chd as HTMLElement;
						const sel_org = uIndex.getSelector_orig(c);
						const sel = uIndex.getSelector(c);
						const cls = sel_org === sel ? '' : 'border border-3 border-warning';
						const suffix = `. result: <span class="${cls}">[getSelector_orig]=【${sel_org}】,[getSelector]=【${sel}】</span>`;
						c.innerHTML += suffix;
					})
				}
			}
			const testGetTransitionDurationFromElement = () => {
				const wrapp = document.querySelector('.test-sundry-getDuration') as HTMLElement;
				[...wrapp.children].forEach(chd => {
					const c = chd as HTMLElement;
					const res_one = uIndex.getTransitionDurationFromElement(c);
					const res_two = uIndex.getTransitionDuraDelay(c);
					c.innerHTML = `${c.className}, orig-method【${res_one}】，new-method【${res_two}】`;

					// c.addEventListener('click', (evt: Event) => {
					// 	const cls = c.className;
					// 	c.classList.remove(cls);
					// 	//void c.innerHTML;
					// 	c.innerHTML = '';
					// 	c.classList.add(cls);
					// 	c.innerHTML = 'hello';
					// });
				})
			}
			const testIsDisabled = () => {
				const showDefrence = (ele: HTMLElement, assignedValue: any) => {
					const d_one = uIndex.isDisabled_orig(ele);
					const d_two = uIndex.isDisabled(ele);
					console.log(`assign to ${assignedValue}, isDisabled: orig【${d_one}】,new【${d_two}】`);
				}
				const js_btninfos = new Map<string, any>([
					['test-disabled-NaN', NaN],
					['test-disabled-false', false],
					['test-disabled-empty-string', ''],
					['test-disabled-0', 0],
					['test-disabled-undefined', undefined],
					['test-disabled-other', 'undefined'],
				]);
				[...js_btninfos.entries()].forEach(item => {
					(document.getElementById(item[0]) as HTMLElement).addEventListener('click', function (evt: Event) {
						//@ts-ignore
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
					const btn = document.getElementById(id) as HTMLElement;
					showDefrence(btn, id);
				})
			};
			const testIsVisible = () => {
				const par = document.querySelector('.test-sundry-isVisible') as HTMLElement;
				const dbg_result = par.querySelector('.dbg-result') as HTMLUListElement;
				par.querySelectorAll('span').forEach(span => {
					const vis_orig = uIndex.isVisible_orig(span);
					const vis_newly = uIndex.isVisible(span);
					const cls = vis_orig != vis_newly ? "border border-warning border-3" : "";
					const result = `${span.innerText || span.getAttribute('style')} -- <span class="${cls}">orig【${vis_orig}】,newly【${vis_newly}】</span>`;
					const ele_li = document.createElement('li');
					ele_li.innerHTML = result;
					dbg_result.appendChild(ele_li);
				})
			};
			const testFindShadowRoot = () => {
				var parent = document.querySelector('.js-parent'),
					child = document.querySelector('.js-child'),
					shadowHost = document.querySelector('.js-shadowHost');

				//#region 先测试系统函数 getRootNode()
				console.log(parent?.getRootNode().nodeName); // #document
				console.log(child?.getRootNode().nodeName); // #document

				// create a ShadowRoot
				var shadowRoot = shadowHost?.attachShadow({ mode: 'open' }) as ShadowRoot;
				shadowRoot.innerHTML = '<style>div{background:#2bb8aa;}</style>'
					+ '<div class="js-shadowChild">content</div>';
				var shadowChild = shadowRoot.querySelector('.js-shadowChild');

				// The default value of composed is false
				console.log(shadowChild?.getRootNode() === shadowRoot); // true
				console.log(shadowChild?.getRootNode({ composed: false }) === shadowRoot); // true
				console.log(shadowChild?.getRootNode({ composed: true }).nodeName); // #document

				// 如果测试 shadow-root 自身, 则结果与测试其子级一致
				console.log(shadowRoot.getRootNode() === shadowRoot);
				console.log(shadowRoot.getRootNode({ composed: false }) === shadowRoot); // true
				console.log(shadowRoot.getRootNode({ composed: true }).nodeName); // #document
				//#endregion
				const fsr = uIndex.findShadowRoot;
				const fsr_org = uIndex.findShadowRoot_orig;
				[fsr, fsr_org].forEach(f => {
					console.log(`${f.name} testing start.`)
					console.assert(f(parent as Element) === null);
					console.assert(f(child as Element) === null);
					console.assert(f(shadowHost as Element) === null);
					console.assert(f(shadowRoot) === shadowRoot);
					console.assert(f(shadowChild as Element) === shadowRoot);
					console.log(`${f.name} testing completed`);
				})



				//	})

			};
			const testGetNextElement = () => {
				const result_ul = document.querySelector('.next-element-result');
				const handleResult = (fun: typeof uIndex.nextItem,
					arr: Array<any>, cur: number, for_next: boolean, cycled: boolean) => {
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
								})
							})
						})
					})
				}

			}

			testToType();
			//testIsElement();
			//testGetUID();
			//testGetSelector();
			//testGetTransitionDurationFromElement();
			//testIsDisabled();

			// 注意这里的测试, 需要为顶级 details 添加 open; 
			//并注释掉 js 脚本的 openLastDetails 函数调用;
			//testIsVisible();
			//testFindShadowRoot();
			//testGetNextElement();
		}

		function testDomManipulator() {
			const domMpl = CustomBootstrap.Dom.Manipulator;
			const ele_user = document.querySelector("#user") as HTMLElement;
			ele_user.dataset.bs;
			ele_user.dataset.bsUser;
			ele_user.dataset.bsPwd;
			ele_user.dataset.bspwd;  // undefined
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
			type CT = CustomBootstrap.Util.BackdropConfigOptions;
			const btn_create = document.querySelector('.test-util-backdrop-create') as HTMLElement;
			const btn_show = document.querySelector('.test-util-backdrop-show') as HTMLElement;
			const btn_hide = document.querySelector('.test-util-backdrop-hide') as HTMLElement;
			const btn_dispose = document.querySelector('.test-util-backdrop-dispose') as HTMLElement;
			const bd_ctn = document.querySelector('#backdrop-container') as HTMLElement;
			[btn_create, btn_show, btn_hide, btn_dispose, bd_ctn].forEach(item => {
				console.assert(item !== null, "至少一个 html 对象获取错误");
			});

			let bd: CustomBootstrap.Util.Backdrop | null = null;
			const cfg: CT = {
				//one: true,
				//two: "this is value of two",
				//element: null,
				isAnimated: true,
				rootElement: bd_ctn,
				clickCallback: function (this: HTMLElement, evt: Event) {
					console.log('element of backdrop  clicked');
					// this 指向 backdrop.element
					btn_hide.click();
				},
			};


			btn_create.addEventListener('click', (evt: Event) => {
				if (!bd) {
					bd = new CustomBootstrap.Util.Backdrop(cfg);
				}
			});
			btn_show.addEventListener('click', (evt: Event) => {
				if (bd) {
					bd.show(() => {
						console.log('backdrop show...');
					})
				}
			});
			btn_hide.addEventListener('click', (evt: Event) => {
				if (bd) {
					bd.hide(() => {
						console.log('backdrop hidden');
					})
				}
			});
			btn_dispose.addEventListener('click', (evt: Event) => {
				if (bd) {
					bd.dispose();
					//	bd = null;
				}
			});
		}
		/**
		 * 测试前, 如果测试函数为公开, 务必添加 export, 测试完立刻删除
		 */
		function testDomEventHandlerManager() {
			const LstWrp = CustomBootstrap.Dom.EventHandler.ListenerWrapper;
			const hMgr = CustomBootstrap.Dom.EventHandler.Manager;


			const testTypeRecognition = () => {
				interface A {
					a: number;
				};
				interface B extends A {
					b: string;
				}
				interface C extends B {
					c: boolean;
				}
				const one = { a: 100 } as A;
				const two = { a: 200, b: 'hello' };
				const three = { a: 300, b: 'world', c: true };
				[one, two, three].forEach(item => {
					console.log(item, ': typeof is', typeof item, ', toType_Orig() is ',
						CustomBootstrap.Util.Index.toType_Orig(item), ', toType() is ',
						CustomBootstrap.Util.Index.toType(item));
				});
				console.log("结论:类型获取, 任何对象, 不可能返回 interface 或 type 所指定. ");
			}
			const test_emptyEventType = () => {
				const hilihi = document.getElementById('hilihi') as HTMLElement;
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

				const outer = document.querySelector('.test-manager-on-off-trigger .outer') as HTMLElement;
				const middle = document.querySelector('.test-manager-on-off-trigger .middle') as HTMLElement;
				const inner1 = document.querySelector('.test-manager-on-off-trigger .inner1') as HTMLElement;
				const inner2 = document.querySelector('.test-manager-on-off-trigger .inner2') as HTMLElement;

				const iptEvtType = document.querySelector('.test-manager-on-off-trigger .event-type') as HTMLInputElement;

				const btnOn = document.querySelector('.test-manager-on-off-trigger .to-on') as HTMLElement;
				const btnOne = document.querySelector('.test-manager-on-off-trigger .to-one') as HTMLElement;
				const btnOff = document.querySelector('.test-manager-on-off-trigger .to-off') as HTMLElement;
				const btnOffAll = document.querySelector('.test-manager-on-off-trigger .to-off-all') as HTMLElement;

				const trigger1 = document.querySelector('.test-manager-on-off-trigger .bubbles-true') as HTMLElement;
				const trigger2 = document.querySelector('.test-manager-on-off-trigger .bubbles-false') as HTMLElement;

				const btnShowReg = document.querySelector('.test-manager-on-off-trigger .show-registry') as HTMLElement;

				[outer, middle, inner1, inner2, iptEvtType, btnOn, btnOne, btnOff, btnOffAll, trigger1, trigger2, btnShowReg]
					.forEach(item => {
						console.assert(item != null, '发现一个 null, 请检查拼写是否有误');
					})

				let customType = iptEvtType.value;

				const config = () => {
					const createWrapperOptions = (ele: HTMLElement, dlgSelector?: string, batch?: boolean) => {
						let options = {
							element: ele,
							evtType: customType,
							clientListener: _showEventInfo,
						};// as CustomBootstrap.Dom.EventHandler.ListenerWrapperOptions;
						if (dlgSelector) {
							options = Object.assign(options, {
								dlgSelector,
							});// as CustomBootstrap.Dom.EventHandler.DelegateListenerWrapperOptions;
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
						//			hMgr.on(outer, customType, _showEventInfo, '.middle,.inner1,.inner2');
						//			const opt: CustomBootstrap.Dom.ListenerWrapper.
						//hMgr.on(createWrapperOptions(outer));
						hMgr.on(createWrapperOptions(middle, '[class^=inner]'));
						//	hMgr.on(outer, customType, _showEventInfo, '.inner2');
					});

					btnOne.addEventListener('click', evt => {
						//		hMgr.one(inner1, customType, _showEventInfo);
						//		hMgr.one(middle, customType, _showEventInfo, '[class^=inner]');
						//hMgr.one(createWrapperOptions(outer));
						hMgr.one(createWrapperOptions(middle, '[class^=inner]'));
					});

					btnOff.addEventListener('click', evt => {
						//hMgr.off(createWrapperOptions(outer));
						hMgr.off(createWrapperOptions(middle, '[class^=inner]'));
					});
					btnOffAll.addEventListener('click', evt => {
						hMgr.off(createWrapperOptions(middle, "...", true));
					});

					trigger1.addEventListener('click', evt => {
						// hMgr.trigger(outer, customType, {
						// 	detail: "via first trigger, bubbles:true",
						// 	bubbles: true
						// });
						hMgr.trigger(inner1, customType, {
							detail: "via first trigger, bubbles:true",
							bubbles: true
						});
					});
					trigger2.addEventListener('click', evt => {
						// hMgr.trigger(outer, customType, {
						// 	detail: "via second trigger, bubbles:false",
						// 	bubbles: false,
						// });
						// hMgr.trigger(middle, customType, {
						// 	detail: "via second trigger, bubbles:false",
						// 	bubbles: false,
						// });
						hMgr.trigger(inner2, customType, {
							detail: "via first trigger, bubbles:true",
							bubbles: true
						});
					});
				}
				config();
			}

			//testTypeRecognition();
			//test_emptyEventType();
			//test_mgr_on_off_trigger();
		}

		function testUtilFocustrap() {
			const fm = document.querySelector('.ndemo-util-focustrap form') as HTMLFormElement;
			const btn_act = document.querySelector('.ndemo-util-focustrap .do-active') as HTMLButtonElement;
			const btn_dea = document.querySelector('.ndemo-util-focustrap .do-deactive') as HTMLButtonElement;
			const fct = new CustomBootstrap.Util.FocusTrap({
				autofocus: true,
				element: fm,
			});
			btn_act.addEventListener('click', () => fct.activate());
			btn_dea.addEventListener('click', () => fct.deactivate());

		}
		function testUtilSwipe() {

		}

		function _tryShowJson(desc: string, jsonStr: string | undefined) {
			try {
				const json = JSON.parse(jsonStr || '');
				console.log(`success for ${desc}:`, json);
			} catch (err) {
				console.log(`fail to json for ${desc}:`, err);
				console.log('now change it:');
				jsonStr = jsonStr?.replace(/\'/g, '\"');
				try {
					const json = JSON.parse(jsonStr || '');
					console.log(`success for ${desc}:`, json);
				} catch (err) {
					console.log(`unexpected error for :${desc}`, err);
				}
			}
		}

		function _showEventInfo(this: HTMLElement, evt: Event) {
			//console.clear();
			evt.preventDefault();
			const ct = evt.currentTarget as HTMLElement;
			console.log("type:", evt.type,
				"current tag:", ct.tagName,
				"this tag:", this.tagName,
				"path length:", evt.composedPath().length,
				"current step:", evt.eventPhase,
				"bubbles:", evt.bubbles,
				"detail:", (evt as CustomEvent).detail);
		}

		/**
		 * 用于做点简单的临时测试
		 */
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


