<template>
  <h1>登入</h1>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">
        請先登入
      </h1>
      <div class="col-8">
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="username" placeholder="name@example.com" required autofocus
            v-model="email">
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="password" placeholder="Password" required autocomplete
            v-model="password">
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="button" @click="login()">
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">
      &copy; 2021~∞ - 六角學院
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

const { VITE_URL } = import.meta.env

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const user = { username: this.email, password: this.password }
      axios
        .post(`${VITE_URL}/admin/signin`, user)
        .then((res) => {
          console.log(res)
          document.cookie = `token=${res.data.token}; expires=${res.data.expired};`
          Swal.fire({
            title: '登入成功',
            text: '將跳轉到後台產品頁',
            icon: 'success'
          }).then((res) => {
            this.$router.push('/admin/products')
          })
        })
        .catch((err) => {
          console.dir(err)
          Swal.fire({
            title: '登入失敗',
            text: '請重新登入',
            icon: 'error'
          })
        })
    }
  }
  // mounted() {
  // },
}
</script>
