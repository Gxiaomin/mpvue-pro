import Vue from 'vue'
import App from './App'
//全局引入iconfont
import '../static/iconfont/iconfont.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', '^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#db7093',
      navigationBarTitleText: 'LadySecret',
      navigationBarTextStyle: 'white'
    }
  }
}
