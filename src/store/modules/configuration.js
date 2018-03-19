import 'babel-polyfill'
import promise from 'es6-promise'
import axios from 'axios'
const TABLE_LIST = 'TABLE_LIST' 
const INQUIEW_LIST = 'INQUIEW_LIST' 
const OPERATE = 'OPERATE' 
const REFRESH = 'REFRESH' 
const REDACT = 'REDACT'     //编辑
const REDACT_SAVE = 'REDACT_SAVE'     //编辑取消
const REDACT_NOT = 'REDACT_NOT'     //编辑取消
const HEADERSHOW = 'HEADERSHOW'
const GO_REDACT = 'GO_REDACT'
const REDACT_NEW = 'REDACT_NEW'

const state = {
	tableData: [{
		insertTime: '1',
		mainTitle: '1',
		moduleName: '1',
		status: '',
	}],
	inquiewList: '',
	msg: '',
	operate: '',
	refDataId: '',
	mainId: '',   //编辑
	headerShow: false,
	contentData: []
}
const mutations = {
	[HEADERSHOW] (state, flag) {
		state.headerShow = flag
//  		Vue.set(state, 'headerShow', flag)
  }
}

const actions = {
	[TABLE_LIST] ({commit}, {tableList, successCallback = () => {}, failCallback = () => {}}) {
		axios({
			method: 'post',
			url: '/tpdwt_manager/sms/smslist.html',
			data: tableList,
			"Content-Type": "multipart/form-data"
		}).then((res) => {
//		axios.post('http://10.7.181.163:8090/tpdwt/sms/smslist.html', addressData).then((res) => {
			var result = res.data
			if (result.responseCode == 0) {
				state.tableData = result.result
				state.msg = result.msg
//				console.log(state.tableData)
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
	[INQUIEW_LIST] ({commit}, {successCallback = () => {}, failCallback = () => {}}) {
		axios({
			method: 'post',
			url: '/tpdwt_manager/sms/modellist.html',
			data: '',
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			var result = res.data
			if (result.responseCode == 0) {
				state.inquiewList = result.result
//				console.log(result.result)
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
	//操作
	[OPERATE] ({commit}, {operateId, successCallback = () => {}, failCallback = () => {}}) {
		axios({
			method: 'post',
			url: '/tpdwt_manager/sms/modify.html',
			data: operateId,
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			console.log(res)
			successCallback()
		}).catch(function(err) {
			failCallback()
			let res = err.response
			if(err) {
				console.log('api error, HTTP CODE: ' + res)
			}
		})
	},
	//刷新
	[REFRESH] ({commit}, {refDataId, successCallback = () => {}, failCallback = () => {}}) {
		axios({
			method: 'post',
			url: '/tpdwt_manager/sms/refresh.html',
			data: refDataId,
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			successCallback()
		}).catch(function(err) {
			failCallback()
			let res = err.response
			if(err) {
				console.log('api error, HTTP CODE: ' + res)
			}
		})
	},
	//编辑
	[REDACT] ({commit}, {mainId, successCallback = () => {}, failCallback = () => {}}) {
		axios({
			method: 'post',
			url: '/tpdwt_manager/sms/gettemp.html',
			data: mainId,
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			var result = res.data
//			console.log(result)
			if (result.responseCode == 0) {
				state.contentData = result.result
				commit(HEADERSHOW, true)
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
	//编辑
	[GO_REDACT] ({commit}, {redactArrTemp, successCallback = () => {}, failCallback = () => {}}) {
		axios({
			method: 'post',
			url: '/tpdwt_manager/sms/edit.html',
			data: redactArrTemp,
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			var result = res.data
			if (result.responseCode == 0) {
//				commit(HEADERSHOW, false)
				successCallback()
			}else {
				console.log('111err')
			}
		}).catch(function(err) {
			failCallback()
			let res = err.response
			if(err) {
				console.log('api error, HTTP CODE: ' + res)
			}
		})
	},
	[REDACT_NOT] ({commit}) {
	commit(HEADERSHOW, false)
  },
	[REDACT_NEW] ({commit}) {
	commit(HEADERSHOW, true)
  }
}

const getters = {
	tablist(state) {
		return state.tableData
	},
	inquiewList(state) {
		return state.inquiewList
	},
	msg(state) {
		return state.msg
	},
	headerShow(state) {
		return state.headerShow
	},
	contentData(state) {
		return state.contentData
	},
//	operate(state) {
//		return state.operate
//	}
}
export default {
	state,
	actions,
	mutations,
	getters
}

