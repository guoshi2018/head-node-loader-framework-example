
[编译监视]

1. scss编译:	
	npm run watch-scss

2. typescript编译:
	1) 监视 /lib/script下的所有ts文件, 同步更新到对应js. 注意tsconfig.json的相关配置
		tsc --watch 或者
		npm run watch-ts
	2) 将lib/script/ts/indoor-lib/custom-bootstrap5.2下的所有 ts 文件, 打包成一个文件
		npm run watch-bs-bundle-ts

# 更新到github: git push https://github.com/guoshi2018/jscss-loader-framework-example master
-------------------
2022.8.2, 定制bootstrap, 


