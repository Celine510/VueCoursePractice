const app = Vue.createApp({
  data() {
    return {
      email: "",
      password: "",
      baseUrl: "https://ec-course-api.hexschool.io/v2",
    };
  },
  methods: {
    signIn() {
      const user = { username: this.email, password: this.password };
      axios
        .post(`${this.baseUrl}/admin/signin`, user)
        .then((res) => {
          // console.log(res);
          document.cookie = `token=${res.data.token}; expires=${res.data.expired};`;
          Swal.fire({
            title: "登入成功",
            text: "將跳轉到產品頁",
            icon: "success",
          }).then((res) => {
            window.location = "index.html";
          });
        })
        .catch((err) => {
          // console.dir(err);
          Swal.fire({
            title: "登入失敗",
            text: "請重新登入",
            icon: "error",
          });
        });
    },
  },
});

app.mount("#app");
