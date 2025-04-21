// 权限判断

/**
 * 用户组是否有这个权限
 * @param {Array} user_group 权限组
 */
function $check_group(user_group) {
  var list = tables;
  var bl = false;
  for (var i = 0; i < user_group.length; i++) {
    bl = $check_action(user_group[i]);
    if (bl == true) {
      break;
    }
  }
  return bl;
}
/**
 * 获取路径对应操作权限 鉴权
 * @param {String} action 操作名
 */
function $check_action(path1, action = "get") {
  var o = $get_power(path1);
  if (o && o[action] != 0 && o[action] != false) {
    return true;
  }
  return false;
}
/**
 * 获取权限
 * @param {String} path 路由路径
 */
function $get_power(path) {
  var list_data = JSON.parse(sessionStorage.list_data);
  var list = list_data;
  var obj;
  for (var i = 0; i < list.length; i++) {
    var o = list[i];
    if (o.path === path) {
      //console.log(o)
      obj = o;
      break;
    }
  }
  return obj;
}
/**
 * 获取页面标题
 * @param {String} path 路由路径
 */
function $page_title(path) {
  var o = $get_power(path);
  if (o) {
    return o.page_title || o.mod_name;
  }
  return "";
}
/**
 * 是否有显示或操作字段的权限
 * @param {String} action 操作名
 * @param {String} field 查询的字段
 */
function $check_field(action, field, path1) {
  var o = $get_power(path1);
  //console.log(o);
  var auth;
  //console.log(o[action]);
  if (o && o[action] != 0 && o[action] != false) {
    auth = o["field_" + action];
  }
  if (auth) {
    return auth.indexOf(field) !== -1;
  }
  return false;
}
/**
 * 是否有显示或操作字段的权限
 * @param {String} action 操作名
 * @param {String} field 查询的字段
 */
function check_field(action, field) {
  var o = $get_power("/${table.name}/view");
  var auth;
  if (o && o[action] != 0 && o[action] != false) {
    auth = o["field_" + action];
  }
  if (auth) {
    return auth.indexOf(field) !== -1;
  }
  return false;
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

function page_title(path, id, lists, name) {
  let test = document.querySelector("#" + id);
  var o = get_power(path, lists);
  //console.log(o);
  if (o) {
    test.innerHTML = o.mod_name || o.page_title || name;
  }
}


function check_action(path1, action, id) {
  let test = document.querySelector("#" + id);
  if(test){
    var o = $get_power(path1);
    if (o && o[action] != 0 && o[action] != false) {
      test.style.display = "block";
      ///return true;
    } else {
      //console.log(o[action]);
		test.style.display = "none";
    }
  }
  //return false;
}
/**
 * 是否有审核字段的权限
 */
function $check_cart_page(path) {
  var o = $get_power(path);
  if (o) {
    var option = JSON.parse(o.option);
    if (option.cart_page) return true;
  }
  return false;
}

/**
 * 是否有显示或操作支付的权限
 * @param {String} path 路径
 */
function $check_pay(path) {
  let o = $get_power(path);
  if (o) {
    let option = JSON.parse(o.option);
    if (option.pay) return true;
  }
  return false;
}

/**
 * 获取路径对应操作权限 鉴权
 * @param {String} action 操作名
 */
function $check_exam(path1, action = "get") {
  var o = $get_power(path1);
  if (o) {
    var option = JSON.parse(o.option);
    if (option[action]) return true;
  }
  return false;
}
/**
 * 获取路径对应操作权限 鉴权 test模块名(id)模块显示与否
 * @param {String} action 操作名 test模块名(id)模块显示与否
 */
function check_exam(path1, action = "get", id) {
  let domTest = document.querySelector("#" + id);
  var o = $get_power(path1);

  if (o) {
    var option = JSON.parse(o.option);
    //(option[action]);
    if (option[action]) {
      domTest.style.display = "block";
      //return true;
    } else {
      domTest.style.display = "none";
      //return false;
    }
  } else {
    domTest.style.display = "none";
    //return false;
  }
}

/**
 * 当前年月日时分秒方法
 * @param {Object} fmt
 */
function dateFormat(fmt) {
  var myDate = new Date();
  var o = {
    "M+": myDate.getMonth() + 1, // 月份
    "d+": myDate.getDate(), // 日
    "h+": myDate.getHours(), // 小时
    "m+": myDate.getMinutes(), // 分
    "s+": myDate.getSeconds(), // 秒
    "q+": Math.floor((myDate.getMonth() + 3) / 3), // 季度
    S: myDate.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (myDate.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}

function fun(
  id,
  url,
  parameter,
  obj,
  reset2,
  resetSelect,
  goods,
  goods_a,
  is_user_table
) {
  layui.use(["element", "layer", "util", "table"], function () {
    var element = layui.element,
      layer = layui.layer,
      util = layui.util,
      table = layui.table,
      $ = layui.$;

    let item = document
      .querySelector(".layui-form-item")
      .querySelectorAll(".block");
    // 表单查询/Query
    //console.log(item.length);
    //console.log(item[0].children[0]);
    if (item.length == 1) {
      var inputBox = item[0].children[0];
    } else if (item.length == 2) {
      var inputBox = item[0].children[0];
      var inputBox2 = item[1].children[0];
    } else if (item.length == 3) {
      var inputBox = item[0].children[0];
      var inputBox2 = item[1].children[0];
      var inputBox3 = item[2].children[0];
    } else if (item.length == 4) {
      var inputBox = item[0].children[0];
      var inputBox2 = item[1].children[0];
      var inputBox3 = item[2].children[0];
      var inputBox4 = item[3].children[0];
    } else if (item.length == 5) {
      var inputBox = item[0].children[0];
      var inputBox2 = item[1].children[0];
      var inputBox3 = item[2].children[0];
      var inputBox4 = item[3].children[0];
      var inputBox5 = item[4].children[0];
    }
    let inquire = document.querySelector("#inquire");
    inquire.addEventListener("click", function () {
      console.log(inputBox);
      try {
        if (item.length == 1) {
          obj[Object.keys(obj)[3]] = inputBox.value;
        } else if (item.length == 2) {
          obj[Object.keys(obj)[3]] = inputBox.value;
          obj[Object.keys(obj)[4]] = inputBox2.value;
        } else if (item.length == 3) {
          obj[Object.keys(obj)[3]] = inputBox.value;
          obj[Object.keys(obj)[4]] = inputBox2.value;
          obj[Object.keys(obj)[5]] = inputBox3.value;
        } else if (item.length == 4) {
          obj[Object.keys(obj)[3]] = inputBox.value;
          obj[Object.keys(obj)[4]] = inputBox2.value;
          obj[Object.keys(obj)[5]] = inputBox3.value;
          obj[Object.keys(obj)[6]] = inputBox4.value;
        } else if (item.length == 5) {
          obj[Object.keys(obj)[3]] = inputBox.value;
          obj[Object.keys(obj)[4]] = inputBox2.value;
          obj[Object.keys(obj)[5]] = inputBox3.value;
          obj[Object.keys(obj)[6]] = inputBox4.value;
          obj[Object.keys(obj)[7]] = inputBox5.value;
        }
        var str = Object.assign({}, obj);
      } catch (err) {
        console.log(err);
      } finally {
        console.log(str);
        // 删除/Del没有输入的参数
        Object.keys(str).forEach((item) => {
          if (str[item] === "" || str[item] === null || str[item] === undefined)
            delete str[item];
        });
        table.reload(id, {
          where: str,
        });
      }
    });

    // 表单重置/Reset
    let reset = document.querySelector("#reset");
    reset.addEventListener("click", function () {
      try {
        inputBox.value = "";
        inputBox2.value = "";
        inputBox3.value = "";
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
    // <span>删除</span>/Del按钮
    let deleteBtn = document.querySelector("#delete");
    if (deleteBtn) {
      deleteBtn.onclick = function () {
        let checkStatus = table.checkStatus(id).data;
        if (checkStatus.length >= 1) {
          layer.confirm(
            "此操作将永远<span>删除</span>，是否继续",
            {
              title: "操作提示",
              shade: 0,
              offset: "16px",
              btn: ["确定", "<span>取消</span>"], //按钮
            },
            async function () {
              for (let i = 0; i < checkStatus.length; i++) {
                let { data: res } = await axios.get(url, {
                  params: {
                    [parameter]: checkStatus[i][parameter],
                  },
                });
                if (is_user_table && res.result) {
                  await axios.get(BaseUrl + "/api/user/del", {
                    params: {
                      user_id: checkStatus[i]["user_id"],
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
                for (let i = 0; i < item.length; i++) {
                  inputBox[i].value = "";
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
              table.reload(id);
              layer.msg("<span>删除</span>成功", {
                icon: 1,
                offset: "16px",
                shade: 0,
              });
            },
            function () {
              layer.msg("已<span>取消</span><span>删除</span>", {
                offset: "16px",
                shade: 0,
              });
            }
          );
        }
      };
    }
  });
}
/**
 * 是否有统计字段的权限
 */
function $check_figure(path) {
  var o = $get_power(path);
  if (o) {
    var option = JSON.parse(o.option);
    if (option.figure) return true;
  }
  return false;
}
/**
 * 转换时间格式
 * @param {String} time 时间字符串
 * @param {String} format 格式
 */
function toTime(time, format) {
  var ret = "";
  console.log("执行【转换时间格式】函数");
  console.log("源参数", time);
  if (time) {
    var is_date = time instanceof Date;
    var is_num = typeof time == "number";
    console.log(
      "校验类型 date ,number ,string",
      is_date,
      is_num,
      typeof time == "string"
    );
    if (is_date) {
      ret = time.toStr(format);
      console.log("源参数:日期型 结果:", ret);
    } else if (is_num) {
      var t = new Date(time);
      ret = toStr(t, format);
      console.log("源参数:数字型", ret);
    } else {
      let reg = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
      let regExp = new RegExp(reg);
      if (regExp.test(time)) {
        ret = time;
      } else {
        ret = toStr(strToTime(time), format);
      }
      console.log("源参数:文本型", ret);
    }
  }
  return ret;
}
function $toTime(time, format) {
  var ret = "";
  console.log("执行【转换时间格式】函数");
  console.log("源参数", time);
  if (time) {
    var is_date = time instanceof Date;
    var is_num = typeof time == "number";
    console.log(
      "校验类型 date ,number ,string",
      is_date,
      is_num,
      typeof time == "string"
    );
    if (is_date) {
      ret = time.toStr(format);
      console.log("源参数:日期型 结果:", ret);
    } else if (is_num) {
      var t = new Date(time);
      ret = t.toStr(format);
      console.log("源参数:数字型", ret);
    } else {
      let reg = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
      let regExp = new RegExp(reg);
      if (regExp.test(time)) {
        ret = time;
      } else {
        ret = time.toTime().toStr(format);
      }
      console.log("源参数:文本型", ret);
    }
  }
  return ret;
}
//获取地址栏参数
function $getUrlParams(urlName) {
  let url; //获取url中"?"符后的字串
  if (urlName) {
    url = urlName;
  } else {
    url = window.location.search;
  }

  let paramsObj = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      paramsObj[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return paramsObj;
}
/**
 * 对象去空
 * @param  {object} object
 */
// 在一个函数里，改变传入的对象本身是不好的
function isFalsy(value) {
  value === 0 ? false : !value;
}
function $cleanObject(object) {
  const result = { ...object };
  Object.keys(result).forEach(function (key) {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
}
function $filterNullParams(params, allValue) {
  Object.keys(params).filter(
    (key) =>
      (params[key] === "" ||
        params[key] === undefined ||
        params[key] === null) &&
      delete params[key]
  );

  return params;
}

/**
 * 转换时间格式
 * @param {String} time 时间字符串
 * @param {String} format 格式
 */
function $toTime(time, format) {
  var ret = "";
  console.log("执行【转换时间格式】函数");
  console.log("源参数", time);
  if (time) {
    var is_date = time instanceof Date;
    var is_num = typeof time == "number";
    console.log(
      "校验类型 date ,number ,string",
      is_date,
      is_num,
      typeof time == "string"
    );
    if (is_date) {
      ret = time.toStr(format);
      console.log("源参数:日期型 结果:", ret);
    } else if (is_num) {
      var t = new Date(time);
      ret = toStr(t, format);
      console.log("源参数:数字型", ret);
    } else {
      let reg = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
      let regExp = new RegExp(reg);
      if (regExp.test(time)) {
        ret = time;
      } else {
        ret = toStr(strToTime(time), format);
      }
      console.log("源参数:文本型", ret);
    }
  }
  return ret;
}

function strToTime(t) {
  let str = t.replace("T", " ").replace("Z", "").replaceAll("-", "/");
  return new Date(str);
}

function toStr(t, format) {
  var o = {
    "M+": t.getMonth() + 1,
    "d+": t.getDate(),
    "h+": t.getHours(),
    "m+": t.getMinutes(),
    "s+": t.getSeconds(),
    "q+": Math.floor((t.getMonth() + 3) / 3),
    S: t.getMilliseconds(),
  };
  if (/(y+)/.test(format)) {
    var x = RegExp.$1;
    format = format.replace(x, (t.getFullYear() + "").substr(4 - x.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      var x = RegExp.$1;
      format = format.replace(
        x,
        x.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
}
//去除JavaScript对象中空值
function removeEmptyValues(obj) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
      delete obj[key];
    } else if (
      typeof obj[key] === "object" &&
      Object.keys(obj[key]).length === 0
    ) {
      delete obj[key];
    }
  }
  return obj;
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
    } else if (url.indexOf("/api/"+baseUrl) === 0) {
      url_new =url.replace("/api/"+baseUrl, baseUrl); 
    } else {
      url_new = url;
    }
  }
  return url_new;
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
/**
 * @description 查询对象属性
 * @param {Object} obj 对象
 * @param {Object} query
 * @return {Object} 返回查询结果
 */
function get(obj, query) {
  var ret;
  if (typeof obj === "object" && !Array.isArray(obj)) {
    // 只有非数组的对象才进行操作
    if (Array.isArray(query)) {
      var ret = obj;
      // 如果是数字则循环数组
      for (var i = 0; i < query.length; i++) {
        var o = query[i];
        if (Array.isArray(o)) {
          ret = get(ret, o);
        } else if (typeof o === "object") {
          var oj = {};
          for (var k in o) {
            if (o[k]) {
              oj[k] = get(ret[k], o[k]);
            } else {
              oj[k] = ret[k];
            }
          }
          ret = oj;
        } else {
          ret = ret[o];
          if (typeof ret !== "object") {
            break;
          }
        }
      }
    } else if (typeof query === "object") {
      var ret = {};
      // 如果是对象则遍历对象
      for (var k in query) {
        ret[k] = get(obj[k], query[k]);
      }
      ret = ret;
    } else if (query) {
      if (typeof query == "string" || typeof query == "number") {
        ret = {};
        ret[query] = obj[query];
      } else {
        ret = obj;
      }
    } else {
      // 如果query为空则返回整个对象
      ret = null;
    }
  } else {
    // 否则直接返回值
    ret = obj;
  }
  return ret;
}
/**
 * @description 修改对象属性
 * @param {Object} obj 对象
 * @param {Object} query 查询条件
 * @param {Object} value 返回修改的局部对象
 */
function set(obj, query, value) {
  if (query) {
    var oj = get(obj, query);
    if (oj) {
      push(oj, value);
    }
    return oj;
  } else {
    push(obj, value);
    return obj;
  }
}
/**
 * @description 添加对象属性
 * @param {Object} objA 被添加的对象
 * @param {Object} objB 用作添加的对象
 * @param {Boolean} bl 是否补充没有的对象
 * @return {Object} 新对象
 */
function push(objA, objB, bl) {
  if (!objA || !objB) {
    return;
  }
  if (bl) {
    for (var k in objB) {
      var value = objB[k];
      if (objA[k] === undefined || objA[k] === null || value === null) {
        objA[k] = value;
      } else {
        var type = typeof objA[k];
        var p = typeof value;
        if (type !== p) {
          if (type === "number") {
            var n = Number(value);
            if (n === NaN) {
              n = 0;
            }
            objA[k] = n;
          } else if (type === "boolean") {
            if (value === "0" || value === "false" || value === "False") {
              objA[k] = false;
            } else {
              objA[k] = Boolean(value);
            }
          } else if (type === "string") {
            objA[k] = value.toString();
          } else {
            objA[k] = value;
          }
        } else if (type === "object") {
          if (objA[k].constructor == Array && value.constructor == Array) {
            objA[k].clear();
            objA[k].addList(value);
          } else {
            push(objA[k], value, bl);
          }
        } else {
          objA[k] = value;
        }
      }
    }
  } else {
    for (var k in objA) {
      var value = objB[k];
      if (value !== undefined && objA[k] !== null && value !== null) {
        var type = typeof objA[k];
        var p = typeof value;
        if (type !== p) {
          if (type === "number") {
            var n = Number(value);
            if (n === NaN) {
              n = 0;
            }
            objA[k] = n;
          } else if (type === "boolean") {
            if (value === "0" || value === "false" || value === "False") {
              objA[k] = false;
            } else {
              objA[k] = Boolean(value);
            }
          } else if (type === "string") {
            objA[k] = value.toString();
          } else {
            objA[k] = value;
          }
        } else if (type === "object") {
          if (objA[k].constructor == Array && value.constructor == Array) {
            objA[k].clear();
            objA[k].addList(value);
          } else {
            push(objA[k], value, bl);
          }
        } else {
          objA[k] = value;
        }
      }
    }
  }
  return objA;
}
/**
 * 跳转表
 * @param {Object} form
 * @param {Object} url
 */
function to_table(form, url) {
  delete form["examine_state"];
  $.db.set("form", form);
  window.location.replace(url);
}
// 详情页弹窗
function layopen_dateil(url) {
  let title = "详情页";
  layer.open({
    type: 2,
    area: ["65%", "75%"], // 宽高
    title: title, // 不显示标题栏
    shadeClose: false, // 点击遮罩关闭层
    skin: "layui-layer-rim",
    content: url,
    end: function () {
      location.reload();
    },
  });
}
/**
 * 是否有审核字段的权限
 */
function $check_examine(path) {
  // let path = this.$route.path;
  // let lastItem = path.substring(path.lastIndexOf('/')+1);
  // console.log(lastItem)
  // if (name==="view"){
  //   path = path.replace("view","table");
  // }else {
  //   path = path.replace("edit","table");
  // }
  var o = $get_power(path);
  if (o) {
    var option = JSON.parse(o.option);
    if (option.examine) return true;
  }
  return false;
}

/**
 * 判断是否包含敏感词
 */
async function filterSensitiveWords(content){
  return []
}