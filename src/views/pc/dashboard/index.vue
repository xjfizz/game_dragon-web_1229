<template>
  <div class="container router-view">
    <Header :headIndex="7"></Header>
    <div class="main">
      <div class="list">
        <!-- <div class="days">
          <days />
        </div> -->
        <div class="burn"><total-burn /></div>
      </div>
    </div>
  </div>
</template>

<script>
import totalBurn from "./components/totalBurn.vue";
import days from "./components/days.vue";
import Header from "@/components/HeaderMarketPlace";
export default {
  components: {
    totalBurn,
    Header,
    days,
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  background: #282523;

  height: calc(100% - 80px);
}
.main {
  height: 100%;
  overflow: auto;
  background: #282523;
  .list {
    width: 1200px;
    margin: 0 auto;
  }
}
.days {
  padding-top: 30px;
}
.burn {
  padding-top: 40px;
}
</style>
