import App from './App'

import Vue from 'vue'
//关闭生产环境提醒
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()