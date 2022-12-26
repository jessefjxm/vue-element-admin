<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>基本信息</span>
    </div>

    <div class="user-profile">
      <el-form ref="form" label-width="80px">
        <el-form-item label="序号"><span>{{ userInfo.id }}</span></el-form-item>
        <el-form-item label="用户"><span>{{ userInfo.name }}</span></el-form-item>
        <el-form-item label="工号"><span>{{ userInfo.jobId }}</span></el-form-item>
        <el-form-item label="所属中心"><span>{{ userInfo.dept }}</span></el-form-item>
        <el-form-item label="所属团队"><span>{{ userInfo.team }}</span></el-form-item>
        <el-form-item label="开发用途"><span>{{ userInfo.usage }}</span></el-form-item>
        <el-form-item label="电话号码"><span>{{ userInfo.p_num }}</span></el-form-item>
        <el-form-item label="权限">
          <el-radio-group v-model="roleResult" disabled>
            <el-radio label="无权限" />
            <el-radio label="管理员" />
            <el-radio label="开发者" />
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>

export default {
  props: {
    roleResult: {
      type: String,
      default: ''
    },
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.roleResult = this.userInfo.role === 1 ? '管理员' : this.userInfo.role === 2 ? '开发者' : '无权限'
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
