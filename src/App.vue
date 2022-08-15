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
        <el-button plain>添加</el-button>
      </el-row>
      <div class="mid-content">
        <el-row>
          <el-col>
            <el-table
              :data="tableData"
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
      formInline: {
        name: '',
        type: ''
      },
      tableData: [],
      id: 1
    }
  },
  methods: {
    async getTableData() {
      const { data: res } = await this.$http.post('/purchase/offer/query.do', {})
      console.log(res)
      this.tableData = res.data
      this.changeType()
    },
    // 遍历
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
    // async getTableData() {
    //   const { res } = await this.$http.get('/purchase/offer/getById.do?id=' + this.id)
    //   console.log(res)
    // },
    onSubmit() {
      console.log('submit!')
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
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
    margin: 30px 20px;
    .mid-content {
    border: 1px solid #dbdde0;
    border-radius: 4px;
    }
  }
}
</style>
