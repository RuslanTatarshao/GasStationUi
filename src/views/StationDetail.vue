<template>
  <div class="card">
    <div class="card-header alert-dark">{{ title }}</div>
    <div class="card-body">
      <input disabled v-model="data.name" class="form-label mb-2" aria-label="name"
             aria-describedby="basic-addon1"/>
      <input disabled v-model="data.address" class="form-label mb-2" aria-label="address"
             aria-describedby="basic-addon1"/>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Идетификатор</th>
          <th scope="col">Название</th>
          <th scope="col">Колличество</th>
          <th scope="col">Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in data.fuels">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>
            <input type="number" v-model="item.fuelCount" required/>
          </td>
          <td>
            <button type="button" @click="getPrognosis(item.id)" class="btn btn-secondary btn-sm me-2">
              Прогноз
            </button>

            <button type="button" @click="save(item.id)" class="btn btn-danger btn-sm">
              Сохранить
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import APIService from '/src/components/APIService'

export default {
  data() {
    return {
      invalidValidation: false,
      title: '',
      data: {
        name: '',
        address: '',
        fuels: []
      },
    }
  },
  mounted() {
    if (this.$route.params.stationId) {
      this.getStation();
    }
    this.title = 'Закупки топлива';
  },
  components: {
    APIService
  },
  computed: {
    admin() {
      return localStorage.getItem('role') === 'Admin';
    },
  },
  methods: {
    async getPrognosis(id) {
      try {
        let {prognosis} = await APIService.Get('Station/' + id + '/Prognosis');
        console.log(prognosis);
        alert("Для данной станции рекомендуется поплнить выбранное топливо на " + prognosis + " едениц.");
      } catch (e) {
        console.log(e)
      }
    },
    async save(id) {
      this.invalidValidation = false;
      if (!this.data.fuels[id].fuelCount) {
        this.invalidValidation = true;
        return
      }
      try {
        await APIService.Put('Station/' + this.$route.params.stationId + '/Fuel/' + id + '/?fuelCount=' + this.data.fuels[id].fuelCount);
        await this.$router.push({name: 'stationDetail', params: {stationId: this.$route.params.stationId}});
      } catch (e) {
        console.log(e)
      }
    },
    async getStation() {
      try {
        console.log(this.$route.params)
        let {data} = await APIService.Get('Station/' + this.$route.params.stationId + '/Detail');
        this.data = data;
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
