//author:suhaotian
//date:2015/01/07
//description:a demo . fetch data from SAP(single page application) website with casperJS
//usage:casperjs fetch.js <url> <uniqReg>

//失败请求保存在 lost.txt
//请求成功的保存于 success.txt

var casper=require('casper').create({
  pageSettings: {
    webSecurityEnabled:false,
    loadPlugins:false,
    loadImages:true
  }
});

var fs=require('fs');
var url,uniqReg;
if (casper.cli.args.length==2) {
  url=casper.cli.get(0);
  uniqReg=casper.cli.get(1);
}else if(casper.cli.args.length==1){
  url=casper.cli.get(0);
  // uniqReg="shopabout.queryShop";
  uniqReg='com/tps/i3'
  // console.log("默认模式下运行");
}else{
  console.log("usage:casperjs fetch.js <url> <uniqReg>");
  casper.exit();
};

function mkdir(dir){
  if(!fs.exists(dir)){
    var wasSuccessful=fs.makeDirectory(dir);
    console.log(wasSuccessful===true?"mkdir"+dir+"success":"mkdir"+dir+"fail")
  }
}

mkdir("raw");


var data_url;
var userId=url.match(/userId=\d{1,}/)[0].match(/\d{1,}/)[0];

if(fs.exists('raw/'+userId+'.raw')){
  console.log("文件已抓取~~，跳过")
  casper.exit();
};


casper.start(url,function () {
  console.log("开始抓...........");
  
  this.waitForResource(function(resource){
    data_url=resource.url;
    console.log(resource.url);
    return resource.url.indexOf(uniqReg)>=0;
  },function () {
    // this.download(data_url,"raw/"+userId+'.raw');
    fs.write("success.txt",url+'\n',"a");
  },function () {
    fs.write("lost.txt",url+'\n','a');
    this.echo('请求超时，超时请求保存于lost.txt').exit();
  },10000)
});

casper.run(
  function () {
    this.echo('Done.').exit();
  }
);
