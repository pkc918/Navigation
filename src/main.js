let $siteList = $('.siteList')
const hashMap = [
  {logo:'./images/github.jpg',url:'https://github.com/',title:'Github',logoType:'image'},
  {logo:'./images/bilibili.jpg',url:'https://bilibili.com/',title:'哔哩哔哩',logoType:'image'},
  {logo:'./images/acfun.png',url:'https://www.acfun.cn/',title:'AcFun',logoType:'image'},
  {logo:'Z',url:'https://zhihu.com/follow',title:'知乎',logoType:'text'}
]

const render = () => {
  hashMap.forEach(node => {
    const $li = $(`
      <li>
        <a href="${node.url}">
          <div class="site">
            <div class="logo">
              <img src="${node.logo}" alt="" />
            </div>
            <div class="link">${node.title}</div>
          </div>
        </a>
      </li>
    `).appendTo($siteList)
  })
}
render()







$('.addWeb').on('click',()=>{
  $('.dialog').removeClass('hiddenDialog')
})
const hidden = () => {
  $('.dialog').addClass('hiddenDialog')
}
let title,url,logoUrl
$('.webTitle').on('blur',(e) => {
  title = (e.target.value).trim()
})
$('.webUrl').on('blur',(e) => {
  url = (e.target.value).trim()
  logoUrl = url
})

$('.determineBtn').on('click',()=>{
  $siteList.find('li').remove()
  if(title === undefined || title === '') {
    title = logoUrl
  }
  url = 'https://' + url
  hidden()
  hashMap.push({
    logo:logoUrl[0].toUpperCase(),
    url:url,
    title:title,
    logoType:'text'
  })
  hashMap.forEach(node => {
    const $li = $(`
      <li>
        <a href="${node.url}">
          <div class="site">
            <div class="logo">${node.url[8].toUpperCase()}</div>
            <div class="link">${node.title}</div>
          </div>
        </a>
      </li>
    `).appendTo($siteList)
  })
})