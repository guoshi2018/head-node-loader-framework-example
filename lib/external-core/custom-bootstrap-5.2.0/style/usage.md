## about form:

> + div .form-text

> +	div .form-check .form-check-inline .form-check-reverse .form-switch 
	> - input[type=checkbox|radio] .form-check-input [2] [3]
	> - label .form-check-label

> + div > [15]
	> - input[type=checkbox|radio] .btn-check
	> - label .btn .btn-outline-secondary [28]

> + div > [9]
	> - label .form-label
	> - input[type=range] .form-range h(min,max,value,step,disabled)

> + div .input-group .flex-nowrap> [7] [1]
	> - span .input-group-text
	> - label .input-group-text
	> - input[type=text] .form-control
	> - button[type=button] .btn.dropdown-toggle [10] [28]
	> - button[type=button] .btn.dropdown-toggle.dropdown-toggle-split [11] [28]
 	> - span.visually-hidden
	> - button[type=button] .btn [28]
	> - select .form-select
 	> - option ...
	> - input[type=file] .form-control
	> - div.input-group-text [8]
	 > - input[type=checkbox|radio].form-check-input.mt-0
	> - div .form-floating
	 > - input .form-control
	 > - label

> + div .input-group.has-validation
	> - span .input-group-text
	> - div .form-floating.is-invalid
 	> - input .form-control.is-invalid 
 	> - label
	> - div .invalid-feedback 

> + div .form-floating [14]
	> - input[type=email|pwd|...] .form-control(.is-invalid) [12]
	> - label
	> - textarea .form-control [13]
	> - input[type=...] .form-control-plaintext
	> - select .form-select

> + div .row.mb-3 [16]
	> - label .col-sm-2.col-form-label
	> - div .col-sm-10
 	> - label .visually-hidden
 	> - input[type=...] .form-control
 	> - div .input-group [17]
 	> - div .form-check [17]

> + span .form-text
> + textarea .form-control(-sm,lg)
> + input[type=text&&list] [23]
> + input[type=text,pwd,email,file] .form-control [1] .form-control-plaintext
> + input[type=color] .form-control [1].form-control-color
> + select: .form-select [1]
> + button(input,a) .btn.btn-link.disabled.text-nowrap [1] [22] [24] [25] [26] [27] [28]
> + button[type=button] .btn-close(.btn-close-white)


## component
> + section .accordion(.accordion-flush) h(id)acc-container [18]
	> - article .accordion-item
		> - h2 .accordion-header
			> - button[type=button] .accordion-button h(data-bs-toggle)collapse h(data-bs-target)#acc-content1
		> - main[id=acc-content1] .accordion-collapse(.show) h(data-bs-parent)#acc-container
			> - p .accordion-body
	> - article .accordion-item ... 

> + section .alert.alert-(primary...).alert-dismissible.fade.show [19]
	> - h4 .alert-heading
	> - p
	> - hr
	> - svg...
	> - ... ...
	> - div(span,lable)
 	> - a .alert-link
	> - button[type=button] .btn-close h(data-bs-dismiss)alert

> + h1(h2...), button.btn.postion-relative [20] [28]
	> - span .badge(.text-bg-...,bg-...)(.rounded-pill).position-absolute.top-0.start-100 .translate-middle

> + nav h(aria-label)breadcrumb [21]
	> - ol .breadcrumb
 		> - li .breadcrumb-item
  		> - a 
		> - li .breadcrumb-item
			> - a
		> - li .breadcrumb-item.active h(aria-current)page

> + .btn-toolbar [30] 
	> - .btn-group(.btn-group-vertical) [28] [1] [32]
  	> - button.btn
  	> - a.btn.active 
  	> - input[type=checkbox|radio].btn-check h(autocomplete)off
  	> - label.btn [29]
  	> - div.btn-group 
   	> - button[type=button].btn.dropdown-toggle [10]
	> - .input-group [31]
  
> + .card [34]
	> - .card-img-top
	> - .card-header
 	> - text
 	> - ul .card-header-tabs.nav(.nav-tabs,.nav-pills) [35]
	> - .card-body(.card-img-overlay)
 	> - .card-title
 	> - .card-subtitle
 	> - .card-text
 	> - .... [33]
	> - ul .list-group(.list-group-flush)
 	> - li .list-group-item
	> - .card-footer

> + .card-group [36]
> + > - .card
> + > - .card

> + button[type=button] .btn(.btn-...) toggle:collapse target:#id 
> + a.btn(.btn-...) h(data-bs-toggle)collapse h(href)#id
> + .collapse(.show)(.collapse-horizontal) [38]
	> - .([style:width:...px;height:...px]) [37]

> + .dropdown || .dropup || .dropend || .dropstart || .dropdown-center || .dropup-center || .position-relative [39] 
	> - button[type=button] .btn(.btn-...)(.btn-sm,lg).dropdown-toggle(.dropdown-toggle-split) toggle:dropdown h(data-bs-auto-close)false(inside,outside,null)
	> - a .btn(.btn-...).dropdown-toggle h(data-bs-toggle)dropdown 
	> - ul .dropdown-menu(.dropdown-menu-dark)(.dropdown-menu-mq-end)(.dropdown-menu-mq-start)
	> - li
  	> - h6.dropdown-header
  	> - a.dropdown-item(.active)  
  	> - button[type=button]..dropdown-item
  	> - span.dropdown-item-text
  	> - hr.dropdown-divider
	> - p 
	> - form 

> + (ul,ol,div) .list-group(.list-group-horizontal).list-group-flush(.list-group-numbered) [40]
	> - (li) .list-group-item(.list-group-item-primary)(.active)
	> - label .form-check-label.stretched-link 
	> - a(button[type=button]) .list-group-item.list-group-item-action(.list-group-item-primary)(.active)

> + .modal(.fade) h(tabindex)-1 h(data-bs-backdrop)static [41]
	> - .modal-dialog(.modal-dialog-scrollable)(.modal-dialog-centered)(.modal-sm,-lg,-xl)(.modal-fullscreen-{sm,md,lg,xl,xxl}-down)(.modal-fullscreen)
  	> - .modal-content
    	> - .modal-header
      	> - h5.modal-title
      	> - button[type=button].btn-close h(data-bs-dismiss)modal
    	> - .modal-body
      	> - p....
    	> - .modal-footer
      	> - button[type=button].btn(.btn-primary...) h(data-bs-dismiss)modal 
      	> - button[type=button].btn(.btn-secondary...) 
> + .button[type=button].btn(.btn-primary...) h(data-bs-toggle)modal h(data-bs-target)#modalID 

> + nav.navbar(.navbar-dark)(.navbar-expand-lg)(.bg-light) [42]
	> - .container-fluid || .container
  	> - a.navbar-brand
    	> - img.d-inline-block.align-text-top
    	> - (plaintext) 
  	> - span.navbar-brand 
  	> - button.navbar-toggler toggle:collapse target:#navID 
    	> - span.navbar-toggler-icon
  	> - div.collapse.navbar-collapse
    	> - ul.navbar-nav(.navbar-nav-scroll)
      	> - li.nav-item
        	> - a.nav-link(.active)(.disabled)  
        	> - a.nav-link.dropdown-toggle toggle:dropdown 
        	> - ul.dropdown-menu
          	> - li > a.dropdown-item  
    	> - div.navbar-nav(.navbar-nav-scroll)
      	> - a.nav-link(.active)(.disabled)  
  	> - div.offcanvas(.offcanvas-end)
    	> - .offcanvas-header
    	> - .offcanvas-body    
  	> - span.navbar-text   
	> - form.container-fluid
  	> - div.input-group
    	> - span.input-group-text
    	> - input[type=text].form-control  

> + ul(ol) .nav(.flex-column,.justify-content-evenly)       [43]
	> - li .nav-item
  	> - a .nav-link(.active,.disabled) toggle:tab href:#ID
> + nav .nav(.nav-tabs,.nav-pills,.nav-fill,.nav-justified)
	> - a .nav-link(.active,.disabled) toggle:tab href:#ID
> + .tab-content
	> - .tab-pane(.fade.show.active) h(id)ID

> + .offcanvas-mq(.offcanvas-start,-end,-top,-bottom)(.show)(.text-bg-dark) scroll:true backdrop:false backdrop:static [44]
	> - .offcanvas-header
  	> - h5.offcanvas-title
  	> - button[type=button].btn-close(.btn-close-white) dismiss:offcanvas
	> - .offcanvas-body
    ...content... 
> + a toggle:offcanvas href:#ID
> + button[type=button] toggle:offcanvas target:#ID

> + nav
	> - ul.pagination(.pagination-lg,-sm)(.justify-content-center...)
  	> - li.page-item(.disabled,.active)
    	> - a.page-link
      	> - ...inner-text...
      	> - span: &laquo; || &raquo;  
  
> + (.placeholder-glow)(.placeholder-wave)
	> - .placeholder(.placeholder-sm,-lg,-xs)(.w-35)(.bg-primary,...)

> + button toggle:popover placement:top|bottom|right|left container:(selector) title:... content:... custom-class:... trigger:focus || click || hover focus [45]

> + .progress.bg-info h(style)height:49px; [46]
	> - .progress-bar.w-35.bg-success(.progress-bar-striped)(.progress-bar-animated)
  
> + nav(.navbar) h(id)navID 
	> - a.navbar-brand
	> - ul.nav(.nav-pills)
  	> - li.nav-item
    	> - a.nav-link h(href)#content-first-ID
  	> - li.nav-item.dropdown
    	> - a.nav-link.dropdown-toggle toggle:dropdown
    	> - ul.dropdown-menu
      	> - li 
        	> - a.dropdown-item h(href)#content-second-ID
        	> - a.dropdown-item h(href)#content-third-ID
> + div toggle:scrollspy spy:scroll target:#navID root-margin:"0px 0px -40%" smooth-scroll:true [47]
	> - h(id)content-first-ID
	> - h(id)content-second-ID

> + div.spinner(-border,-grow).spinner(-border-sm,-grow-sm)(.text-primary)(.m-3) [48]
	> - span.visually-hidden 
> + button.btn(.btn-primary...) h(disabled)
	> - span.spinner-border.spinner-border-sm
	> - span.visually-hidden
> + button.btn(.btn-primary...) h(disabled)
	> - span.spinner-border.spinner-border-sm
	> - ...plaintext...

> + .toast-container(.postion-fixed)(.bottom-0.end-0.p-3) [49]
	> - .toast
  	> - .toast-header
    	> - button[type=button].btn-close dismiss:toast  
  	> - .toast-body
	> - .toast
  	> - .... [or other custom content]
> + button[type=button].btn-close dismiss:toast target:#ID
> + button(a) toggle:toast target:#ID 

> +  toggle:tooltip title:  custom-class: placement:top|bottom|left|right html:true|false  [50]

## about image
> + img.img-fluid(.img-thumbnail)(.rounded .float-start(end) .mx-auto.d-block)

> + picture
	> - source
	> - img(same as above) 

> + figure .figure
	> - img(same as above)
	> - figcaption .figure-caption .text-end(center,start)



## layout
> + .row(.vrow,.rowr,vrowr).row-cols-auto(.row-cols-n).g-n(.gx-n,.gy-n) style="--bs-gutter-x:...;--bs-gutter-y:...;"
	> - .col(.col-auto,.col-n,.offset-n)

> + .xgrid(.c-4, .r-5, .g-2, .gx-3, .gy-4) .grid-align-items-end .grid-justify-items-center
	> - .x1-2 .x2-3 .y1-2 .y2-4

> + table .table .table-(primary...) .table-striped .table-striped-columns .table-hover .table-bordered.border-primary .table-borderless .table-sm .align-middle .caption-top
	> - thead .table-light
		> - tr .table-(primary...) .table-active
			> - th h(scope)col .table-(primary...)
			> - th h(scope)col
	> - tbody .table-group-divider(but no .border-top-color)
		> - tr .align-bottom
			> - th h(scope)row
			> - td .table-(primary...) .table-active .align-top
	> - caption

> + div .table-responsive-(sm,md,lg...)
	> - table .table

## utilities
> + div .visible .invisible
> + span .align-baseline(top,middle,...)
> + p .text-mq-start(center,end) .text-wrap .text-nowrap .text-break .text-lowercase(uppercase,capitalize) .fs-1(2,3,4,5,6) .fst-italic(normal) .fw-bold(bolder,semibold...) .lh-1(sm,base,lg) .font-monospace .text-reset

> + .text-d-line(...), .text-d-(...), .text-d-opacity-(...), .text-d-style-(...), .text-d-thick-(...), 
> + style="--bs-text-d-opacity:0.29;", style="--bs-text-d-thick:0.8em|38%",style="text-decoration-thickness:0.8em|38%"

> + div .w-5(10,15,...95,100) .mw-100 .vw-100 .min-vw-100 .h-5(10,15,...95,100) ...
> + div .shadow(-sm,-lg,-none)
> + div .position-(static,relative,...) .top(bottom,start,end)-0(50,100) .translate-middle(-x,-y)
> + div .overflow-auto(hidden,visible,scroll)
> + div .opacity-10(25,50,75,100)
> + p .user-select-all(auto,none) .pe-none(auto)
> + div .float-mq-start(end,none)

> + div .d-mq-flex(inline-flex) .flex-mq-row(row-reverse,column,column-reverse) .justify-content-mq-start(...) .align-items-mq-start(...) .flex-mq-wrap(nowrap,wrap-reverse) .align-content-mq-start(...)
	> - item .align-self-mq-start(...) .flex-mq-fill .flex-mq-grow-1(0) .flex-mq-shrink-1(0) .ms-mq-auto .me-mq-auto .mt-mq-auto .mb-mq-auto .order-mq-first(0-5,last)

> + div .d-mq-inline(none,block,grid,flex...) .d-print-inline(none,block,...)

> + .text-(primary...), .text-opacity-(25,50,75,100), .text-bg-(primary...), .bg-(primary...), .bg-opacity-(10,25,50,75,100) style="--bs-text-opacity:0.38;--bs-bg-opacity:0.67" .bg-gradient [51] 
> + style="--bs-warning-rgb:128,0,255;--bs-secondary-rgb:255,0,0;" [52]

> + a .link-primary(secondary...)

> + span .border .border-top(end,start,bottom)(-0)  .border-0(1-5) .border-opacity-10(25,50,75,100) .rounded(-top,-end,...,-circle,-pill,-(0-5))

## helpers
> + .visually-hidden .visually-hidden-focusable
> + div .vr

> + div .text-truncate .mult-line-truncate-(1-10,default is 3)
> + span .d-inline-block .text-truncate
> + div.position-relative  a.stretched-link

> + div .vstack(.hstatck).gap-3
	> - item .ms-auto
	> - hr or .vr

> + div .ratio .ratio-1x1(4x3,16x9,21x9,custom...) h(style)--bs-aspect-ratio:46%;
	> - video 

> + div .fixed-mq-top(bottom) .sticky-mq-top(bottom) 
> + div .clearfix.bg-info
	> + button .float-start
	> + button .float-end 

## icons
> + https://getbootstrap.com/docs/5.2/extend/icons/
## footnote

[1]: 可以后缀 -sm,-lg,表示size的型号, 但注意有的要和原形同在才有效
[2]: 通过js设置 ele.indeterminate = true, 可获得不确定状态的 checkbox. 同时 bs 自动应用样式 &[type="checkbox"]:indeterminate 
[3]: 注2 不适用于 radio
[6]: 没有label时, div 可以省略 .form-check
[7]: 默认 flex-wrap:wrap, 必要时使用 .flex-nowrap 更正
[8]: 无文本时, 考虑使用 div 代替前面的 span
[9]: 同类 input, span 可多个, 前后位置任意
[10]: .dropdown-toggle, 还需要 data-bs-toggle="dropdown", 并紧跟:
``` html
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul> 
	同时, 将按钮和该　ul　用　一个 div.dropdown 包裹
```  
同时注意 js 的引入
[11]: 使用提示的箭头按钮(无文本), 其余同[10]
[12]: label 内容与 input "融为一体": 两个条件:
		placeholder 必须 因为 js 用到 :placeholder-shown; label 在后
[13]: textarea 做了 input 基本一样的事, 注意设置高度不要使用 rows, 而是显式 height
[14]: 结合 flex grid, form 应该放置在 col 中
[15]: 绝大多数默认宽度均为100%, 将 div.col 可实施宽度的多样化
[16]: .col-form-label 使 label垂直方向对齐它的关联控件;
[17]: 可嵌套前面的模式
[18]: need also using "_transitions.scss", for .collapse:not(.show)
[19]: need also using "_close.scss", for .btn-close 注意, alert 的method, event
[20]: badge.position-absolute 可以配合父级的 .position-relative 实现边角小图标
[21]: 定制 divider: --bs-breadcrumb-divider 或 $breadcrumb-divider (甚至可以用svg)
[22]: 如果全局设置了 $btn-white-space;nowrap, 则不需要逐一的 .text-nowrap. 当然是button被限制宽度时有用
[23]: 使用 list 属性, 将 input 转变为类似下拉列表:
``` html
		<input list='list-id' ...>
		<datalist id='data-list-id'>
			<option value="..."></option>
			...
		</datalist>
```
[24]: --bs-btn-padding-(x,y), --bs-btn-font-size 可定制 button 尺寸
[25]: a 作为 button 使用, disabled 的同时, 需要 .disabled, 同时应取消 href, 并配置 tabindex=-1
[26]: 结合 xgrid, 可以自由设置按钮宽度
[27]: data-bs-toggle="button": 状态状态可切换. 原理: aria-pressed="true" 和 .active, 与 false 和 取消 .active
注意, button 的 bs method
[28]: .btn 根据需要, 均可添加 .btn-outline-(primary...) .btn-(primary...) 等等
[29]: label 依附于 prev-sibiling 的 checkbox 或 radio 存在
[30]: 内部利用 flex-inline, 将各个 \*-group 作行内显示, 必要时使用 .m(x,y...)-\* 或 justify-content-/* 对齐
[31]: 参考前面有关 div.input-group 的说明
[32]: .btn-group-vertical 不需要 .btn-group 陪同
[33]: 例如 a button 等
[34]: 
    1) 也可以作为 row 的 col, 以及 xgrid 的 unit, 限制宽度; 局部或全局使用 text-(center,start,end) 对齐文本. 
    2) 由于 .card 采用 flex 且 direction=column. 所以, 如果需要横排, 可以将所有内容以一个 .row/.col 包裹(注意gutter配置,默认是.g-), 然后在里面配置 col. 不过这样一来, .card 的 flex,有和没有就一个样了. 
    3) 简单使用, 可以这样 .card.card-body

[35]: 嵌套的子级 nav 略
[36]: .card-group 目前不是响应式, 且只是 sm 及以上生效
[37]: 避免自身尺寸变动突兀, 以及相邻元素的位置跳动
[38]: 
    1) 为了互不影响, 可放置于 xgrid 的 单元中
    2) a 的 href, button 的 data-bs-target, 可以指向多个元素,例如采用 class 选择符, 可以控制多个折叠区.
    3) 注意, javascript method/event
[39]: 
    1) .dropdown 包装的目的, 本质就是 position:relative. 然而经试验, 不指定它俩也能正常运行
    2) 一个菜单可以被多个 element 引用, 例如 button 和 a
    3) 菜单部分, li 和(或) a 任一均可指定 dropdown-item, 正常运行, 只是样式稍有差别, 一般指定到 a; 而外层的 ul.dropdown-menu 必须.
    4) .dropdown-center,.dropup-center 菜单位置居中于按钮下方
    5) p 包围的自由形式文本, 而不是 ul 时, .dropdown-menu 根据需要, 可能会附带文本工具, 例如 text-muted 等
    6) form 用 .dropdown-menu 包裹, 或者 form.dropdown-menu 也可以
    7) data-bs-auto-close: 默认true: 菜单内外点击均关闭, 其他: false inside outside
    8) button 通过添加 data-bs-toggle="dropdown" 从而具有下拉特征. 也可以使用 js 实现. new bootstrap.Dropdown(btn-ele); 注意要 new 成功, html 的 data-bs-toggle=... 仍然必须
    9) 其他, 注意 method property event
[40]: 
    1) .stretched-link 可以拓宽 label 的点击区域
    2) js behavior: 通过 a.list-group-item 的 href, 可以"绑定显示"对应的内容. 示例:coms.html -- details.ndemo-list-group section:nth(2), 要求 a 附加 data-bs-toggle="list"
[41]:
    1) 经试验, h(tabindex)-1 可选
    2) h(data-bs-backdrop)static 代表点击 dialog 外部不关闭.
    3) h(data-bs-keyboard)false 代表按下 esc ,dialog 不关闭
    4) .modal-dialog-scrollable 代表内容过长时, 使用内部的滚动条, 而不是默认的 page 的滚动条
    5) .modal-body 内, 可以加入任意元素, 例如 popover/tooltip/grid
    6) .modal 的 show.bs.modal 事件, event.relatedTraget 指向触发显示 dialog 的元素, 例如 button. 多个 button 可以触发相同的 dialog, 据此, 可以动态生成 dialog 的内容.
    7) .modal 的触发, 全靠给触发者指定 h(data-bs-toggle)modal h(data-bs-target)#modalID 两个属性. 所以,可据此连环触发(即 dialog1 内部按钮触发 dialog2 的显示), 也不需要显示关闭自身 dialog
    8) 如果将上述触发者的 h(data-bs-toggle)modal 改为 h(data-bs-dismiss)modal, 则该外部按钮将可以"插手" dialog 的关闭行为, 当然, 视觉上, 可以考虑添加 .btn-close
    9) event / method
[42]:
    1) 如果愿意, 任何位置的 toggler 按钮, 均可以触发任何位置的折叠内容. 极简形式下:
      > + 被触发的内容容器具备 .collapse id
      > + toggler 按钮具备 toggle:collapse target:#id
    2) 由于 .navbar 默认折叠, 所以, 需要展开或响应式展开, 需要明示 .navbar-expand-(mq). 
    3) 根据 1) 2), 得到响应式折叠菜单, 要点:
      > + .navbar.navbar-expand-(mq)
      > + button.navbar-toggler toggle:collapse target:#menuID
      > + .collapse.navbar-collapse id:#menuID
      > + 可以不使用 ul > li > a 模式, 而采用 div > a, 这样中间层 li.nav-item 被省略
    4) 菜单项, 还可以继续嵌套 dropdown-menu.
    5) .navbar > .container(-fluid) 是嵌套的 flex 布局. 所以可以使用 flex 的专用对齐 utitilies.
    6) .navbar-brand 根据需要可以放置于切换按钮的前, 后, 甚至折叠导航栏内部, 或兼而有之.
[43]:
    1) .nav 基于 flex, 所以可叠加相应的对齐工具class, 以及方向工具
    2) item 也可以嵌套 ul.dropdown-menu
    3) .tab-content 内的 .tab-pane 与 .nav-link 的"绑定显示", 完全靠 toggle:"tab" 以及 href:"#ID"(对于 a) 或者 target:#ID
    4) js / method / event
[44]:
    1) dismiss 作用的按钮, 需要指明 dismiss:offcanvas, 如果按钮位于 offcanvas 外部, 还需要 target:#ID
    2) js / method / event
[45]:
    1) data-bs-title 优先于 title.  
    2) 如果位于 .modal-dialog 中, 则必须将 container:modal, 而不是保持默认的 body, 否则将无法点击
    3) 配置 data-bs-custom-class="my-popover", .my-popover{...}
    4) data-bs-trigger 的取值:
    	> - focus, 代表允许通过点击 button(a) 外部来关闭 popover; 
    	> - click, 代表打开或关闭 popover, 均只能依靠点击 button(a) 本身;
    	> - hover focus, 代表 光标 enter 打开, leave 关闭 popover.
    5) 由于 popover 需要手工初始化, 且为了响应动态参数的变化, 已经将其登记到 DynamicBootstrapObjectManager, 引入该文件即可
    5) js / method / event
[46]:
    1) 进度条的宽度, 由 .progress-bar 的宽度决定 .w-35;
    2) 进度条的高度, 由 .progress 的高度决定 style=height:37px;
    3) 进度条的颜色, 由 .progress-bar 的背景色决定 .bg-warning
    4) 进度条的背景色, 由 .progress 的背景决定 .bg-info
    5) 一个 .progress 内, 可以有多个 .progress-bar, 这些进度条将被 flex 在一行内
[47]:
    1) 注意: 官网文档并未说明, scroll spy 的实现, 也需要像 popover 一样, 初始化后方可使用. 同时, bootstrap 原版定义的 ScrollSpy 类, 并不需要 data-bs-toggle 属性做标记(因为已经带有独一无二的 data-bs-spy). 为了 dynamic-bootstrap-object-manager 对所有类似对象的统一动态生成, 特设置 data-bs-toggle="scrollspy". 所以它的手工初始化工作, 引入文件即完成
    2) nav 与 spy "绑定"的关键:
    	> - spy 的 data-btarget 指向 nav 的 id;
    	> - nav 的 link 的 href 指向 spy 的各个内容的 id.
    3) 可以嵌套
    4) 简单链接形成的 scrollspy, 无反应, 不知何故
    5) 不可见元素无法成为 target, 当转为可见时, 可以如此唤醒: bootstrap.ScrollSpy.getOrCreateInstance(ele).refresh();
    6) js / method / event
[48]:
    1) span 可选, 如果不是为了屏幕阅读器之类, 不用更好
[49]:
    1) .toast-container 内置 position:abstract, 但可覆盖
    2) .toast-header 内置 flex 
    3) 使用 .(top,bottom,start,end)-(0,50), 结合 .translate-middle-(null,x,y), 定位到 9 个位置; 或者 d-flex justify-content-* align-items-* 定位.
    4) 默认: autohide:true, animation:true, delay:5000
    5) 关闭按钮位于 toast 外部时, 需要增加 target:#ID
    6) js / method / event
    7) 文档说的, "基于性能原因,你必须自己初始化它们", 其实需要初始化的, 是触发器, 而非目标组件. 使用无非三个步骤:
    	> - 写好 html , 注意默认被隐藏.
    	> - 写好用来触发该 toast 显示的按钮或链接什么的触发器
    	> - js 部分, 需要的地方, 定义按钮事件处理, 根据情况选择两者之一:
      	> -  new bootstrap.Toast(toast_ele).show();
      	> -  bootstrap.Toast.getOrCreateInstance(toast_ele).show();
    10) 为了方便使用, 已创建 bootstrap-object-toggler-manager 文件, 用来针对该类情况, 为这些组件的触发器动态加载, 并应对目标组件的属性变化引起的外在表现. 目前登记在案的组件是 toast. 使用步骤:
    	> - 前两步与 8) 相同, 触发按钮(链接)加入 toggle:toast, target:#ID 即可. 也支援动态配置. 
[50]:
    1) tooltip 也需要手工初始化, 由于已将其登记到 dynamic-bootstrap-object-manager 中, 所以, 只要引入该文件, 所有 tooltip 将自动初始化, 且支援动态配置响应
    2) 如果 data-bs-title 未定义, 则启用 html 属性 title. 
    3) js / event / method

[51]: 各自的不透明度可以与两种前景色/背景色自由组合
[52]: 不能采用预定义的字符串值(例如red)或十六进制值(例如#123456), 必须是rgb值.
