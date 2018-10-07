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
          <el-button type="primary" v-if="gameName" @click="submit">发 送</el-button>
          <el-button type="primary" v-else @click="dialogFormVisible=true">发 送</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-button v-if="gameName === 'kim'" @click="clearData">清空上次留言数据</el-button>
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
var UserMsg = AV.Object.extend('UserMsg')
var userMsg = new UserMsg()

// id
var UserId = AV.Object.extend('UserId')
var userId = new UserId()

// msgList
var MsgList = AV.Object.extend('MsgList')
var msgList1 = new MsgList()

export default {
  data () {
    return {
      dialogFormVisible: true,
      storageName: '',
      gameName: '',
      msg: '',
      msgList: [],
      msgListId: null,
      ObjectId: '',
      idList: []
      // idListO: {},
      // userIdId: null
    }
  },
  created () {
    this.storageName = sessionStorage.getItem('gameName')
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
      this.createUserTab(this.gameName, '')
      this.createMsgListTab()
      // this.createIdTab()
      sessionStorage.setItem('gameName', this.gameName)
      this.dialogFormVisible = false
    },
    submit () {
      this.msgList.push(this.msg)
      this.updateMsgListTab(this.msgList)
      // this.updateMsg(this.msg)
      // console.log('this.idList', this.idList)
      // this.updateIdTab(this.idListO)
      // this.createIdTab(this.msg)
      this.msg = ''
    },
    // 创建数据表 user,msg
    createUserTab (gameName, msg) {
      // 设置游戏昵称
      userMsg.set('gameName', gameName)
      // 设置最新留言
      // userMsg.set('msg', msg)
      userMsg.save().then(function (item) {
        console.log('objectId is ' + item.id)
        this.ObjectId = item.id
        this.idList.push(item.id)
        // this.idListO = {id: this.idList}
      }, function (error) {
        console.error(error)
      })
    },
    // 更新最后一次留言
    // updateMsg (msg) {
    //   var userMsg = AV.Object.createWithoutData('UserMsg', String(this.ObjectId))
    //   // 修改属性
    //   userMsg.set('msg', msg)
    //   // 保存到云端
    //   userMsg.save()
    // },
    // 创建 msgList
    createMsgListTab () {
      msgList1.set('msg', [])
      msgList1.save().then(function (item) {
        console.log('msgListId objectId is ' + item.id)
        console.log('msgListId objectId is ' + typeof (item.id))
        this.msgListId = item.id
      }, function (error) {
        console.error(error)
      })
    },
    // 更新 msgList
    updateMsgListTab (msgList) {
      var msgList1 = AV.Object.createWithoutData('MsgList', this.msgListId)
      // 修改属性
      msgList1.set('msg', msgList)
      // 保存到云端
      msgList1.save()
    },
    // 创建userid
    createIdTab () {
      userId.set('id', null)
      userId.save().then(function (item) {
        console.log('objectId is ' + item.id)
        this.userIdId = item.id
      }, function (error) {
        console.error(error)
      })
    },
    // 更新userid
    updateIdTab (id) {
      console.log('id', id)
      var userId = AV.Object.createWithoutData('UserId', this.userIdId)
      // 修改属性
      userId.set('id', id)
      // 保存到云端
      userId.save()
    }
    // clearData () {
    //   console.log('aaaa')
    //   console.log(this.objectId)
    //   AV.Object.destroyAll(this.objectId).then(function () {
    //     // 成功
    //     this.$message.success('清除成功')
    //   }, function (error) {
    //     // 异常处理
    //     this.$message.error('清除失败:' + error)
    //   })
    // }
  },
  watch: {
    // msgList () {
    //   console.log('aaa')
    //   if (this.msgList.length > 14) {
    //     console.log('bbb')
    //     this.$refs.msgList.scrollTop = (this.msgList.length - 14) * 30
    //   }
    // }
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
      background: red;
      overflow-y: auto;
      ul{
        li{
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
}
</style>
