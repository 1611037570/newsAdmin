import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import piniaPluginPersist from "pinia-plugin-persist" //引入pinia数据持久化插件
import "./assets/base.less"
import "element-plus/theme-chalk/index.css"
// console.log("import.meta.env :>> ", import.meta.env.VITE_BASE_URL)

// 全局事件总线
import mitt from "mitt"
const Mit = mitt()
declare module "vue" {
  export interface ComponentCustomProperties {
    emitter: typeof Mit
  }
}
// 缓存
import cache from "./utils/cache"

// ws
import ScoketService from "./utils/ws"
ScoketService.inStance.connect()

const app = createApp(App)
// // 注册 resize 指令
import { install as resizeInstall } from "@/utils/useReSize"
resizeInstall(app)

app.config.globalProperties.$bus = Mit
app.config.globalProperties.$cache = cache
app.config.globalProperties.$socket = ScoketService.inStance
app.use(createPinia().use(piniaPluginPersist))

app.use(router)

app.mount("#app")
