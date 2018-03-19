import 'babel-polyfill'
import promise from 'es6-promise'
import axios from 'axios'
import Vue from 'vue'

const LOGIN_ENTER = 'LOGIN_ENTER'
const USER_LOGIN = 'USER_LOGIN'
const SET_USERINFO = 'SET_USERINFO'
const LOAD_LOCAL_USERINFO = 'LOAD_LOCAL_USERINFO'
const LOGOUT = 'LOGOUT'
const CLEAR_USERINFO = 'CLEAR_USERINFO'
const PASSWORD = 'PASSWORD'

const state = {
	userAuthed: false,
    userId: '',
    username: '',
}

const mutations = {
	[LOGIN_ENTER](state, flag) {
		Vue.set(state, 'userAuthed', flag)
	},
}

const actions = {
	[USER_LOGIN]({commit}, {loginData, successCallback = () => {}, failCallback = () => {}}){
		axios({
			method: 'post',
			url: '/tpdwt_manager/doLogin.html',
			data: loginData,
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			var result = res.data
			if (result.responseCode == 0) {
				result.result.time = 1800 * 1000
				result.result.newtime = Date.parse(new Date())
//				console.log(result.result)
				window.localStorage.setItem('userInfo', JSON.stringify(result.result))
				state.username = result.result.username
				state.userId = result.result.pid
				commit(LOGIN_ENTER, true)
				successCallback()
			}else {
				failCallback()
			}
			
		}).catch(function(err) {
			failCallback()
			let res = err.response
			if(err) {
				console.log('api error, HTTP CODE: ' + res)
			}
		})
	},
		[PASSWORD]({commit}, {passwordData, successCallback = () => {}, failCallback = () => {}}){
		axios({
			method: 'post',
			url: '/tpdwt_manager/modifyPassword.html',
			data: passwordData,
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			var result = res.data
//			console.log(result)
			if (result.responseCode == 0) {
				successCallback()
			}else if(result.responseCode == 1) {
				failCallback()
			}
			
		}).catch(function(err) {
			
			let res = err.response
			if(err) {
				console.log('api error, HTTP CODE: ' + res)
			}
		})
	},
	  [LOAD_LOCAL_USERINFO] ({commit}) {
    if (window.localStorage.getItem('userInfo')) {
    		let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    		let time = userInfo.time
    		let newtime = userInfo.newtime
    		if ((time + newtime) < Date.parse(new Date())){
//  			console.log('时间到了')
    			commit(LOGIN_ENTER, false)
    		}else {
    			 try {
	        commit(LOGIN_ENTER, true)
	      } catch (err) {
	        console.log(err)
	      }
    		}
     
    }
  },
  [LOGOUT] (context) {
    context.commit(LOGIN_ENTER, false)
    window.localStorage.clear()
  }
}

const getters = {
  userAuthed (state) {
    return state.userAuthed
  },
  username (state) {
    return state.username
  },
}



export default {
  state,
  mutations,
  actions,
  getters
}


