import { createStore } from 'vuex'
import getters from './getters'

// 模块拆分，自动导入modules目录下的模块
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// 调用createStore
export default createStore({
  getters,
  modules
})