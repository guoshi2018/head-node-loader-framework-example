## 以下, 使用 mq 代替 (null,xs,sm,lg,xl,xxl)

bootstrap. 速查
	1. 前景色和背景色,单独设置: text-(primary...), bg-(primary...).

	2. 前景色根据背景色产生(对比度鲜明): text-bg-(primary...).

	3. 不透明度: text-opacity-(25,50,75,100), bg-opacity-(10,25,50,75,100).
	如果感觉细度不够, 又不想通过@use "utilities"; 时配置为添加选项, 然后编译生成, 
	可以在html标签内嵌 style="--bs-text-opacity:0.38;--bs-bg-opacity:0.67"
	的形式设置

	4. 经修正, 目前各自的不透明度可以与两种前景色/背景色自由组合

	5. v5.1.0以后, 还可以通过style修改warning/secondary等的值, 就像修改上面的opcity一样. 例如:
	style="--bs-warning-rgb:128,0,255;--bs-secondary-rgb:255,0,0;". 切记:
	不能采用预定义的字符串值(例如red)或十六进制值(例如#123456), 必须是rgb值.

	---------------
page\lesson\4-custom-bootstrap\02-lib-exer\09-utilities-api\index.scss中重写文本装饰class:
	1. 装饰线: .text-d-line-(none,under,over,through,blink,inherit,initial,unset)
	2. 装饰线颜色: .text-d-(primary,...,dark,red,...,current,default)
	3. 装饰线不透明度: .text-d-opacity-(25,50,75,100) 或者 style="--bs-text-d-opacity:0.29;"
	4. 装饰线线型: text-d-style-(solid,double,dotted,dashed,wavy,inherit initial,unset)
	5. 装饰线粗细(厚度): text-d-thick-(auto,font,1px,2px,...,5px) 或者 style="--bs-text-d-thick:0.8em|38%",
		前者优先. 注意后者不是太必要, 使用style="text-decoration-thickness:0.8em|38%"即可.在此只是演练一种
		css控制scss, 以及为 utility 添加可选字段, 并实施有效控制的策略
Display: //_utilities.scss: key="display
-------------------------------------
flex layout:
一. make-row 以及 make-col-ready: 
	1. 制作横向/多行的flex容器
	2. 项目:默认横向不自动伸缩, 左/右/上/紧贴容器, 项目之间有横向和竖向间隙:
		1) --bs-gutter-x, 默认为 1.5rem. (variables.scss中$grid-gutter-width)
		2) --bs-gutter-y, 默认为 原版为0, 修正后与--bs-gutter-x相同,为$grid-gutter-width 
		注意: 下面可以通过容器 class 设置.

 二. make-grid-columns: 制作用来产生flex风格的网格系统的class
  1. 项目使用的class:
		1) .col-mq: 本质是伸而不缩的item. 但由于是多个item共同平分row宽度,所以表现为可自由伸缩
		2) .col-mq-auto: 不伸不缩的item. 各个item宽度由其内容决定
		3) .col-mq-(1,...12): 不伸不缩的item,宽度为 1/12,2/12,..,12/12.
		4) .offset-mq-(1,...11): 为下一个item添加偏移,1/12,2/12,...,11/12.(注意没有12/12) 
	2. 容器使用的class:
		1) .row: 代表通用的flex风格的网格系统中的一行
		2) .row.row-cols-mq-auto > * : item默认为.col-mq-auto
		3) .row.row-cols-mq-(1,...,6) > * : item默认为不伸不缩, 宽度固定为1/1,1/2,...1/6. 6 来自于 variables.scss 的 $grid-row-columns 变量. 可据此增大, 比如 12. 这和 .col-mq-(1,...12) 是有区别的.
			注意: 为方便起见, 已经修正为与 -col-n 无区别,
		4) .gx-mq-(0,1,2,3,4,5): 设置横向gutter: --bs-gutter-x 为 0,0.25,0.5,1,1.5,3rem.
			.gy-mq-(0,1,2,3,4,5); 设置纵向gutter: --bs-gutter-y 为 0,0.25,0.5,1,1.5,3rem.
			.g-mq-(0,1,2,3,4,5): 同时设置 --bs-gutter-x 和 --bs-gutter-y.  
			如果不设置, 默认--bs-gutter-x为1.5rem, --bs-gutter-y原版为0, 经修正为与x相同,为1.5rem
	3. 容器及item的对齐/缩放等样式, 在utilities.scss中定义, 在utilities/api.scss中生成
	4. 原版只能用于常见的 flex-direction:row, 其他方向, 需要手工添加很多类. 经扩展, 已能适应其他三个方向, 方法是
    1) .row: 仍然代表原来的意义
    2) .vrow: 代表 flex-direction:column
    3) .rowr: 代表 flex-direction:row-reverse
    4) .vrowr: 代表 flex-direction:column-reverse 
    其他, 例如item的使用不变. 但是使用竖直方向的row时, 务必设置row的height.
三. make-cssgrid : 采用原生css grid 布局, 需要 sundry.scss的$enable-grid-classes 为 truth, 方可使用.
   1. 容器 class 为 .grid:
			grid-template-rows: repeat(var(--#{$prefix}rows, 1), 1fr);
			grid-template-columns: repeat(var(--#{$prefix}columns, #{$grid-columns}), 1fr);
			gap: var(--#{$prefix}gap, #{$grid-gutter-width});
   2. 项目 class:
   		1) .g-col-mq-(1,...,12): 从下一列开始,占宽 (1,...,12) 个单元.
   		2) .g-start-mq-(1,...,11): 从第(1,...,11)列开始.
   感觉不是很好用, 建议使用自定义的 .xgrid

手工实现的flex:
utilities.scss 配合 utilities/api.scss 得到
