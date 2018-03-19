<template>
	<div id="app">
		<div v-if="userAuthed">
			<div class="header">
				<span class="header_name">
		  			<img src=""/>
		  			太平网通微信公众平台管理系统
		  		</span>
				<span class="header_admin">
		  			登陆用户：<i>{{ userName }}</i>
		  			用户角色：<i>{{ userAdmin }}</i>
		  		</span>
			</div>
			<el-row class="app_body">
				<el-col :span="4">
					<el-menu default-active="/home" class="el-menu-vertical-demo" router theme="dark">
						<el-submenu index="1">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>基本功能</span>
							</template>
							<el-menu-item index="/changePassword">修改密码</el-menu-item>
						</el-submenu>
						<el-submenu index="2">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>系统功能</span>
							</template>
							<el-menu-item index="/offspringConfiguration" @click="closeRedactTwo()">微信后台配置</el-menu-item>
							<el-menu-item index="/businessConfiguration">TSR名片配置</el-menu-item>
							<el-menu-item index="/modulesConfiguration" @click="closeRedact()">短信模版配置</el-menu-item>
							<el-menu-item index="/reportFormStatistics">报表统计</el-menu-item>
						</el-submenu>
						<el-menu-item index="/" @click="logOut()">
							<i class="el-icon-setting"></i>
							<span slot="title">退出系统</span>
						</el-menu-item>
					</el-menu>
				</el-col>
				<el-col :span="20" class="content-right">
					<router-view/>
				</el-col>
			</el-row>
		</div>
		<login v-else  @fetch="userNameData"></login>
	</div>
</template>

<script>
	import login from './login/login'
	import { mapActions } from 'vuex'
	export default {
		name: 'app',
		components: { login },
		data() {
			return {
				userName: '',
				userAdmin: '管理员',
			}
		},
		mounted() {
			this.goHome()
			this.loadUserInfo()
			this.userNameData()
		},
		methods: {
			...mapActions({
	  			redactLogout: 'REDACT_NOT',
	  			redactLogoutTwo: 'REDACT_NOT_TWO',
	  			logout: 'LOGOUT',
	  			loadUserInfo: 'LOAD_LOCAL_USERINFO',
	  		}),
			goHome() {
				this.$router.push({
					path: '/'
				})
			},
			logOut () {
				this.$confirm('是否退出？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.goHome()
      				this.logout()
				}).catch(() => {
					
				})
				
			},
			userNameData() {
				let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
				if(userInfo != null){
					this.userName = userInfo.username
					console.log(userInfo.pid)
				}
			},
			closeRedact () {
				this.redactLogout()
			},
			closeRedactTwo () {
				this.redactLogoutTwo()
			}
		},
		 computed: {
		    userAuthed () {
		      return this.$store.getters.userAuthed
		    }
		  }
	}
</script>

<style lang="scss">
	@import "./style/reset.scss";
	@import "../static/font/iconfont.css";
	#app{height: 100%;}
	.header {
		font-size: 0;
		min-width: 1280px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		background-color: #324157;
		width: 100%;
		height: 10vh;
		line-height: 10vh;
		min-height: 80px;
		padding-left: 20px;
		color: #fff;
		.header_name {
			font-size: 20px;
			color: #fff;
		}
		.header_admin {
			font-size: 18px;
			color: #fff;
			float: right;
			padding-right: 20px;
		}
	}
	
	.el-menu--dark {
		background-color: #34495e!important;
	}
	
	.app_body {
		min-width: 1280px;
		height: 90vh;
		.el-col {
			height: 100%;
			position: relative;
			.el-menu {
				height: 100%;
				border-radius: 0;
				background-color: #34495e!important;
				color: #fff;
				.el-menu-item,
				.el-submenu__title {
					color: #bfcbd9;
				}
				.el-submenu li.el-menu-item {
					background: #516375;
				}
				.el-menu-item.is-active {
					background: #5fa5e4!important;
					color: #fff;
				}
			}
		}
	}
	
	::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #bfcbd9 !important;
	}
	
	 :-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #bfcbd9 !important;
	}
	
	 ::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #bfcbd9 !important;
	}
	
	 :-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #bfcbd9 !important;
	}
	/*公共样式*/
	
	.of-header {
		box-sizing: border-box;
		height: 80px;
		width: 100%;
		background: #eee;
		padding: 22px 30px 0;
		font-size: 0;
		span {
			font-size: 16px;
			margin-right: 10px;
		}
		.of-header-title {
			font-size: 18px;
			font-weight: bold;
			margin-right: 20px;
		}
	}
	
	.of-select {
		box-sizing: border-box;
		height: 80px;
		width: 100%;
		padding: 22px 12px 0;
		font-size: 0;
		span {
			font-size: 16px;
			margin: 0 5px 0;
		}
		.search {
			width: 200px;
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			background-color: #fff;
			background-image: none;
			border-radius: 4px;
			border: 1px solid #bfcbd9;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			display: inline-block;
			font-size: 14px;
			height: 36px;
			line-height: 1;
			outline: none;
			padding: 3px 10px;
		}
		.el-select {
			width: 100px;
		}
		.btn_select {
			margin-left: 10px;
		}
	}
	
	.input_text {
		width: 25px;
		height: 25px;
		text-align: center;
		border-radius: 3px;
		-webkit-border-radius: 3px;
	}
	
	.btn-xinjian {
		text-align: center;
		height: 80px;
		line-height: 80px;
	}
	.el-carousel__button{
			width: 5px!important;
			height: 5px!important;
			border-radius: 50%!important;
		}
.el-table__body-wrapper {
    overflow: hidden!important;
    overflow-y: auto!important;
    position: relative;
    max-height: 50vh;
}
.mc_main_title{
	text-decoration: underline;
    color: #419eff;
    cursor: pointer;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
-webkit-appearance: none;
margin: 0;
}
/*.el-table_1_column_40:first-child  div{
	text-decoration: none;
    color: #419eff;
    cursor:  cell;
}*/
/*.el-range__close-icon{
	display: none!important;
}*/
.el-table_1_column_7{
	.cell{
		text-align: center;
	}
}
.el-table_1_column_17{
	.cell{
		text-align: center;
	}
}
</style>