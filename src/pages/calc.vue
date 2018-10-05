<template>
  <div class="calc">
    <h1><img src="../assets/2.jpg" alt="">宝屌赔率计算器<img src="../assets/3.jpg" alt=""></h1>
    <el-row :gutter="40">
      <el-col :span="6">
        <el-card header="卡数">
          <el-form label-position="right" label-width="50px" :model="cards">
            <el-form-item v-for="(item, key) in cards" :label="key" :key="key">
              <el-input type="number" v-model="cards[key]"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="calc">计算</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="18">
      <el-table
        :data="tableData"
        border
        show-summary
        style="width: 100%">
        <el-table-column
          prop="fee"
          label="费数"
          width="120"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="num"
          label="卡数"
          width="120"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="gl"
          label="概率"
          width="120"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="gl_per"
          label="概率(%)"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="pl"
          label="赔率"
          width="120"
          header-align="center">
        </el-table-column>
      </el-table>
      <img style="width: 200px; margin-top: 20px;" src="../assets/1.jpg" alt="">
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cards: {
        '1费': '',
        '2费': '',
        '3费': '',
        '4费': '',
        '5费': '',
        '6费': '',
        '7费': '',
        '8费': '',
        '9费': ''
      },
      totalCards: 0,
      tableData: []
    }
  },
  methods: {
    calc () {
      this.tableData = []
      this.totalCards = 0
      for (let key in this.cards) {
        if (this.cards[key] === '') continue
        this.totalCards += Number(this.cards[key])
      }
      for (let key in this.cards) {
        if (this.cards[key] === '') continue
        console.log(key, this.cards[key])
        let gl = (parseInt(this.cards[key]) / this.totalCards).toFixed(3)
        let glPer = (gl * 100).toFixed(2) + '%'
        let pl = (1 / gl).toFixed(1)

        this.tableData.push({'fee': key, 'num': this.cards[key], 'gl': gl, 'gl_per': glPer, 'pl': pl})
      }
      console.log('totalCards', this.totalCards)
      console.log('totalCards', typeof (this.totalCards))
    }
  }
}
</script>

<style lang="less">
.calc{
  width: 1000px;
  margin: 20px auto 0;
  h1{
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
    img{
      width: 50px;
      margin: 0 20px;
    }
  }
}
</style>
