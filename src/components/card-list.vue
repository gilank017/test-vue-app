<template>
  <div class="card-list-wrapper">
    <div class="card card-food mb-3">
      <div class="card-header font-weight-bold"> {{ titleDate }}</div>
      <div class="card-body">
        <div v-for="(value, index) in dataFood" :key="index">
          <div class="row ">
            <div class="col-md-3 p-0">
              <div class="timer-date font-weight-bold"> {{ value.jam }} </div>
            </div>
            <div class="col-md-5 p-0">
              <div class="food-name text-left"> {{ value.nama }}</div>
            </div>
            <div class="col-md-4 p-0">
              <div class="food-price">{{ setPrice(value.pengeluaran) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="total-food font-weight-bold text-right">Total: {{ setPrice(totalFood) }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    titleDate: {
      type: String,
      default: ''
    },
    dataFood: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      totalFood: 0
    }
  },
  mounted() {
    this.initTotal()
  },
  methods: {
    initTotal() {
      for (let i = 0; i < this.dataFood.length; i++) {
        this.totalFood += this.dataFood[i].pengeluaran
      }
    },
    setPrice(value) {
      const val = (value / 1).toFixed().replace('.', ',')
      return 'Rp ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    } 
  }
}
</script>
<style scoped>
.card-body {
  font-size: 12px
}
.card-footer {
  font-size: 12px
}
</style>