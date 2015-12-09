
var fs = require('fs');
var path = require('path');
var parseurl = require('parseurl');
var express = require('express');
var app = express();
var gm = require('gm');
// var gm = require('gm').subClass({ imageMagick: true });


var imageType = 'png';
var max_age = 3153600;
var expiryDate = new Date(0);
var port = Number(process.env.PORT || 8000);
var allImgsDir = './img/';

var conf = {
  bgColor: 'cccccc',
  textColor: '979797'
}

// 随机图片类型(与文件夹对应)
var imgTypes = ['a','b','c'];

// 生成图片列表
function creatImgList(imgDir) {
  var images = [];
  var files = fs.readdirSync(imgDir);
  var len = files.length;
  while(len--){
    var ext = path.extname(files[len]);
    if(ext == '.jpg' || ext == '.png') {
      images.push(files[len]);
    }
  }
  return images;
}
var type_a_list = creatImgList(allImgsDir+imgTypes[0]);
var type_b_list = creatImgList(allImgsDir+imgTypes[1]);
var type_c_list = creatImgList(allImgsDir+imgTypes[2]);


// 获取随机图片
function getImg(type) {
  var images;
  if(type == 'a') {
    images = type_a_list;
  }
  if(type == 'b') {
    images = type_b_list;
  }
  if(type == 'c') {
    images = type_c_list;
  }
  var index = Math.round(Math.random()*(images.length-1));
  return allImgsDir+type+'/'+images[index];

}


// 处理url
app.get('/*', function(req, res) {
  var args = parseurl(req).pathname.replace('/', '').split('/');

  var req_imgType, req_imgSize, req_bgColor, req_textColor;

  if(imgTypes.indexOf(args[0]) > -1) {
    req_imgType = args[0];
    req_imgSize = args[1];
    req_bgColor = args[2];
    req_textColor = args[3];
  } else {
    req_imgSize = args[0];
    req_bgColor = args[1];
    req_textColor = args[2];
  }

  var width, height, bgColor, text, textSize;

  // 获取图片宽高
  var imgSize = req_imgSize.split('x');
  width = imgSize[0];
  if(typeof imgSize[1] !== 'undefined') {
    height = imgSize[1];
  } else {
    height = imgSize[0];
  }

  // 图片背景色
  if(typeof req_bgColor !== 'undefined') {
    bgColor = req_bgColor;
  } else {
    bgColor = conf.bgColor;
  }

  // 文本内容
  text = width + " x " + height;

  // 文本颜色
  if(typeof req_textColor !== 'undefined') {
    textColor = req_textColor;
  } else {
    textColor = conf.textColor;
  }

  // 文本字体大小
  if (width >= height) {
    textSize = Math.round(Math.max(12, width*0.1));
  } else {
    textSize = Math.round(Math.max(12, width*0.1));
  }
  

  // 头信息
  res.setHeader("Content-Type", "image/" + imageType);
  res.setHeader("Cache-Control", "public, max-age=" + max_age)
  res.setHeader("Expires", expiryDate);
  res.setHeader("Last-Modified", expiryDate);

  // 生成图片
  if(typeof req_imgType == 'undefined') {
    // 生成默认纯色图片
    gm(width, height, "#"+bgColor)
      .fill('#'+textColor)
      .font("Arial", textSize)
      .drawText(0, 0, text, "center")
      .toBuffer(imageType, function(err, buffer) {
        if(err) {
          console.log(err);
        }
        res.send(buffer);
      });
  } else {
    // 生成随机图片
    gm(getImg(req_imgType))
      .resize(width, height, '^')
      .gravity('Center')
      .crop(width, height)
      .toBuffer(imageType, function(err, buffer) {
        if(err) {
          console.log(err);
        }
        res.send(buffer);
      });
  }
	
});


// 开启服务
var server = app.listen(port, function() {
  console.log('img-place start, Listening on port %d', server.address().port);
});
