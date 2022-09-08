## about form:

+ div.form-text
+	div.form-check > [4] [5] [6]
	- input[type=checkbox|radio].form-check-input [2] [3]
	- label.form-check-label
+ div.form-check.form-switch [5] [6] >
  - input[type=checkbox].form-check-input
  - label.form-check-label
+ div > [15]
  - input[type=text].form-control
	- input[type=checkbox|radio].btn-check
	- label.btn.btn-(primary...).btn-outline-(primary...)
+ div > [9]
  - label.form-label
  - input[type=range].form-range h(min,max,value.step)
+ div.input-group > [7] [1]
  - span.input-group-text
  - label.input-group-text
  - input[type=text].form-control
  - button[type=button].btn.btn-outline-(primary...).dropdown-toggle [10]
  - button[type=button].btn.btn-outline-(primary...).dropdown-toggle.dropdown-toggle-split [11]
   + span.visually-hidden
  - button[type=button].btn.btn-outline-(primary...)
  - select.form-select
   + option ...
  - input[type=file].form-control
  - div.input-group-text [8]
	 + input[type=checkbox|radio].form-check-input.mt-0
  - div.form-floating
	 + input.form-control
	 + label
+ div.input-group.has-validation
  - span.input-group-text
  - div.form-floating.is-invalid
   + input.form-control.is-invalid 
   + label
  - div.invalid-feedback 
+ div.form-floating [14]
	- input[type=email|pwd|...].form-control(.is-invalid) [12]
	- label
	- textarea.form-control [13]
	- input[type=...].form-control-plaintext
+ div.row.mb-3 [16]
  - label.col-sm-2.col-form-label
  - div.col-sm-10
   + label.visually-hidden
   + input[type=...].form-control
   + div.input-group [17]
   + div.form-check [17]


+ span .form-text


+ textarea .form-control(-sm,lg)

+ input[type=text&&list] [101]
+ input[type=text,pwd,email,file] .form-control [1] .form-control-plaintext
+ input[type=color] .form-control [1].form-control-color

+ select: .form-select [1]

+ button .btn.btn-(primary...) 









qian'chang'gua'du


[1]: 可以后缀 -sm,-lg,表示size的型号, 但注意有的要和原形同在才有效
[2]: 通过js设置 ele.indeterminate = true, 可获得不确定状态的 checkbox. 同时 bs 自动应用样式 &[type="checkbox"]:indeterminate 
[3]: 注2 不适用于 radio
[4]: div 添加 .form-check-inline, 变成行内
[5]: div 添加 .form-check-reverse, 文本位于左边, 且整体右对齐
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
[101]:使用 list 属性, 将 input 转变为类似下拉列表:
``` html
		<input list='list-id' ...>
		<datalist id='data-list-id'>
			<option value="..."></option>
			...
		</datalist>
```