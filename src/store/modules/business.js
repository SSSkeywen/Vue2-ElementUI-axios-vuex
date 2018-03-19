import 'babel-polyfill'
import promise from 'es6-promise'
import axios from 'axios'
const BUSINESS = 'BUSINESS' 
const BUSINESS_LIST = 'BUSINESS_LIST' 
const TITLELISTDATA = 'TITLELISTDATA' 
const SAVELIST = 'SAVELIST'


const state = {
	businessData: '',
	businessList: '',
	businessListData: '',
	textListData: ''
}
const mutations = {
}

const actions = {
	[BUSINESS_LIST] ({commit}, {successCallback = () => {}, failCallback = () => {}}) {
		axios({
			method: 'post',
			url: '/tpdwt_manager/cardDeploy.html',
			data: ''
		}).then((res) => {
			var result = res.data
			console.log(result)
			if (result.responseCode == 0) {
//				alert('success')
				state.businessList = result.result.MODELIST
				state.textListData = result.result.TEXTLIST
				successCallback()
			}else {
				console.log('数据未取到')
			}
			
		}).catch(function(err) {
			failCallback()
			let res = err.response
			if(err) {
				console.log('api error, HTTP CODE: ' + res)
			}
		})
	},
	[TITLELISTDATA] ({commit}, {ValueData, successCallback = () => {}, failCallback = () => {}}) {
		axios({
			method: 'post',
			url: '/tpdwt_manager/getTitleList.html',
			data: ValueData,
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			var result = res.data
			console.log(result)
			if (result.responseCode == 0) {
				state.businessListData = result.result
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
	[SAVELIST] ({commit}, {saveList, successCallback = () => {}, failCallback = () => {}}) {
		axios({
			method: 'post',
			url: '/tpdwt_manager/addTsrinfo.html',
			data: saveList,
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			var result = res.data
//			console.log(result)
			if (result.responseCode == 0) {
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
}

const getters = {
	businessData(state) {
		return state.businessData
	},
	businessList(state) {
		return state.businessList
	},
	businessListData(state) {
		return state.businessListData
	},
	textListData(state) {
		return state.textListData
	},
}
export default {
	state,
	actions,
	mutations,
	getters
}

