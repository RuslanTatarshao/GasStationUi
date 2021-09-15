<template>
  <div class="container">
    <div class="flex-row align-content-center d-flex justify-content-center">
      <form class="box-login">
        <h1>Регистрация</h1>
        <p class="text-muted"> Пожалуйста заполните форму!</p>
        <div class="d-flex flex-column">
          <input type="email" class="form-control mb-2" v-model="data.userName" placeholder="Имя пользователя">
          <input type="email" class="form-control mb-2" v-model="data.email" placeholder="Почта">
          <input type="password" class="form-control mb-2" v-model="data.password" placeholder="Пароль">
          <div v-if="invalidValidation" class="mb-2 validation-failed"><label><small>Пожалуйста заполните все
            поля</small></label></div>
          <div v-if="invalidData" class="mb-2 validation-failed"><label><small>Неверные данные для входа</small></label>
          </div>
        </div>
        <input type="button" class="btn btn-primary form-control mt-2" @click="registration" value="Зарегистрироваться">
      </form>
    </div>
  </div>
</template>
<script>
import APIService from '/src/components/APIService'

export default {
  data() {
    return {
      invalidValidation: false,
      invalidData: false,
      data: {
        email: '',
        password: '',
        userName: '',
      },
    }
  },
  components: {
    Api: APIService
  },
  methods: {
    async registration() {
      this.invalidValidation = false;
      this.invalidData = false;
      if (!this.data.email || !this.data.password || !this.data.userName) {
        this.invalidValidation = true;
        return
      }
      try {
        let {data} = await APIService.Post('Account/SignUp', this.data);
        localStorage.setItem('auth', data.accessToken)
        localStorage.setItem('role', data.role)
        window.location = '/events';
      } catch (e) {
        this.invalidData = true;
        console.log(e)
      }
    },
  },
}
</script>