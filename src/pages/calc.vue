<template>
  <div class="calc">
    <h1>1</h1>
    <el-row :gutter="40">
      <el-col :span="8">
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
      <el-col :span="16">
        <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="fee"
          label="费数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="gl"
          label="概率"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pl"
          label="赔率">
        </el-table-column>
      </el-table>
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
        let gl = (Number(this.cards[key]) / this.totalCards).toFixed(3)
        let pl = (1 / gl).toFixed(2)

        this.tableData.push({'fee': key, 'gl': gl, 'pl': pl})
      }
      console.log('totalCards', this.totalCards)
      console.log('totalCards', typeof (this.totalCards))
    }
  }
}
</script>

<style>
.calc{
  width: 800px;
  margin: 20px auto;
}
</style>
