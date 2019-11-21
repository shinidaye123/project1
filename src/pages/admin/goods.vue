<template>
	<div>
		<el-button type="success" @click="add">添加</el-button>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" width="50" label="编号"></el-table-column>
			<el-table-column prop="cate" width="80" label="分类"></el-table-column>
			<el-table-column prop="title" width="80" label="名称"></el-table-column>
			<el-table-column prop="imgurl" width="120" label="图片">
				<template slot-scope="scope">
                    <img :src="'http://localhost:3000' + scope.row.imgurl" alt="">
				</template>
            </el-table-column>
			<el-table-column prop="price" width="100" label="价格"></el-table-column>
			<el-table-column prop="desc" label="描述" width="180"></el-table-column>
			<el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
					<el-button type="success" size="small" @click="edit(scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="del(scope.row, scope)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
    data() {
        return {
            tableData: []
        }
    },
    created() {
        this.$http.get("/api/goodslist").then(res => {
            console.log(res)
            if (res.data.status == 1) {
                this.tableData = res.data.data
            }
        })
    },
    methods: {
        edit(row) {
            // row就是一条商品
            this.$router.push("/admin/goodsChange?id=" + row._id)
        },
        del(row, scope){
            console.log(scope);
			this.$confirm("此操作将永久删除该管理员?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.$http
						.post("/api/goodsdel", {
							id: row._id
						})
						.then(res => {
							if (res.data.status == 1) {
								this.tableData.splice(scope.$index, 1);
								this.$message({
									type: "success",
									message: "删除成功!"
								});
							}
						});
				})
				.catch(() => {
					console.log("取消");
					this.$message({
						type: "info",
						message: "已取消删除"
					});
				});
        },
        add() {
            this.$router.push("/admin/goodsChange")
        }
    },
};
</script>

<style scoped>
img {
    width: 100%;
}
</style>