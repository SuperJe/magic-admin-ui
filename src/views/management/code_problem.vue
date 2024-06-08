<template>
  <div class="table-container">
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="title" label="标题" width="180">
        <template slot-scope="scope">
          <div class="text-ellipsis">{{ truncateText(scope.row.title) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="detail" label="描述" width="180">
        <template slot-scope="scope">
          <div class="text-ellipsis">{{ truncateText(scope.row.detail) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="p_id" label="编号" width="100">
        <template slot-scope="scope">
          <div class="text-ellipsis">{{ scope.row.p_id }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="example_input" label="输入样例" width="180">
        <template slot-scope="scope">
          <div class="text-ellipsis">{{ truncateText(scope.row.example_input) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="example_output" label="输出样例" width="180">
        <template slot-scope="scope">
          <div class="text-ellipsis">{{ truncateText(scope.row.example_output) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="tag" label="标签" width="180">
        <template slot-scope="scope">
          <div class="text-ellipsis">{{ truncateText(scope.row.tag) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="分数" width="100">
        <template slot-scope="scope">
          <div class="text-ellipsis">{{ scope.row.score }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="openDialog(scope.row)">查看/修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 弹窗 -->
    <el-dialog class="popup" title="查看/修改数据" :visible.sync="dialogVisible" width="50%">
      <el-form :model="currentRow">
        <el-form-item label="标题">
          <el-input v-model="currentRow.title" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="currentRow.detail" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="currentRow.p_id" type="number" />
        </el-form-item>
        <el-form-item label="输入样例">
          <el-input v-model="currentRow.example_input" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="输出样例">
          <el-input v-model="currentRow.example_output" type="textarea" />
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="currentRow.tag" />
        </el-form-item>
        <el-form-item label="分数">
          <el-input v-model="currentRow.score" type="number" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCodePromble, updateCodeProblem } from '@/api/admin/management'

export default {
  data() {
    return {
      tableData: [],
      hasMore: true,
      isReverse: false,
      minId: 0,
      maxId: 0,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      dialogVisible: false,
      currentRow: {
        id: 0, // 隐藏在表格中的id字段
        title: '',
        detail: '',
        p_id: 0,
        example_input: '',
        example_output: '',
        score: 0,
        tag: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      var offset = this.maxId
      if (this.isReverse === true) {
        offset = this.minId
      }
      getCodePromble(offset, this.pageSize, this.isReverse).then(response => {
        this.tableData = response.data.problems
        this.total = response.data.total
        this.hasMore = response.data.has_more
        // 找到最小和最大的id
        if (this.tableData.length > 0) {
          const ids = this.tableData.map(item => item.id)
          this.minId = Math.min(...ids)
          this.maxId = Math.max(...ids)
        }
      }).catch(error => {
        console.error('Failed to fetch data:', error)
      })
    },
    handleCurrentChange(page) {
      this.isReverse = page < this.currentPage
      this.currentPage = page
      this.fetchData()
    },
    truncateText(text) {
      return text.length > 100 ? text.slice(0, 100) + '...' : text
    },
    openDialog(row) {
      this.currentRow = { ...row }
      this.dialogVisible = true
    },
    submitEdit() {
      this.currentRow.p_id = Number(this.currentRow.p_id)
      this.currentRow.score = Number(this.currentRow.score)
      console.log('Modified data:', JSON.stringify(this.currentRow))
      updateCodeProblem(JSON.stringify(this.currentRow)).then(response => {
        console.log('response:', response)
      })
      this.dialogVisible = false
    }
  }
}
</script>

<style>
.table-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.el-table {
  flex: 1;
  overflow: auto;
  border-radius: 8px;
  background-color: #ffffff;
}

.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.el-pagination {
  display: inline-block;
  font-size: 18px;
}

.el-pagination .el-pager li:not(.disabled) {
  cursor: pointer;
}

.el-pagination .el-pager li {
  margin: 0 5px;
}

.el-pagination .el-pager li:hover {
  color: #409EFF;
}

.el-table th {
  background-color: #fafafa;
  color: #333;
  font-weight: bold;
  text-align: center;
}

.el-table td {
  text-align: center;
}

.el-table .cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  white-space: pre-wrap;
}

.dialog-footer {
  text-align: right;
}

.el-form-item__label {
  width: 120px;
  text-align: right;
}
</style>

