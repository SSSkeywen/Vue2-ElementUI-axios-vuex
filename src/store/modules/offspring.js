import 'babel-polyfill'
import promise from 'es6-promise'
import axios from 'axios'
const OFFSPRING_LIST = 'OFFSPRING_LIST' 
const HEADERSHOW_TWO = 'HEADERSHOW_TWO' 
const REDACT_TWO = 'REDACT_TWO' 
const REDACT_NOT_TWO = 'REDACT_NOT_TWO' 
const REDACT_NEW_TWO = 'REDACT_NEW_TWO' 
const FORMSAVE = 'FORMSAVE' 

const state = {
	springData: [{
		insertTime: '1',
		mainTitle: '1',
		moduleName: '1',
		status: '',
	}],
	inquiewList: '',
	springmsg: '',
	operate: '',
	refDataId: '',
	mainId: '',   //编辑
	headerShowTwo: false,
	formSaveData: '',
	contentDataTwo: []
}
const mutations = {
	[HEADERSHOW_TWO] (state, flag) {
		state.headerShowTwo = flag
}
}

const actions = {
	[OFFSPRING_LIST] ({commit}, {offspringList, successCallback = () => {}, failCallback = () => {}}) {
		axios({
			method: 'post',
			url: '/tpdwt_manager/wc/wclist.html',
			data: offspringList,
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			
			var result = res.data
//			console.log(result)
			if (result.responseCode == 0) {
				state.springData = result.result
//				console.log(state.springData)
				state.springmsg = result.msg
				successCallback()
			}else {
				console.log('TABLE_LIST')
			}
			
		}).catch(function(err) {
			failCallback()
			let res = err.response
			if(err) {
				console.log('api error, HTTP CODE: ' + res)
			}
		})
	},
	//编辑
	[REDACT_TWO] ({commit}, {mainId, successCallback = () => {}, failCallback = () => {}}) {
		axios({
			method: 'post',
			url: '/tpdwt_manager/sms/gettemp.html',
			data: mainId,
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			var result = res.data
			console.log(result)
			if (result.responseCode == 0) {
				state.contentDataTwo = result.result
				commit(HEADERSHOW_TWO, true)
				successCallback()
			}else {
				console.log('err')
			}
		}).catch(function(err) {
			failCallback()
			let res = err.response
			if(err) {
				console.log('api error, HTTP CODE: ' + res)
			}
		})
	},
		//保存
	[FORMSAVE] ({commit}, {redactArrSave, successCallback = () => {}, failCallback = () => {}}) {
		axios({
			method: 'post',
			url: '/tpdwt_manager/wc/upload.html',
			data: redactArrSave,
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			var result = res.data
//			console.log(result)
			if (result.responseCode == 0) {
//				state.contentDataTwo = result.result
//				commit(HEADERSHOW_TWO, true)
				successCallback()
			}else {
				console.log('err')
			}
		}).catch(function(err) {
			failCallback()
			let res = err.response
			if(err) {
				console.log('api error, HTTP CODE: ' + res)
			}
		})
	},
		[REDACT_NOT_TWO] ({commit}) {
			commit(HEADERSHOW_TWO, false)
		  },
			[REDACT_NEW_TWO] ({commit}) {
			commit(HEADERSHOW_TWO, true)
		  }
}

const getters = {
	springlist(state) {
		return state.springData
	},
	springmsg(state) {
		return state.springmsg
	},
	headerShowTwo(state) {
		return state.headerShowTwo
	},
	contentDataTwo(state) {
		return state.contentDataTwo
	},
}
export default {
	state,
	actions,
	mutations,
	getters
}

