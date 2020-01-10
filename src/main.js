import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'
// import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'


 
Vue.config.productionTip = false


//Using firebase in vue 
// Vue.use(VueFire)

const firebaseConfig = { 
};
firebase.initializeApp(firebaseConfig);


export const db = firebase.firestore()



Vue.use(VueResource)
// the local directive is used inside showBlogs component  
// Vue.directive('rainbow',{
//   bind(el){
//       el.style.color = "#" + Math.random(16).toString().slice(2,8)
//   }
// })

Vue.use(VueRouter)
const router = new VueRouter({
  routes: Routes,
  // defualt is hash fir mode
  mode: 'history'
})




Vue.directive("theme",{
  bind(el, binding){
    if(binding.value == 'wide')
      el.style.maxWidth="1200px"
    else if (binding.value == 'narrow')
      el.style.maxWidth="560px"

    if(binding.arg == 'column'){
      el.style.background = '#ddd'
      el.style.padding= '20px'
    }
  
  } 
})

//Filters 
// filter is global here so it can be used in any componenet
// and it is defiend locally in showBlogs component as well
// Vue.filter('to-uppercase', function(value){
//   // in this case value is blog.title which is
//   // located before | 
//   return value.toUpperCase();
// })

Vue.filter("snippet", function(value){
  return value.slice(0,100) + "...."
})


new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
