<template>
	<div>
		<div class="banner">
			<!-- <van-swipe :autoplay="3000">
				<van-swipe-item v-for="(image, index) in images" :key="index">
					<img :src="'http://localhost:3000' + image.imgurl">
				</van-swipe-item>
			</van-swipe>-->
			<!-- swiper -->
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(image, index) in images" :key="index">
						<img :src="'http://localhost:3000' + image.imgurl">
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
		<p>{{id}}</p>
	</div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
	data() {
		return {
			images: []
		};
	},
	created() {
		this.$http.get("/api/bannerlist").then(res => {
			console.log(res);
			this.images = res.data.data;
			this.$nextTick(() => {
				new Swiper(".swiper-container", {
					autoplay: {
						delay: 1000
					},
					pagination: {
						el: ".swiper-pagination"
					}
				});
			});
		});
	},
	mounted() {},
	computed: {
		id() {
			return this.$store.state.id;
		}
	}
};
</script>

<style scoped>
</style>