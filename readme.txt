
[编译监视]

scss编译:	
	1. 监视page/lesson 文件夹下的scss文件, 生成位置与源文件同目录 ;
	2. 监视lib/scss 文件夹下的scss文件, 为use它的scss文件而编译.
		由于scss下是库, 务必使用下划线 _ 作为文件名前缀, 以便只编译不生成. 
	3. 注意 --load-path 一般不需要. 如果引用其他工作区的scss, 斜线开始代表从磁盘根算起
	sass --watch --no-source-map --load-path=/so-do/Workspace/D/framework-example page/lesson lib/scss

typescript编译:
	监视 /lib/script下的所有ts文件, 同步更新到对应js. 注意tsconfig.json的相关配置
	tsc --watch

-------------------
2022.8.2, 定制bootstrap, 需要:
npm-run-all

