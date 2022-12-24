<template>
  <div class="tab-container">

    <el-table class="table" :data="list" style="width: 100%">
      <el-table-column prop="name" label="申请人" />
      <el-table-column prop="dept" label="所属中心" />
      <el-table-column prop="team" label="所属团队" />
      <el-table-column prop="usage" label="开发小程序用途" />
      <el-table-column label="申请时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="工号" />
      <el-table-column label="申请状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status===0">尚未申请</span>
          <span v-else-if="scope.row.status===1" style="color: #c8cd2f">等待审核</span>
          <span v-else-if="scope.row.status===3" style="color: #dc1c17">审核失败</span>
          <span v-else style="color: #61d02f">审核成功</span>
        </template>
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status===1" type="primary" @click="audit(scope.row)">审核</el-button>
          <el-button v-else @click="view(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="开发者信息" :visible.sync="dialogVisible" width="30%" center>
      <el-form ref="form" label-width="80px">
        <el-form-item label="申请人">
          <span v-if="!modifyMode">{{ userInfo.name }}</span>
        </el-form-item>
        <el-form-item label="所属中心">
          <el-input v-if="modifyMode" v-model="userInfo.dept" placeholder="请输入内容" />
          <span v-if="!modifyMode">{{ userInfo.dept }}</span>
        </el-form-item>
        <el-form-item label="所属团队">
          <el-input v-if="modifyMode" v-model="userInfo.team" placeholder="请输入内容" />
          <span v-if="!modifyMode">{{ userInfo.team }}</span>
        </el-form-item>
        <el-form-item label="开发用途">
          <el-input v-if="modifyMode" v-model="userInfo.usage" placeholder="请输入内容" />
          <span v-if="!modifyMode">{{ userInfo.usage }}</span>
        </el-form-item>
        <el-form-item label="申请时间">
          <span>{{ userInfo.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-if="modifyMode" v-model="userInfo.id" placeholder="请输入内容" />
          <span v-if="!modifyMode">{{ userInfo.id }}</span>
        </el-form-item>

        <el-form-item v-if="auditMode" label="审批意见">
          <el-radio-group v-model="auditResult">
            <el-radio label="通过" />
            <el-radio label="拒绝" />
          </el-radio-group>
          <el-input v-model="auditReason" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>

        <el-form-item>
          <el-button v-if="auditMode" type="primary" @click="auditConfirm">确认审批</el-button>
          <el-button v-else-if="modifyMode" type="primary" @click="modifyConfirm">确认编辑</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { getAllUserInfo, auditDeveloper } from '@/api/audit'

export default {
  name: 'Dev',
  data() {
    return {
      list: null,
      loading: false,

      dialogVisible: false,
      userInfo: {},
      modifyMode: false,
      auditMode: false,

      auditResult: '通过',
      auditReason: '通过'
    }
  },
  watch: {},
  created() {
    this.getList()
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  methods: {
    getList() {
      this.loading = true
      getAllUserInfo().then(response => {
        this.list = response.data
        this.loading = false
      })
    },
    view(data) {
      this.userInfo = data
      this.dialogVisible = true
      this.auditMode = false
    },
    audit(data) {
      this.userInfo = data
      this.dialogVisible = true
      this.auditMode = true
    },
    auditConfirm(data) {
      // 添加审批意见
      data.auditReason = this.auditReason
      auditDeveloper(data).then(response => {
        this.dialogVisible = false
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.getList()
      })
    }
  }
}
</script>

<style scoped>
.tab-container {
  margin: 30px;
}

.table {
  border-radius: 15px;
}
</style>
