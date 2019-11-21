<template>
	<div>
		<el-form>
			<el-form-item label="分类">
				<el-select v-model="formData.cate" placeholder="请选择分类">
					<el-option
						v-for="(item, index) in  cateArr"
						:key="index"
						:label="item.title"
						:value="item.title"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="活动名称">
				<el-input v-model="formData.title"></el-input>
			</el-form-item>
			<el-form-item label="图片">
				<input type="file" ref="file">
			</el-form-item>
			<el-form-item label="价格">
				<el-input v-model="formData.price"></el-input>
			</el-form-item>
			<el-form-item label="描述">
				<el-input v-model="formData.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="sure">确定</el-button>
				<el-button type="danger">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	created() {
		// 获取所有的商品分类，作为下拉框的选项
		this.$http.get("/api/catelist").then(res => {
			if (res.data.status == 1) {
				this.cateArr = res.data.data;
			}
		});
		// 获取一条商品的接口
		if (this.$route.query.id) {
			// 说明前面点的是编辑
			this.$http
				.get("/api/goodsinfo", {
					params: {
						id: this.$route.query.id
					}
				})
				.then(res => {
					console.log(res);
					if (res.data.status == 1) {
						this.formData = res.data.data;
						delete this.formData.status;
						delete this.formData.imgurl;
						console.log(this.formData);
					}
				});
		}
	},
	data() {
		return {
			formData: {
				cate: "",
				title: "",
				price: "",
				desc: ""
			},
			cateArr: []
		};
	},
	methods: {
		sure() {
			let form = new FormData();
			// FormData 构造函数  append
			for (var key in this.formData) {
				form.append(key, this.formData[key]);
			}
			form.append("status", 1);
			form.append("img", this.$refs.file.files[0]);
			// console.log(document.querySelector('.file'))
			if (this.$route.query.id) {
                form.append("id", this.$route.query.id)
                this.$http.post("/api/goodsedit", form).then(res => {
                    console.log(res)
                    if (res.data.status == 1) {
                        this.$router.push("/admin/goods");
                    }
                })
			} else {
				this.$http.post("/api/goodsadd", form).then(res => {
					console.log(res);
					if (res.data.status == 1) {
						// 跳回商品管理
						this.$router.push("/admin/goods");
					}
				});
			}
		}
	}
};
</script>

<style scoped>
</style>