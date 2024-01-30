let productModal = null;
let delProductModal = null;
const baseUrl = "https://ec-course-api.hexschool.io/v2";
const apiPath = "celine510";

const app = Vue.createApp({
  data() {
    return {
      products: [],
      tempProduct: {},
      tempImgUrl: "",
      showModal: false,
      delId: "",
      pagination:{}
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
    getProducts(page = 1) { // 當前頁碼
      axios
        .get(`${baseUrl}/api/${apiPath}/admin/products?page=${page}`) // 網址參數寫法，將 page 參數代入，取得當前頁碼的產品資料
        .then((res) => {
          const { products, pagination } = res.data;
          console.log(pagination);
          this.products = products;
          this.pagination = pagination;
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
          `${baseUrl}/api/${apiPath}/admin/product/${this.delId}`
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
        .post(`${baseUrl}/api/${apiPath}/admin/product`, data)
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
          `${baseUrl}/api/${apiPath}/admin/product/${productId}`,
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

app.component("pagination", {
  template: `<nav aria-label="Page navigation example" class="d-flex justify-content-center">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': pagination.current_page === 1}">
          <a class="page-link" href="#" @click.prevent="changePage(pagination.current_page - 1)">Previous</a>
        </li>
        <li v-for="(item, index) in pagination.total_pages" :key="index" class="page-item" :class="{'active': item === pagination.current_page}">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" @click.prevent="changePage(pagination.current_page + 1)">Next</a>
        </li>
      </ul>
    </nav>`,
    props: ['pages'],
    methods: {
      changePage(num){
        this.$emit('change-page', num)
      }
    }
});

app.mount("#app");
