<template>
	<div>
		<div class="of-select">
			<span>选择时间：</span>
			<el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
			</el-date-picker>
			<el-button type="primary" class="btn_select" @click="load()">报表下载</el-button>
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
    // this.getData();
  },
  methods: {
    ...mapActions({
      formlist: "FORM_LIST",
      dwonForm: "DWON_FORM"
    }),
    load() {
      let isNull = null;
      if (this.value6 != isNull) {
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
      console.log(this.startTime + "+" + this.endTime);
      var dwonData = new FormData();
      dwonData.append("statime", this.startTime); //开始时间
      dwonData.append("endtime", this.endTime); //结束时间
      this.dwonForm({
        dwonData,
        successCallback: (resultData) => {
          window.open(resultData)
          this.$message.success('报表下载成功');
        },
        failCallback: () => {
          this.$message.error('报表下载失败');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped="scoped">

</style>