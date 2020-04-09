<template>
    <div class="pagination-wrap" v-if="pageNum">
        <span class="demonstration">共{{pageNum}}页</span>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="pageNum" prev-text="上一页" next-text="下一页" @current-change="currentChange">
        </el-pagination>
    </div>
    
</template>

<script>
export default {
    name: 'pagination',
    data () {
        return {    
            
        }
    },
    components:{
  	
    },
    props:["pageNum"],
    computed:{

    },
    created(){

    },
    mounted(){
       
    },
    methods:{
        currentChange(page){
            this.$emit("changePage",page);
        }
    },
    watch:{

    }
  
}
</script>

