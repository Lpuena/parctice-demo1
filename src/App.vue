<template>
  <div class="app-container">
    <div class="header-box">
      <div class="header-box-top">
        <p>查询条件</p>
      </div>
      <div class="header-box-bottom">
        <el-form :inline="true" :model="formInline" class="demo-form-inline from-css">
            <el-form-item label="名称"  class="form-item-css">
              <el-input v-model="formInline.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="类型" class="form-item-css">
              <el-select v-model="formInline.type" placeholder="类型">
                <el-option label="软件" value="Software"></el-option>
                <el-option label="硬件" value="Hardware"></el-option>
                <el-option label="集成" value="integrate"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
      </div>
    </div>

    <div class="mid">
      <el-row class="marginBottom">
        <el-col :span="21">
          <el-button plain >添加</el-button>
        </el-col>
        <el-col :span="3">
          <el-input v-model="input" placeholder="请输入ID,回车进行搜索" @keydown.enter.native="searchById(input)"></el-input>
        </el-col>
      </el-row>
      <div class="mid-content">
        <el-row>
          <el-col>
            <el-table
              :data="tableData.slice((currentPage-1) * pageSize , currentPage * pageSize)"
              stripe
              style="width: 100%">
              <el-table-column
                prop="signTime"
                label="日期">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称">
              </el-table-column>
              <el-table-column
                prop="type"
                label="类型">
              </el-table-column>
              <el-table-column
                prop="cost"
                label="成本">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <div class="block">
        <!-- <span class="demonstration">显示总数</span> -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="this.tableData.length">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  created() {
    this.getTableData()
  },

  data() {
    return {
      input: '',
      currentPage: 1,
      pageSize: 10,
      formInline: {
        name: '',
        type: ''
      },
      tableData: [],
      id: 1
    }
  },
  computed: {
    timeConersion() {
      /* 时间戳转换 */
      return function(item) {
        const date = new Date(parseInt(item)) // 如果是10位，这里需要*1000，如果是13位则不需要*1000
        const y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        return y + '-' + m + '-' + d
      }
    }
  },
  methods: {
    // 批量获取合同信息
    async getTableData() {
      const { data: res } = await this.$http.post('/purchase/offer/query.do', {})
      console.log(res)
      this.tableData = res.data
      this.changeType()
      this.changeTime()
    },
    // 遍历，将类型变成对应文字
    changeType() {
      this.tableData.forEach(x => {
        if (x.type === '1') {
          x.type = '软件'
        }
        if (x.type === '2') {
          x.type = '硬件'
        }
        if (x.type === '3') {
          x.type = '集成'
        }
      })
    },
    changeTime() {
      this.tableData.forEach(x => {
        x.signTime = this.timeConersion(x.signTime)
      })
    },
    // 通过id来进行搜索
    async searchById(id) {
      const { data: res } = await this.$http.get('/purchase/offer/getById.do?id=' + id)
      console.log(res)
      this.input = ''
      this.tableData = res.data
      this.changeType()
      this.changeTime()
    },
    // async getTableData() {
    //   const { res } = await this.$http.get('/purchase/offer/getById.do?id=' + this.id)
    //   console.log(res)
    // },
    onSubmit() {
      console.log('submit!')
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss">
html,body {
  margin: 0;
  padding: 0;
}
.marginBottom {
  margin-bottom: 10px;
  // display: flex;
  // justify-content: space-between;
}
.app-container {
  margin-top: 10px;
  .header-box{
    margin: 10px 20px;
    border: 1px solid #dbdde0;
    border-radius: 4px;

    .header-box-top {
      border-bottom: 1px solid #dbdde0;
      background-color: #eff0f3;
      padding: 5px 0;
      p {
        font-size: 14px;
        margin-left: 40px;
      }
    }
    .header-box-bottom {
      padding: 20px 20px;
    }
    .from-css {
      margin-top: 10px;
    }
    .form-item-css{
      margin-right: 200px;
    }
  }

  .mid {
    margin: 30px 20px;
    .mid-content {
    border: 1px solid #dbdde0;
    border-radius: 4px;
    }
  }
}
</style>
