// 使用者可以從登入頁面登入，並轉到後台商品頁面
// 使用者若無登入直接進入商品頁面，會被導回登入頁面
// 使用者可以查看產品列表
// 使用者可以點擊單一產品，查看詳細資訊

// Options API
const app = Vue.createApp({
  data() {
    return {
      url: 'https://ec-course-api.hexschool.io/v2',
      path: 'celine510',
      products: [],
      tempProduct: {}
    }
  },
  methods: {
    // 登入驗證
    checkAdmin(){
      axios.post(`${this.url}/api/user/check`)
        .then(res => {
          console.log(res);
          this.getProducts();
        })
        .catch(err => {
          console.dir(err);
          alert('尚未登入，請先登入');
          // 頁面跳轉
          window.location.href = 'signin.html';
        })
    },
    getProducts(){
      axios.get(`${this.url}/api/${this.path}/admin/products`)
        .then(res => {
          console.log(res);
          this.products = res.data.products;
        })
        .catch(err => {
          console.dir(err);
        })
    }
  },
  mounted() {
    // 取出token
    const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
    axios.defaults.headers.common['Authorization'] = myToken;

    this.checkAdmin();
  },
});

app.mount('#app')