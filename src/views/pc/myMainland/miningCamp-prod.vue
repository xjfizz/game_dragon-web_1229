<template>
  <div v-if="false" class="mydragon">camp</div>
    <div v-else class="npData">
   <div class="noData-wrap">
      <div class="no-dragon">
        <img src="../../../assets/imgs/myMainland/no-data.png" alt="" />
      </div>
      <div class="no-data-title">No data</div>
      <div class="no-data-des">
        * The mining camp will be open soon, so stay tuned !
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";

import common from "@/utils/common";
import myMainland from "@/views/pc/myMainland/use/myMainland";

export default {
  name: "miningCamp",
  components: {},
  setup() {
    const router = useRouter();
    const state = reactive({});
    const {  myMainlandState } = myMainland();
    onMounted(() => {
      myMainlandState.leftItemSelected = 3;
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
.my-dragon-main {
}
</style>