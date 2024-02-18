import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.19/vue.esm-browser.min.js";

const apiUrl = "https://ec-course-api.hexschool.io/v2";
const apiPath = "celine510";

const userModal = {
  props: ["tempProduct", "addToCart"],
  data() {
    return {
      productModal: null,
      qty: 1,
    };
  },
  methods: {
    open() {
      this.productModal.show();
    },
    close() {
      this.productModal.hide();
    },
  },
  watch: {
    // 監聽 tempProduct 值若有變化就設回1
    tempProduct() {
      this.qty = 1;
    },
  },
  template: "#userProductModal",
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.modal);
  },
};

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {},
      status: {
        addCartLoading: "",
        cartQtyLoading: "",
        cartRemoveLoading: false,
      },
      carts: {},
    };
  },
  methods: {
    getProducts() {
      axios.get(`${apiUrl}/api/${apiPath}/products/all`).then((res) => {
        console.log(res);
        this.products = res.data.products;
      });
    },
    openModal(product) {
      this.tempProduct = product;
      this.$refs.userModal.open();
    },
    addToCart(product_id, qty = 1) {
      const order = {
        product_id,
        qty,
      };
      // loading
      this.status.addCartLoading = product_id;

      axios
        .post(`${apiUrl}/api/${apiPath}/cart`, { data: order })
        .then((res) => {
          console.log(res);
          this.status.addCartLoading = "";
          this.getCart();
          this.$refs.userModal.close();
        });
    },
    changeCartQty(item, qty = 1) {
      const order = {
        product_id: item.product_id,
        qty,
      };
      // loading
      this.status.cartQtyLoading = item.id;

      axios
        .put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, { data: order })
        .then((res) => {
          console.log(res);
          this.status.cartQtyLoading = "";
          this.getCart();
        });
    },
    removeCartItem(id){
      this.status.cartRemoveLoading = true;
      axios
        .delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
        .then((res) => {
          console.log(res);
          this.status.cartRemoveLoading = false;
          this.getCart();
        });
    },
    removeAllCartItem(){
      // this.status.cartQtyLoading = id;
      axios
        .delete(`${apiUrl}/api/${apiPath}/carts`)
        .then((res) => {
          console.log(res);
          // this.status.cartQtyLoading = "";
          this.getCart();
        });
    },
    getCart() {
      axios.get(`${apiUrl}/api/${apiPath}/cart`).then((res) => {
        console.log(res);
        //  total 沒套入優惠券的總價，反之則 final_total
        this.carts = res.data.data;
        console.log(this.carts);
      });
    },
  },
  components: {
    userModal,
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
});

app.mount("#app");
