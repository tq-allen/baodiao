<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/calc">宝屌赔率计算</el-menu-item>
      <el-menu-item index="/msgLottery">留言抽奖</el-menu-item>
      <el-menu-item index="/stWelfare">土星福彩</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '/'
    }
  },
  created () {
    this.activeIndex = this.$route.path
  },
  methods: {

  }
}
</script>

<style lang="less">

</style>
