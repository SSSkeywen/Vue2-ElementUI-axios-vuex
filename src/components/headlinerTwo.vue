<template>
	<div class="hl-box">
		<form enctype="multipart/form-data">
		
		<header class="of-header"><span class="pa_name">编辑标题</span></header>
		<el-row>
			<el-col :span="12">
				<ul class="hl-ul">
					<li>
						<p>主标题：</p>
						<el-input type="search" v-model="mainTitle" placeholder="请输入内容" :disabled="compile" :maxlength="50"></el-input>
						<p class="icon_main">*</p>
					</li>
					<li>
						<p>副标题：</p>
						<el-input type="search" v-model="subTitle" placeholder="请输入内容" :disabled="compile" :maxlength="50"></el-input>
						<p class="icon_main" style="color: transparent;">*</p>
					</li>
					<li>
						<p>内容名称：</p>
						<el-input type="search" v-model="slug" placeholder="请输入内容" :disabled="compile" :maxlength="50"></el-input>
						<p class="icon_main">*</p>
					</li>
					<li>
						<p>链接：</p>
						<el-input type="search" v-model="url" placeholder="请输入内容" :disabled="compile"></el-input>
						<p class="icon_main">*</p>
					</li>
					<li>
						<p>标题页面：</p>
						<div class="hl_ul_div">{{ moduleName }}</div>
						<p class="icon_main" style="color: transparent;">*</p>
					</li>
					<li>
						<p>上传图片：</p>
						<div class="hl_ul_div">
							<!--<el-upload 
								class="avatar-uploader" 
								:show-file-list="false" 
								action=""
								:on-success="handleAvatarSuccess" 
								:before-upload="beforeAvatarUpload"
								:on-change="onchange"
								:auto-upload="false"
								:disabled="compile"
								@change="getFile($event)"
								>
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>-->
							<input type="file" name="fileimg" id="" value="" @change="getFile($event)" ref="avatarInput"/>
							<img :src="imageUrl" width="200px" height="200px" ref="img"/>
						</div>
						<p class="icon_main"></p>
					</li>
				</ul>
			</el-col>
			<el-col :span="12">
				<ul class="hl-ul">
					<li>
						<p>上传分享图片：</p>
						<div class="hl_ul_div">
							<input type="file" name="fileimg" id="" value="" @change="getFileTwo($event)" ref="avatarInputtwo"/>
							<img :src="imageUrlTwo" width="50px" height="50px" ref="imgtwo"/>
						</div>
						<p class="icon_main"></p>
					</li>
					<li>
						<p>备注：</p>
						<div></div>
					</li>
					<li>
						<p></p>
						<div class="hl_ul_div">
							<textarea name="" id="" width="100%" v-model="remark" :disabled="compile" :maxlength="100"></textarea>
						</div>
					</li>
				</ul>
			</el-col>
		</el-row>
		<p class="tips">注意事项：链接若为外系统链接，请加上“http://”；图片上传尺寸最大不超过1M，格式只支持JPG。</p>
		<div class="hl-btn">
			<el-button type="submit" class="btn_select" @click="edit">保存</el-button>
			<!--<input type="text" name="textname" id="" value="textname" v-model="textname" />
			<input type="text" name="textnametwo" id="" value="textnametwo" v-model="textnametwo" />-->
			<!--<input type="button" value="提交" @click="edit">-->
			<el-button type="primary" class="btn_select" @click="redactNot()">取消</el-button>
		</div>
		</form>
	</div>
</template>

<script>
	import axios from 'axios'
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				imageUrl: '',
				imageUrlTwo: '',
				id: '',
				moduleId: '',
				mainTitle: '', //短信标题
				moduleName: '', //标题页面
				url: '',
				subTitle: '',
				slug: '',
				remark: '',
				file: '',
				fileData: '',
				fileDatatwo: '',
				textname:'',
				textnametwo: ''
			}
		},
				props: ['contentDataTwo','modelValue','propsPageNumber','compile'],
		created() {
//			console.log(this.contentDataTwo)
						this.mainTitle = this.contentDataTwo.mainTitle
						this.id = this.contentDataTwo.id
						this.moduleName = this.contentDataTwo.moduleName
						this.url = this.contentDataTwo.url
						this.slug = this.contentDataTwo.slug
//						this.subTitle = this.contentDataTwo.subTitle
						this.imageUrl = '/tpdwt_manager/getFile.html?filePath=' + this.contentDataTwo.accessimgurl
						this.imageUrlTwo = '/tpdwt_manager/getFile.html?filePath=' + this.contentDataTwo.accshareimgurl
						if (this.contentDataTwo.remark != 'null'){
							this.remark = this.contentDataTwo.remark
						}else {
							this.remark = ''
						}
						if (this.contentDataTwo.subTitle != 'null'){
							this.subTitle = this.contentDataTwo.subTitle
						}else {
							this.subTitle = ''
						}
						if (this.contentDataTwo.slug != 'null'){
							this.slug = this.contentDataTwo.slug
						}else {
							this.slug = ''
						}
						this.moduleId = this.contentDataTwo.moduleId
		},
		methods: {
			...mapActions({
				redactLogoutTwo: 'REDACT_NOT_TWO',
				formSave: 'FORMSAVE'
			}),
			getFile(event) {
				this.fileData = event.target.files[0];
				console.log(this.fileData)
				let refs = this.$refs
				let elInput = refs.avatarInput
				let elImg = refs.img
				
					let reader = new FileReader();
					reader.onload = (e) => {
						let Dsrc = e.target.result;
						elImg.src = Dsrc;
						console.log(Dsrc)
					};
					if (elInput.files && elInput.files[0]) {
						reader.readAsDataURL(elInput.files[0])
					}
			},
			getFileTwo(event) {
				this.fileDatatwo = event.target.files[0];
				let refstwo = this.$refs
				let elInputtwo = refstwo.avatarInputtwo
				let elImgtwo = refstwo.imgtwo
				
					let readertwo = new FileReader();
					readertwo.onload = (e) => {
						let Dsrctwo = e.target.result;
						elImgtwo.src = Dsrctwo;
						console.log(Dsrctwo)
					};
					if (elInputtwo.files && elInputtwo.files[0]) {
						readertwo.readAsDataURL(elInputtwo.files[0])
					}
			},
			edit(){
				if(this.mainTitle == '' || this.url == '') {
					this.$message.error('所有带＊号的都必须填写！');
					return false
				}
				let textData = {
					'textname': this.textname,
					'textnametwo': this.textnametwo,
				}
				let formSaveData = {
					'id': this.id,
					'mainTitle': this.mainTitle,
					'url': this.url,
					'subTitle': this.subTitle,
					'slug': this.slug,
					'moduleName': this.moduleName,
					'imgurl': this.imageUrl,
					'shareimgurl': this.imageUrlTwo,
					'remark': this.remark,
					'moduleId': this.moduleId
				}
				const isJPG = this.fileData.type === 'image/jpeg';
				const isLt2M = this.fileData.size / 1024 / 1024 < 1;
				if (this.fileData.type != '' && this.fileData.type != undefined && this.fileData.type != null){
					if(!isJPG) {
						this.$message.error('上传头像图片只能是 JPG 格式!');
						return false;
					}
					if(!isLt2M) {
						this.$message.error('上传头像图片大小不能超过 1MB!');
						return false;
					}
				}
				const isLt2Mtwo = this.fileDatatwo.size / 1024 / 1024 < 1;
				if (this.fileDatatwo.type != '' && this.fileDatatwo.type != undefined && this.fileDatatwo.type != null){
					if(!isLt2Mtwo) {
						this.$message.error('上传头像图片大小不能超过 1MB!');
						return false;
					}
				}
				console.log(formSaveData)
				formSaveData = JSON.stringify(formSaveData)
				textData = JSON.stringify(textData)
				var image = new FormData()
				image.append('fileimg', this.$refs.avatarInput.files[0])
				image.append('fileimgtwo', this.$refs.avatarInputtwo.files[0])
				image.append('temp', formSaveData)
				axios({
					method: 'post',
					url: '/tpdwt_manager/wc/edit.html',
					data: image,
					"Content-Type": "multipart/form-data"
					}).then((res) => {
						var result = res.data
						console.log(result)
						if (result.responseCode == 0) {
							this.$message.success('保存成功');
							this.$emit('search')
							this.redactLogoutTwo()
						}else if(result.responseCode == 1) {
			
						}
					})
			},
			redactSave(event) {
//				console.log(event)
//				if(this.mainTitle == '' || this.url == '' || this.subTitle == '') {
//					alert('所有带＊的输入框都必须输入！')
//					return false;
//				}
//				let formSaveData = {
//					'id': this.id,
//					'mainTitle': this.mainTitle,
//					'url': this.url,
//					'subTitle': this.subTitle,
//					'moduleName': this.moduleName,
//					'imageUrl': this.fileData,
//					'remark': this.remark
//				}
//				console.log(formSaveData)
//				formSaveData = JSON.stringify(formSaveData)
//				
//				var redactArrSave = new URLSearchParams()
//				redactArrSave.append('temp', formSaveData)
//				this.formSave({
//					redactArrSave,
//					successCallback: () => {
//						alert('success')
//					},
//					failCallback: () => {
//
//					}
//				});

			},
			redactNot() {
				this.redactLogoutTwo()
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			onchange(event, file, fileList) {
//				console.log(event, file)
			},
//			handlePreview (file, fileList) {
//				console.log(file, fileList)
//			},
			
//			beforeAvatarUpload(file) {
//				const isJPG = file.type === 'image/jpeg';
//				const isLt2M = file.size / 1024 / 1024 < 2;
//
//				if(!isJPG) {
//					this.$message.error('上传头像图片只能是 JPG 格式!');
//				}
//				if(!isLt2M) {
//					this.$message.error('上传头像图片大小不能超过 2MB!');
//				}
//				return isJPG && isLt2M;
//			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
		border: 1px solid #d8dce5;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	
	.hl-box {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 10;
		.hl-ul {
			width: 100%;
			li {
				width: 100%;
				display: flex;
				display: -webkit-flex;
				margin-top: 10px;
				line-height: 40px;
				.hl_ul_div {
					width: 50%;
				}
				p {
					width: 30%;
					text-align: right;
				}
				.icon_main {
					width: 5%;
					color: #ff0000;
				}
				.el-input,
				.el-textarea {
					width: 50%;
				}
				textarea {
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
					-webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
					transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
					min-height: 150px;
				}
			}
		}
	}
	
	.tips {
		font-size: 12px;
		color: red;
		text-indent: 2em;
		margin: 10px 0;
	}
	
	.hl-btn {
		text-align: center;
		margin-top: 20px;
	}
	
	.el-row {
		margin-top: 20px;
	}
</style>