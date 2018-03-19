<template>
	<div>
		<header class="of-header">
			<span class="of-header-title">编辑列表</span>
			<span>模块分类</span>
			<el-select v-model="modelValue" placeholder="请选择">
				<el-option v-for="item in options" :key="item.modelId" :label="item.modelName" :value="item.modelId">
				</el-option>
			</el-select>
		</header>
		<div class="of-select">
			<span>选择时间：</span>
			<el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
			</el-date-picker>
			<span>标题：</span>
			<input type="search" class="search" placeholder="请输入关键词搜索" v-model="tableList.title" />
			<span>状态：</span>
			<el-select v-model="valueSelect" placeholder="请选择">
				<el-option v-for="item in optionsTwo" :key="item.status" :label="item.label" :value="item.status">
				</el-option>
			</el-select>
			<el-button type="primary" class="btn_select" @click="search()">查询</el-button>
		</div>
		<div>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="priority" label="优先级" width="80">
					<template slot-scope="scope">
						<input class="input_text" type="text" v-model="scope.row.priority" @keyup="isNumberPd(scope.$index, scope.row.priority)" />
					</template>
				</el-table-column>
				<el-table-column prop="mainTitle" label="主标题" min-width="100">
					<template slot-scope="scope">
						<p class="mc_main_title" @click="mainTitleEnter(scope.$index, false)">{{ scope.row.mainTitle }}</p>
					</template>
				</el-table-column>
				<el-table-column prop="insertTime" label="创建时间" min-width="100">
				</el-table-column>
				<el-table-column prop="moduleName" label="目标模块" min-width="100">
				</el-table-column>
				<el-table-column label="预览" width="80">
					<template slot-scope="scope">
						<p class="mc_main_title" @click="mainTitleEnter(scope.$index, true)">查看</p>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="状态" width="80">
					<template slot-scope="scope">
						<p>{{ scope.row.status.name }}</p>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="功能选项" min-width="220">
					<template slot-scope="scope">
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" :disabled="scope.row.status.delectbtn" >删除</el-button>
						<el-button size="mini" type="primary" @click="issue(scope.$index, scope.row)" :disabled="scope.row.status.fabubtn" >发布</el-button>
						<el-button size="mini" type="primary" @click="tapeOut(scope.$index, scope.row)" :disabled="scope.row.status.xiaxianbtn">下线</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<PageMy :offset="2" :firstPage="0" :lastPage="lastPage" @fetch="getData" :propsPageNumber="propsPageNumber" ref="pageMy"></PageMy>
		<div class="btn-xinjian">
			<el-button size="small" type="primary" @click="newHead()">新建</el-button>
			<el-button size="small" type="primary" @click="refreshClickTwo()">刷新</el-button>
		</div>
		<headliner v-if="headerShow" @searchTwo="search" @fetch="getData" :contentData="contentData" :modelValue="modelValue"  :propsPageNumber="propsPageNumber" :compile="compile"></headliner>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import headliner from '../components/headliner'
	import PageMy from '../components/PageMy'
	export default {
		components: {
			headliner,
			PageMy
		},
		data() {
			return {
				propsPageNumber: 0,
				pageNoData: '',
//				headerShow: false,
				compile: true,
				options: [{
					modelId: '',
					modelName: '全部'
				}],
				optionsTwo: [{
					status: '',
					label: '全部'
				},{
					status: '1',
					label: '已发布'
				},{
					status: '2',
					label: '未发布'
				},{
					status: '4',
					label: '已下线'
				}],
				modelValue: '',      //模块
				valueSelect: '',//状态
				value6: '',
				value7: '',
				
				tableData: [{
					insertTime: '1',
					mainTitle: '1',
					moduleName: '1',
					status: '1',
					id: '',
					priority: '',
				}],
				tableList: {
					modelId: '',
					startTime: '1900-00-00 00:00:00',
					endTime: '',
					title: '',
					status: '',
					page: '',
				},
				lastPage: 1,
				contentData: {
					mainTitle: '',
					id: '',
					url: '',
					subTitle: '',
					variable1: '',
					variable2: '',
					variable3: '',
					variable4: '',
					variable5: '',
					variable6: '',
				}
			}
		},
		created() {
			this.getData(0);
			this.selectlist({
					successCallback: () => {
						this.options.push(...this.$store.getters.inquiewList);
					},
					failCallback: () => {

					}
				})
//				this.options.push(...this.$store.getters.inquiewList);
		},
		methods: {
			...mapActions({
				tablelist: 'TABLE_LIST',
				selectlist: 'INQUIEW_LIST',
				operate: 'OPERATE',
				refresh: 'REFRESH',
				redact: 'REDACT',
				redactNew: 'REDACT_NEW',
			}),
			//点名称查询可修改
			mainTitleEnter (index, compile) {
					var mainId = new FormData()
					mainId.append('id', this.tableData[index].id)
					this.compile = compile
				this.redact({
					mainId,
					successCallback: () => {
						this.contentData = this.$store.getters.contentData
					},
					failCallback: () => {
						alert('err')
					}
				})
			},
			//删除
			handleDelete(index, row) {
				var operateId = new FormData()
				operateId.append('id', row.id)	
				operateId.append('status', 3)	
				this.operate({
					operateId,
					successCallback: () => {
						this.getData(this.pageNoData)
					},
					failCallback: () => {
						alert('err')
					}
				})
			},
			//发布
			issue(index, row) {
				if (this.tableData[index].priority == '' || this.tableData[index].priority == undefined){
					this.$message.error('请先输入优先级！');
					return false
				}
				let zhengze = /\D/g
				if (zhengze.test(this.tableData[index].priority)){
					this.$message.error('优先级不能输入非数字！');
					return false;
				}
				this.refreshClickTwo()
				var operateId = new FormData()
				console.log(row.id)
				operateId.append('id', row.id)	
				operateId.append('status', 1)	
				this.operate({
					operateId,
					successCallback: () => {
						this.getData(this.pageNoData)
					},
					failCallback: () => {
						alert('err')
					}
				})
			},
			//下线
			tapeOut(index, row) {
				var operateId = new FormData()
				operateId.append('id', row.id)	
				operateId.append('status', 4)	
				this.operate({
					operateId,
					successCallback: () => {
						this.getData(this.pageNoData)
					},
					failCallback: () => {
						alert('err')
					}
				})
			},
			getData(pageNumber) {
				this.pageNoData = pageNumber
				this.tableList.page = pageNumber + 1
//				console.log(this.tableList)
				var tableList = new FormData()
				tableList.append('modelId', this.modelValue)                //模版ID
				tableList.append('startTime', this.tableList.startTime)//开始时间
				tableList.append('endTime', this.tableList.endTime)    //结束时间
				tableList.append('title', this.tableList.title)		  //主标题
				tableList.append('status', this.valueSelect)			  //状态
				tableList.append('page', this.tableList.page)		  //页面
//				console.log(this.valueSelect)
				this.tablelist({
					tableList,
					successCallback: () => {
						var arr = []
						var v = this.$store.getters.tablist
						var msg = this.$store.getters.msg
						this.lastPage = Math.ceil(parseInt(msg)/10) -1
						arr = eval(v);
						//将获取的值循环便利赋值
						for(let i = 0; i < arr.length; i++) {
//							console.log(arr[i].status)
							if(arr[i].status == 1) {
								arr[i].status = {
									name: '已发布',
									delectbtn: true,
									fabubtn: true,
									xiaxianbtn: false,
								} 
							}
							if(arr[i].status == 2) {
								arr[i].status = {
									name: '未发布',
									delectbtn: false,
									fabubtn: false,
									xiaxianbtn: true,
								} 
							}
							if(arr[i].status == 4) {
								arr[i].status = {
									name: '已下线',
									delectbtn: false,
									fabubtn: false,
									xiaxianbtn: true,
								} 
							}
						}
//						console.log(arr)
						this.tableData = arr;
					},
					failCallback: () => {

					}
				});
				
			},
			newHead() {
				this.compile = false
				if (this.modelValue != ''){
						this.contentData.mainTitle = ''
						this.contentData.id = ''
						this.contentData.url = ''
						this.contentData.subTitle = ''
						this.contentData.variable1 = ''
						this.contentData.variable2 = ''
						this.contentData.variable3 = ''
						this.contentData.variable4 = ''
						this.contentData.variable5 = ''
						this.contentData.variable6 = ''
						this.contentData.moduleName = this.options[this.modelValue].modelName
//						if (this.modelValue == 1){
//							this.contentData.moduleName = '产品介绍'
//						}
//						if (this.modelValue == 2){
//							this.contentData.moduleName = '精品阅读'
//						}
//						if (this.modelValue == 3){
//							this.contentData.moduleName = '沟通交流'
//						}
					this.redactNew()
				}else {
					this.$message.error('请选择模块分类！');
				}
				
			},
			//输入判定
			isNumberPd(index, indexContent) {
//			let contentData = this.tableData[index].priority.replace(/\D/g,'')
//				console.log(contentData)	
//				if (contentData > 9) {
//					contentData = 9;
//				}
//				this.tableData[index].priority = contentData
			},
//			查询
			search () {
				let isNull = null
				if(this.value6 != isNull){
					let startTime = this.value6[0]
					let endTime = this.value6[1]
//					console.log(this.value6)
					switch (this.value6){
					case '':
						this.tableList.startTime = ''
						this.tableList.endTime = ''
						break;
					default:
						this.tableList.startTime = formatDate(startTime, "yyyy-MM-dd hh:mm:ss")
						this.tableList.endTime = formatDate(endTime, "yyyy-MM-dd hh:mm:ss")
						break;
					}
				} else{
						this.tableList.startTime = ''
						this.tableList.endTime = ''
					}
				
				this.getData(0)
				this.$refs.pageMy.pageArrGenerate(0)
			},
//			刷新
			refreshClickTwo () {
				var refData = []
				for (let i = 0;i<this.tableData.length;i++){
					var refreshData = {
						id: '',
						priority: ''
					}
//					console.log(this.tableData[i].priority)
					if (this.tableData[i].priority != ''&& this.tableData[i].priority != undefined && this.tableData[i].priority != null){
//						let contentData = this.tableData[i].priority.replace(/\D/g,'')
//						this.tableData[i].priority = contentData
//						if (contentData == ''){
//							this.$message.error('优先级框里不能有非数字！');
//							return false;
//						}
						let zhengze = /\D/g
						if (zhengze.test(this.tableData[i].priority)){
							this.$message.error('优先级不能输入非数字！');
							return false;
						}
					}else{
						this.tableData[i].priority = ''
					}
					
//					this.tableData[i].priority = contentData
					refreshData.id = this.tableData[i].id
					refreshData.priority = this.tableData[i].priority
					refData.push(refreshData) 
				}
//				console.log(refData)
				refData = JSON.stringify(refData)
				
				var refDataId = new FormData()
				refDataId.append('arr', refData)
//				console.log(refDataId)
				
				this.refresh({
					refDataId,
					successCallback: () => {
						this.getData(this.pageNoData)
					},
					failCallback: () => {
						alert('err')
					}
				})
			}
	},
	computed: {
    headerShow () {
      return this.$store.getters.headerShow
    }
  }
	}
</script>

<style lang="scss" scoped="scoped">

</style>