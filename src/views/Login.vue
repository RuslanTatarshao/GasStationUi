<template>
  <div class="flex-row align-content-center d-flex justify-content-center">
    <form class="box-login">
      <h1>Авторизация</h1>
      <div class="d-flex flex-column">
        <p class="text-muted"> Пожалуйста введите свой логин и пароль!</p>
        <input type="email" class="mb-2 form-control" v-model="data.userName" placeholder="Имя пользователя">
        <input type="password" class="mb-2 form-control" v-model="data.password" placeholder="Пароль">
        <div v-if="invalidValidation" class="mb-2 validation-failed"><label><small>Пожалуйста заполните все
          поля</small></label></div>
        <div v-if="invalidData" class="mb-2 validation-failed"><label><small>Неверные данные для входа</small></label>
        </div>
      </div>
      <input type="button" class="form-control mt-4 btn-primary" @click="login" value="Войти" href="#">
    </form>
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
        userName: '',
        password: '',
      },
    }
  },
  components: {
    Api: APIService
  },
  methods: {
    async login() {
      this.invalidValidation = false;
      this.invalidData = false;
      if (!this.data.userName || !this.data.password) {
        this.invalidValidation = true;
        return
      }
      try {
        let {data} = await APIService.Post('Account/SignIn', this.data);
        localStorage.setItem('auth', data.accessToken)
        localStorage.setItem('role', data.role)
        window.location = '/stations';
      } catch (e) {
        this.invalidData = true;
        console.log(e)
      }
    },
  },
}
</script>
<style>


.validation-failed {
  color: #D42F2F;
}

.card-login {
  margin-bottom: 20px;
  border: none
}

.box-login {
  width: 500px;
  padding: 40px;
  position: center;
  /*position: absolute;*/
  /*top: 50%;*/
  /*left: 70%;*/
  background: #292F33;;
  text-align: center;
  transition: 0.25s;
  margin-top: 150px
}


.box-login h1 {
  color: white;
  text-transform: uppercase;
  font-weight: 500
}


ul.social-network {
  list-style: none;
  display: inline;
  margin-left: 0 !important;
  padding: 0
}

ul.social-network li {
  display: inline;
  margin: 0 5px
}

.social-network a.icoFacebook:hover i,
.social-network a.icoTwitter:hover i,
.social-network a.icoGoogle:hover i {
  color: #fff
}

.social-circle li a {
  display: inline-block;
  position: relative;
  margin: 0 auto 0 auto;
  border-radius: 50%;
  text-align: center;
  width: 50px;
  height: 50px;
  font-size: 20px
}

.social-circle li i {
  margin: 0;
  line-height: 50px;
  text-align: center
}

.social-circle li a:hover i,
.social-circle i {
  color: #fff;
  transition: all 0.8s;
  transition: all 0.8s
}
</style>