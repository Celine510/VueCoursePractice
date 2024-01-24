let productModal = null;
let delProductModal = null;

const app = Vue.createApp({
  data() {
    return {
      baseUrl: "https://ec-course-api.hexschool.io/v2",
      apiPath: "celine510",
      products: [],
      tempProduct: {},
      tempImgUrl: "",
      showModal: false,
      delId: "",
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
    // 刪除產品：當點擊'刪除'按鈕，將產品id寫入delId，當點擊'確認刪除'時，執行刪除動作
    delProduct() {
      console.log();
      axios
        .delete(
          `${this.baseUrl}/api/${this.apiPath}/admin/product/${this.delId}`
        )
        .then((res) => {
          // console.dir(res);
          Swal.fire({
            title: `產品 ${this.tempProduct.title} 刪除成功`,
            icon: "success",
            timer: 1500,
          });
          this.getProducts();
          delProductModal.hide();
        })
        .catch((err) => {
          // console.dir(err);
        });
    },
    // 新增產品
    addProduct() {
      const data = { data: this.tempProduct };
      axios
        .post(`${this.baseUrl}/api/${this.apiPath}/admin/product`, data)
        .then((res) => {
          // console.dir(res);
          Swal.fire({
            title: "產品新增成功",
            icon: "success",
            timer: 1500,
          });
          productModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          // console.dir(err);
          Swal.fire({
            title: `請注意：${err.data.message.join(',')}`,
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
    // 編輯產品
    editProduct() {
      const productId = this.tempProduct.id;
      const data = { data: this.tempProduct };
      axios
        .put(
          `${this.baseUrl}/api/${this.apiPath}/admin/product/${productId}`,
          data
        )
        .then((res) => {
          // console.dir(res);
          Swal.fire({
            title: "編輯成功",
            icon: "success",
            timer: 1000,
          });
          productModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          // console.dir(err);
        });
    },
    // 打開 modal
    openModal(usage, product = '') {
      if (usage === "edit") {
        this.tempProduct = { ...product };
        productModal.show();
      } else if (usage === "new") {
        this.tempProduct = {};
        productModal.show();
      } else if (usage === "del") {
        this.delId = product.id;
        this.tempProduct = { ...product };
        delProductModal.show();
      }
    },
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById("productModal"));
    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal")
    );

    const myToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = myToken;

    this.checkAdmin();
  },
});

app.mount("#app");
