<template>
	<div>
		<el-form ref="form" label-width="80px">
			<el-form-item label="账号" v-if="type != '添加'">
				<el-input v-model="detail1._id"></el-input>
			</el-form-item>
			<el-form-item label="用户名">
				<el-input v-model="detail1.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="detail1.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="sure">确定</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			detail1: {
				username: "",
				password: ""
			}
		};
	},
	created() {
		// console.log(this.type)
		// if (this.type == "编辑") {
		if (this.detail) {
			this.$http.get("/api/userinfo?id=" + this.detail).then(res => {
				console.log(res);
				this.detail1 = res.data.data;
			});
		}

		// } else {
		// this.detail1 = ""
		// }
	},
	methods: {
		sure() {
			if (this.type == "编辑") {
				this.$http
					.post("/api/useredit", {
						id: this.detail1._id,
						username: this.detail1.username,
						password: this.detail1.password
					})
					.then(res => {
						console.log(res);
						if (res.data.status == 1) {
							// 关闭弹框
							this.$emit("hide");
							this.$emit("getList");
						}
					});
			} else {
				this.$http
					.post("/api/useradd", {
						username: this.detail1.username,
						password: this.detail1.password
					})
					.then(res => {
						console.log(res);
						if (res.data.status == 1) {
							// 关闭弹框
							this.$emit("hide");
							this.$emit("getList");
						}
					});
			}
		}
	},
	props: ["detail", "type"],
	watch: {
		type(newVal) {
			if (newVal == "添加") {
				this.detail1 = {
					username: "",
					password: ""
				};
			} else {
				this.$http.get("/api/userinfo?id=" + this.detail).then(res => {
					console.log(res);
					this.detail1 = res.data.data;
				});
			}
		}
	}
};
</script>

<style scoped>
</style>