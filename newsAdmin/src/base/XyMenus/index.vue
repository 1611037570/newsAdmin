<template>
  <div ref="containerRef">
    <slot></slot>
    <!-- 将菜单传递到body -->
    <teleport to="body">
      <Transition
        @beforeEnter="handleBeforeEnter"
        @enter="handleEnter"
        @afterEnter="handleAfterEnter"
      >
        <div v-if="show" class="container" :style="pos">
          <div class="list" v-div="handeleDivView">
            <div
              class="item"
              v-for="menu in props.menus"
              :key="menu.label"
              @click="handleClick(menu)"
            >
              {{ menu.label }}
            </div>
          </div>
        </div>
      </Transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import useMenus from "./useMenus"
import useViewport from "./useViewport"
const { viewWidth, viewHeight } = useViewport()
const props = defineProps({
  menus: {
    type: Array<any>,
    default: () => []
  }
})
const containerRef = ref()
const { x, y, show } = useMenus(containerRef)
const pos = computed(() => {
  let posX = x.value
  let posY = y.value
  // x 坐标
  if (x.value > viewWidth.value - w.value) {
    posX -= w.value
  }
  if (y.value > viewHeight.value - h.value) {
    posY -= y.value - viewHeight.value + h.value
  }
  return {
    left: posX + "px",
    top: posY + "px"
  }
})

const w = ref(0)
const h = ref(0)
const handeleDivView = (size: any) => {
  w.value = size.width
  // 这里没获取h 是因为加了过渡 会一直更新耗费资源 之前有写过handleEnter可以获取高度
  // h.value = size.height
}
// 菜单项事件点击 调用回调函数
const handleClick = (menu: any) => {
  menu.callBack && menu.callBack(menu)
}
// 元素加载到页面前
const handleBeforeEnter = (el: any) => {
  el.style.height = 0
}
// 元素加载到页面后
const handleEnter = (el: any) => {
  el.style.height = "auto"
  const height = el.clientHeight
  h.value = height
  el.style.height = 0
  // html5新增 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画
  // 该方法需要传入一个回调函数  回调函数会在页面被刷新时前调用
  requestAnimationFrame(() => {
    el.style.height = height + "px"
    el.style.transition = ".5s"
  })
}
// 元素离开页面时
const handleAfterEnter = (el: any) => {
  el.style.transition = "none"
}
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  background-color: #eee;
  width: 100px;
  color: #1d1d1f;
  z-index: 999999999999;
  .list {
    width: 100%;
    height: 100%;
    border: 1px solid;
    border-radius: 10px;
    box-sizing: border-box;
    .item {
      box-sizing: border-box;
      padding-left: 10px;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      &:hover {
        background-color: red;
        border-radius: 10px;
      }
    }
  }
}
</style>
