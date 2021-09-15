<template>
  <div class="card">
    <div class="card-header alert-dark">Заправочные станции</div>
    <div class="card-body">
      <button v-if="admin" type="button" @click="addStation" class="btn btn-success btn-sm">
        Добавить
      </button>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Идетификатор</th>
          <th scope="col">Название</th>
          <th scope="col">Адрес</th>
          <th scope="col">Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in stationList">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.address }}</td>
          <td>
            <button type="button" v-if="!admin" @click="detailStation(item.id)" class="btn btn-primary me-2 btn-sm">
              Детали
            </button>

            <button type="button" v-if="admin" @click="editStation(item.id)" class="btn btn-secondary btn-sm me-2">
              Редактировать
            </button>

            <button type="button" v-if="admin" @click="deleteStations(item.id)" class="btn btn-danger btn-sm">
              Удалить
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
  name: "Stations",
  data() {
    return {
      invalidValidation: false,
      stationList: [],
    };
  },
  components: {
    APIService: APIService,
  },
  mounted() {
    this.getStations();
  },
  methods: {
    editStation(id) {
      this.$router.push({name: 'stationEdit', params: {stationId: id}});
    },
    detailStation(id) {
      console.log(id)
      this.$router.push({name: 'stationDetail', params: {stationId: id}});
    },
    addStation() {
      this.$router.push({name: 'stationCreate'});
    },
    async deleteStations(id) {
      try {
        this.stationList = await APIService.Delete('Station/' + id);
        await this.getStations();
      } catch (e) {
        console.log(e)
      }
    },
    async getStations() {
      try {
        let {data} = await APIService.Get('Station');
        this.stationList = data
      } catch (e) {
        console.log(e)
      }
    },
  },
  computed: {
    admin() {
      return localStorage.getItem('role') === 'Admin';
    },
  },
};
</script>