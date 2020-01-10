<template>
  <div id="add-blog">
    <h2>Add a New Blog Post</h2>
    <form action="" v-show="!submitted">
      <label for="">Blog Title:</label>
      <!-- v-model.lazy does not show the update right away
      it shows when we switche to different field -->
      <input type="text" name="" id="" v-model.lazy="blog.title" required/>
      <label for="">Blog Content:</label>   
      <textarea name="" id="" cols="30" rows="10" v-model="blog.content"></textarea>  
      <div id="checkboxes">
        <label for="">Ninjas</label>
        <input type="checkbox" value="ninjas" name="" id="1" v-model="blog.categories"/>
        <label for="">Wizards</label>
        <input type="checkbox" value="wizards" name="" id="2" v-model="blog.categories"/>
        <label for="">Mario</label>
        <input type="checkbox" value="mario" name="" id="3" v-model="blog.categories"/>
        <label for="">Cheese</label>
        <input type="checkbox" value="cheese" name="" id="4" v-model="blog.categories"/>
      </div> 
      <label for="">Author:</label>
      <select name="" id="" v-model="blog.author">
        <option v-for="author in authors"
                v-bind:key="author.id">
                {{author}}
        </option>
      </select> 
      <button v-on:click.prevent="post">Post Blog</button>     
    </form>
    <div v-if="submitted">
      <h3>Thanks for adding your post</h3>
    </div>
    <div id="perview">
      <h3>Preview Blog</h3>
      <p>Blog title: {{blog.title}}</p>
      <p>Blog content: </p>
      <p>{{blog.content}}</p>
      <p>Blog Categories:</p>
        <ul>
          <li v-for="category in blog.categories"
              v-bind:key="category.id"> 
              {{category}}
          </li>
        </ul>
      <p>Author: {{blog.author}}</p>
    </div>
  </div>
</template>

<script>
export default { 
  props: {
  
  },
  data(){
    return(
      {
        blog:{
          title: "",
          content:"",
          categories:[],
          author:""
        },
        authors:['The Net Ninja', 'The Angular Avenger', "The Vue Vindicator"],
        submitted: false,
      }
    )
  },
  methods:{
    post:function(){
      this.$http.post("https://blogvuefirbase.firebaseio.com/posts.json",
      this.blog).then(function(data){
          console.log(data);
          this.submitted = true;
      } );
    }
  }
}
</script>

<style>
 #add-blog *{
    box-sizing: border-box;
}
#add-blog{
    margin: 20px auto;
    max-width: 500px;
}
label{
    display: block;
    margin: 20px 0 10px;
}
input[type="text"], textarea{
    display: block;
    width: 100%;
    padding: 8px;
}
#preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
}
h3{
    margin-top: 10px;
}
#checkboxes input{
  display: inline-block;
  margin-right: 10px;
}
#checkboxes label{
  display: inline-block
}

</style>
