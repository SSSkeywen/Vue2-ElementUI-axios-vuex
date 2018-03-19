import 'babel-polyfill'
import promise from 'es6-promise'
import axios from 'axios'
const FORM_LIST = 'FORM_LIST' 

const state = {
	formList: ''
}
const mutations = {
}

const actions = {
	[FORM_LIST] ({commit}, {saveList, successCallback = () => {}, failCallback = () => {}}) {
		axios({
			method: 'post',
			url: '/tpdwt_manager/statisticalStatement.html',
			data: saveList,
			"Content-Type": "multipart/form-data"
		}).then((res) => {
			var result = res.data
//			console.log(result)
			if (result.responseCode == 0) {
				state.formList = result.result
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
}

const getters = {
	formList(state) {
		return state.formList
	},
}
export default {
	state,
	actions,
	mutations,
	getters
}

