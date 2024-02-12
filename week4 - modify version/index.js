const { createApp } = Vue;

import pagination from "./components/pagination.js";
import deleteModal from "./components/deleteModal.js";
import productModal from "./components/productModal.js";

const baseUrl = "https://ec-course-api.hexschool.io/v2";
const apiPath = "celine510";

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {
        imageUrl: "",
      },
      tempImgUrl: "",
      showModal: false,
      pages: {},
    };
  },
  methods: {
    // 登入狀態檢查，未登入導至登入頁
    checkAdmin() {
      axios
        .post(`${baseUrl}/api/user/check`)
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
    getProducts(page = 1) {
      axios
        .get(`${baseUrl}/api/${apiPath}/admin/products?page=${page}`)
        .then((res) => {
          // console.dir(res);
          this.products = res.data.products;
          this.pages = res.data.pagination;
          // console.log(this.pages);
        })
        .catch((err) => {
          // console.dir(err);
        });
    },
    // 刪除產品
    delProduct() {
      axios
        .delete(
          `${baseUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`
        )
        .then((res) => {
          // console.dir(res);
          Swal.fire({
            title: `產品 ${this.tempProduct.title} 刪除成功`,
            icon: "success",
            timer: 1500,
          });
          this.getProducts();
          this.$refs.delModal.hideModal();
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
      axios[method](`${baseUrl}/api/${apiPath}/admin/product${plusUrl}`, data)
        .then((res) => {
          // console.dir(res);
          Swal.fire({
            title: `產品${method === "post" ? "新增" : "編輯"}成功`,
            icon: "success",
            timer: 1500,
          });
          this.$refs.proModal.hideModal();
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
    // 打開 modal
    openModal(usage, product = "") {
      if (usage === "edit") {
        this.tempProduct = { ...product };
        this.$refs.proModal.showModal();
      } else if (usage === "new") {
        this.tempProduct = {};
        this.$refs.proModal.showModal();
      } else if (usage === "del") {
        this.tempProduct = { ...product };
        this.$refs.delModal.showModal();
      }
    },
    // 接收子元件傳遞的資料 - 主圖 url
    // 新增&刪除圖片
    uploadData(newData) {
      this.tempProduct.imageUrl = newData;
    },
    uploadImages(newData) {
      if (this.tempProduct.imagesUrl === undefined)
        this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push(newData);
    },
    deleteImages() {
      this.tempProduct.imagesUrl.pop();
    },
  },
  mounted() {
    const myToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = myToken;

    this.checkAdmin();
  },
  components: {
    pagination,
    deleteModal,
    productModal,
  },
});

app.mount("#app");
