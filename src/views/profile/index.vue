<template>
  <div class="app-container">
    <el-row :gutter="20">

      <el-col :span="6" :xs="24">
        <user-card :user-info="userInfo" />
      </el-col>

    </el-row>
  </div>
</template>

<script>
import UserCard from './components/UserCard'

export default {
  name: 'Profile',
  components: { UserCard },
  data() {
    return {
      userInfo: {},
      activeTab: 'activity'
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.userInfo = this.$store.getters.userInfo
    }
  }
}
</script>
