const app = Vue.createApp({
  data() {
    return {
      baseUrl: "https://ec-course-api.hexschool.io/v2",
      apiPath: "celine510",
      products: [],
      tempProduct: {
        imageUrl: "",
      },
      tempImgUrl: "",
      showModal: false,
      productModal: null,
      delProductModal: null,
    };
  },
  methods: {
    // 登入狀態檢查，未登入導至登入頁
    checkAdmin() {
      axios
        .post(`${this.baseUrl}/api/user/check`)
        .then((res) => {
          // console.log(res);
          // console.log("登入驗證成功");
          this.getProducts();
        })
        .catch((err) => {
          // console.dir(err);
          Swal.fire({
            title: "登入失敗",
            text: "請前往登入",
            icon: "error",
          }).then((res) => {
            window.location = "signin.html";
          });
        });
    },
    // 取得產品
    getProducts() {
      axios
        .get(`${this.baseUrl}/api/${this.apiPath}/admin/products`)
        .then((res) => {
          // console.dir(res);
          this.products = res.data.products;
        })
        .catch((err) => {
          // console.dir(err);
        });
    },
    // 刪除產品
    delProduct() {
      axios
        .delete(
          `${this.baseUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
        )
        .then((res) => {
          // console.dir(res);
          Swal.fire({
            title: `產品 ${this.tempProduct.title} 刪除成功`,
            icon: "success",
            timer: 1500,
          });
          this.getProducts();
          this.delProductModal.hide();
        })
        .catch((err) => {
          // console.dir(err);
        });
    },
    // 更新產品
    updateProduct() {
      // 新增
      let method = "post";
      let plusUrl = "";

      // 編輯
      if (this.tempProduct.id) {
        method = "put";
        plusUrl = `/${this.tempProduct.id}`;
      }

      const data = { data: this.tempProduct };
      axios[method](
        `${this.baseUrl}/api/${this.apiPath}/admin/product${plusUrl}`,
        data
      )
        .then((res) => {
          // console.dir(res);
          Swal.fire({
            title: `產品${method === "post" ? "新增" : "編輯"}成功`,
            icon: "success",
            timer: 1500,
          });
          this.productModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          // console.dir(err);
          Swal.fire({
            title: `請注意：${err.data.message.join(",")}`,
            icon: "error",
          });
        });
    },
    // 新增&刪除圖片
    actImage(act) {
      if (this.tempProduct.imagesUrl === undefined)
        this.tempProduct.imagesUrl = [];
      if (act === "add" && this.tempImgUrl)
        this.tempProduct.imagesUrl.push(this.tempImgUrl);
      else if (act === "del") this.tempProduct.imagesUrl.pop();
      this.tempImgUrl = "";
    },
    // 打開 modal
    openModal(usage, product = "") {
      if (usage === "edit") {
        this.tempProduct = { ...product };
        this.productModal.show();
      } else if (usage === "new") {
        this.tempProduct = {};
        this.productModal.show();
      } else if (usage === "del") {
        this.tempProduct = { ...product };
        this.delProductModal.show();
      }
    },
  },
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.productModal);
    this.delProductModal = new bootstrap.Modal(this.$refs.delProductModal);

    const myToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = myToken;

    this.checkAdmin();
  },
});

app.mount("#app");
