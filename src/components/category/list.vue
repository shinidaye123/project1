<template>
    <div class="list">
        <div class="left">
            <ul>
                <li 
                v-for="(item, index) in categoryList" 
                :key="item._id" 
                :class="{'active': index == ind}"
                @click="changeTab(index)"
                >{{item.title}}</li>
            </ul>
        </div>
        <div class="right">
            <ul>
                <li v-for="(item) in list" :key="item._id" @click="goDetail(item._id)">
                    <img :src="'http://localhost:3000' + item.imgurl" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                categoryList: [],
                ind: 0,
                list: [],
                data: null
            }
        },
        methods: {
            changeTab(i) {
                // 1. 控制左侧高亮的切换
                this.ind = i
                // 2. 右侧需要展示对应的商品
                this.list = this.data[i].children
            },
            goDetail(id) {
                this.$router.push('/detail?id=' + id)
            }
        },
        created() {
            this.$http.get("/api/catelist").then(res => {
                console.log(res)
                this.categoryList = res.data.data
            })
            this.$http.get('/api/categoods').then(res => {
                console.log(res)
                this.data = res.data.data
                this.list = res.data.data[0].children
            })
        }
    }
</script>

<style lang="less" scoped>
.list {
    display: flex;
    .left {
        width: 100px;
        ul {
            li {
                height: 40px;
                text-align: center;
                line-height: 40px;
                background-color: #ccc;
                &.active {
                    color: red;
                }
            }
        }
    }
    .right {
        flex: 1;
        padding-left: 20px;
        ul {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            li {
                width: 45%;
                img {
                    width: 100%;
                }
            }
        }
    }
}
</style>