import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
// import store from './store'
// import Vuetify from './plugins/vuetify'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Vuex from 'vuex'
import data from './store/modules/sakaMemberData.js'

Vue.use(Vuex)

Vue.config.productionTip = false

onBuild()
/*
const store = new Vuex.Store({
  modules: {
    a: initial(data)
  }
})

if (store) {
  console.log(store.modules.a)
  new Vue({
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}
*/
async function initial (data) {
  const newVuexState = data
  const response = await axios.get('http://localhost:5000/saka')
  /*
  if (response.data) {
    console.log('response.data.nogizaka46 : ' + response.data.nogizaka46)
  }
  */
  newVuexState.state = {
    nogizaka46: { ...response.data.nogizaka46 },
    hinatazaka46: { ...response.data.hinatazaka46 },
    sakurazaka46: { ...response.data.sakurazaka46 },
    memberGroups: [],
    groupMemberCount: 0,
    selectedTeam: '',
    selectedMember: {}
  }
  return newVuexState
}

async function onBuild () {
  let store = {}
  const vuexState = await initial(data)
  store = new Vuex.Store({
    modules: {
      vuexState
    }
  })
  console.log('store.state : ' + store.state)
  if (store) {
    console.log(store)
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  } else {
    console.log('empty')
  }
}
