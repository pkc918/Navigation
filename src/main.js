/* init */
let $siteList = $('.siteList')
const webData = localStorage.getItem('webData')
const webDataList = JSON.parse(webData)

const hashMap = webDataList || [
  {logo:'./images/github.jpg',url:'https://github.com/',title:'Github',logoType:'image'},
  {logo:'./images/bilibili.jpg',url:'https://bilibili.com/',title:'哔哩哔哩',logoType:'image'},
  {logo:'./images/acfun.png',url:'https://www.acfun.cn/',title:'AcFun',logoType:'image'},
  {logo:'Z',url:'https://zhihu.com/follow',title:'知乎',logoType:'text'}
]

const storageData = () => {
  const hashWebData = JSON.stringify(hashMap)
  localStorage.setItem('webData',hashWebData)
}

const render = () => {
  hashMap.forEach(node => {
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
      return
    }
    const $li = $(`
      <li>
        <a href="${node.url}">
          <div class="site">
            <div class="logo">
              ${node.url[0].toUpperCase()}
            </div>
            <div class="link">${node.title}</div>
          </div>
        </a>
      </li>
    `).appendTo($siteList)
  })
}
render()


/* 模态框展示 */
$('.addWeb').on('click',()=>{
  $('.dialog').removeClass('hiddenDialog')
})
const hidden = () => {
  $('.dialog').addClass('hiddenDialog')
}

/* 模态框内容 */
let title,url,logoUrl
$('.webTitle').on('blur',(e) => {
  title = (e.target.value).trim()
})
$('.webUrl').on('blur',(e) => {
  url = (e.target.value).trim()
})

/* 确认 */
$('.determineBtn').on('click',()=>{
  $siteList.find('li').remove()
  if(title === undefined || title === '') {
    title = url
  }
  url = 'https://' + url
  hashMap.push({
    logo:url[0].toUpperCase(),
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