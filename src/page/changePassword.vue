<template>
	<div>
		<header class="of-header"><span class="pa_name">修改个人密码</span></header>
		<div class="password_change">
			<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				<el-form-item label="旧密码" prop="oldpass">
					<el-input type="password" v-model="ruleForm2.oldpass" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass">
					<el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
				</el-form-item>
				<!--<el-form-item label="年龄" prop="age">
					<el-input v-model.number="ruleForm2.age"></el-input>
				</el-form-item>-->
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
					<el-button @click="resetForm('ruleForm2')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			var oldPass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else if(value.length < 6 ) {
					callback(new Error('密码最少为6位！'));
				} else {
					
					if(this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.ruleForm2.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else if(value === this.ruleForm2.oldpass) {
					callback(new Error('新密码不能与原始密码一致'));
				} else {
					callback();
				}
			};
			return {
				ruleForm2: {
					pass: '',
					checkPass: '',
					age: '',
					oldpass: ''
				},
				rules2: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					oldpass: [{
						validator: oldPass,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			...mapActions({
				passwordList: 'PASSWORD',
			}),
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
//					console.log(valid)
					if(valid) {
						let password = this.ruleForm2.oldpass
						let newpassword = this.ruleForm2.pass
						let renewpassword = this.ruleForm2.checkPass
						let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
//						console.log(userInfo.pid)
						let param = {
							password: password,
							newpassword: newpassword,
							renewpassword: renewpassword
						}
//						alert('submit!');
//						console.log(param)
						var passwordData = new FormData()
						passwordData.append('password', password)
						passwordData.append('newpassword', newpassword)
						passwordData.append('renewpassword', renewpassword)
						passwordData.append('pid', userInfo.pid)
						this.passwordList({
							passwordData,
							successCallback: () => {
								this.$message.success('修改成功！');
							},
							failCallback: () => {
								this.$message.error('旧密码错误，请重试！');
							}
						})
					} else {
//						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.pa_name {
		line-height: 40px;
		font-size: 20px;
		text-indent: 2em;
	}
	
	.password_change {
		width: 350px;
		padding: 20px;
		margin: 20px;
	}
</style>