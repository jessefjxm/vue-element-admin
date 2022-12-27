<template>
  <div class="tab-container">

    <el-table class="table" :data="list" style="width: 100%">
      <el-table-column width="60" prop="id" label="序号" />
      <el-table-column prop="name" label="申请人" />
      <el-table-column prop="jobId" label="工号" />
      <el-table-column prop="dept" label="所属中心" />
      <el-table-column prop="team" label="所属团队" />
      <el-table-column prop="purpose" label="开发小程序用途" />
      <el-table-column prop="p_num" label="电话号码" />
      <el-table-column width="70" label="权限">
        <template slot-scope="scope">
          <span v-if="scope.row.role===1" style="color: #ff1c17">管理员</span>
          <span v-else-if="scope.row.role===2">开发者</span>
          <span v-else style="color: #61d02f">无权限</span>
        </template>
      </el-table-column>

      <el-table-column width="80" label="审核状态">
        <template slot-scope="scope">
          <span v-if="scope.row.auditStatus===0">尚未申请</span>
          <span v-else-if="scope.row.auditStatus===1" style="color: #c8cd2f">等待审核</span>
          <span v-else-if="scope.row.auditStatus===3" style="color: #dc1c17">审核失败</span>
          <span v-else style="color: #61d02f">审核成功</span>
        </template>
      </el-table-column>

      <el-table-column width="150" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.auditStatus===1" type="primary" @click="audit(scope.row)">审核</el-button>
          <el-button v-else @click="modify(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="开发者信息" :visible.sync="dialogVisible" width="30%" center>
      <el-form ref="form" label-width="80px">
        <el-form-item label="序号">
          <span>{{ userInfo.id }}</span>
        </el-form-item>
        <el-form-item label="申请人">
          <el-input v-if="modifyMode" v-model="userInfo.name" placeholder="请输入内容" />
          <span v-if="!modifyMode">{{ userInfo.name }}</span>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-if="modifyMode" v-model="userInfo.jobId" placeholder="请输入内容" />
          <span v-if="!modifyMode">{{ userInfo.jobId }}</span>
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
          <el-input v-if="modifyMode" v-model="userInfo.purpose" placeholder="请输入内容" />
          <span v-if="!modifyMode">{{ userInfo.purpose }}</span>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-if="modifyMode" v-model="userInfo.p_num" placeholder="请输入内容" />
          <span v-if="!modifyMode">{{ userInfo.p_num }}</span>
        </el-form-item>
        <el-form-item label="权限">
          <el-radio-group v-model="roleResult" :disabled="!modifyMode">
            <el-radio label="无权限" />
            <el-radio label="管理员" />
            <el-radio label="开发者" />
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="auditMode" label="审批意见">
          <el-radio-group v-model="auditResult">
            <el-radio label="通过" />
            <el-radio label="拒绝" />
          </el-radio-group>
          <el-input v-model="auditReason" type="textarea" :rows="2" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item v-if="!auditMode" label="审批意见">
          <span>{{ userInfo.auditReason }}</span>
        </el-form-item>

        <el-form-item>
          <el-button v-if="auditMode" type="primary" @click="auditConfirm">确认审批</el-button>
          <el-button v-if="modifyMode" type="primary" @click="modifyConfirm">确认编辑</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { getAllUserInfo, updateDeveloperInfo } from '@/api/audit'

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

      // 用于提供默认值
      roleResult: '无权限',
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
        this.list.sort((a, b) => a.id - b.id)
        this.loading = false
      })
    },
    modify(data) {
      this.userInfo = data

      const role = this.userInfo.role
      this.roleResult = role === 1 ? '管理员' : role === 2 ? '开发者' : '无权限'

      this.auditMode = false
      this.modifyMode = true
      this.dialogVisible = true
    },
    audit(data) {
      this.userInfo = data

      this.auditMode = true
      this.modifyMode = false
      this.dialogVisible = true
    },
    auditConfirm(data) {
      data.auditStatus = this.auditResult === '通过' ? 2 : 3 // 审核状态，1=审核中，2=审核通过，3=审核失败
      data.auditReason = this.auditReason

      updateDeveloperInfo(data).then(response => {
        this.dialogVisible = false
        this.$message({
          message: response.message,
          type: response.status === 200 ? 'success' : 'error'
        })
        this.getList()
      })

      this.auditMode = false
    },
    modifyConfirm(data) {
      const role = this.roleResult.role
      this.roleResult = role === 1 ? '管理员' : role === 2 ? '开发者' : '无权限'

      updateDeveloperInfo(data).then(response => {
        this.dialogVisible = false
        this.$message({
          message: response.message,
          type: response.status === 200 ? 'success' : 'error'
        })
        this.getList()
      })

      this.modifyMode = false
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
