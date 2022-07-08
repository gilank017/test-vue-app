<template>
  <div class="home-page">
    <div class="home-page-wrapper">
      <div class="text-center">
        <h2>Diari Jajan</h2>
        <h5>Total Keseluruhan: {{ setPrice(totalBuy) }}</h5>
      </div>
      <div class="text-center mb-3">
        <button class="btn btn-primary btn-sm" @click="openModalAdd()">Tambah Item</button>
      </div>
      <div class="container-xl">
        <div class="row">
          <div class="col-md-3" v-for="(val, index) in foodGroup" :key="index">
              <card-list
              :titleDate="index" 
              :dataFood="val" 
              />
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="modal-item" role="dialog" aria-labelledby="ModalAdd" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="modalAdd"> Test Modal</h5>
            <button class="close" @click="closeModal()">
              <span aria-hidden="true"> &times; </span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <div class="label text-left" for="datepicker">Tanggal</div>
              <input id="datepicker" class="form-control form-control-sm" type="date" v-model="formFood.date">
            </div>
            <div class="form-group">
              <div class="label text-left" for="timepicker">Waktu</div>
              <input id="timepicker" class="form-control form-control-sm" type="time" v-model="formFood.time">
            </div>
            <div class="form-group">
              <div class="label text-left" for="name" >Nama Makanan</div>
              <input id="name" class="form-control form-control-sm" type="text" v-model="formFood.name">
            </div>
            <div class="form-group">
              <div class="label text-left" for="price">Harga</div>
              <input id="price" class="form-control form-control-sm" type="number" v-model="formFood.price">
            </div>
            <div class="text-right">
              <button class="btn btn-warning" @click="submitFood()">Simpan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import moment from "moment"
import cardList from '@/components/card-list'
export default {
  components: {
    cardList
  },
  data() {
    return {
      titleMonth: new Date,
      formFood: {},
      foodList: [],
      totalBuy: 0,
    }
  },
  computed: {
    foodGroup() {
      return this.groupBy(this.foodList, 'tanggal')
    }
  },
  watch: {
    foodList() {
      this.initTotal()
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    async getDataList() {
      const response = await axios.get('http://localhost:3000/items')
      .then((res) => {
        return res.data
      })
      this.foodList = response
    },
    initTotal() {
      this.totalBuy = 0
      for (let i = 0; i < this.foodList.length; i++) {
        this.totalBuy += this.foodList[i].pengeluaran
      }
    },
    groupBy(array, key) {
      const result = {}
      array.forEach(value => {
        if (result[value[key]] === undefined) {
          result[value[key]] = []
        }
        result[value[key]].push(value)
      })
      return result
    },
    parseDatetime(datetime) {
      return moment(datetime).locale('id').format('LL')
    },
    openModalAdd() {
      // eslint-disable-next-line
      $('#modal-item').modal('show')
    },
    closeModal() {
      // eslint-disable-next-line
      $('#modal-item').modal('hide')
      this.formFood = {}
    },
    submitFood() {
      const body = {
        tanggal: this.parseDatetime(this.formFood.date),
        jam: this.formFood.time,
        nama: this.formFood.name,
        pengeluaran: parseInt(this.formFood.price)
      }
      this.foodList.push(body)
      this.closeModal()
    },
    setPrice(value) {
      const val = (value / 1).toFixed().replace('.', ',')
      return 'Rp ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    } 
  }
}
</script>
<style scoped>
.home-page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>