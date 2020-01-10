<template>
<!-- passing a wide as a string  so it must be "'wide'" -->
<!-- after : in v-theme is argument  -->
    <div v-theme:column="'narrow'" id="show-blogs">
        <h1>All Blog Articles</h1>
        <input type="text" v-model="search" placeholder="search blog ^_^">
        <div v-for="(blog ,index) in filteredBlogs" 
        v-bind:key="blog.id" 
        class="single-blog">
        <router-link v-bind:to="'blog/' + blog.id ">
            <h2 v-rainbow>{{index + 1}}.{{blog.title | to-uppercase }}</h2>
        </router-link>
            <article>{{blog.content | snippet }}</article>        
        
        </div>
    </div>
</template>

<script>
import  searchMixin from '../mixins/searchMixin.js'
export default {
    data(){
        return({
            blogs:[],
            search:''
        })
    },
    methods:{

    },
    created(){
        this.$http.get("https://blogvuefirbase.firebaseio.com/posts.json")
        .then(function(data){
            // it is gonna return a promise so we need then clause
            return data.json()
        }).then(function(data){
              var  blogsArray = []
            for(let key in data){
                // console.log(data[key])
                data[key].id = key
                blogsArray.push(data[key])
            }
            console.log(blogsArray)
            this.blogs= blogsArray
        })
    },
    computed:{
        // filteredBlogs: function(){
        //     return this.blogs.filter((blog) => {
        //         return blog.title.match(this.search);
        //     })
        // }
        // filteredBlogs moved to mixin for being usable everywhere
        // is needed
    },
    filters:{
        'to-uppercase': function(value){
            return value.toUpperCase();
            // return value.charAt(0).toUpperCase() + value.slice(1);
        }
        // // anotehre way to write to uppercase filter
        //  toUpperCase(value){
        //     return value.toUpperCase();
        // }
    },
    // local directive 
    directives:{
        'rainbow':{
            bind(el){
                el.style.color = "#" + Math.random().toString(16).slice(2,8)
            }
        }
    },
    mixins: [searchMixin]
    
}
</script>

<style scoped>
    #show-blogs{
        max-width: 800px;
        margin: 0 auto;
    }
    .single-blog{
        padding: 20px;
        margin: 20px 0;
        box-sizing: border-box;
        background: #eee;
    }

</style>