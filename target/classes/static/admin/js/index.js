/**
 * 封装table的方法，有搜索，删除，重置事件
 * 1、搜索事件：查换class="layui-form-item"下的.block样式组件作为搜索条件；搜索按钮ID设置为：inquire
 * @param {String} id table id，用于reload
 * @param {String} url 删除请求地址
 * @param {String} parameter 删除参数key，只有del事件才会用上
 * @param {Object} obj 搜索传参对象，如：{ like: 0, size: 10, page: 1, subject_name: subject_name.value, type: type, exam_id: exam_id, orderby: 'question_order' }
 * @param {Object} reset2 重置/Reset参数，如：{ like: 0, size: 10, page: 1, exam_id: exam_id }
 * @param {Array} resetSelect 下拉框的重置/Reset参数，如：['questionType']
 * @param {*} goods
 * @param {*} goods_a
 * @param {*} is_user_table
 */
function fun(id, url, parameter, obj, reset2, resetSelect, goods, goods_a, is_user_table) {
  layui.use(["element", "layer", "util"], function () {
    var element = layui.element,
      layer = layui.layer,
      util = layui.util,
      table = layui.table,
      $ = layui.$;

    let item = document
      .querySelector(".layui-form-item")
      .querySelectorAll(".block");
    // 表单<span>查询</span>/Query
    var inputBox = [];
    for (let i = 0;i<item.length;i++){
      inputBox[i] = item[i].children[0];
    }
    let inquire = document.querySelector("#inquire");
    if (inquire){
      inquire.addEventListener("click", function () {
        try {
			for (let i = 0;i<item.length;i++){
				obj[Object.keys(obj)[i+3]] = inputBox[i].value;
			}
            var str = Object.assign({}, obj);
        } catch (err) {
          console.log(err);
        } finally {
          // <span>删除</span>/Del没有输入的参数
          Object.keys(str).forEach((item) => {
            if (str[item] === "" || str[item] === null || str[item] === undefined)
              delete str[item];
            if (item==='page')
              delete str[item]
          });
          table.reload(id, {
            where: str,
          });
        }
      });
    }

    // 表单<span>重置</span>/Reset
    let reset = document.querySelector("#reset");
    if (reset){
      reset.addEventListener("click", function () {
        try {
          for (let i = 0;i<item.length;i++){
            inputBox[i].value = ""
          }
        } catch (err) {
          console.log(err);
        } finally {
          location.reload();
          if (resetSelect) {
            //  循环清除下拉框里面的值
            for (let value of resetSelect) {
              $("#" + value).val("");
              var select = "dd[lay-value=" + "0" + "]";
              $("#" + value)
                  .siblings("div.layui-form-select")
                  .find("dl")
                  .find(select)
                  .click();
              //重新渲染下拉框
              layui.use("form", function () {
                var form = layui.form;
                form.render("select");
              });
            }
          }
        }
        table.reload(id, {
          where: reset2,
        });
      });
    }

    // <span>删除</span>/Del按钮
    let deleteBtn = document.querySelector("#delete");
    if (deleteBtn){
      deleteBtn.onclick = function () {
        let checkStatus = table.checkStatus(id).data;
        if (checkStatus.length >= 1) {
          layer.confirm(
              "此操作将永远<span>删除</span>该文件，是否继续",
              {
                btn: ["确定", "<span>取消</span>"], //按钮
              },
              async function () {
                for (let i = 0; i < checkStatus.length; i++) {
                  let { data: res } = await axios.get(url, {
                    params: {
                      [parameter]: checkStatus[i][parameter],
                    },
                  });
                  if (is_user_table && res.result){
                    await axios.get(BaseUrl + '/api/user/del', {
                      params: {
                        user_id: checkStatus[i]['user_id'],
                      },
                    });
                  }
                  if (
                      checkStatus[i].user_id &&
                      checkStatus[i].comment_id !== undefined
                  ) {
                    let { data: res } = await axios.get(
                        BaseUrl + "/api/comment/del",
                        {
                          params: {
                            comment_id: checkStatus[i].comment_id,
                          },
                        }
                    );
                  }
                  if (checkStatus[i][goods]) {
                    let { data: res } = await axios.get(
                        BaseUrl + "/api/goods/del",
                        {
                          params: {
                            source_table: goods_a,
                            source_field: goods_a + "_id",
                            source_id: checkStatus[i][goods],
                          },
                        }
                    );
                  }
                }
                // 重新渲染表格
                table.reload(id, {
                  where: reset2,
                });
                // <span>重置</span>/Reset
                try {
                  for (let i = 0;i<item.length;i++){
                    inputBox[i].value = ""
                  }
                } catch (err) {
                  console.log(err);
                } finally {
                  if (resetSelect) {
                    //  循环清除下拉框里面的值
                    for (let value of resetSelect) {
                      $("#" + value).val("");
                      var select = "dd[lay-value=" + "0" + "]";
                      $("#" + value)
                          .siblings("div.layui-form-select")
                          .find("dl")
                          .find(select)
                          .click();
                      //重新渲染下拉框
                      layui.use("form", function () {
                        var form = layui.form;
                        form.render("select");
                      });
                    }
                  }
                }
                table.reload(id, {
                  where: reset2,
                });
                layer.msg("<span>删除</span>成功", { icon: 1 });
              },
              function () {
                layer.msg("已<span>取消</span><span>删除</span>");
              }
          );
        }
      };
    }
  });
}

// 下拉框函数的封装
async function init(url, id) {
  // 拿到单选框的父级节点
  var select = document.querySelector("#" + id);
  var op1 = document.createElement("option");
  op1.value = "0";
  select.appendChild(op1);
  // 收集数据 长度
  var count;
  // 收集数据 数组
  var arr = [];
  let { data: res } = await axios.get(url);
  count = res.result.count;
  arr = res.result.list;
  for (var i = 0; i < arr.length; i++) {
    // 创建节点
    var op = document.createElement("option");
    // 给节点赋值
    op.innerHTML = arr[i].name;
    op.value = arr[i].name;
    // 新增/Add节点
    select.appendChild(op);
    layui.form.render("select");
  }
}

// 下拉框函数的封装
async function inits(url, id, ff) {
  // 拿到单选框的父级节点
  var select = document.querySelector("#" + id);
  var op1 = document.createElement("option");
  op1.value = "0";
  select.appendChild(op1);
  // 收集数据 长度
  var count;
  // 收集数据 数组
  var arr = [];
  let { data: res } = await axios.get(url);
  count = res.result.count;
  arr = res.result.list;
  for (var i = 0; i < arr.length; i++) {
    // 创建节点
    var op = document.createElement("option");
    // 给节点赋值
    op.innerHTML = arr[i][ff];
    op.value = arr[i][ff];
    // 新增/Add节点
    select.appendChild(op);
    layui.form.render("select");
  }
}

// test c
function fell(arr, id) {
  // 拿到单选框的父级节点
  var select = document.querySelector("#" + id);
  var op1 = document.createElement("option");
  op1.value = "0";
  select.appendChild(op1);
  for (var i = 0; i < arr.length; i++) {
    // 创建节点
    var op = document.createElement("option");
    // 给节点赋值
    op.innerHTML = arr[i];
    op.value = arr[i];
    // 新增/Add节点
    select.appendChild(op);
    layui.form.render("select");
  }
}

// 商家账号和卖家账号下拉框的封装

async function local(id, request, number) {
  // 拿到单选框的父级节点
  var select = document.querySelector("#" + id);
  console.log(select);
  var op1 = document.createElement("option");
  op1.value = "0";
  select.appendChild(op1);
  // 收集数据 长度
  var count;
  // 收集数据 数组
  var arr = [];
  let { data: res } = await axios.get(BaseUrl + "/api/user/get_list", {
    params: {
      user_group: request,
    },
  });
  count = res.result.count;
  arr = res.result.list;
  for (var i = 0; i < arr.length; i++) {
    // 创建节点
    var op = document.createElement("option");
    // 自定义属性的操作
    op.setAttribute(number, arr[i].user_id);
    // 给节点赋值
    op.innerHTML = arr[i].nickname + "-" + arr[i].username;
    op.value = arr[i].user_id;
    // console.log(op);
    // 新增/Add节点
    select.appendChild(op);
    layui.form.render("select");
  }
}

function get_power(path, lists) {
  var list = lists;
  var obj;
  for (var i = 0; i < list.length; i++) {
    var o = list[i];
    if (o.path === path) {
      obj = o;
      break;
    }
  }
  return obj;
}

function page_title(path, id, lists) {
  let test = document.querySelector("#" + id);
  var o = get_power(path, lists);
  if (o) {
    test.innerHTML = o.page_title || o.mod_name;
  }
  return "";
}

function fullUrl(baseUrl, url) {
  let host = baseUrl + "/";
  let url_new = "";
  if (url) {
    if (url.indexOf("~/") === 0) {
      url_new = url.replace("~/", host);
    } else if (url.indexOf("/http://") === 0) {
      url_new = url.replace("/http://", "http://");
    } else if (url.indexOf("/") === 0) {
      url_new = url.replace("/", host);
    } else {
      url_new = url;
    }
  }
  return url_new;
}

/**
 * 转换时间格式
 * @param {String} time 时间字符串
 * @param {String} format 格式
 */
function toTime(time, format) {
  var ret = "";
  console.log("执行【转换时间格式】函数");
  console.log("源参数" ,time);
  if(time){
    var is_date = time instanceof Date;
    var is_num = typeof(time) == 'number';
    console.log("校验类型 date ,number ,string" ,is_date ,is_num ,typeof(time) == 'string');
    if(is_date){
      ret = time.toStr(format);
      console.log("源参数:日期型 结果:" ,ret);
    }
    else if(is_num){
      var t = new Date(time);
      ret = toStr(t,format);
      console.log("源参数:数字型" ,ret);
    }
    else {
      let reg = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
      let regExp = new RegExp(reg);
      if(regExp.test(time)){
        ret = time;
      }else {
        ret = toStr(strToTime(time),format);
      }
      console.log("源参数:文本型" ,ret);
    }
  }
  return ret;
}

function strToTime(t) {
  let str = t.replace('T', ' ').replace('Z', '').replaceAll('-', '/');
  return new Date(str);
}

function toStr(t,format) {
  var o = {
    "M+": t.getMonth() + 1,
    "d+": t.getDate(),
    "h+": t.getHours(),
    "m+": t.getMinutes(),
    "s+": t.getSeconds(),
    "q+": Math.floor((t.getMonth() + 3) / 3),
    "S": t.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    var x = RegExp.$1;
    format = format.replace(x, (t.getFullYear() + "").substr(4 - x.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      var x = RegExp.$1;
      format = format.replace(x, x.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}



const $ = selector => {
  const element = document.querySelector(selector);
  if (!element) {
    console.error(`无法找到指定的元素：${selector}`);
  }
  return element;
}



// 详情页弹窗
function layopen_dateil(url){
  let title =  '详情页'
  layer.open({
    type: 2,
    area: ['65%', '75%'], // 宽高
    title: title , // 不显示标题栏
    shadeClose: false, // 点击遮罩关闭层
    skin: 'layui-layer-rim',
    content: url,
  end: function(){
  location.reload()
  }
});
}





function layopen_add(url){
  let title =  '<span>添加</span>'
  layer.open({
    type: 2,
    area: ['65%', '75%'], // 宽高
    title: title , // 不显示标题栏
    skin: 'layui-layer-rim',
    shadeClose: false, // 点击遮罩关闭层
    content: url,
  end: function(){
  location.reload()
  }
});
}



function colseLayer() {
  let index = parent.layer.getFrameIndex(window.name); // 获取弹出层的索引
  parent.layer.close(index) 
}



