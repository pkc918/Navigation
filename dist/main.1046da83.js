// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
/* init */
var $siteList = $('.siteList');
var webData = localStorage.getItem('webData');
var webDataList = JSON.parse(webData);
var hashMap = webDataList || [{
  logo: './images/github.jpg',
  url: 'https://github.com/',
  title: 'Github',
  logoType: 'image'
}, {
  logo: './images/vue.png',
  url: 'https://cn.vuejs.org/index.html',
  title: 'Vue',
  logoType: 'image'
}, {
  logo: './images/react.png',
  url: 'https://zh-hans.reactjs.org/',
  title: 'React',
  logoType: 'image'
}, {
  logo: './images/element-ui.png',
  url: 'https://element.eleme.cn/#/zh-CN',
  title: 'Element',
  logoType: 'image'
}, {
  logo: './images/bootstrap.png',
  url: 'https://www.bootcss.com/',
  title: 'Bootstrap',
  logoType: 'image'
}, {
  logo: './images/bilibili.jpg',
  url: 'https://bilibili.com/',
  title: '哔哩哔哩',
  logoType: 'image'
}, {
  logo: './images/acfun.png',
  url: 'https://www.acfun.cn/',
  title: 'AcFun',
  logoType: 'image'
}, {
  logo: 'D',
  url: 'https://developer.mozilla.org/zh-CN/',
  title: 'MDN web docs',
  logoType: 'text'
}, {
  logo: './images/w3school.png',
  url: 'https://www.w3school.com.cn/',
  title: 'W3school',
  logoType: 'image'
}, {
  logo: './images/zhihu.png',
  url: 'https://zhihu.com/follow',
  title: '知乎',
  logoType: 'image'
}, {
  logo: './images/gold.png',
  url: 'https://juejin.cn/',
  title: '掘金',
  logoType: 'image'
}];

var storageData = function storageData() {
  var hashWebData = JSON.stringify(hashMap);
  localStorage.setItem('webData', hashWebData);
};
/* 模态框内容 */


var title, url, logoUrl;
$('.webTitle').on('blur', function (e) {
  title = e.target.value.trim();
});
$('.webUrl').on('blur', function (e) {
  url = e.target.value.trim();
  logoUrl = url;
}); // 长按删除和点击跳转的处理

/* 
  用了touchstart事件后，点击不会再触发a跳转，绑定click也不行
  这里用到了类似防抖和节流
  长按删除，防抖
  点击跳转，节流
*/

var timer = null;
var flag;

var deleteWebList = function deleteWebList(node, url, index) {
  node.on('click', '.close', function (e) {
    e.stopPropagation();
    hashMap.splice(index, 1);
    storageData();
    render();
    console.log(e.currentTarget);
  });
  node.on('click', function () {
    window.open(url);
  });
  node.on('touchstart', function (e) {
    flag = true;
    timer = setTimeout(function () {
      flag = false;
      hashMap.splice(index, 1);
      storageData();
      render();
    }, 1000);
  });
  node.on('touchmove', function () {
    clearTimeout(timer);
    timer = null;
  });
  node.on('touchend', function () {
    clearTimeout(timer);

    if (flag) {
      window.open(url);
    }

    return false;
  });
};

var render = function render() {
  var $li;
  $siteList.find('li').remove();
  hashMap.forEach(function (node, index) {
    if (node.logoType === 'image') {
      $li = $("\n        <li>\n          <div class=\"site\">\n            <div class=\"logo\">\n              <img src=\"".concat(node.logo, "\" />\n            </div>\n            <div class=\"link\">").concat(node.title, "</div>\n            <div class=\"close\">\n                <svg class=\"icon\" aria-hidden=\"true\">\n                  <use xlink:href=\"#icon-guanbi\"></use>\n                </svg>\n            </div>\n          </div>\n        </li>\n      ")).appendTo($siteList);
    } else {
      $li = $("\n        <li>\n          <div class=\"site\">\n            <div class=\"logo\">\n              ".concat(node.logo[0].toUpperCase(), "\n            </div>\n            <div class=\"link\">").concat(node.title, "</div>\n            <div class=\"close\">\n                <svg class=\"icon\" aria-hidden=\"true\">\n                  <use xlink:href=\"#icon-guanbi\"></use>\n                </svg>\n            </div>\n          </div>\n        </li>\n      ")).appendTo($siteList);
    }

    deleteWebList($li, node.url, index);
  });
};

render();
/* 模态框展示 */

$('.addWeb').on('click', function () {
  $('.dialog').removeClass('hiddenDialog');
});

var hidden = function hidden() {
  $('.dialog').addClass('hiddenDialog');
  $('.webTitle').val('');
  $('.webUrl').val('');
};
/* 确认 */


$('.determineBtn').on('click', function () {
  if (title === undefined || title === '') {
    title = logoUrl;
  }

  url = 'https://' + url;
  hashMap.push({
    logo: logoUrl,
    url: url,
    title: title,
    logoType: 'text'
  });
  storageData();
  render();
  hidden();
});
/* 取消 */

$('.cancelBtn').on('click', function () {
  hidden();
});

window.onbeforeunload = function () {
  storageData();
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.1046da83.js.map