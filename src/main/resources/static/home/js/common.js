// 顶部菜单以及收索栏 +页尾-友情链接
// 基于base.js+permissionSet.js
var BaseUrl = baseUrl();
let token = sessionStorage.token;
let search_val = document.getElementById("search_val");
let loggedIn = document.getElementById("loggedIn");
let notRegister = document.getElementById("notRegister");
let notLoggedIn = document.getElementById("notLoggedIn");
let loginName = document.getElementById("loginName");
let user_group = "";
let user_id = null;
// 查看登录与否
if (sessionStorage.token != undefined) {
  user_group = JSON.parse(sessionStorage.personInfo).user_group;
  user_id = JSON.parse(sessionStorage.personInfo).user_id;
  nickname = JSON.parse(sessionStorage.personInfo).nickname;
  loginName.innerHTML = nickname;
  loggedIn.style.display = "block";
  notRegister.style.display = "none";
  notLoggedIn.style.display = "none";
} else {
  user_group = "游客";
  user_id = null;
  loggedIn.style.display = "none";
  notRegister.style.display = "block";
  notLoggedIn.style.display = "block";
}
let linksList = []; // 友情链接列表
// 获取用户信息-登录状态
async function $get_user(func) {
  let { data: res } = await axios.get(BaseUrl + "/api/user/state", {
    params: {},
  });
  if (res.result) {
    var user = res.result;
    if (user.obj) {
      user = user.obj;
    }
    // 存储用户信息
    sessionStorage.setItem("user_set", user);
    if (func) {
      func(user);
    }
  } else if (res.error) {
    console.log(res.error);
    sign_out();
    if (func) {
      func(user);
    }
  }
}
$("#sign_out_btn").click(function () {
  sign_out();
});
// 退出登录sign_out
async function sign_out() {
  let { data: ren } = await axios.get(BaseUrl + "/api/user/quit", {
    params: {},
  });
  layer.msg("退出登录成功");
  sessionStorage.clear();
  window.location.replace("../../index.html");
}
// 检索页面
$("#global_search_btn").click(function () {
  window.location.replace(
    "../../page/search/index.html" + "?word=" + search_val.value
  );
});

let menuTitle = JSON.parse(sessionStorage.menuTitle);
let dynamicMenu = JSON.parse(sessionStorage.dynamicMenu);
// 首页页面模块权限/数据请求
async function get_list() {
  // 更多管理请求
  let { data: ren } = await axios.get(BaseUrl + "/api/auth/get_list", {
    params: {
      user_group: user_group,
    },
  });
  var permissions = ren.result.list;
  var orderName=sessionStorage.orderName
  document.title = orderName
  $(".logo_text").text(orderName);
  let list_data = JSON.stringify(permissions);
  sessionStorage.setItem("list_data", [list_data]);
  var tables = ren.result.list;
  set_menu_title(menuTitle);

  //#if($model.filter.article)
  // page_title("/article/list", "article_text", tables, "新闻通知");
  //#end
  //#if($model.filter.forum)
  //check_action("/forum/list", "get", "forum");
  //#end
  //#if($model.filter.subject_exam)
  //check_action("/subject_exam/table", "answers", "subject_exam");
  //#end
  //#if($model.filter.exam)
  //check_action("/exam/list", "answers", "exam");
  //#end
  //#if($model.filter.message)
  //check_action("/message/list", "get", "message");
  //#end
 
}
// 渲染动态菜单
function initDynamicMenu(arr, id) {
  var objecthtmls = "";
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];

    page = i + 1;
    objecthtmls = "<li class='layui-nav-item' id='"+ item.table_name +"_menu'>";
    objecthtmls +=
      "<a href='.." +
      item.path +
      ".html' id=" +
      item.table_name +
      "_text>" +
      item.page_title +
      "</a>";
    objecthtmls += "</li>";
    objecthtmls += "<span class='nav-item-" + item.table_name + "'>|</span>";

    $(id).append(objecthtmls);
  }
}
function set_menu_title(titleArr) {
  $(".nav-item").each(function () {
    var id = $(this).attr("id");
    $(".nav-item-" + id).css("display", "none");
    $("#" + id).css("display", "none");
    for (var i = 0; i < titleArr.length; i++) {
      if (titleArr[i].id == id) {
        $("#" + titleArr[i].id + "_text").text(titleArr[i].title);
        $("#" + titleArr[i].id).css("display", "block");
        $(".nav-item-" + titleArr[i].id).css("display", "block");
      }
    }
  });
  initDynamicMenu(dynamicMenu, "#t_menu_list");
}
// 友情链接
async function get_linksList() {
  let { data: res } = await axios.get(BaseUrl + "/api/link/get_list", {
    params: {
      page: 1,
      size: 8,
    },
  });
  linksList = res.result;
  init("link_list_box");
}
// window.onload = function () {
  // 不需要验证模块权限
  get_list();
  get_linksList();
// };
// 初始化页面-渲染数据
function init(text) {
  layui.use(["laytpl", "carousel", "jquery"], function () {
    var laytpl = layui.laytpl;
    // 友情链接数据渲染
    if (text == "link_list_box") {
      var link_list_Tpl = links.innerHTML,
        linkList = document.getElementById("link_list_box");
      laytpl(link_list_Tpl).render(linksList, function (html) {
        //渲染视图
        linkList.innerHTML = html;
      });
    }
  });
}
