export default {
  props: ["tempProduct", "actImage", "updateProduct"],
  data() {
    return {
      productModal: null,
      mainImageUrl: "",
      tempImageUrl: "",
    };
  },
  methods: {
    showModal() {
      this.productModal.show();
    },
    hideModal() {
      this.productModal.hide();
    },
    uploadMainImg() {
      this.$emit("uploadMainImg", this.mainImageUrl);
    },
    insideImage(act) {
      if (act === "add" && this.tempImageUrl)
        this.$emit("addDetailImage", this.tempImageUrl);
      else if (act === "del") this.$emit("deleteDetailImage");
      this.tempImageUrl = "";
    },
  },
  template: `<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" :class="{ 'show': showModal }"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span v-if="tempProduct.id">編輯產品</span>
              <span v-else>新增產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入主圖</label>
                    <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="mainImageUrl">
                    <button class="btn btn-outline-primary btn-sm d-block w-100" @click="uploadMainImg">
                      新增圖片
                    </button>
                    <img class="img-fluid" alt="" :src="tempProduct.imageUrl" >
                  </div>
                  <div class="mb-3">
                    <label for="imageDetailUrl" class="form-label">輸入詳細圖</label>
                    <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempImageUrl">
                    <button class="btn btn-outline-primary btn-sm d-block w-100" @click="insideImage('add')">
                      新增圖片
                    </button>
                    <button class="btn btn-outline-danger btn-sm d-block w-100" @click="insideImage('del')">
                      刪除圖片
                    </button>
                  </div>
                  <div v-if="tempProduct.imagesUrl">
                    <div v-for="(item,index) in tempProduct.imagesUrl" :key="index">
                      <img class="img-fluid" alt="" :src="item" >
                      <input type="text" class="form-control" v-model="tempProduct.imagesUrl[index]">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model.number="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述" v-model="tempProduct.description">
                    </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容" v-model="tempProduct.content">
                    </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateProduct()">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>`,
  mounted() {
    // console.log(123);
    this.productModal = new bootstrap.Modal(this.$refs.productModal);
    // console.log(this.productModal);
  },
};