<template>
	<div class="login-box">
		<div class="login_box">
        <ul>
          <li class="line_bottom">
            <i class="iconfont icon-zhanghao"></i><span class="margin_10">|</span><span>帐号</span>
            <input type="text" v-model="username" @keydown="keydownLogin()"/>
          </li>
          <li>
            <i class="iconfont icon-mima"></i><span class="margin_10">|</span><span>密码</span>
            <input type="password" v-model="password" @keydown="keydownLogin()"/>
          </li>

        </ul>
        <div class="text_box">
          <span>{{text}}</span>
        </div>
        <el-button class="big_button" type="primary" size="large" @click="login()">登录系统</el-button>
        <el-button class="big_button" type="primary" size="large" @click="resert()">重置</el-button>
      </div>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	export default {
		data () {
			return {
				username: '',
				password: '',
				text: ''
			}
		},
		methods: {
			...mapActions({
				userList: 'USER_LOGIN',
			}),
			keydownLogin () {
				if (event.keyCode === 13) {
					this.login()
				}
			},
			login () {
				if (!this.username) {
					this.text = '请输入账号'
					return
				}
				if (!this.password) {
					this.text = '请输入密码'
					return
				}
				this.text = ''
				var loginData = new FormData()
				loginData.append('username', this.username)	
				loginData.append('password', this.password)	
				console.log(loginData)
				this.userList({
			        loginData,
			        successCallback: () => {
						this.$emit('fetch')
					},
			        failCallback: (text) => {
			          this.text = '账号或密码错误'
			        }
			      })
				
			},
			resert () {
				this.text = ''
				this.username = ''
				this.password = ''
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.login-box{
		min-width: 1280px;
		height: 100%;
		background: url(../../static/images/background.jpg) no-repeat;
		background-size: 100% 100%;
		.login_box {
    position: absolute;
    z-index: 3;
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
    -moz-transform: translate(50%, 50%);
    -o-transform: translate(50%, 50%);
    -webkit-transform: translate(50%, 50%);
    font-size: 0;

    ul{
      border-radius: 8px;
      background: rgba(255,255,255,0.4);
      .line_bottom{
        border-bottom: 1px solid rgba(255,255,255,0.4);
      }
      li{
        padding: 0 10px;
        font-size: 18px;
        color: #fff;
        line-height: 70px;
        height: 70px;
        i, span, input{
          vertical-align: middle;
        }
        .margin_10{
          margin: 0 10px;
        }
        i{
          font-size: 24px;
        }
        input{
          color: #fff;
          width: 200px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: none;
          border: none;
          box-sizing: border-box;
          display: inline-block;
          font-size: 14px;
          height: 36px;
          line-height: 1;
          outline: none;
          padding: 3px 10px;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
          color: #bfcbd9 !important;
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #bfcbd9 !important;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #bfcbd9 !important;
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
          color: #bfcbd9 !important;
        }
      }
    }
    .big_button{
      font-size: 20px;
      height: 55px;
      width: 47%;
      border-radius: 8px;
    }
  }
  .text_box{
    line-height: 40px;
    height: 40px;
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
	}
</style>