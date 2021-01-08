$('.addWeb').on('click',()=>{
  $('.dialog').removeClass('hiddenDialog')
})
const hidden = () => {
  $('.dialog').addClass('hiddenDialog')
}
let title,url,logoUrl
$('.webTitle').on('blur',(e) => {
  title = e.target.value
})
$('.webUrl').on('blur',(e) => {
  url = e.target.value
  logoUrl = url[0].toUpperCase()
})
$('.determineBtn').on('click',()=>{
  url = 'https://' + url
  hidden()
  let li = $(`
    <li>
      <a href="${url}">
        <div class="site">
          <div class="logo">${logoUrl}</div>
          <div class="link">${title}</div>
        </div>
      </a>
    </li>
  `).appendTo($('.siteList'))
})


