
### 定制记录
* 增加文件:
  > + \\_sundry.scss, 添加变量:
  > > ``` scss
	> > > $max-truncate-lines: map, 多行截断显示省略号, 最大支援行数.
	>	> > $include-column-box-sizing: 作为flex布局的子项, box-sizing 是否变更为 border-box 的条件, 原版使用在bootstrap-grid.scss中定义的方式, 现抛弃所有紧耦合, 采用需要多少, 实时定制的方式, 故这么干.
	> > > $assign-via-css-var: 见说明. 
	> > > $enable-xgrid:启用自定义xgrid, 默认false
	> > > $place-items-fmt / $place-content-fmt , 用于 _utilities.scss.
	> > > $size-percents: 用于 _utitlities.scss, 作为各个宽度 //高度的百分比节点
	> > > 保存 banner 使用的相关信息默认值: $custom-file 等, 共 5 个
	> > ```
	> + \\mixins\\_spaces.scss: 用于创建响应式的 --bs-gutter-x,--bs-gutter-y css 变量的值, 为 container 和 row 所调用,他们的 gutter 各自独立, 默认情况下互相抵消: container 用来产生正 padding, row 用来产生负 margin. 格式均为:
	> > ``` css 
	> >	.g-mq-(0,1,2,3,4,5)
	> > .gx-mq-(0,1,2,3,4,5)
	> > .gy-mq-(0,1,2,3,4,5)
	> > ```  
	> > + container 和 row 的设置, 互相独立, 互不影响, 除非是为了特殊效果, 应尽量使两者相等.
	> > + 默认情况下, container 和 row 的 gutter 均为 1.5rem, 即:
	> > > - container 的 padding-(top,bottom,left,right): 0.75rem
	> > > - row 的 margin-(top,bottom,left,right): -0.75rem
	> > > - 设置 row 的 gutter 的同时, 其子级 col 也被同步设置, 以平衡 row 的 margin, 达到视觉上 col 之间有 1 个 gutter 的间隙, 而靠边的 col 又紧贴外围 container 的内容区边缘的效果. 如果是采用默认, 则各个 col 的 padding 如下: 
	> > > - padding-(top,bottom,left,right): 0.75rem
	> > > - 而边缘 col 是否紧贴 container, 则由 container 的 gutter 决定.
	> + \\_xgrid.scss: 负责调用 \\mixins\\_xgrid.scss, 生成创建/配置 css3 grid 需要的基本的 class
	> + \\mixins\\_xgrid.scss, 原理如下:
	> > - $enable-xgrid(新建): 通过 \\_sundry.scss 启用, 默认 false.
	> > - --bs-gutter-x, --bs-gutter-y, 类似于 flex 风格的网格系统的 .row 的同名 css 变量, 是 .xgrid 用于设置抵消 .container padding 的负向 margin, 默认1.5rem. 同样, 可通过 .g(null,x,y)-mq-(0,1,...5) 或 style 修改. 所以, 建议放置于 .container 系列的容器内. 注意, 修改将应用于 gap-column 和 gap-row, 但对两个 gap 的直接修改(例如使用 bootstrap 的原版 utilities 定义的 .gap-mq-(0,1,...5) 或者 style), 却不影响 gutter, 即它们之间的联系是单向的.
	> > - --bs-xgrid-cols, --bs-xgrid-rows, 定义网格的纵向轨道和横向轨道数量(所以列线和行线数量分别比它们多1), 使用 .c-mq-(1,2,...,$xgrid-max-columns) 和 .r-mq-(1,2,...,$xgrid-max-rows) 或 style 修改. 默认值分别为最大值.
	> > - $xgrid-max-columns, $xgrid-max-rows, 为上面可使用的最大值. 即网格的纵向轨道和横向轨道的最大数量. 
	> > - .c-mq-(1,2,...) 和 .r-mq-(1,2,...) 定义当前网格使用的轨道数量, 各自不能超过 $xgrid-max-rows 和 $xgrid-max-columns, 且必须附有 .xgrid, 否则无效.
	> > - .x1-mq-(n)(1,2,3,...,max+1) 和 .x2-mq-(n)(1,2,3,...,max+1): 指定 item 相邻列线; .y1-mq-(n)(1,2,3,...,max+1) 和 .y2-mq-(n)(1,2,3,...,max+1): 指定 item 相邻的行线. 它们共同定位了 item 的位置(其中n代表负序数), 注意 x1/x2, y1/y2 可颠倒顺序, 而不影响定位. 例如: class="x1-3 x2-4 y1-5 y2-6" 与 class="x1-4 x2-3 y1-6 y2-5" 效果一致. 参考页面: 4-custom-bootstrap\03-layout\index.html
	> > - 通过在 \\utilities.scss 中新增 utility 而生成的 grid-align-(items,self)-mq-(...), grid-justify-(items,self)-mq-(...), grid-(align,justify)-content-mq-(...) 共六套专用于 grid 网格的对齐方式. 由于 .xgrid 形成的网格, 所有 item 组成的整体, 天生是"塞满"了 grid, 纵横方向均无剩余空间( gap 除外), 故其中最后两套根本就用不上. 但这些 class 是独立于 .xgrid, 故它们都可以自由使用于手工(例如: d-grid )实现的网格系统中.  
	> > 
* 为避免循环引用, 同时尽量使变量声明整齐, 迁移以下内容进入新建的 _sundry.scss:
  > + from _variables.scss to _sundry.scss
  > > ``` scss
  > > $variable-prefix, $prefix
  > > $white, $black
  > > $min-contrast-ratio
  > > $color-contrast-dark, $color-contrast-light
  > > $escaped-characters
  > > $enable-caret ... etc. total = 16
  > > $spacer $spacers
	> > ```	
  > + from _maps.scss to _sundry.scss 
	> > ``` scss
	> > $gutters
	> > ```

* 修正
  > - \\_banner.scss:
	> > + 原版采用 mixin 的方式, 在目标 css 文件头书写版权信息. 现修改为 _sundry.scss 文件中定义默认相关内容, _banner.scss 中直接书写注释. 需要进一步定制信息, forward _sundry.scss 时, 做重新配置即可.
  > - \\_variables.scss中: 
	>	> + `$popover-header-color: var(--#{$prefix}heading-color) !default;`
	> > > - 然而找遍整个bootstrap源文件, 未找到$heading-color的声明或定义. 在此怀疑是笔误,
	> > > - 可能是 `$headings-color`. 已在此文件中添加: `$heading-color: $headings-color !default;`
	> > + 对应于 `$grid-gutter-width: 1.5rem !default;` 添加 `$grid-gutter-height: 1.0rem !default;`
	> > + 对应于 `$container-padding-x: $grid-gutter-width !default;`, 添加 `$container-padding-y: $grid-gutter-height !default`
	> > + 大部分二级以上的变量, 均采用一级变量就地默认的方式. 少数(共25个)采用引用css变量的形式:var(--#{$prefix}...), 将赋值延迟到:root伪类建立后, 为了将扩展点集中在scss部分,而不是css文件的:root伪类里, 现将其修改为就地默认, 并标记为 loc-def. 具体是:
	> > + ``` scss
	> > > - $font-family-base: inspect($font-family-sans-serif) !default;
	> > > - $font-family-code: inspect($font-family-monospace) !default;
	> > > - $table-color: $body-color !default;
	> > > - $table-border-color: $border-color !default;
	> > > - $btn-link-color: $link-color !default;
	> > > - $btn-link-hover-color: $link-hover-color !default;
	> > > - $nav-link-color: $link-color !default;
	> > > - $nav-link-hover-color: $link-hover-color !default;
	> > > - $dropdown-border-color: $border-color-translucent !default;
	> > > - $pagination-color: $link-color !default;
	> > > - $pagination-focus-color: $link-hover-color !default;
	> > > - $pagination-hover-color: $link-hover-color !default;
	> > > - $card-border-color: $border-color-translucent !default;
	> > > - $accordion-color: $body-color !default;
	> > > - $accordion-border-color: $border-color !default;
	> > > - $accordion-button-bg: $accordion-bg !default;
	> > > - $popover-border-color: $border-color-translucent !default;
	> > > - $popover-header-color: $heading-color !default;
	> > > - $popover-arrow-outer-color: $border-color-translucent !default;
	> > > - $toast-border-color: $border-color-translucent !default;
	> > > - $modal-content-border-color: $border-color-translucent !default;
	> > > - $modal-header-border-color: $border-color !default;
	> > > - $thumbnail-border-color: $border-color !default;
	> > > - $kbd-color: $body-bg  !default;
	> > > - $kbd-bg: $body-color  !default;
	> > > ```
	> > + 注意: 后来考虑到原版具有的 css 端的非编译情况下的变量重新赋值的特性, 利用 sundry.scss 中新增的变量 $assign-via-css-var, 切换两种模式. 默认为 true. 
	> > + 添加变量 $xgrid-max-columns: 18 !default. 作为 xgrid 的列轨道数量默认值.
	> > + 添加变量 $xgrid-max-rows: $xgrid-max-columns !default. 作为 xgrid 的行轨道数量默认值
	> > + 添加变量 $xgrid-gutter-width, $xgrid-gutter-height, 默认值均为 $grid-gutter-width. 

	> - \\mixins\\_text-truncate.scss, 原版只有适用于单行的截断, 现增加多行截断 mixin. 
	> - \\helpers\\_text-truncation.scss, 增加对上述多行截断 mixin 的调用, 共支援 1 到 $max-truncate-lines 行(在 _sundry.scss 中定义). 例如: mult-line-truncate-1, mult-line-truncate-2, ... mult-line-truncate-10, ... 
	> - \\helpers\\_position.scss:
	> > 1. sticky-(...)-<top,bottom>, 由于 top/bottom 没有保证另一个为 auto, 故不满足不同屏宽下, 切换 sticky 到 top 和 bottom 的要求, 即不能自适应屏宽. 已更正.
	> > 2. fixed-top/fixed-bottom, 不具备屏宽自适应. 已更正.
	> - \\_utilities.scss: 
	> > 1. 使用 map-merge 处理定制与原版的合并, 这在消费端新建条目时没有问题, 但修改原有条目的某个属性,或者添加属性时比较麻烦. 现将map-merge调用, 改为 map.deep-merge, 以简化上述操作, 且增/删/改都可通过 with(...)语法实现. 详见: 09-utilities-api/index.scss. 为避免后续调试误会, 已注释, 后来干脆删除了.
	> > 2. "display" utility, 明显缺少 inline-grid 值, 已添加.
	> > 3. 增加 grid-align-items/grid-align-self/grid-justify-items/grid-justify-self/grid-align-content/grid-justify-content 共6个 utility, 用于生成供 grid 风格的网格系统使用的对齐属性 class.
	> > 4. 重写 text-decoration utility, 一共7个, 以提供更精细的调整.
	> > 5. (w,h)-mq-(...) 增加足量的百分比宽度: 从 5% 开始, 增幅为 5%, 直至 100%
	> > 6. 增加背景起点控制 background-clip: bg-clip-border bg-clip-padding bg-clip-content bg-clip-text
	> > 7. 增加 object-fit 控制: *-contain/cover/fill/none/scale-down
	> > 8. 原版已经定义 "white-space", 但仅有 normal nowrap, 故增加 "white-space-full".
	> - \\_functions.scss:
	> > 1. varify 函数: 返回的列表,第一项永远是 null, 虽然在书写规则时被自动忽略. 但更严谨的写法是返回的列表与原列表的 item 一一对应, 已经添加函数 tidy-varify 作为备用.
	> > 2. map-get-multiple 函数: 参数 $values 代表多个键名称构成的数组(列表), 将其改为 $keys 语义更准确. 已更正.
	> - \\_reboot.scss:
	> > 1. areatext, 原版是手工只能垂直方向调整, 现修改成两方向均可. (其实默认值即为 both)
	> - \\helpers\\_color-bg.scss: .text-bg-(primary,info,...), 在生成背景色的同时, 也生成强对比度的前景色. 
	> > 1. 问题: 
	> > > + 无相对于.bg-* 的四种颜色: body white black transparent	
	> > > + 背景色可通过叠加 .bg-opacity 类, 得到不同的 --bs-bg-opacity, 替换默认的 1, 从而达到改变背景色的目的. 但前景色无法通过类似方式修改其不透明度.
	> > > + 未配置为屏幕宽度响应.
	> > 2. 解决: 
	> > > + 经修正, 已添加这4种.text-bg-* 类, 但产生的对比度颜色, 效果不是很好.
	> > > + 将前面生成的强对比度的前景色 rgb 化, 作为第一个参数
	> > > + var(--#{$prefix}text-opacity, 1), 作为第二个参数
	> > > + 使用上面两个参数, 调用rgba函数生成前景色, 至此, 由text-bg-(primary...)形式一次产生的背景色和前景色, 均可独立配置其对应 opacity.
	> > > + 断点响应已支援, 格式: .bg-mq-bg-(primary...) 
	> > 3. 结论:
  > > > + 前景色和背景色,单独设置: text-(primary...), bg-(primary...).
  > > > + 前景色根据背景色产生(对比度鲜明): text-bg-(primary...).
	> > > + 不透明度: text-opacity-(25,50,75,100), bg-opacity-(10,25,50,75,100). 如果感觉细度不够, 又不想通过在 @use "utilities"; 时 with 新选项, 然后编译生成, 可以在html标签内嵌 style="--bs-text-opacity:0.38;--bs-bg-opacity:0.67" 的形式设置
	> > > + 经修正, 目前各自的不透明度可以与两种前景色/背景色自由组合
	> > > + v5.1.0 以后, 还可以通过 style 修改 warning/secondary 等的值, 就像修改上面的 opcity 一样. 例如:
	> > > > - style="--bs-warning-rgb:128,0,255;"
	> > > > - style="--bs-secondary-rgb:255,0,0;"
	> > > > - 切记: 不能采用预定义的字符串值(例如 red )或十六进制值(例如 #123456 ), 必须是 rgb 值.
	> - \\mixins\\_grid.scss, 针对 flex 风格的网格系统:
	> > + 增加 .row 的底部的负外边距 -margin-bottom, 使之与顶部负边距 -margin-top 对称, 同时, 在 item 中添加底部的正外边距 +margin-bottom 与之平衡.
	> > + 将 .row 的负 margin 以及与之平衡的 item 的 pading 减至 0.5 倍, 以避免上下 item 之间间隙太大. 同时可以保持与横向正负边距的对称 
	> > + 修改 .col#{$infix}, 为其flex属性添加 !important. 目的是当其作为 .row-cols-mq-auto 的 item 时, 可保持其均分剩余空间的特点
	> > + make-row() 函数增加纵向 gutter 的参数, 默认为 $grid-gutter-height(_variables.scss 中新增,默认等于横向 gutter), 使之与横向 gutter 对称.
	> > + 原版的基于 flex 的 grid, 实质上只考虑到 flex-direction:row 的形式. 为了兼顾其他三种形式, 已对\\_grid.scss和\\mixins\\_grid.scss做了大量的修改, 在此不一一说明. 目前发现一个问题, 暂时只能通过js解决:
	> > > **column或column-reverse方向, 使用.offset-(1,2,3,4,5)产生的跨距, 明显不等于期望值, 例如, 如果offset-1高度大于1/12, 导致通过.offset-(...), 使item偏移的方法, 和row和row-reverse方向上效果迥异. 经反复研究, 原因在于:*不论 flex-drection 为何值, item 的 margin, 如果是百分数表示, 基数永远是容器的可用宽度(clientWidth).* 现阶段只能通过 js 将错误的 margin-top 和 margin-bottom, 重新应用基数. 文件位于:page\lesson\4-custom-bootstrap\02-lib-exer\index.html 第 644/740/756/ 行左右**
	> > > **以上所述问题, 已解决, 使用 FlexgridItemOffsetMender 类, 可及时动态修补此margin为正确设置** 
	> > + 原版的 .col 及其他 .col-mq-(1,2,...) 等类, 均不受必须使用 row 作为上级容器的限制. 但当真出现一个孤零零的 .col 时, 就只能用来以百分数限制宽度是很无聊的, 因为 w-(5,10,...100) 已经足够使用. 所以修订后的版本, 已经将 col 家族, 包括其 gutter, 全部作为 row/vrow/rowr/vrowr的直接子级; 同时, 作为直接子级, 可方便做嵌套flex时实施控制
	> > + 原版的类似于 .row(r).row-cols-mq-3 > * 的 class, 默认宽度为 1/3, 而 .col-mq-3 宽度为 3/12, 是有区别的, 这样没有什么实质性的好处, 又容易混淆视听. 为方便起见, 已经全部修正为与 -col-n 无区别. 均代表 3/12
	> > + gutters 的产生, 迁移到 make-row mixin 末尾, 采用调用 \\mixins\_spaces.scss 的 make-gutters 的形式.
	> > + css-grid 的行为, 在每行分成 $columns 列的情况下, 轨道单元格的 grid-column-start 其实可以取最大值 $columns. 因为"列数", 比"轨道"数多1. make-cssgrid mixin 中, 已修正. 
	> - \\mixin\\_utilities.scss:
	> > 1. 在 generate-utility mixin 的适当位置, 利用其相关字段, 添加生成的每段 utility 相关 css 规则的简要说明(注释).
	> > 2. 重新整理 generate-utility mixin , 主要是一些重复代码的 mixin 提取, 使用全局变量方便子 mixin 调用, 变量的重新命名, 使之更具有可读性. 个别冗余代码改进. 
	> > 3. utility 对象, 类似于 local-vars 字段, 添加可选的 extra-props map字段, 用于收纳在为核心 css 属性赋值时,需要额外赋值的多个 css 属性. 由该 utility 产生的每条规则, 这些额外赋值的css属性, 各自相等. 使用场景, 例如:
	> > > + 为了更精细的控制 text-decoration-thickness 的值(数值,百分数), 采用缩写的css变量 --bs-text-d-thick 代表. 需要时(如果不是使用原生的css 属性), 可以这样用: style="--bs-text-d-thick:...". 
	> > > + 必须在 css 属性 text-decoration-line 声明的任何位置, 才可以附加: text-decoration-thickness: var(--#{$prefix}text-d-thick, auto), 因为前者存在时, 后者才有意义. 
	> > > + 如果没有 extra-props, 只能新建一个 utility 对象, values 的键名与声明 text-decoration-line 的 utility 的键名一一对应, 然后值变成上面的 var(...). 即使使用 map-loop 函数, 也不可避免 utility 的冗余.
	> > > + 采用 extra-props 属性, 将 text-decoration-thickness: var(--#{$prefix}text-d-thick, auto) 作为该属性的一个 key/value 对, 即可在生成的 css 规则中, 包含此赋值. 达到上述使用 style="--bs-..." 来控制线条粗细的目的.代码见: page\lesson\4-custom-bootstrap\02-lib-exer\09-utilities-api\index.scss
	> - \\mixins\\_container.scss: 
	> > 1. 为保证水平竖直方向的对称设置, 修改 make-container mixin , 为容器的竖直方向配置 gutter-y, 默认值采用 _variables.scss 中新增的$container-padding-y, 默认值与x方向相同: 1.5em; 同时为将 flex 风格的 grid 作为子级做好配合(后者的横向竖向 margin 默认与容器的相同,而互为正负, 互相抵消).
	> > 2. make-container 中的 width:100%, 可能会造成子级(例如.row)撑破container, 已改成 max-width
	> > 3. 但是 2 的修正也会带来副作用, 比如响应式折叠导航, 折叠按钮会发生位置跳动, 除非配置 w-100 之类. 所以, 考虑再三, 已经取消 2 的修改, 恢复为 width:100%
	> - \\_container.scss:
	> > 1. 原理: 调用 \\mixins\\_container.scss 生成的7个容器类, 宽度理想值均是其上级容器(一般是body)100%: 
	> > > + container : 实际值随屏宽变化, 从 sm 区开始, 受 max-width 制约.
	> > > + container-(sm,md,lg,xl,xxl): 实际值随屏宽变化, 分别从 sm/md/lg/xl/xxl 区开始, 受 max-width 制约.
	> > > + container-fluid : 坚持理想值 100%
	> > 2. 问题: 
	> > > + 根据以上, 可以得出结论, container-sm 和 container 的表现, 原版实际是一模一样的. 可参看其生成的 css 规则, 因为这两个规则是同进退的. 那么这样配置就有重复的嫌疑
	> > > + 每次切换, 感觉不是很流畅而有规律.(主观感觉, 也许不算问题)
	> > > + 当屏宽达到 xxl 以后, 随着宽度离 1400 越远, 容器宽度反而原地不动, 保持 1320px, 一定程度上, 可以认为缺乏响应性.
	> > 3. 解决:
	> > > + 修改 \\_variable.scss 的 $container-max-widths 默认值, 或者采用 @use 的 with 子句修改为:
	> > > > > >	```scss
	> > > > > >	$container-max-widths: (
	> > > >	>	>		xs: 540px,
	> > > > >	>		sm: 720px,
	> > > > >	>		md: 960px,
	> > > > >	>		lg: 1140px,
	> > > > >	>		xl: 1320px,
	> > > > >	>		xxl: 95%,
	> > > > >	>	)
	> > > > >	>	``` 
	>	>	> + 修改前后效果对比, 见 page\lesson\4-custom-bootstrap\03-layout\index.html. 通过切换with子句. 不过上述的最大宽度配置也有缺点: xxl 以下的区域, 大部分时候宽度为屏宽的 100%, 少数时候受限.  
	> - \\_type.scss:
	> > 1. .h1 - .h6 的定义稍显累赘 ,已使用循环语句替换.
	> - \\_card.scss:
	> > 1. .card-img-overlay 将内容以绝对定位, 使得原先的 card-img(-..) 成为背景, 原版采用 left=top=bottom=right=0 的方式, 个人觉得这样的后果是无法选择其他元素(用鼠标), 现改为 left=top=0. 尚不知有否副作用, 有则复原
	> - \\_placeholders.scss:
	> > 1. .placeholder-wave 与 .placeholder 虽然不作为上下级，　也可以发生作用．但考虑到和　.placeholder-glow 使用的对称性, 将其作为上下级关系更规范些. 已修正. 注意部分浏览器无效果, 因为其核心
*	重要模块简要说明
	> 0. \\_sundry.scss(自定义): 如上所述, 为避免循环 use 而新建(无演练)
	> 1. \\_functions.scss: 包含一些基础函数: 
	> > + map 的升序断言: assert-ascending(原版带下划线开头,为适应 @use, 已去除)
	> > + map 的 0 起始断言: assert-starts-at-zero(原版带下划线开头,为适应 @use, 已去除)
	> > + 颜色转分量列表: to-rgb
	> > + 特别关注 map-loop 不是 sass 内置模块 sass:map 的原生方法, 而是 bootstrap 自定义函数, 功能类似于 js 的map方法, 即用一个 map, 按照规则, 结合指定函数和参数,生成一个新的 map.
	> > + 其他一些string/color/svg 等之类的工具函数,详见 02-lib-exer/01-functions.scss.
	> 2. \\_root.scss: 根据 \\_sundry.scss, \\_functions.scss 的变量定义,生成 :root 伪类下的全局 css 变量定义
	> 3. \\_variables.scss: 全局可用的变量定义(无演练)
	> 4. \\mixins\\_breakpoints.scss: 用来生成屏幕宽度媒体查询的 mixin 和 function	
	> 5. \\_maps.scss: \\_utilities.scss 的其他变量定义一起, 由 \\utilities\\_api.scss 动态生成 css class. 该文件定义的主要是颜色相关的 map:
	> > + $theme-colors-rgb: 以 $theme-colors 做源, 由 to-rgb 函数映射得到 key 相同, value 为各自颜色的 rgb 分量组成的列表. 
	> > + $utilities-colors: 默认等于 $theme-colors-rgb.
	> > + $utilities-text: 在 $utilities-colors 基础上, 并入 "black" "white" "body" 对应项, 作为文本(前景)颜色定义.
	> > + $utilities-text-colors: 以 $utilities-text 做源, 由 rgba-css-var 函数映射得到 key 相同, value 格式如下的 map:
	>	>	> 1. key = body, value = rgba(var(--bs-body-color-rgb), var(--bs-text-opacity));
	> > > 2. key = <other>, value = rgba(var(--bs-<other>-rgb), var(--bs-text-opacity)), 例如:
	> > > > - secondary: rgba(var(--bs-secondary-rgb), var(--bs-text-opacity));
	> > > > - white: rgba(var(--bs-white-rgb),var(--bs-text-opacity));
	> > + $utilities-bg: 在 $utilities-colors 基础上, 并入 "black" "white" "body" 对应项, 作为背景颜色定义.
	> > + $utilities-bg-colors: 以 $utilities-bg 做源, 由 rgba-css-var 函数映射得到 key 相同, value 格式如下的 map:
	> > > 1. key = body, value = rgba(var(--bs-body-bg-rgb), var(--bs-bg-opacity));
	> > > 2. key = <other>, value = rgba(var(--bs-<other>-rgb), var(--bs-bg-opacity)),例如:
	> > > > - secondary: rgba(var(--bs-secondary-rgb), var(--bs-bg-opacity));
	> > > > - black: rgba(var(--bs-black-rgb), var(--bs-bg-opacity));
	> > + $utilities-border: 在 $utilities-colors 基础上, 并入 "white" 对应项, 作为边框颜色定义.
	> > + $utilities-border-colors: 以 $utilities-border 做源, 由 rgba-css-var 函数映射得到 key 相同, value 式如下的 map:
	> > > - key = <key-name>, value = rgba(var(--bs-<key-name>-rgb), var(--bs-border-opacity)), 例如:
	> > > - warning: rgba(var(--bs-warning-rgb), var(--bs-border-opacity));
	> > + $negative-spacers 为负距离 map; $gutters 为 $spacers 的同义词, 比较简单. 
	> 6. \\_utilities.scss: 主要的排版, 格式 class 的基础定义	
	> 7. \\mixins\\_utilities.scss: 针对每个 utility, 生成对应的多个 css class 的 mixin
	> 8. \\vendor\\_rfs.scss: 实现尺寸一定程度的自动缩放, 当该尺寸不超过基础尺寸时 
	> 9. \\utilities\\_api.scss: 
	> > + 调用 \\_utilities.scss 的生成器方法, 为 \\_utilities.scss 的各个 map, 逐个生成具体的 css class, 基本上是一个 class 只定义一条 css 属性;
	> > + 如果该 map 有 responsive 特性,则利用 \\mixins\\_breakpoints.scss 生成媒体查询;
	> > + 如果该 map 有 rfs 属性,则利用 \\verdor\\_rfs.scss 生成基础屏幕尺寸下的大小自动调整属性.
	> > + 关于 class 的名称的形成过程:
	> > > 1. class 属性 有定义, 且不为 null,采用 class 属性值,后缀以 values 的 key(带-)
	> > > 2. class 属性 有定义, 但为 null, 表示主动放弃冠名权, 全权交给 values 的 key(不带-), 此时就要求 values 的所有 key, 必须是合法的 css 类名字符串, 比如数字开头的 key 会引发错误; 值为 null 的 key 也引发错误, 因为 null 实际被转换为空格, 而空格的 css 类名会引发错误.
	> > > 3. class 属性 无定义,则采用 property 属性值,后缀 values 的 key(带-).
	> > > 4. 注意, 所谓的后缀 value 的 key(带-), 当 values 的 key 为 null 时, 表示放弃后缀.
	> > + 属性值的产生:
	> > > 1. 如果 css-var 属性值 truthy, 则配合 css-variable-name, 生成 css-var 的赋值语句,例如: --bs-area-rows:18; 进入第3步.
	> > > 2. 为标准的 css 属性赋值, 之前还要为局部变量赋值(如果定义了 local-vars); 为标准的 css 伪类属性赋值(如果有 state),之前也要为局部变量赋值(如果定义了local-vars).注意两个步骤是独立的,互补影响.
	> > > 3. 结束
	> 10. \\_reboot.scss: 重置各标签, 以适应各式浏览器
	> 11. \\helpers\*.scss: 一共10个文件. 见 11-helpers.scss
*	杂项:
	> + 由于 container 和 row/vrow/rowr/vrowr 均经过修改, 使 container 使用左右/上下 padding 平衡 row 等 class 的左右/上下负 margin, 所以如果一个 container 内包含多个 row, row 之间的间隔调整可能会很复杂.所以, 最佳体验是, 一个 container 包含一个 row, 通过 container 之间的 margin 可轻松调整 row 在外观上的间隙.
	> + row-cols-(1,2,...) 之类的 row, item 最好不要带上 col 等 class, 否则 .row > .col 规则高于 .row.row-cols(1,2,...) > *, 导致该列宽度可能不是需要的. 
	> + 注意: 原版的 .row.row-cols-4: 代表直接子级 width: 1/4 = 25%; 而 .row > .col-4: 代表该 item width: 4/12 = 33.333%, 后来为了方便使用, 以免发生不必要的困扰, 已经修正为同样的意义: 4/12 = 33.333%. 
	> + 记住这些设置项: 
	> > - container: 默认带 1.5rem 的 padding, 原理是通过设置 --bs-gutter-(x,y);
	> > - row: 默认带 -1.5rem 的 margin, 原理是通过设置 --bs-gutter-(x,y);
	> > - 注意上两套 gutter, 各自的 scope 不同, 因而相互独立.
	> > - col: 默认带 1.5rem 的 padding, 当父级 row 设置 --bs-gutter(x,y)时得到, 属于被动调整, 故不需要(也不应该)在col里面调整; 
	> > - 注意, 所有的 margin padding 均为对应 gutter 的一半.
	> > - 更多原理, 见 "增加文件" 部分.
	> > - 最佳调整方式一览表, yes 表示可以据此调整, 空白表示最好不要动它. 其中, row/col 均代表其整个家族:
	> > > > | class 		|	.m	 |	.p	|	.g	 |	--bs-gutter-(x,y)	|
	> > > > | :---:  		|	:---:  | :---: | :---: |	:---: 			|
	> > > > | .container	|	yes  	|   		| yes |	yes					|
	> > > > | .row 			|   	| yes 	| yes 	| yes					|
	> > > > | .col 			| yes  |   	|    |   			|






	