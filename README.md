ImgPlace
==========================

基于nodejs的一个简单的占位图生成程序，支持自定义图片类型，比如猫啊狗啊美女啊什么的，适合在公司服务器上简单架设，快速稳定方便

## Installing

	git clone xxx

##Usage:

    $ sudo node server.js

默认是80端口，在linux上要用sudo以root身份才能用80端口，不然会报错。

##Example:

    <img src="http://localhost/100" />
    <img src="http://localhost/200x100" />
    <img src="http://localhost/350x150/f00/000" />

第一个参数表示图片尺寸，可以是`200x300`，如果只写一个数，如`http://localhost/100`，则是`100x100`正方形的简写形式；

第二个参数是图片背景色，类型为16进制颜色，不用加`#`，如`FF0000`，支持缩写形式，如`F00`。不指定的话默认是`CCCCCC`；


第三个参数是文字颜色，类型如第二个参数，必须在自定义背景色时才能传入，不然会被当做图片背景色处理

####支持生产指定文件夹的随机图片

	<img src="http://localhost/dog/200" />

第一个参数如果是dog(对应相应的文件夹名，demo里的是a,b,c等等)，则生产随机的图片，然后第二参数则为尺寸，不再支持第三个颜色配置参数


##依赖:

本程序的图形操作基于[GraphicsMagick](http://www.graphicsmagick.org/)(下称gm)，必须在电脑上先安装gm，也可以使用[ImageMagick](http://www.imagemagick.org/)，需要在代码里修改指定。

注意：如果图片上不能正常显示如200x200这样的文字，说明缺少gm的相关依赖。可以尝试先安装freetype和ghostscript后，再重新安装gm，则可解决此问题。

用brew安装很方便：

	brew install freetype
	brew install ghostscript
	brew install graphicsmagick
	
win系统下的依赖安装要自行摸索下了

