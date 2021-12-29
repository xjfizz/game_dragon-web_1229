<template>
  <div class="video-content">
    <div class="video-title">What is the Dragon Mainland</div>
    <div class="video-mid">
      <div class="video-mid-left">
        <div
          class="video-mid-left-item"
          :class="
            item.id == playerOptions.id
              ? 'selected' + (' item-bc' + item.id)
              : 'item-bc' + item.id
          "
          v-for="(item, index) in videoList"
          :key="index"
          @click="playVideo(item)"
        ></div>
      </div>
      <div class="video-mid-right">
        <div class="video">
          <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayerItemRef"
            :playsinline="true"
            :options="playerOptions"
          >
          </video-player>
        </div>
      </div>
    </div>
  </div>
</template>

    <script>
import { reactive, toRefs, onMounted, ref, nextTick } from "vue";
export default {
  setup() {
    const state = reactive({
      videoList: [
        {
          id: 4,
          //播放速度
          playbackRates: [0.5, 1.0, 1.5, 2.0],
          //如果true,浏览器准备好时开始回放。
          autoplay: false,
          // 默认情况下将会消除任何音频。
          muted: false,
          // 导致视频一结束就重新开始。
          loop: true,
          // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          preload: "auto",
          language: "zh-CN",
          // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          aspectRatio: "16:9",
          // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          fluid: true,
          sources: [
            {
              //类型
              type: "video/mp4",
              //url地址
              src: "https://dragonmainland.s3.ap-southeast-1.amazonaws.com/video/video4.mp4", // 'https://dragon1164.s3.ap-southeast-1.amazonaws.com/video.mp4',//  require('@/assets/video/videoPlay/videoPlay1.mp4') // "@/assets/video/videoPlay/videoPlay1.mp4", // https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_home_web/medias/banner_video3.3ce510ed.mp4
            },
          ],
          //你的封面地址
          poster: require("@/assets/imgs/home/home-video-poster4.png"),
          //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          notSupportedMessage: "此视频暂无法播放，请稍后再试",
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            //全屏按钮
            fullscreenToggle: true,
          },
        },

        {
          id: 2,
          //播放速度
          playbackRates: [0.5, 1.0, 1.5, 2.0],
          //如果true,浏览器准备好时开始回放。
          autoplay: false,
          // 默认情况下将会消除任何音频。
          muted: false,
          // 导致视频一结束就重新开始。
          loop: true,
          // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          preload: "auto",
          language: "zh-CN",
          // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          aspectRatio: "16:9",
          // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          fluid: true,
          sources: [
            {
              //类型
              type: "video/mp4",
              //url地址
              src: "https://dragonmainland.s3.ap-southeast-1.amazonaws.com/video/video2.mp4", // 'https://dragon1164.s3.ap-southeast-1.amazonaws.com/video.mp4',//  require('@/assets/video/videoPlay/videoPlay1.mp4') // "@/assets/video/videoPlay/videoPlay1.mp4", // https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_home_web/medias/banner_video3.3ce510ed.mp4
            },
          ],
          //你的封面地址
          poster: require("@/assets/imgs/home/home-video-poster2.png"),
          //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          notSupportedMessage: "此视频暂无法播放，请稍后再试",
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            //全屏按钮
            fullscreenToggle: true,
          },
        },

        {
          id: 3,
          //播放速度
          playbackRates: [0.5, 1.0, 1.5, 2.0],
          //如果true,浏览器准备好时开始回放。
          autoplay: false,
          // 默认情况下将会消除任何音频。
          muted: false,
          // 导致视频一结束就重新开始。
          loop: true,
          // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          preload: "auto",
          language: "zh-CN",
          // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          aspectRatio: "16:9",
          // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          fluid: true,
          sources: [
            {
              //类型
              type: "video/mp4",
              //url地址
              src: "https://dragonmainland.s3.ap-southeast-1.amazonaws.com/video/video3.mp4", // 'https://dragon1164.s3.ap-southeast-1.amazonaws.com/video.mp4',//  require('@/assets/video/videoPlay/videoPlay1.mp4') // "@/assets/video/videoPlay/videoPlay1.mp4", // https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_home_web/medias/banner_video3.3ce510ed.mp4
            },
          ],
          //你的封面地址
          poster: require("@/assets/imgs/home/home-video-poster3.png"),
          //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          notSupportedMessage: "此视频暂无法播放，请稍后再试",
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            //全屏按钮
            fullscreenToggle: true,
          },
        },
        {
          id: 1,
          //播放速度
          playbackRates: [0.5, 1.0, 1.5, 2.0],
          //如果true,浏览器准备好时开始回放。
          autoplay: true,
          // 默认情况下将会消除任何音频。
          muted: false,
          // 导致视频一结束就重新开始。
          loop: true,
          // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          preload: "auto",
          language: "zh-CN",
          // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          aspectRatio: "16:9",
          // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          fluid: true,
          sources: [
            {
              //类型
              type: "video/mp4",
              //url地址
              src: "https://dragonmainland.s3.ap-southeast-1.amazonaws.com/video/video1.mp4", // 'https://dragon1164.s3.ap-southeast-1.amazonaws.com/video.mp4',//  require('@/assets/video/videoPlay/videoPlay1.mp4') // "@/assets/video/videoPlay/videoPlay1.mp4", // https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_home_web/medias/banner_video3.3ce510ed.mp4
            },
          ],
          //你的封面地址
          poster: require("@/assets/imgs/home/home-video-poster1.png"),
          //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          notSupportedMessage: "此视频暂无法播放，请稍后再试",
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            //全屏按钮
            fullscreenToggle: true,
          },
        },
      ],
      playerOptions: {},
      videoPlayerRef: null,
    });
    let videoPlayerItemRef = ref(null);
    onMounted(() => {
      state.playerOptions = state.videoList[0];
      console.log("videoPlayerItemRef", videoPlayerItemRef);
      //  state.videoPlayerRef = videoPlayerItemRef
    });

    const playVideo = (item) => {
      state.playerOptions = item;
      // nextTick(() => {
      //   console.log(videoPlayerItemRef);
      //   videoPlayerItemRef.value.preload()
      // });
    };

    const play = (e) => {
      console.log(e);
    };

    return {
      ...toRefs(state),
      playVideo,
      play,
    };
  },
};
</script>

<style lang="less" scoped>
.video-content {
  z-index: 99;
  width: 992px;
  height: 638px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../assets/imgs/home/home-mainLand-bc1.png");
  display: flex;
  flex-direction: column;
  align-items: center;
  .video-title {
    margin-top: 47px;
    height: 54px;
    //font-size: 48px;
    font-size: 44px;
    font-family: WendyOne-Regular, WendyOne;
    font-weight: 400;
    color: #ffffff;
    line-height: 54px;
    letter-spacing: 1px;
    text-shadow: 0px 4px 0px rgba(0, 0, 0, 0.38);
    text-align: center;
  }
  .video-mid {
    margin-top: 26px;
    display: flex;
    justify-content: space-between;
    .video-mid-left {
      // .selected {
      //   opacity: 0.68;
      // }
      .video-mid-left-item {
        width: 166px;
        height: 97px;
        background-repeat: no-repeat;
        background-size: cover;
        margin-bottom: 9px;
        border-radius: 8px;
        cursor: pointer;
      }
      .item-bc1 {
        background-image: url("../../assets/imgs/home/home-video-poster1.png");
      }
      .item-bc2 {
        background-image: url("../../assets/imgs/home/home-video-poster2.png");
      }
      .item-bc3 {
        background-image: url("../../assets/imgs/home/home-video-poster3.png");
      }
      .item-bc4 {
        background-image: url("../../assets/imgs/home/home-video-poster4.png");
      }
    }
    .video-mid-right {
      width: 732px;
      height: 424px;
      margin-left: 19px;
      display: flex;
      align-items: center;
      justify-content: center;
      .video {
        display: inline-block;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        .vjs-poster {
          background-color: #ffffff !important;
        }
      }
    }
  }
}
</style>>

<style lang="less" >
.video {
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  .vjs-poster {
    background-color: #974d25 !important;
    top: -10 px;
    right: 0;
    bottom: 0;
    left: 0;
    height: 101%;
  }
}
</style>
    
