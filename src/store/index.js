import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
import Vue from 'vue'
import Vuex from 'vuex'
import configuration from './modules/configuration.js'
import offspring from './modules/offspring.js'
import business from './modules/business.js'
import reportForm from './modules/reportForm.js'
import login from './modules/login.js'
import Types from './Types.js'

Vue.use(Vuex)


	

export default new Vuex.Store({
	modules: {
		configuration,
		Types,
		offspring,
		business,
		reportForm,
		login
	}
	
})