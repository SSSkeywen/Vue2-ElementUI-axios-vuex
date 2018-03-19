<template>
    <div class="page">
      <div class="pager">
        <a class="firstPage" :class="{'disabled' : (pageNumber === firstPage)}" @click="pageArrGenerate(firstPage)">&#171;</a>
        <a class="prevPage" :class="{'disabled' : (pageNumber === firstPage)}" @click="pageArrGenerate(pageNumber - 1)">&lt;</a>
        <a class="page_num" :class="{'active' : (pageNumber === item)}" v-for="item in pageArr" @click="pageArrGenerate(item)">{{item + n}}</a>
        <a class="nextPage" :class="{'disabled' : (pageNumber === lastPage)}" @click="pageArrGenerate(pageNumber + 1)">&gt;</a>
        <a class="lastPage" :class="{'disabled' : (pageNumber === lastPage)}" @click="pageArrGenerate(lastPage)">&raquo;</a>
      </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        pageArr: [],
        pageNumber: 1
      }
    },
    props: {
      'propsPageNumber': {
        type: Number,
        default: 1
      },
      'offset': {
        type: Number,
        default: 2
      },
      'firstPage': {
        type: Number,
        default: 1
      },
      'lastPage': {
        type: Number,
        default: 1
      }
    },
    watch: {
      'lastPage': function (newValue, oldValue) {
        this.pageArrGenerate(this.pageNumber)
      },
      'propsPageNumber': function (newValue, oldValue) {
        if (newValue === this.firstPage) {
          this.pageNumber = this.firstPage
          this.pageArrGenerate(this.pageNumber)
        }
      }
    },
    methods: {
      pageArrGenerate (pageNumber) {
//    	console.log(pageNumber)
        this.pageNumber = pageNumber
        let arr = []
        // 检查总页码是否小于展示页数.
        if (this.showPages >= this.pageCount) {
          for (let i = this.firstPage; i < this.lastPage + 1; i++) {
            arr.push(i)
          }
        } else {
          // 先根据进入的页码数生成新的数组
          for (let i = (pageNumber - this.offset); i < (pageNumber + this.offset + 1); i++) {
            arr.push(i)
          }
          // 检查数组第一个是否比首页小, 如果小, 数组内每一个都加上差值
          let firstDifference = this.firstPage - arr[0]
          if (firstDifference > 0) {
            console.log('执行了首页检查')
            arr.forEach((num, key, arr) => {
              arr[key] = num + firstDifference
            })
          }
          // 检查数组第一个是否比末页大, 如果大, 数组内每一个都减去差值
          let lastDifference = arr[arr.length - 1] - this.lastPage
          if (lastDifference > 0) {
            console.log('执行了末页检查')
            arr.forEach((num, key, arr) => {
              arr[key] = num - lastDifference
            })
          }
        }
        this.pageArr = arr
//      console.log('page组件会导致最开始多发送一次请求')
//		alert(pageNumber)
        this.$emit('fetch', pageNumber)
      }
    },
    computed: {
      n () {
        // 在首页不为1的情况,调整显示数字
        return (1 - this.firstPage)
      },
      pageCount () {
        // 总页码数, 与lastPage不同, 只有firsPage为1的情况两者才相等
        return this.lastPage - (this.firstPage - 1)
      },
      showPages () {
        // 总显示格数
        return this.offset * 2 + 1
      }
    },
    created () {
      this.pageArrGenerate(this.firstPage)
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .page{
    margin-top: 20px;
    box-sizing: border-box;
    padding-right: 15px;
    width: 100%;
    text-align: right;
    .pager{
      font-size: 0;
      a{
        box-sizing: border-box;
        text-align: center;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        width: 34px;
        font-size: 11px;
        border: 1px solid #ddd;
        border-right: none;
        color: #333;
        cursor: pointer;
      }
      a:last-child{
        border-bottom-right-radius: 3px;
        border-top-right-radius: 3px;
        border-right: 1px solid #ddd;
      }
      a:first-child{
        border-bottom-left-radius: 3px;
        border-top-left-radius: 3px;
      }
      .active {
        pointer-events:none;
        background: #eee;
      }
      .disabled {
        pointer-events:none;
        visibility: hidden;
      }
    }
  }
</style>
