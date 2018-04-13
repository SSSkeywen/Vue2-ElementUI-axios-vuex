<template>
	<div class="hl-box">
		<header class="of-header"><span class="pa_name">编辑标题</span></header>
		<el-row>
		  <el-col :span="12">
		  	<ul class="hl-ul">
		  		<li>
		  			<p>短信标题：</p>
		  			<el-input type="search" v-model="mainTitle" placeholder="请输入内容" :disabled="compile" :maxlength="50"></el-input>
		  			<p class="icon_main">*</p>
		  		</li>
				  <li>
		  			<p>内容名称：</p>
		  			<el-input type="search" v-model="slug" placeholder="请输入内容" :disabled="compile" :maxlength="50"></el-input>
		  			<p class="icon_main">*</p>
		  		</li>
		  		<li>
		  			<p>标题页面：</p>
		  			<div class="hl_ul_div">{{ moduleName }}</div>
		  			<p class="icon_main" style="color: transparent;">*</p>
		  		</li>
		  		<li>
		  			<p>短信模版编号：</p>
		  			<el-input type="search" v-model="url" placeholder="请输入内容" :disabled="compile" :maxlength="50"></el-input>
		  			<p class="icon_main">*</p>
		  		</li>
		  		<li>
		  			<p>短信模版：</p>
		  			<div class="hl_ul_div">
		  				<textarea name="" id="" width="100%" v-model="subTitle" :disabled="compile" :maxlength="300"></textarea>
		  			</div>
		  			<p class="icon_main">*</p>
		  		</li>
		  	</ul>
		  </el-col>
		  <el-col :span="12">
		  	<ul class="hl-ul">
		  		<li>
		  			<p>变量1：</p>
		  			<el-input type="search" v-model="variable1" placeholder="请输入内容" :disabled="compile" :maxlength="50"></el-input>
		  		</li>
		  		<li>
		  			<p>变量2：</p>
		  			<el-input type="search" v-model="variable2" placeholder="请输入内容" :disabled="compile" :maxlength="50"></el-input>
		  		</li>
		  		<li>
		  			<p>变量3：</p>
		  			<el-input type="search" v-model="variable3" placeholder="请输入内容" :disabled="compile" :maxlength="50"></el-input>
		  		</li>
		  		<li>
		  			<p>变量4：</p>
		  			<el-input type="search" v-model="variable4" placeholder="请输入内容" :disabled="compile" :maxlength="50"></el-input>
		  		</li>
		  		<li>
		  			<p>变量5：</p>
		  			<el-input type="search" v-model="variable5" placeholder="请输入内容" :disabled="compile" :maxlength="50"></el-input>
		  		</li>
		  		<li>
		  			<p>变量6：</p>
		  			<el-input type="search" v-model="variable6" placeholder="请输入内容" :disabled="compile" :maxlength="50"></el-input>
		  		</li>
	  		</ul>
		  </el-col>
		</el-row>
		<p class="tips">注意事项：请在短信模版处添加短信模版，在变量处编辑相应的描述。</p>
		<div class="hl-btn">
			<el-button type="primary" class="btn_select" @click="redactSave()">保存</el-button>
			<el-button type="primary" class="btn_select" @click="redactNot()">取消</el-button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data () {
			return {
				id: '',
				mainTitle: '', //短信标题
				moduleName: '', //标题页面
				url: '',
				slug: '',
				subTitle: '',
				variable1: '',
				variable2: '',
				variable3: '',
				variable4: '',
				variable5: '',
				variable6: '',
			}
		},
		props: ['contentData','modelValue','propsPageNumber','compile'],
		created (){
			// console.log(this.contentData)
			this.mainTitle = this.contentData.mainTitle
			this.id = this.contentData.id
			this.moduleName = this.contentData.moduleName
			this.url = this.contentData.url
			this.slug = this.contentData.slug
			this.subTitle = this.contentData.subTitle
			this.variable1 = this.contentData.variable1
			this.variable2 = this.contentData.variable2
			this.variable3 = this.contentData.variable3
			this.variable4 = this.contentData.variable4
			this.variable5 = this.contentData.variable5
			this.variable6 = this.contentData.variable6
			
			if(this.url != 'null'){
				
			}else {
				this.url = ""
			}
			if(this.mainTitle != 'null'){
				
			}else {
				this.mainTitle = ""
			}
			if(this.slug != 'null'){
				
			}else {
				this.slug = ""
			}
			if(this.subTitle != 'null'){
				
			}else {
				this.subTitle = ""
			}
			if(this.variable1 != 'null'){
				
			}else {
				this.variable1 = ""
			}
			if(this.variable2 != 'null'){
				
			}else {
				this.variable2 = ""
			}
			if(this.variable3 != 'null'){
				
			}else {
				this.variable3 = ""
			}
			if(this.variable4 != 'null'){
				
			}else {
				this.variable4 = ""
			}
			if(this.variable5 != 'null'){
				
			}else {
				this.variable5 = ""
			}
			if(this.variable6 != 'null'){
				
			}else {
				this.variable6 = ""
			}
		},
		methods: {
			...mapActions({
	  			redactLogout: 'REDACT_NOT',
	  			goredact: 'GO_REDACT',
	  		}),
			redactSave () {
				if (this.mainTitle == '' || this.url == '' || this.subTitle == '') {
					this.$message.error('所有带＊的输入框都必须输入！');
					return false;
				}
				let redactData = {
					'id': this.id,
					'mainTitle': this.mainTitle,
					'url': this.url,
					'subTitle': this.subTitle,
					'slug': this.slug,
					'moduleName':this.moduleName,
					'moduleId':this.modelValue,
					'variable1': this.variable1,
					'variable2': this.variable2,
					'variable3': this.variable3,
					'variable4': this.variable4,
					'variable5': this.variable5,
					'variable6': this.variable6
				}
				
				redactData = JSON.stringify(redactData)
//				console.log(redactData)
				var redactArrTemp = new FormData()
				redactArrTemp.append('temp', redactData)
				this.goredact({
					redactArrTemp,
					successCallback: () => {
						this.$message.success('保存成功');
						this.$emit('searchTwo')
						this.redactLogout()
//						this.$emit('fetch', this.propsPageNumber)
					},
					failCallback: () => {

					}
				});
				
			},
			redactNot () {
				this.redactLogout()
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
.hl-box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #fff;
	z-index: 10;
	.hl-ul{
		width: 100%;
		li{
			width: 100%;
			display: flex;
			display: -webkit-flex;
			margin-top: 10px;
			line-height: 40px;
			.hl_ul_div{
				width: 50%;
			}
			p{
				width: 30%;
				text-align: right;
			}
			.icon_main{
				width: 5%;
				color: #ff0000;
			}
			.el-input,.el-textarea{
				width: 50%;
				
			}
			textarea{
					width: 100%;
				    display: block;
				    resize: vertical;
				    padding: 5px 15px;
				    line-height: 1.5;
				    box-sizing: border-box;
				    width: 100%;
				    color: #5a5e66;
				    background-color: #fff;
				    background-image: none;
				    border: 1px solid #d8dce5;
				    border-radius: 4px;
				    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
				    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
				    min-height: 150px;
				}
			
		}
	}
}
.tips{
	font-size: 12px;
	color: red;
	text-indent: 2em;
	margin: 10px 0;
}
.hl-btn{
	text-align: center;
	margin-top: 20px;
}
.el-row{
	margin-top: 20px;
}
</style>