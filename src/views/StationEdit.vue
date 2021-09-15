<template>
  <div class="card">
    <div class="card-header alert-dark">{{title}}</div>
    <div class="card-body">
      <input type="text" required v-model="data.name" class="form-control mb-2" placeholder="Название" aria-label="name" aria-describedby="basic-addon1">
      <input type="text" required v-model="data.address" class="form-control mb-2" placeholder="Адрес" aria-label="address" aria-describedby="basic-addon1">
      <div v-if="invalidValidation" style="color: red" class="mb-2"><label><small>Пожалуйста заполните все поля</small></label></div>
      <button type="button" @click="save" class="btn btn-outline-success">
        Сохранить
      </button>
    </div>
  </div>
</template>
<script>
import APIService from '/src/components/APIService'

export default {
  data() {
    return {
      invalidValidation : false,
      title: '',
      data : {
        name: '',
        address: '',
      },
    }
  },
  mounted() {
    if (this.$route.params.stationId) {
      this.getStation();
    }
    if (this.$route.params.stationId) {
      this.title = 'Редактирование заправочной станции';
    } else {
      this.title = 'Создание заправочной станции';
    }
  },
  components: {
    APIService
  },
  methods: {
    async stationEdit() {
      this.invalidValidation = false;
      if (!this.data.name || !this.data.address){
        this.invalidValidation = true;
        return
      }
      try {
        await APIService.Put('Station/', this.data);
        await this.$router.push({name: 'stations'});
      } catch (e) {
        console.log(e)
      }
    },
    async stationCreate() {
      this.invalidValidation = false;
      if (!this.data.name || !this.data.address) {
        this.invalidValidation = true;
        return
      }
      try {
        await APIService.Post('Station', this.data);
        await this.$router.push({name: 'stations'});
      } catch (e) {
        console.log(e)
      }
    },
    async getStation() {
      try {
        let {data} = await APIService.Get('Station/' + this.$route.params.stationId);
        this.data = data;
      } catch (e) {
        console.log(e)
      }
    },
    save() {
      if (this.$route.params.stationId) {
        this.stationEdit();
      } else {
        this.stationCreate();
      }
    }
  },
}
</script>
