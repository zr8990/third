import { EINPROGRESS } from "constants";

// 进度条功能
// 禁用进度环
NProgress.configure({
  showSpinner:false
})

//注册一个全局的 ajaxStart事件，所有的ajax在开启的时候，会触发这个时间
$(document).ajaxStart(function(){
  //开启进度条
  Nprogress.start();
})

$(document).ajaxStop(function(){
  //完成进度条
  setTimeout(function(){
      NProgress.done();
  },500);
})

//非登录页面，判断当前用户是否是登录了。如果登录了。就继续，如果没有登录，需要跳转到登录页面
if(localtion.href.indexOf("login.html") == -1){
  $.ajax({
    type:'get',
    url:"/employee/checkRootLogin",
    // data:{}
    // dataType:"json"
    success:function(data){
      console.log(data);
      if(data.error === 400){
        location.href = "login.html";
      }
    }
  })
}
