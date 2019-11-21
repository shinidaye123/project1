<template>
	<div class="cart">
		<van-nav-bar title="购物车"/>
		<div class="main">
			<ul>
				<li v-for="(item, index) in list" :key="index">
					<input type="checkbox" v-model="item.checked">
					<img :src="'http://localhost:3000' + item.goods_img" alt>
					<div>
						<p>{{item.goods_title}}</p>
						<div class="btns">
							<van-button type="primary" @click="add(index, 2)">-</van-button>
							<span>{{item.goods_num}}</span>
							<van-button type="primary" @click="add(index, 1)">+</van-button>
						</div>
					</div>
					<h3>￥{{item.goods_price}}</h3>
					<span @click="delOne(item, index)">删除</span>
				</li>
			</ul>
			<div class="total">
				<div>
					<label for>全选</label>
					<input type="checkbox" v-model="checkAll">
				</div>
				<p>合计：{{total}}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: []
		};
	},
	methods: {
		add(i, type) {
			let userid = localStorage.getItem("id");
			let goodsid = this.list[i].goodsid;
			this.$http
				.post("/api/cartedit", {
					userid,
					goodsid,
					type: type
				})
				.then(res => {
					console.log(res);
					if (res.data.status == 1) {
						// 说明数据库已经修改成功，去做视觉变化
						// this.$http
						// 	.get("/api/cartlist?userid=" + userid)
						// 	.then(res => {
						// 		console.log(res);
						// 		this.list = res.data.data;
						// 	});
						if (type == 1) {
							this.list[i].goods_num++;
						} else {
							if (this.list[i].goods_num == 1) {
								return;
							}
							this.list[i].goods_num--;
						}
					}
				});
		},
		delOne(item, i) {
			this.$http.post("/api/cartdel", {
				id: item._id
			}).then(res => {
				console.log(res)
				if (res.data.status == 1) {
					this.list.splice(i, 1)
				}
			})
		}
	},
	created() {
		let id = localStorage.getItem("id");
		this.$http.get("/api/cartlist?userid=" + id).then(res => {
			console.log(res);
			this.list = res.data.data;
		});
	},
	computed: {
		checkAll: {
			get() {
				return this.list.every(item => {
					return item.checked;
				});
			},
			set(newVal) {
				// 如果newVal为true，则list内所有商品的checked变成true
				this.list.forEach(item => {
					item.checked = newVal;
				});
			}
		},
		total() {
			let sum = 0;
			this.list.forEach(item => {
				if (item.checked) {
					sum += item.goods_num * item.goods_price
				}
			})
			return sum
		}
	}
};
</script>

<style lang="less" scoped>
.cart {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}
.main {
	display: flex;
	flex-direction: column;
	flex: 1;
	height: 100%;
	ul {
		flex: 1;
		padding: 0 20px;
		li {
			display: flex;
			align-items: center;
			justify-content: space-between;
			img {
				width: 100px;
				height: 100px;
			}
		}
	}
	.total {
		height: 50px;
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
	}
}
</style>