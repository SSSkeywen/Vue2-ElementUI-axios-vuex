<template>
	<div>
		<div class="of-select">
			<span>选择时间：</span>
			<el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
			</el-date-picker>
			<el-button type="primary" class="btn_select" @click="search()">查询</el-button>
		</div>
		<div>
			<el-table
    :data="tableData3"
    style="width: 100%">
    <el-table-column label="">
        <el-table-column
          prop="MAINTITLE"
          label="标题"
          min-min-width="120">
        </el-table-column>
        </el-table-column>
      <el-table-column label="TSR发送（次数）">
        <el-table-column
          prop="ZFSCS"
          label="总发送"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="WXZFSCS"
          label="微信发送"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="DXZFSCS"
          label="短信发送"
          min-width="100">
        </el-table-column>
      </el-table-column>
      <el-table-column label="客户打开（次数）">
        <el-table-column
          prop="DJLCS"
          label="总打开"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="WXDJLCS"
          label="微信打开"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="DXDJLCS"
          label="短信打开"
          min-width="100">
        </el-table-column>
      </el-table-column>
      <el-table-column label="打开率（打开／发送％）">
        <el-table-column
          prop="ZDKL"
          label="总打开率"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="WXDKL"
          label="微信打开率"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="DXDKL"
          label="短信打开率"
          min-width="100">
        </el-table-column>
      </el-table-column>
    <!-- </el-table-column> -->
  </el-table>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      tableData3: [
        {
          formtitle: "个人名片",
          alwaysSend: 20,
          WeChatSend: 15,
          noteSend: 5,
          alwaysOpen: 15,
          WeChatOpen: 10,
          noteOpen: 5,
          alwaysOpenRate: "75.0%",
          WeChatOpenRate: "66.7%",
          noteOpenRate: "100.0%"
        }
      ],
      value6: "",
      startTime: "",
      endTime: ""
    };
  },
  created() {
    //			this.tableData3.push(...this.$store.getters.formList);
    //			console.log(this.value6)
    this.getData();
  },
  methods: {
    ...mapActions({
      formlist: "FORM_LIST"
    }),
    handleDelete(index, row) {
      //				console.log(index, row);
    },
    getData() {
      //				console.log(this.startTime)
      var saveList = new FormData();
      saveList.append("statime", this.startTime); //开始时间
      saveList.append("endtime", this.endTime); //结束时间
      this.formlist({
        saveList,
        successCallback: () => {
          this.tableData3 = this.$store.getters.formList;
        },
        failCallback: () => {}
      });
    },
    //			查询
    search() {
      let isNull = null;
      if (this.value6 != isNull) {
        //					console.log(this.value6)
        let startTimeOne = this.value6[0];
        let endTimeOne = this.value6[1];
        switch (this.value6) {
          case "":
            this.startTime = "";
            this.endTime = "";
            break;
          default:
            this.startTime = formatDate(startTimeOne, "yyyy-MM-dd hh:mm:ss");
            this.endTime = formatDate(endTimeOne, "yyyy-MM-dd hh:mm:ss");
            break;
        }
      } else {
        this.startTime = "";
        this.endTime = "";
      }

      this.getData(0);
    },
    selectData() {
      //			console.log(this.value6);
    }
  }
};
</script>

<style lang="scss" scoped="scoped">

</style>