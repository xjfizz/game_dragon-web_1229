<template>
  <!-- <div v-if="$process_env == 'development'" class="bind-box-main"> -->
  <div v-if="true" class="bind-box-main">
    <bindBox></bindBox>
  </div>
  <div v-else class="npData">
    <div class="noData-wrap">
      <div class="no-dragon">
        <img src="../../../assets/imgs/myMainland/no-data.png" alt="" />
      </div>
      <div class="no-data-title">No data</div>
      <div class="no-data-des">
        * The blind box will be open soon, so stay tuned !
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, onBeforeUnmount, toRefs } from "vue";
import { useRouter } from "vue-router";

import common from "@/utils/common";
import myMainland from "@/views/pc/myMainland/use/myMainland";
import bindBox from "@/views/pc/myMainland/bindBox/index.vue";
import blindBoxHandle from "@/views/pc/myMainland/use/blindBox";

export default {
  name: "blindBox",
  components: { bindBox },
  setup() {
    const router = useRouter();
    const state = reactive({});
    const { myMainlandState } = myMainland();
    const { init } = blindBoxHandle();
    onMounted(() => {
      myMainlandState.leftItemSelected = 2;
      common.goTopScroll();
    });

    return {
      ...toRefs(state),
      ...toRefs(myMainlandState),
    };
  },
};
</script>

<style lang="less" scoped >
.bind-box-main {
  padding: 32px 230px;
}
</style>