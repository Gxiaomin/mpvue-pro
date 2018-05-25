import Vue from 'vue'
import App from './set'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#db7093',
    navigationBarTitleText: '最近一次光顾日期',
    navigationBarTextStyle: 'white'
  }
}
