<template>
	<div class="bc-box">
		<el-row>
			<el-col :span="16">
				<header class="of-header">
					<span class="of-header-title">选择内容</span>
				</header>
				<div class="of-select">
					<span>模块：</span>
					<el-select v-model="valueSelectOne" placeholder="请选择" @change="valueSelectData(valueSelectOne)">
						<el-option v-for="item in optionsOne" :key="item.ID" :label="item.NAME" :value="item.ID">
						</el-option>
					</el-select>
					<span>标题</span>
					<el-select v-model="valueSelectTwo" placeholder="请选择" @change="valueSelectDataTwo(valueSelectTwo)">
						<el-option v-for="item in optionsTwo" :key="item.TITLEIDTWO" :label="item.TEXTTITLE" :value="item.TITLEIDTWO">
						</el-option>
					</el-select>
					<el-button type="primary" class="btn_select" @click="addContent()">添加</el-button>
				</div>
				<div>

					<el-table :data="tableData3" border style="width: 100%">
						<el-table-column label="已选内容">
							<el-table-column label="＃" width="100">
								<template slot-scope="scope">
									<input class="input_text" :value="ListIndex(scope.$index)" disabled="disabled" />
									<!--<p v-model="ListIndex(scope.$index)"></p>-->
								</template>
							</el-table-column>
							<el-table-column prop="MODEL" label="模块" min-width="100">
							</el-table-column>
							<el-table-column prop="TITLE" label="标题" min-width="100">
							</el-table-column>
							<el-table-column label="" min-width="150">
								<template slot-scope="scope">
									<el-button size="mini" type="primary" @click="toTop(scope.$index, tableData3)" :disabled="isDisabled">上移</el-button>
									<el-button size="mini" type="primary" @click="toDwon(scope.$index, tableData3)">下移</el-button>
									<el-button size="mini" type="danger" @click="deleteRow(scope.$index, tableData3)">删除</el-button>
								</template>
							</el-table-column>
						</el-table-column>
					</el-table>
				</div>
				<div class="btn-xinjian">
					<el-button size="small" type="primary" @click="restore()">还原</el-button>
					<el-button size="small" type="primary" @click="saveNew()">保存</el-button>
				</div>
			</el-col>
			<el-col :span="8">
				<div>
					<header class="of-header">
						<span class="of-header-title">名片预览</span>
					</header>
					<div class="visiting_card_style">
						<div class="card_name">
							<p class="card_name_font">爱太平</p>
							<div class="card_name_content">
								<div><img src="static/images/headPortrait.png" /></div>
								<p>爱太平</p>
								<p>太平顾问 &nbsp;|&nbsp; 工号:95589</p>
							</div>
						</div>
						<div class="banner_box">
							<div class="banner_box_img">
								<div class="block">
									<el-carousel height="120px">
										<el-carousel-item v-for="item in imgList">
											<img :src="'/tpdwt_manager/getFile.html?filePath='+item.img" class="banner_img" />
										</el-carousel-item>
									</el-carousel>
								</div>
							</div>
							<ul class="list_content">
								<li class="list_content_li" v-for="item in listData">
									<div class="list_left">
										<p>{{ item.TEXTTITLE }}</p>
										<p>{{ item.SUBTITLE }}</p>
									</div>
									<div class="list_right">
										<img :src="'/tpdwt_manager/getFile.html?filePath='+item.ACCESSIMGURL" />
									</div>
								</li>
							</ul>
						</div>
						<div class="footer">
							<div class="footer_content">
								<p>推荐给好友</p>
								<p>预约回电</p>
							</div>
							
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	export default {
		data() {
			return {
				imgList: [],
				saveIndex: 2,
				addOne: '',
				addTwo: '',
				objImg: '', //图片路径
				unused: '', //UNUSED
				addressUrl: '',
				accessImgUrl: '',
				unionId: '',
				subtitle: '', //SUBTITLE
				isDisabled: false,
				optionsOne: [{
					ID: '',
					NAME: '全部'
				}],
				optionsTwo: [],
				valueSelectOne: '', //选择的内容
				valueSelectTwo: '', //选择的内容
				tableData3: [],
				listData: []
			}

		},
		created () {
			this.businessList({
					successCallback: () => {
						this.optionsOne.push(...this.$store.getters.businessList);
						this.tableData3.push(...this.$store.getters.textListData);
						this.mpStyle()
					},
					failCallback: () => {
					
					}
				})
			
		},
		methods: {
			...mapActions({
				businessList:'BUSINESS_LIST',
				titleListData:'TITLELISTDATA',
				saveList:'SAVELIST',
			}),
			deleteRow(index, rows) {
				
				rows.splice(index, 1)
				for (let i = 0;i < this.tableData3.length; i ++) {
					let num = i;
					num ++
					this.tableData3[i].ID = num
				}
				this.mpStyle()
			},
			toDwon(index, rows) {
				let numOne = index
				let num = numOne + 2
				let rowsData = rows[index]
				rows.splice(num, 0, rowsData)
				rows.splice(index, 1)
				for (let i = 0;i < this.tableData3.length; i ++) {
					let num = i;
					num ++
					this.tableData3[i].ID = num
				}
				this.mpStyle()
			},
			toTop(index, rows) {
				if (index != 0){
					let numOne = index
					let numTwo = index + 1
					let num = numOne - 1
					let rowsData = rows[index]
					rows.splice(num, 0, rowsData)
					rows.splice(numTwo, 1)
					for (let i = 0;i < this.tableData3.length; i ++) {
					let num = i;
					num ++
					this.tableData3[i].ID = num
				}
					this.mpStyle()
				}
				
			},
			//名片样式
			mpStyle() {
//				console.log(this.optionsTwo)
				console.log(this.tableData3)
//				let mpArr = []
				let mpArrData = {}
				this.imgList.length=0
				for (let i = 0;i < this.tableData3.length && i < 4; i++){
					mpArrData = {
						img: this.tableData3[i].ACCESSIMGURL
					}
					this.imgList.push(mpArrData)
				}
				this.listData = []
				for (let i = 4;i < 7 && i< this.tableData3.length; i++){
					mpArrData = {
						TEXTTITLE: this.tableData3[i].TITLE,
						SUBTITLE: this.tableData3[i].SUBTITLE,
						ACCESSIMGURL: this.tableData3[i].ACCESSIMGURL,
					}
					this.listData.push(mpArrData)
				}
				
			},
			//添加
			addContent() {
				
				let addArr = {}
//				let imgArr = {}//名片显示的图片
				if (this.valueSelectOne == '' || this.valueSelectTwo == ''){
					return false
				}
				if (this.tableData3.length > 6){
					this.$message.error('信息最多为7条！');
					return false
				}
				let num = this.tableData3.length
				num++
				addArr = {
					MODEL: this.addOne,
					TITLE: this.addTwo,
					ID: num,
					IMGURL: this.objImg,
					SUBTITLE: this.subtitle,
					UNUSED: this.unused,
					URL: this.addressUrl,
					UNIONID: this.unionId,
					ACCESSIMGURL: this.accessImgUrl
				}
				console.log(addArr)
				this.tableData3.push(addArr)
				this.mpStyle()
//				console.log(this.tableData3)
			},
			//
			restore() {
				this.valueSelectOne = ''
				this.valueSelectTwo = ''
				this.optionsTwo.length = 0
				this.tableData3.length = 0;
				this.businessList({
					successCallback: () => {
//						this.optionsOne.push(...this.$store.getters.businessList);
						this.tableData3.push(...this.$store.getters.textListData);
						this.mpStyle()
					},
					failCallback: () => {
					
					}
				})
//				this.tableData3.push(...this.$store.getters.textListData);
			},
			//
			saveNew() {
				if (this.tableData3.length < 7){
					this.$message.error('信息必须为7条！');
					return false
				}
				let saveListData = this.tableData3
					saveListData = JSON.stringify(saveListData)
					console.log(saveListData)
//				let saveList = this.tableData3
				var saveList = new FormData()
					saveList.append('savelist', saveListData)
//				console.log(this.tableData3)
				this.saveList({
					saveList,
					successCallback: () => {
						this.$message.success('保存成功！');
					},
					failCallback: () => {
						this.$message.error('err');
					}
				})
			},
			valueSelectDataTwo(value) {
				let obj = {}
				obj = this.optionsTwo.find((item) => {
					return item.TITLEIDTWO ===value
				})
				this.objImg = obj.IMGURL
				this.addTwo = obj.TEXTTITLE
				this.subtitle = obj.SUBTITLE
				this.unused = obj.UNUSED
				this.addressUrl = obj.URL
				this.unionId = obj.UNIONID
				this.accessImgUrl = obj.ACCESSIMGURL
			},
			valueSelectData(value) {
				let obj = {}
				obj = this.optionsOne.find((item) => {
					return item.ID ===value
				})
				this.addOne = obj.NAME
//				console.log(this.valueSelectOne)
				var ValueData = new FormData()
				ValueData.append('id', this.valueSelectOne)	
				this.titleListData({
					ValueData,
					successCallback: () => {
						this.optionsTwo = []
						this.valueSelectTwo = ''
//						console.log(this.$store.getters.businessListData)
						for (let i = 0; i < this.$store.getters.businessListData.length; i ++){
							let num = i
							num ++
//							console.log(num)
							this.$store.getters.businessListData[i].TITLEIDTWO = num
						}
						this.optionsTwo.push(...this.$store.getters.businessListData);
//						console.log(this.optionsTwo)
					},
					failCallback: () => {
//						alert('err')
					}
				})
			},
			ListIndex (value) {
		    		value++;
		    		this.saveIndex = value
		      return value
		    }
		},
	}
</script>

<style lang="scss" scoped="scoped">
	.bc-box,
	.el-row {
		height: 100%;
		.el-col-16 {
			border-right: 1px solid #e6ebf5;
		}
	}
	
	.of-select .el-select {
		width: auto;
	}
	
	.of-header {
		border-left: 1px solid #fff;
	}
	
	.visiting_card_style {
		width: 340px;
		height: 600px;
		margin: 10px auto 0;
		background: #f1f1f1;
		position: relative;
		.card_name {
			width: 100%;
			height: 150px;
			background: #f7fef0;
			position: relative;
			.card_name_font {
				font-size: 80px;
				text-align: center;
				line-height: 150px;
				color: #a0cb7c;
				/*font-family: ;*/
			}
			.card_name_content {
				width: 100%;
				height: 150px;
				position: absolute;
				left: 0;
				top: 0;
				background: rgba(0, 0, 0, 0.6);
				text-align: center;
				color: #fff;
				box-sizing: border-box;
				div {
					width: 65px;
					border: 2px solid #fff;
					border-radius: 50%;
					-webkit-border-radius: 50%;
					margin: 10px auto;
					img {
						width: 65px;
						height: 65px;
						display: block;
					}
				}
				p {
					margin: 5px auto;
				}
			}
		}
	}
	
	.banner_box {
		.banner_box_img {
			width: 95%;
			padding: 5px;
			margin: 5px auto;
			box-sizing: border-box;
			background: #fff;
		}
		.banner_img {
			width: 100%;
		}
	}
	
	.list_content {
		width: 95%;
		background: #fff;
		margin: 5px auto;
		.list_content_li {
			display: flex;
			display: -webkit-flex;
			border-bottom: 1px solid #eee;
			padding: 7px;
			box-sizing: border-box;
			.list_left{
				width: 80%;
				color: #333333;
				p:last-child{
					font-size: 12px;
    					margin-top: 3px;
    					color: #999999;
				}
			}
			.list_right{
				width: 20%;
				img{
					width: 62px;
					height: 62px;
				}
			}
		}
	}
	.footer{
		width: 100%;
		height: 60px;
		.footer_content{
			width: 100%;
			height: 60px;
			line-height: 60px;
			position: absolute;
			left: 0;
			bottom: 0;
			display: flex;
			display: -webkit-flex;
			p{
				width: 50%;
				text-align: center;
				color: #fff;
				background: #4ccf9f;
			}
			p:last-child{
				background: #fe6e4c;
			}
		}
	}
</style>