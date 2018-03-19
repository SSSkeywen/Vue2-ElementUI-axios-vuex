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

const state = {
	userAuthed: false,
    userToken: '',
    userId: '',
    userNm: '',
    userInfoData: ''
}

const mutations = {
	[LOGIN_ENTER](state, flag) {
		Vue.set(state, 'userAuthed', flag)
	},
//	[SET_USERINFO](state, {
//		userToken,
//		userId,
//		userNm
//	}){
//		state.userToken = userToken
//	    state.userId = userId
//	    state.userNm = userNm
//	},
//	[CLEAR_USERINFO] (state) {
//  state.userToken = ''
//  state.userId = ''
//  state.userNm = ''
//  state.categoryList = {}
//}
}

const actions = {
	[USER_LOGIN]({commit}, {loginData, failCallback = () => {}}){
		axios({
			method: 'post',
			url: '/tpdwt_manager/doLogin.html',
			data: loginData,
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			var result = res.data
			if (result.responseCode == 0) {
				window.localStorage.setItem('userInfo', JSON.stringify(result.result))
				state.userInfoData = JSON.parse(window.localStorage.getItem('userInfo'))
//				commit(SET_USERINFO, {
//		          userToken: result.result.loginState,
//		          userId: result.result.pid,
//		          userNm: result.result.username,
//		        })
				
				commit(LOGIN_ENTER, true)
				state.userNm = result.result.username
//				console.log(state.userNm)
			}else {
				failCallback()
			}
			
		}).catch(function(err) {
			failCallback()
			let res = err.response
			if(err) {
				window.alert('api error, HTTP CODE: ' + res)
			}
		})
	},
	  [LOAD_LOCAL_USERINFO] ({commit}) {
    if (window.localStorage.getItem('userInfo')) {
      try {
        let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
//      console.log(userInfo)
//      commit(user.SET_USERINFO, userInfo)
        commit(LOGIN_ENTER, true)
      } catch (err) {
        console.log(err)
      }
    }
  },
  [LOGOUT] (context) {
//  context.commit(CLEAR_USERINFO)
    context.commit(LOGIN_ENTER, false)
    window.localStorage.clear()
  }
}

const getters = {
  userAuthed (state) {
    return state.userAuthed
  },
  userNm (state) {
    return state.userNm
  },
  userInfoData (state) {
    return state.userInfoData
  },
}



export default {
  state,
  mutations,
  actions,
  getters
}


