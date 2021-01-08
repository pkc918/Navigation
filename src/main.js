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
  if(title === undefined || title === '') {
    title = logoUrl
  }
  url = 'https://' + url
  hidden()
  let li = $(`
    <li>
      <a href="${url}">
        <div class="site">
          <div class="logo">${logoUrl[0].toUpperCase()}</div>
          <div class="link">${title}</div>
        </div>
      </a>
    </li>
  `).appendTo($('.siteList'))
})


