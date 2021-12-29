<template>
  <Chart :options="barChartOptionCreator" />
</template>




<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import Chart from "@/components/echart/index.vue";
import common from "@/utils/common";
import chartStateHandle from "../../use/chart.js";

export default {
  name: "chart",
  components: {
    Chart,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});
    const { chartState,initChart } = chartStateHandle();
    onMounted(() => {
      common.goTopScroll();
      initChart()
    });

    return {
      ...toRefs(state),
      ...toRefs(chartState),
    };
  },
};
</script>
