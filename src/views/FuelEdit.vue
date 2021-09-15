<template>
  <div class="card">
    <div class="card-header alert-dark">{{title}}</div>
    <div class="card-body">
      <input type="text" required v-model="data.name" class="form-control mb-2" placeholder="Название" aria-label="name" aria-describedby="basic-addon1">
      <div v-if="invalidValidation" style="color: red" class="mb-2"><label><small>Пожалуйста заполните все поля</small></label></div>
      <button type="button" @click="save" class="btn btn-outline-success">
        Сохранить
      </button>
    </div>
  </div>
</template>
<script>
import APIService from '/src/components/APIService'
d
export default {
  data() {
    return {
      invalidValidation : false,
      title: '',
      data : {
        name: '',
      },
    }
  },
  mounted() {
    if (this.$route.params.fuelId) {
      this.getStation();
    }
    if (this.$route.params.fuelId) {
      this.title = 'Редактирование доступного типа топлива';
    } else {
      this.title = 'Создание доступного типа топлива';
    }
  },
  components: {
    APIService
  },
  methods: {
    async fuelEdit() {
      this.invalidValidation = false;
      if (!this.data.name){
        this.invalidValidation = true;
        return
      }
      try {
        await APIService.Put('Fuel/', this.data);
        await this.$router.push({name: 'fuels'});
      } catch (e) {
        console.log(e)
      }
    },
    async fuelCreate() {
      this.invalidValidation = false;
      if (!this.data.name ) {
        this.invalidValidation = true;
        return
      }
      try {
        await APIService.Post('Fuel', this.data);
        await this.$router.push({name: 'fuels'});
      } catch (e) {
        console.log(e)
      }
    },
    async getStation() {
      try {
        let {data} = await APIService.Get('Fuel/' + this.$route.params.fuelId);
        this.data = data;
      } catch (e) {
        console.log(e)
      }
    },
    save() {
      if (this.$route.params.fuelId) {
        this.fuelEdit();
      } else {
        this.fuelCreate();
      }
    }
  },
}
</script>
