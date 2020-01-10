<template>
    <div id="show-blogs">
        <h1>List Blog Titles</h1>
        <input type="text" v-model="search" placeholder="search blogs" />
        <div v-for="blog in filteredBlogs" 
            v-bind:key="blog.id"
            class="single-blog">
            <h2 v-rainbow>
                {{ blog.title | to-uppercase}}
            </h2>
        </div>
    </div>
</template>

<script>
import  searchMixin from '../mixins/searchMixin.js'
export default {
    data(){
        return{
            blogs:[],
            search:''
        }
    },
    
    created(){
        this.$http.get("https://blogvuefirbase.firebaseio.com/posts.json")
        .then(function(data){
           console.log(data)
           this.blogs =  data.body;
        })
    },
    // register mixin (searchMixin) for the current component 
    mixins: [searchMixin]
}
</script>