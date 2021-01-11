/* init */
let $siteList = $('.siteList')
const webData = localStorage.getItem('webData')
const webDataList = JSON.parse(webData)

const hashMap = webDataList || [
  {logo:'./images/github.jpg',url:'https://github.com/',title:'Github',logoType:'image'},
  {logo:'./images/vue.png',url:'https://cn.vuejs.org/index.html',title:'Vue',logoType:'image'},
  {logo:'./images/react.png',url:'https://zh-hans.reactjs.org/',title:'React',logoType:'image'},
  {logo:'./images/element-ui.png',url:'https://element.eleme.cn/#/zh-CN',title:'Element',logoType:'image'},
  {logo:'./images/bootstrap.png',url:'https://www.bootcss.com/',title:'Bootstrap',logoType:'image'},
  {logo:'./images/bilibili.jpg',url:'https://bilibili.com/',title:'哔哩哔哩',logoType:'image'},
  {logo:'./images/acfun.png',url:'https://www.acfun.cn/',title:'AcFun',logoType:'image'},
  {logo:'D',url:'https://developer.mozilla.org/zh-CN/',title:'MDN web docs',logoType:'text'},
  {logo:'./images/w3school.png',url:'https://www.w3school.com.cn/',title:'W3school',logoType:'image'},
  {logo:'./images/zhihu.png',url:'https://zhihu.com/follow',title:'知乎',logoType:'image'},
  {logo:'./images/gold.png',url:'https://juejin.cn/',title:'掘金',logoType:'image'},
]

const storageData = () => {
  const hashWebData = JSON.stringify(hashMap)
  localStorage.setItem('webData',hashWebData)
}
storageData()
/* 模态框内容 */
let title,url,logoUrl
$('.webTitle').on('blur',(e) => {
  title = (e.target.value).trim()
})
$('.webUrl').on('blur',(e) => {
  url = (e.target.value).trim()
  logoUrl = url
})

let timer = null;
let flag = true;

const touchmoveHander=function(){
  clearTimeout(timer);
  timer=null;
}

const touchendHander=function(){
  clearTimeout(timer);
  return false;
}

const deleteWebList = (node,index) => {
  node.on('touchstart',(e) => {
    timer = setTimeout(()=>{
      flag  = false
      hashMap.splice(index,1)
      storageData()
      render()
    },1000)
  })
  node.on('touchmove',touchmoveHander)
  node.on('touchend',touchendHander)
}

const render = () => {
  $siteList.find('li').remove()
  hashMap.forEach((node,index) => {
    if(node.logoType === 'image') {
      const $li = $(`
        <li>
          <a href="${node.url}">
            <div class="site">
              <div class="logo">
                <img src="${node.logo}" />
              </div>
              <div class="link">${node.title}</div>
            </div>
          </a>
        </li>
      `).appendTo($siteList)
      $li.on('touchstart',(e) => {
        timer = setTimeout(()=>{
          flag  = false
          hashMap.splice(index,1)
          storageData()
          render()
        },1000)
      })
      $li.on('touchmove',touchmoveHander)
      $li.on('touchend',()=>{
        clearTimeout(timer);
        if(flag){
          window.open(node.url)
        }
        return false;
      })
      
    } else {
      const $li = $(`
        <li>
          <a href="${node.url}">
            <div class="site">
              <div class="logo">
                ${node.logo[0].toUpperCase()}
              </div>
              <div class="link">${node.title}</div>
            </div>
          </a>
        </li>
      `).appendTo($siteList)
      // deleteWebList($li,index)
    }
  })
}
render()





/* 模态框展示 */
$('.addWeb').on('click',()=>{
  $('.dialog').removeClass('hiddenDialog')
})
const hidden = () => {
  $('.dialog').addClass('hiddenDialog')
  $('.webTitle').val('')
  $('.webUrl').val('')
}

/* 确认 */
$('.determineBtn').on('click',()=>{
  if(title === undefined || title === '') {
    title = logoUrl
  }
  url = 'https://' + url
  hashMap.push({
    logo:logoUrl,
    url:url,
    title:title,
    logoType:'text'
  })
  storageData()
  render()
  hidden()
})
/* 取消 */
$('.cancelBtn').on('click',()=>{
  hidden()
})

window.onbeforeunload = ()=>{
  storageData()
}