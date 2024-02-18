const { createApp } = Vue;
const { createPinia } = Pinia;

import ProductModal from "./components/ProductModal.js";

const baseUrl = "https://ec-course-api.hexschool.io";
const apiPath = "celine510";

// const useCartStore = defineStore("useCartStore", {
//   state: () => ({
//     msg: 123,
//   }),
//   getters: {},
// });

const app = createApp({
  data() {
    return {
      productsList: [],
    };
  },
  methods: {
    openDetailModal() {
      console.log(123);
      this.$refs.modal.showModal();
    },
  },
  mounted() {
    axios.get(`${baseUrl}/v2/api/${apiPath}/products`).then((res) => {
      console.log(res);
      this.productsList = res.data.products;
      // console.log(this.productsList);
      console.log(this.$refs);
    });
  },
  components: { ProductModal },
});

const pinia = createPinia();

app.use(pinia);
app.mount("#app");
