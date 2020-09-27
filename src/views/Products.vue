<template>
  <div class="products">
      <div class="container">

        Products
    
  </div>
  </div>
</template>

<script>
//import { VueEditor } from "vue2-editor";
//import { fb, db} from '../firebase';

export default {
  name: "Products",
  components: {
    //VueEditor
  },
  props: {
    msg: String
  },

  data(){
    return {
        products: [],
        product: {
          name:null,
          description:null,
          price:null,
          tags:[],
          images:[]
        },
        activeItem:null,
        modal: null,
        tag: null
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.img-wrapp{
  position: relative;
}
.img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: -2px;
}
.img-wrapp span.delete-img:hover{
  cursor: pointer;
}

</style>
