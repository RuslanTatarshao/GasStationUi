<template>
  <div class="card">
    <div class="card-header alert-dark">Доступное топливо</div>
    <div class="card-body">
      <button v-if="admin" type="button" @click="addFuel" class="btn btn-success btn-sm">
        Добавить
      </button>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Идетификатор</th>
          <th scope="col">Название</th>
          <th scope="col">Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in fuelList">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>
            <button type="button" v-if="admin" @click="editFuel(item.id)" class="btn btn-secondary btn-sm me-2">
              Редактировать
            </button>

            <button type="button" v-if="admin" @click="deleteFuel(item.id)" class="btn btn-danger btn-sm">
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
  name: "Fuels",
  data() {
    return {
      invalidValidation: false,
      fuelList: [],
    };
  },
  components: {
    APIService: APIService,
  },
  mounted() {
    this.getFuel();
  },
  methods: {
    editFuel(id) {
      this.$router.push({name: 'fuelEdit', params: {fuelId: id}});
    },
    addFuel() {
      this.$router.push({name: 'fuelCreate'});
    },
    async deleteFuel(id) {
      try {
        this.fuelList = await APIService.Delete('Fuel/' + id);
        await this.getFuel();
      } catch (e) {
        console.log(e)
      }
    },
    async getFuel() {
      try {
        let {data} = await APIService.Get('Fuel');
        this.fuelList = data
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