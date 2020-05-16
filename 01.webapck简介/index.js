// 引入JS资源
import $ from 'jQuery'
// 引入样式资源
import './index.less'
// 引入图片 字体等其他资源

$('#title').click(() => {
  $('body').css('backgroundColor', 'deeppink')
})

function test() {
  console.log('test')
  console.log('test too')
  function tst2() {

  }
}
