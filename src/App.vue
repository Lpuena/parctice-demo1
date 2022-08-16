<template>
  <div class="app-container">
    <div class="header-box">
      <div class="header-box-top">
        <p>查询条件</p>
      </div>
      <div class="header-box-bottom">
        <el-form :inline="true" :model="formInline2" class="demo-form-inline from-css">
            <el-form-item label="名称"  class="form-item-css">
              <el-input v-model="formInline2.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="类型" class="form-item-css">
              <el-select v-model="formInline2.type" placeholder="请选择类型" @change="aaa">
                <el-option label="软件" value="1"></el-option>
                <el-option label="硬件" value="2"></el-option>
                <el-option label="集成" value="3"></el-option>
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
          <el-button plain  @click="dialogVisible = true">新增</el-button>
        </el-col>
          <el-dialog
            title="新增合同"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">
            <!-- <span>这是一段信息</span> -->
            <!-- <el-row> -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline from-css"  label-width="60px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="名称"  class="form-item-css">
                    <el-input v-model="formInline.name" placeholder="请输入名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="类型" class="form-item-css">
                    <el-select v-model="formInline.type" placeholder="请选择类型" @change="aaa">
                      <el-option label="软件" value="1"></el-option>
                      <el-option label="硬件" value="2"></el-option>
                      <el-option label="集成" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item  label="成本"  class="form-item-css">
                    <el-input v-model="formInline.cost" placeholder="请输入成本" @blur="createPrice"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item  label="利润率"  class="form-item-css">
                    <el-input v-model="formInline.profitMargin" placeholder="请输入利润率" @blur="createPrice"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col >
                  <el-form-item  label="报价"  class="form-item-css" >
                  <el-input v-model="formInline.price" placeholder="无需输入，报价自动生成" disabled></el-input>
                </el-form-item>
                </el-col>
                <!-- <el-col :span="4">
                  <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                </el-col> -->
              </el-row>
              </el-form>

            <!-- </el-row> -->
            <span slot="footer" class="dialog-footer">
              <!-- <el-button @click="cancel">取 消</el-button> -->
              <el-button type="primary"  @click="save">确 定</el-button>
            </span>
          </el-dialog>

        <el-col :span="3">
          <!-- <el-input v-model="input" placeholder="请输入ID,回车进行搜索" @keydown.enter.native="searchById(input)"></el-input> -->
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
                    @click.native.prevent="handleRow(scope.row.id)"
                    type="text"
                    size="small">
                    编辑
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
    this.getTableData(this.formInline)
  },

  data() {
    return {
      dialogVisible: false,
      input: '',
      currentPage: 1,
      pageSize: 10,
      formInline: {
        id: '',
        name: '',
        type: '',
        cost: '',
        profitMargin: '',
        price: ''
      },
      formInline2: {
        id: '',
        name: '',
        type: '',
        cost: '',
        profitMargin: '',
        price: ''
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
    },
    quotePrice() {
      return Number(this.formInline.cost) + Number(this.formInline.cost) * Number(this.formInline.profitMargin)
    }
  },
  methods: {
    // dialog 界面关闭功能
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          Object.keys(this.formInline).forEach(x => { this.formInline[x] = '' })
        })
        .catch(_ => {})
    },
    aaa() {
      console.log(this.formInline)
    },
    // 批量获取合同信息
    async getTableData(formInline) {
      const { data: res } = await this.$http.post('/purchase/offer/query.do', (formInline))
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
    // 时间进行转换
    changeTime() {
      this.tableData.forEach(x => {
        x.signTime = this.timeConersion(x.signTime)
      })
    },
    // 通过id来进行搜索
    async searchById(id) {
      const { data: res } = await this.$http.get('/purchase/offer/getById.do?id=' + id)
      console.log(res)
      console.log(res.data[0].id)
      this.formInline = res.data[0]
      // this.input = ''
      // this.tableData = res.data
      // this.changeType()
      // this.changeTime()
    },
    // async getTableData() {
    //   const { res } = await this.$http.get('/purchase/offer/getById.do?id=' + this.id)
    //   console.log(res)
    // },
    // 按条件进行查询
    onSubmit() {
      console.log('submit!')
      // console.log(this.formInline.name)
      // console.log(this.formInline.type)
      this.getTableData(this.formInline2)
      this.formInline2.name = ''
      this.formInline2.type = ''
    },
    // 生成报价的价格
    createPrice() {
      if (this.formInline.profitMargin) {
        this.formInline.price = this.quotePrice
      }

      // console.log(this.quotePrice)
    },
    handleRow(id) {
      // rows.splice(index, 1)
      this.dialogVisible = true
      console.log(id)
      this.searchById(id)
      // console.log(rows)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    cancel() {
      this.dialogVisible = false
      Object.keys(this.formInline).forEach(x => { this.formInline[x] = '' })
    },
    // 保存合同信息
    save() {
      this.dialogVisible = false
      if (this.formInline.id === '') {
        this.formInline.id = -1
      }
      console.log(this.formInline)
      this.saveMessage(this.formInline)
      Object.keys(this.formInline).forEach(x => { this.formInline[x] = '' })
      this.getTableData(this.formInline)
    },
    // 调用接口发送要保存的信息
    async saveMessage(formInline) {
      const { data: res } = await this.$http.post('/purchase/offer/save.do', (formInline))
      console.log(res)
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
    margin: 20px 20px;
    .mid-content {
    border: 1px solid #dbdde0;
    border-radius: 4px;
    }
  }
}
</style>
