// 登入，並轉到後台商品頁面

const url = 'https://ec-course-api.hexschool.io/v2';
const path = 'celine510' ;

// Options API
const app = Vue.createApp({
  data() {
    return {
      num:6,
    }
  },
  methods: {
    signin(){
      const username = document.querySelector('#username').value;
      const password = document.querySelector('#password').value;
      
      const user = {
        username,
        password
      }
      axios.post(`${url}/admin/signin`, user)
        .then(res => {
          console.log(res);

          const { token, expired } = res.data;
          document.cookie = `token=${token}; expires=${new Date(expired)}; `;

          alert('登入成功');
          // 頁面跳轉
          window.location.href = 'index.html';
        })
        .catch(err => {
          console.dir(err);
        })
    }
  },
});

app.mount('#app')