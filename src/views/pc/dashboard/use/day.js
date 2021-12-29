import {
  reactive,
  onMounted,
  toRefs,
  onBeforeUnmount,
  inject,
  getCurrentInstance,
  toRaw,
  ref,
  nextTick,
} from "vue";
const state = reactive({
  showTab: 1,
});
export default function burnHandle() {
  const handleTabChange = (type) => {
    state.showTab = type;
  };
  return {
    state,
    handleTabChange,
  };
}
