<template>
  <div class="thumb-example">
    <!-- swiper1 -->
    <swiper
      class="swiper gallery-top"
      :options="swiperOptionTop"
      ref="swiperTop"
    >
      <swiper-slide v-for="(url, index) in items" :key="url">
        <img :src="url" alt="" @click="galleryFullScreen(index)" style="width: 100%;" />
      </swiper-slide>
      <div
        class="swiper-button-next swiper-button-white"
        slot="button-next"
      ></div>
      <div
        class="swiper-button-prev swiper-button-white"
        slot="button-prev"
      ></div>
    </swiper>
    <!-- swiper2 Thumbs -->
    <swiper
      class="swiper gallery-thumbs"
      :options="swiperOptionThumbs"
      ref="swiperThumbs"
    >
      <swiper-slide v-for="url in items" :key="url">
        <img :src="url" alt="" style="width: 100%; object-fit: cover" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "swiper-example-thumbs-gallery",
  title: "Thumbs gallery with Two-way control",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ["items"],
  data() {
    return {
      swiperOptionTop: {
        loop: false,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      swiperOptionThumbs: {
        loop: false,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  },
  methods: {
    ...mapMutations([
      "SET_DIALOG_GALLERY_FULL",
      "SET_ITEMS_DIALOG",
      "SET_INDEX_DIALOG",
    ]),
    galleryFullScreen(index) {
      console.log(index);
      this.SET_ITEMS_DIALOG(this.items);
      this.SET_INDEX_DIALOG(index);
      this.SET_DIALOG_GALLERY_FULL(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.thumb-example {
  height: 480px;
  background-color: white;
}
.swiper {
  .swiper-slide {
    background-position: center;
  }
  &.gallery-top {
    height: 80%;
    width: 100%;
  }
  &.gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 0;
  }
  &.gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  &.gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
}
</style>
