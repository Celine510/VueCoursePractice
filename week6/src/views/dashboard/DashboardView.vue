<template>
  <h1>後台首頁</h1>
  <nav>
    <RouterLink to="/admin/products">產品列表</RouterLink> |
    <RouterLink to="/admin/order">訂單</RouterLink> |
    <RouterLink to="/">回到前台</RouterLink>
  </nav>
  <RouterView />
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

const { VITE_URL } = import.meta.env

export default {
  methods: {
    // 登入驗證
    checkAdmin () {
      axios.post(`${VITE_URL}/api/user/check`)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.dir(err)
          Swal.fire({
            title: '登入失敗',
            text: '將跳轉回登入頁',
            icon: 'error'
          }).then((res) => {
            this.$router.push('/login')
          })
        })
    }
  },
  mounted () {
    // 取出token
    const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = myToken

    this.checkAdmin()
  }
}
</script>
