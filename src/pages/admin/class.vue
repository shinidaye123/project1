<template>
	<div>
		<el-button type="success" @click="add">添加</el-button>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index" width="50" label="账号"></el-table-column>
			<el-table-column prop="title" label="名称" width="180"></el-table-column>
			<el-table-column fixed="right" label="操作">
				<template slot-scope="scope">
					<el-button type="success" size="small" @click="edit(scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="del(scope.row, scope)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<masks :type="type" :cateId="cateId" @hide="hide" @getList="getList"></masks>
		</el-dialog>
	</div>
</template>

<script>
import masks from "../../components/class/masks";
export default {
	data() {
		return {
			tableData: [],
			dialogVisible: false,
			type: "",
			cateId: ""
		};
	},
	components: {
		masks
	},
	methods: {
		edit(row) {
			this.type = "编辑";
			console.log(row);
			// 显示弹框
			this.dialogVisible = true;
			// 需要做回显,拿到点击分类的id，传给子组件
			this.cateId = row._id;
		},
		del(row, scope) {
			// 调用删除接口
			console.log(scope);
			this.$confirm("此操作将永久删除该管理员?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.$http
						.post("/api/catedel", {
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
		hide() {
			this.dialogVisible = false;
		},
		getList() {
			this.$http.get("/api/catelist").then(res => {
				console.log(res);
				if (res.data.status == 1) {
					this.tableData = res.data.data;
				}
			});
		},
		add() {
			this.type = "添加";
			// 显示弹框
			this.dialogVisible = true;
		}
	},
	created() {
		this.getList();
	}
};
</script>

<style scoped>
</style>