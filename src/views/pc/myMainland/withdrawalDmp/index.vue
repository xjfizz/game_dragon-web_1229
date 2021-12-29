<template>
  <withdrawDetail v-if="detailShow" />
  <div class="dmp-withDrawDmp-main">
   <Header :headIndex="3"></Header>
    <div class="main-content">
      <div class="wrap">
         <div class="withDrawDmp-top">
          <top />
        </div>
        <div class="withDrawDmp-bottom">
          <bottom/>
        </div>
      </div>
      <bottomSelect v-if="haveSelectedList.length > 0 && !isSingle" />
       
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/HeaderMarketPlace";
import common from "@/utils/common";
import withdrawlDmpHandle from "@/views/pc/myMainland/use/withdrawlDmp";
import top from './commponents/top'
import bottom from './commponents/bottom'
import bottomSelect from './commponents/bottom-select'
import withdrawDetail from './commponents/withdrawDetail'

export default {
  name: "withdrawalDmp",
  components: {
    Header,
    top,
    bottom,
    bottomSelect,
    withdrawDetail,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});

    const { back , withdrawlDmpState} = withdrawlDmpHandle();
    onMounted(() => {
      common.goTopScroll();
      // init();
    });

    return {
      ...toRefs(state),
      ...toRefs(withdrawlDmpState),
      back,
    };
  },
};
</script>

<style lang="less" scoped >
.dmp-withDrawDmp-main {
  width: 100%;
  min-height: 2000px;
  background: #282523;
  .main-content {
   display: flex;
   justify-content: center;
   .wrap{
     width: 1200px;
   }
  }
}
</style>
