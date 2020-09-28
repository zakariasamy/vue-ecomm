<template>
  <div class="products">
      <div class="container">
          
        <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
              <div class="col-md-6">
                    <h3>Products Page</h3>
                    
                 <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.
                 </p>
              </div>
              <div class="col-md-6">
                  <img src="/img/svg/products.svg" alt="" class="img-fluid">
              </div>
            </div>
          </div>

          <hr>

          <div class="product-test">


            <h3 class="d-inline-block">Products list</h3>
            <button @click="addNew" class="btn btn-primary float-right">Add Product</button>

            <div class="table-responsive">
              
                <table class="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Modify</th>
                    </tr>
                  </thead>

                  <tbody>
                      <tr v-for="(product,index) in products" v-bind:key="index">
                        <td>
                          {{product.data().name}}
                        </td>

                        <td>
                          {{product.data().price}}
                        </td>

                        <td>

                          <button class="btn btn-primary" @click="editProduct(product)">Edit</button>
                          <button class="btn btn-danger" @click="deleteProduct(product.id)">Delete</button>
                        </td>

                      </tr>


                  </tbody>
                </table>
            </div>

          </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>


                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                  </div>
                </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" >Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal edit-->
      <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>


                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                  </div>
                </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary" >Save changes</button>
            </div>
          </div>
        </div>
      </div>


    
  </div>
</template>

<script>

import { fb, db} from '../firebase';

export default {
  name: "Products",

  data(){
    return {
        products: [],
        product: {
          name:null,
          //description:null,
          price:null,
          id:null
          //tags:[],
          //images:[]
        }
        //activeItem:null,
        //modal: null,
        //tag: null
    }
  },

  methods:{
    watcher(){
      db.collection("products").onSnapshot((querySnapshot)=> {
        this.products=[]
        querySnapshot.forEach((doc)=> {
            this.products.push(doc);
        });
        console.log("Current cities in CA: ", cities.join(", "));
      });
    },
    readData(){
      db.collection("products").get().then((querySnapshot)=> {
      querySnapshot.forEach((doc)=> {
          // doc.data() is never undefined for query doc snapshots
          this.products.push(doc)
      });
    });
    },

    deleteImage(img,index){

      let image = fb.storage().refFromURL(img);

      this.product.images.splice(index,1);

      image.delete().then(function() {
        console.log('image deleted');
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log('an error occurred');
      });

    },

    addTag(){
       this.product.tags.push(this.tag);
       this.tag = "";
    },
    uploadImage(e){

      if(e.target.files[0]){
        
          let file = e.target.files[0];
    
          var storageRef = fb.storage().ref('products/'+ Math.random() + '_'  + file.name);
    
          let uploadTask  = storageRef.put(file);
    
          uploadTask.on('state_changed', (snapshot) => {
            
          }, (error) => {
            // Handle unsuccessful uploads
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images.push(downloadURL);
            });

          });

      }




    },

    reset(){
      this.product = {
          name:null,
          //description:null,
          price:null,
          //tags:[],
         // images:[]
      }
    },

    addNew(){
        this.modal = 'new';
        this.reset();
        $('#product').modal('show');
    },
    updateProduct(id){
      db.collection("products").doc(this.product.id).update({
          "price": this.product.price,
          "name":this.product.name,
      })
      .then(()=> {
        this.watcher();
        $('#edit').modal('hide');
          console.log("Document successfully updated!");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    },

    editProduct(product){
      this.modal = 'edit';
      //this.product = product;
      this.product.name=product.data().name
      this.product.price=product.data().price
      this.product.id=product.id
      $('#edit').modal('show');
    },


    deleteProduct(id){

db.collection("products").doc(id).delete().then(()=> {
    this.watcher()
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
        
    },

    addProduct(){
      db.collection("products").add({
        'name':this.product.name,
        'price':this.product.price
      })
      .then((docRef)=> {
        this.watcher()
          console.log("Document written with ID: ", docRef.id);
          this.reset()
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

      $('#product').modal('hide');
    }

  
  },
  created(){
    this.readData()

  }
};
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