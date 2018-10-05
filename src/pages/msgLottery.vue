<template>
  <div class="lottery">
    <el-dialog title="昵称登记" :visible.sync="dialogFormVisible" :show-close="false" :close-on-click-modal="false">
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
          <el-button type="primary" @click="submit">发 送</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      dialogFormVisible: true,
      gameName: '',
      msg: ''
    }
  },
  computed: {
    ...mapGetters([
      'msgList'
    ])
  },
  methods: {
    ...mapMutations([
      'setMsg'
    ]),
    sureName () {
      if (this.gameName === '') {
        this.$message.error('请输入游戏昵称')
        return
      }
      // let userInfo = {
      //   "gameName": this.gameName
      // }
      localStorage.setItem('gameName', this.gameName)
      this.dialogFormVisible = false
    },
    submit () {
      // this.msgList.push(this.msg)
      this.setMsg(this.gameName + ':' + this.msg)
    }
  },
  watch: {
    msgList () {
      console.log('aaa')
      if (this.msgList.length > 14) {
        console.log('bbb')
        this.$refs.msgList.scrollTop = (this.msgList.length - 14) * 30
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
