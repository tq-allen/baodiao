<template>
  <div class="welfare">土星福彩
    <el-dialog v-if="!storageName" title="昵称登记" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form>
        <el-form-item label="游戏昵称" label-width="100px">
          <el-input v-model="gameName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="sureName">确 定</el-button>
      </div>
    </el-dialog>
    <div class="welfare-con">
      <el-form>
        <el-form-item label="福彩竞猜" label-width="100px">
          <el-input :disabled="storageScore ? true : false" v-model="welfareScore"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" v-if="gameName || storageName" :disabled="storageScore ? true : false" @click="submit">下定离手</el-button>
          <el-button type="primary" v-else @click="dialogFormVisible=true">下定离手</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="manager-operate" v-if="storageName === 'kim'">
      <el-button @click="clearWelfareResult">清空上次福彩数据</el-button>
      <el-button @click="welfareResultVisible = true">输入福彩结果</el-button>
      <!-- <el-button @click="openLottery">开奖</el-button> -->
      <!-- <span v-if="lotteryNum">已设置抽奖人数：{{ sessionStorage.getItem('lotteryNum') }}</span> -->
    </div>
    <el-dialog
      title="输入福彩结果"
      :visible.sync="welfareResultVisible"
      width="30%">
      <el-input v-model="welfareResult" placeholder="请输入福彩结果"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="welfareResultVisible = false">取 消</el-button>
        <el-button type="primary" @click="openWelfare">开 奖</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AV from 'leancloud-storage'

export default {
  data () {
    return {
      dialogFormVisible: true,
      storageName: '',
      storageScore: '',
      gameName: '',
      welfareScore: '',
      welfareResultVisible: false,
      welfareResult: ''
    }
  },
  created () {
    this.storageName = sessionStorage.getItem('gameName') || ''
    this.storageScore = sessionStorage.getItem('welfareScore') || ''
    this.welfareScore = this.storageScore || ''
  },
  methods: {
    sureName () {
      if (this.gameName === '') {
        this.$message.error('请输入游戏昵称或部落外号，例如‘赵金鑫’可输入‘小金’，部落成员可辨别即可')
        return
      }
      // this.createUserTab(this.gameName, '')
      // this.createMsgListTab()
      // this.createIdTab()
      sessionStorage.setItem('gameName', this.gameName)
      this.storageName = sessionStorage.getItem('gameName') || ''
      this.dialogFormVisible = false
    },
    submit () {
      if (this.welfareScore === '') {
        this.$message.warning('竞猜结果不能为空')
        return false
      }
      // this.updateLastMsg(this.msg)
      // this.msgListTemp.push(this.msg)
      sessionStorage.setItem('welfareScore', this.welfareScore)
      this.updateWelfare(this.welfareScore)
    },
    updateWelfare (score) {
      // let msgList = AV.Object.createWithoutData('MsgList', '5bbb05d9fb4ffe00693477c3')
      // // 修改属性
      // let arr = []
      // arr.push(sessionStorage.getItem('gameName') + ':' + msg)
      // msgList.set('msg', arr)
      // // 保存到云端
      // msgList.save()
      let scoreTempList
      let query = new AV.Query('Welfare')
      query.get('5bc0ba530b6160006fb34ac1').then(scoreItem => {
        // 成功获得实例
        // todo 就是 id 为 558e20cbe4b060308e3eb36c 的 Todo 对象实例
        scoreTempList = scoreItem.get('score')
        // console.log('msgTempList1', msgTempList)

        scoreTempList.push(sessionStorage.getItem('gameName') + ':' + score)
        // console.log('msgTempList2', msgTempList)
        // debugger
        // this.msgList = msgTempList
        // console.log('this.msgList ', this.msgList)
        var welfareList = AV.Object.createWithoutData('Welfare', '5bc0ba530b6160006fb34ac1')
        // 修改属性
        welfareList.set('score', scoreTempList)
        // 保存到云端
        welfareList.save()
      }, function (error) {
        // 异常处理
        console.error(error)
      })
    },
    clearWelfareResult () {
      this.$confirm('确定清除上次福彩数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var welfareList = AV.Object.createWithoutData('Welfare', '5bc0ba530b6160006fb34ac1')
        // 修改属性
        welfareList.set('score', [])
        // 保存到云端
        welfareList.save().then(res => {
          this.$message.success('清除成功')
        })
      }).catch(() => {
        this.$message.error('清除失败')
      })
    },
    openWelfare () {
      this.$message.info('功能待完善')
      // let scoreList = this.getScoreList()
      // console.log('scoreList', scoreList)
    },
    async getScoreList () {
      console.log(1)
      let query = new AV.Query('Welfare')
      console.log(2)
      let scoreList = []
      console.log(3)
      scoreList = await query.get('5bc0ba530b6160006fb34ac1').then(scoreItem => {
        console.log(4)
        scoreList = scoreItem.get('score')
        console.log(5)
        return scoreList
      })
    }
  }
}
</script>

<style lang="less">
.welfare{
  background: #f7f7f7;
  padding: 20px;
  .welfare-con{
    width: 500px;
    margin: 20px auto;
  }
}

</style>
