<template>
  <div class="tab-container">

    <el-table class="table" :data="list" style="width: 100%">
      <el-table-column prop="frontendId" label="编号" />
      <el-table-column prop="displayname" label="名称" />
      <el-table-column prop="detail" label="详情" />
      <el-table-column prop="developer" label="开发者" />
      <el-table-column prop="appid" label="APP ID" />
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTimestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="techcode" label="钛易码" />
      <el-table-column width="150" label="操作">
        <template slot-scope="scope">
          <el-button @click="view(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="小程序信息" :visible.sync="dialogVisible" width="30%" center>
      <el-form ref="form" label-width="80px">
        <el-form-item label="编号">
          <span v-if="!modifyMode">{{ appInfo.frontendId }}</span>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-if="modifyMode" v-model="appInfo.displayname" placeholder="请输入内容" />
          <span v-if="!modifyMode">{{ appInfo.displayname }}</span>
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-if="modifyMode" v-model="appInfo.detail" placeholder="请输入内容" />
          <span v-if="!modifyMode">{{ appInfo.detail }}</span>
        </el-form-item>
        <el-form-item label="开发者">
          <el-input v-if="modifyMode" v-model="appInfo.developer" placeholder="请输入内容" />
          <span v-if="!modifyMode">{{ appInfo.developer }}</span>
        </el-form-item>
        <el-form-item label="APP ID">
          <el-input v-if="modifyMode" v-model="appInfo.appid" placeholder="请输入内容" />
          <span v-if="!modifyMode">{{ appInfo.appid }}</span>
        </el-form-item>
        <el-form-item label="创建时间">
          <span>{{ appInfo.createTimestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </el-form-item>
        <el-form-item label="钛易码">
          <el-input v-if="modifyMode" v-model="appInfo.techcode" placeholder="请输入内容" />
          <span v-if="!modifyMode">{{ appInfo.techcode }}</span>
        </el-form-item>

        <el-form-item>
          <el-button v-if="modifyMode" type="primary" @click="modifyConfirm">确认编辑</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { getAllAppInfo } from '@/api/audit'

export default {
  name: 'App',
  data() {
    return {
      list: null,
      loading: false,

      dialogVisible: false,
      appInfo: {},
      modifyMode: false
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
      getAllAppInfo().then(response => {
        this.list = response.data
        this.loading = false
      })
    },
    view(data) {
      this.appInfo = data
      this.dialogVisible = true
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
