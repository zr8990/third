
NProgress.configure({showSpinner: false});//关闭进度环

$(document).ajaxStart(function(){
  console.log("开始啦");
  NProgress.start();
})
$(document).ajaxStop(function(){
  console.log("结束了");
  setTimeout(function(){
    NProgress.done();
  },500);
})
