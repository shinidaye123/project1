<template>
	<div>
		<el-form ref="form" label-width="80px">
			<el-form-item label="名称">
				<el-input v-model="title"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="sure">确定</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: ""
		};
	},
	methods: {
		sure() {
			// 取到input的内容
			let title = this.title;
			if (this.type == "添加") {
				// 调用接口
				this.$http
					.post("/api/cateadd", {
						title: title,
						status: 1
					})
					.then(res => {
						console.log(res);
						if (res.data.status == 1) {
							// 关闭弹框
                            this.title = ""
							this.$emit("hide");
							this.$emit("getList");
						}
					});
			} else {
				this.$http
					.post("/api/cateedit", {
						id: this.cateId,
						title: title,
						status: 2
					})
					.then(res => {
						console.log(res);
						if (res.data.status == 1) {
							this.$emit("hide");
							this.$emit("getList");
						}
					});
			}
		}
	},
	created() {
		console.log(this.cateId);
		// 获取一条商品分类
		if (this.cateId) {
			this.$http.get("/api/cateinfo?id=" + this.cateId).then(res => {
				console.log(res);
				if (res.data.status == 1) {
					this.title = res.data.data.title;
				}
			});
		}
	},
	props: ["cateId", "type"],
	watch: {
		type(newVal) {
			if (newVal == "编辑") {
				if (this.cateId) {
					this.$http
						.get("/api/cateinfo?id=" + this.cateId)
						.then(res => {
							console.log(res);
							if (res.data.status == 1) {
								this.title = res.data.data.title;
							}
						});
				}
			} else {
				this.title = "";
			}
		},
		cateId() {
			this.$http.get("/api/cateinfo?id=" + this.cateId).then(res => {
				console.log(res);
				if (res.data.status == 1) {
					this.title = res.data.data.title;
				}
			});
		}
	}
};
</script>

<style scoped>
</style>