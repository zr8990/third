$(function(){
  //表单校验的功能 用户名密码不能为空，用户名长度3-9|
  // 使用表单校验功能 引包 调用form的bootstrapValidator方法

var $("form").bootstrapValidator({
  feedbackIcons: {
    //校验成功的图标
    valid: 'glyphicon glyphicon-ok',
    invalid:'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields:{
    username:{
      validators:{
        notEmpty:{
          message:"用户名不能为空"
        },
        callback:{
          message:'用户名不存在'
        }
      }
    },
    password:{
      validators:{
        notEmpty:{
          message:"用户密码不能为空"
        },
        stringLength:{
          message:"密码长度为6-12位",
          min:6,
          max:12
        },
        callback:{
          message:"用户密码不正确"
        }

      }
    }

  }
});
$("form").on("success.form.bv",function(e){
  // 当表单提交校验成功的时候，不能直接跳转，以防用户输错或更改信息，要阻止默认跳转的行为
  e.preventDefault();
  console.log(222);
  // 发送ajax请求
  $.ajax({
    type:"post",
    url:"/employee/employeeLogin",
    data:$("form").serialize(),
    success:function(data){
      if(data.success){
        location.href = "index.html";
      }
      if(data.error === 1000){
        // 手动调用updataStatus让username校验失败即可
        // 第一个参数是改变哪个字段
        // 第二个参数 改成什么状态 valid通过  INVALID不通过
        // 第三个参数选择提示的信息

        $("form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
      }
      if(data.error === 1001){
        $("form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
      }
    }
  })
})
$("[type='reset']").on("click",function(){
  $(form).data("bootstrapValidator").resetForm();
})


})