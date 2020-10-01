<template>
  <div class="chekout">
       <Navbar></Navbar>

        <div class="container mt-5 pt-5">

            <div class="row">

                <div class="col-md-8">
                    <h4 class="py-4">Checkout page</h4>
                     <ul>
                        <li v-for="(item, index) in this.$store.state.cart" class="media" :key="index">
                        <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt="">
                        <div class="media-body">
                            <h5 class="mt-0">{{item.productName}}

                                <span class='float-right' @click="$store.commit('removeFromCart',index)">X</span>

                            </h5>
                            <p class="mt-0">{{item.productPrice | currency}}</p>
                            <p class="mt-0">Quantity : {{item.productQuantity }}</p>
                        </div>
                        </li>

                    </ul>
                </div>
                <div class="col-md-4">
                    <p>
                        Total Price : {{ this.$store.getters.totalPrice | currency }}
                    </p>

                    <button class="btn btn-primary" @click="pay">Checkout</button>
                  
                </div>
            </div>

        </div>
  </div>
</template>

<script>

import axios from 'axios';

var stripe = Stripe("pk_test_51HX8jSKFE4EtiRqmnluqxMracYUJmcGNqBXe3Lw7gKqfmOEaCJV763U0dceYTgePGJ2CKfuKoeRvZfBMn2xyClGt00rxnwj6Tk");



export default {
    data () {
      return {
          sessionId:''
      }
    },


  methods: {

      pay(){

          // data = {id:10,id:10}

          let data = this.$store.state.cart.map(item => ({ [item.productId] : item.productQuantity}));
          data = Object.assign({}, ...data);



          axios.get('http://localhost:5001/vue-ecommerce-ccee6/us-central1/CheckoutSession', {
              params: {
                  products : data
              }
          })
            .then(response => {
                this.sessionId = response.data
                console.log(response.data);

                 stripe.redirectToCheckout({
               
                    sessionId: this.sessionId.id
                    }).then(function (result) {
                    
                    });


            })
            .catch(error => {
                console.log(error);
            });


      }
   
  },

  created(){

      


  }
}
</script>



<style>

</style>

