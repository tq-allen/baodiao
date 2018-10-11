<template>
  <div class="lottery">
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

    <div class="scroll-msg">
      <h2>留言滚动</h2>
      <div class="scroll-msg-list" ref="msgList">
        <ul>
          <li v-for="(item,index) in msgList" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>

    <div class="msg-con">
      <el-form>
        <el-form-item label="留言内容" label-width="100px">
          <el-input type="textarea" v-model="msg"></el-input>
        </el-form-item>
        <el-form-item label-width="100px">
          <el-button type="primary" v-if="gameName || storageName" @click="submit">发 送</el-button>
          <el-button type="primary" v-else @click="dialogFormVisible=true">发 送</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="manager-operate" v-if="storageName === 'kim'">
      <el-button @click="clearMsg">清空上次留言数据</el-button>
      <el-button @click="lotteryNumVisible = true">设置抽奖人数</el-button>
      <el-button @click="openLottery">开奖</el-button>
      <!-- <span v-if="lotteryNum">已设置抽奖人数：{{ sessionStorage.getItem('lotteryNum') }}</span> -->
    </div>

    <el-dialog
      title="设置抽奖人数"
      :visible.sync="lotteryNumVisible"
      width="30%">
      <el-input v-model="lotteryNum" placeholder="请输入抽奖人数"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lotteryNumVisible = false">取 消</el-button>
        <el-button type="primary" @click="setNum">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="抽奖结果"
      :visible.sync="openLotteryVisible"
      width="30%">
      <ul class="lottery-result">
        <li v-for="item in lotteryList" :key="item">{{ item }}</li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
// import { mapMutations, mapGetters } from 'vuex'
import AV from 'leancloud-storage'

// var AV = require('leancloud-storage')
// var { Query, User } = AV

// resume
// var APP_ID = 'kyKMoozLySLg9nQ2YMyy9f0f-gzGzoHsz'
// var APP_KEY = 'dWeRzngKzg4Y7ES2gjO4UP7f'

// 土星
var APP_ID = '8kL7y1U5CesO2fMVGqJ4yTgD-gzGzoHsz'
var APP_KEY = 's53171WJnBbigHnVg8c7Dn0a'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

// user

// id
// var UserId = AV.Object.extend('UserId')
// var userId = new UserId()

// msgList
// var MsgList = AV.Object.extend('MsgList')
// var msgList1 = new MsgList()

export default {
  data () {
    return {
      dialogFormVisible: true,
      storageName: '',
      gameName: '',
      msg: '',
      msgListTemp: [],
      msgList: [],
      msgListId: null,
      // ObjectId: '',
      idList: [],
      lotteryNumVisible: false,
      lotteryNum: null,
      openLotteryVisible: false,
      lotteryList: []
      // idListO: {},
      // userIdId: null
    }
  },
  created () {
    this.storageName = sessionStorage.getItem('gameName') || ''
  },
  computed: {
    // ...mapGetters([
    //   'msgList'
    // ])
  },
  methods: {
    // ...mapMutations([
    //   'setMsg'
    // ]),
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
      if (this.msg === '') {
        this.$message.warning('留言不能为空')
        return false
      }
      // this.updateLastMsg(this.msg)
      // this.msgListTemp.push(this.msg)
      this.updateMsgListTab(this.msg)
      // console.log('this.idList', this.idList)
      // this.updateIdTab(this.idListO)
      // this.createIdTab(this.msg)
      this.msg = ''
    },
    // 创建user表
    // createUserTab (gameName) {
    //   var UserInfo = AV.Object.extend('UserInfo')
    //   var userInfo = new UserInfo()
    //   // 设置昵称
    //   userInfo.set('gameName', [])
    //   userInfo.save().then(function (item) {
    //     sessionStorage.setItem('ObjectId', item.id)
    //     this.idList.push(item.id)
    //   }, function (error) {
    //     console.error(error)
    //   })
    // },
    // 更新user表
    // updateUserTab (gameName) {
    //   var UserInfo = AV.Object.extend('UserInfo')
    //   var userInfo = new UserInfo()
    //   // 设置昵称
    //   userInfo.set('gameName', [])
    //   userInfo.save().then(function (item) {
    //     sessionStorage.setItem('ObjectId', item.id)
    //     this.idList.push(item.id)
    //   }, function (error) {
    //     console.error(error)
    //   })
    // },
    // 更新最后一次留言
    // updateLastMsg (msg) {
    //   console.log('thsi.objectId', this.objectId)
    //   var userInfo = AV.Object.createWithoutData('UserInfo', sessionStorage.getItem('ObjectId'))
    //   // 修改属性
    //   userInfo.set('msg', msg)
    //   // 保存到云端
    //   userInfo.save()
    // },
    // 创建 msgList
    // createMsgListTab () {
    //   var MsgList = AV.Object.extend('MsgList')
    //   var msgList1 = new MsgList()
    //   msgList1.set('msg', [])
    //   msgList1.save().then(function (item) {
    //     // console.log('msgListId objectId is ' + item.id)
    //     // console.log('msgListId objectId is ' + typeof (item.id))
    //     // this.msgListId = item.id
    //     sessionStorage.setItem('msgListId', item.id)
    //   }, function (error) {
    //     console.error(error)
    //   })
    // },
    // 更新 msgList
    updateMsgListTab (msg) {
      // let msgList = AV.Object.createWithoutData('MsgList', '5bbb05d9fb4ffe00693477c3')
      // // 修改属性
      // let arr = []
      // arr.push(sessionStorage.getItem('gameName') + ':' + msg)
      // msgList.set('msg', arr)
      // // 保存到云端
      // msgList.save()
      let msgTempList
      let query = new AV.Query('MsgList')
      query.get('5bbb05d9fb4ffe00693477c3').then(msgListItem => {
        // 成功获得实例
        // todo 就是 id 为 558e20cbe4b060308e3eb36c 的 Todo 对象实例
        msgTempList = msgListItem.get('msg')
        console.log('msgTempList1', msgTempList)

        msgTempList.push(sessionStorage.getItem('gameName') + ':' + msg)
        console.log('msgTempList2', msgTempList)
        // debugger
        // this.msgList = msgTempList
        // console.log('this.msgList ', this.msgList)
        var msgList1 = AV.Object.createWithoutData('MsgList', '5bbb05d9fb4ffe00693477c3')
        // 修改属性
        msgList1.set('msg', msgTempList)
        // 保存到云端
        msgList1.save()

        query.get('5bbb05d9fb4ffe00693477c3').then(msgListItem2 => {
          this.msgList = msgListItem2.get('msg')
        })
      }, function (error) {
        // 异常处理
        console.error(error)
      })
    },
    // 创建userid
    // createIdTab () {
    //   userId.set('id', null)
    //   userId.save().then(function (item) {
    //     console.log('objectId is ' + item.id)
    //     this.userIdId = item.id
    //   }, function (error) {
    //     console.error(error)
    //   })
    // },
    // 更新userid
    // updateIdTab (id) {
    //   console.log('id', id)
    //   var userId = AV.Object.createWithoutData('UserId', this.userIdId)
    //   // 修改属性
    //   userId.set('id', id)
    //   // 保存到云端
    //   userId.save()
    // }
    clearMsg () {
      this.$confirm('确定清除上次留言吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var msgList1 = AV.Object.createWithoutData('MsgList', '5bbb05d9fb4ffe00693477c3')
        // 修改属性
        msgList1.set('msg', [])
        // 保存到云端
        msgList1.save().then(res => {
          this.$message.success('清除成功')
        })
      }).catch(() => {
        this.$message.error('清除失败')
      })
    },
    setNum () {
      this.lotteryNumVisible = false
    },
    openLottery () {
      if (!this.lotteryNum) {
        this.$message.warning('请先设置抽奖人数')
        return false
      }
      this.lotteryList = []
      let query = new AV.Query('MsgList')
      query.get('5bbb05d9fb4ffe00693477c3').then(msgListItem => {
        // 成功获得实例
        let arr = msgListItem.get('msg')
        let joinResultArr = []
        // 获取参与的人
        arr.length && arr.forEach(item => {
          let itemName = item.split(':')[0]
          joinResultArr.push(itemName)
        })
        // 参与的人去重
        joinResultArr = Array.from(new Set(joinResultArr))
        if (joinResultArr.length < this.lotteryNum) {
          this.$message.error('截止到目前，参与人数小于设置的抽奖人数')
          return false
        }
        let lotteryResultArr = []
        for (let i = 0; i < this.lotteryNum; i++) {
          let randomNum = Math.floor(Math.random() * joinResultArr.length)
          console.log(randomNum)
          let randomNumHas = false
          if (lotteryResultArr.length === 0) {
            lotteryResultArr.push(randomNum)
          } else {
            lotteryResultArr.forEach(lotteryResultItem => {
              if (lotteryResultItem === randomNum) {
                randomNumHas = true
              }
            })
            !randomNumHas ? lotteryResultArr.push(randomNum) : i--
          }
        }
        for (let k in lotteryResultArr) {
          console.log('k', joinResultArr[lotteryResultArr[k]])
          this.lotteryList.push(joinResultArr[lotteryResultArr[k]])
        }
        this.openLotteryVisible = true
      }, function (error) {
        // 异常处理
        console.error(error)
      })
    }
  },
  watch: {
    msgList () {
      console.log('aaa')
      if (this.msgList.length > 13) {
        console.log('bbb')
        this.$refs.msgList.scrollTop = (this.msgList.length - 14) * 40
      }
    }
  }
}
</script>

<style lang="less">
.lottery{
  background: #f7f7f7;
  padding: 20px;
  .scroll-msg{
    width: 500px;
    height: 500px;
    background: #fff;
    border-radius: 10px;
    margin: 0 auto;
    h2{
      text-align: left;
      padding: 20px;
      border-bottom: 1px solid #f7f7f7;
    }
    .scroll-msg-list{
      height: 420px;
      // background: rgba(0,0,0,.1);
      background: #fff;
      overflow-y: auto;
      ul{
        li{
          text-align: left;
          padding: 0 10px;
          line-height: 30px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .msg-con{
    width: 500px;
    margin: 20px auto;
  }
  .lottery-result{
    li{
      line-height: 30px;
    }
  }
}
</style>
