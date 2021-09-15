<template>
  <div class="card">
    <div class="card-header alert-dark">Пользователи</div>
    <div class="card-body">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Идентификатор</th>
          <th scope="col">Логин</th>
          <th scope="col">Почта</th>
          <th scope="col">Роль</th>
          <th scope="col">Действия</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in userList">
          <td>{{ item.id }}</td>
          <td>{{ item.userName }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.role }}</td>
          <td>
            <button type="button" v-if="admin" @click="deleteUser(item.id)" class="btn btn-danger btn-sm">
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
import Datepicker from 'vue3-datepicker'
import {maska} from 'maska'
import APIService from '/src/components/APIService'
import moment from "moment/moment";

export default {
  name: "Users",
  data() {
    return {
      invalidValidation: false,
      userList: [],
    };
  },
  components: {
    APIService: APIService,
    Datepicker,
  },
  mounted() {
    this.getUsers();
  },
  methods: {

    async deleteUser(id) {
      try {
        this.userList = await APIService.Delete('User/' + id);
        await this.getUsers();
      } catch (e) {
        console.log(e)
      }
    },
    async getUsers() {
      try {
        let {data} = await APIService.Get('User');
        this.userList = data
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