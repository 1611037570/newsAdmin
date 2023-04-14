<template>
  <div ref="containerRef">
    <!-- 展开菜单的范围 -->
    <slot></slot>
    <!-- 将菜单传递到body -->
    <teleport to="body">
      <Transition
        @beforeEnter="handleBeforeEnter"
        @enter="handleEnter"
        @afterEnter="handleAfterEnter"
      >
        <!-- 便利菜单项 -->
        <div v-if="show" class="container" :style="pos">
          <div class="list" v-resize="handeleDivView">
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
// 接收父组件传递的菜单项
const props = defineProps({
  menus: {
    type: Array<any>,
    default: () => []
  }
})
// 菜单项事件点击 调用回调函数
const handleClick = (menu: any) => {
  menu.callBack && menu.callBack(menu)
}
// 获取 菜单坐标 和 是否显示菜单
const containerRef = ref()
const { x, y, show } = useMenus(containerRef)
// 获取 视图大小
const { viewWidth, viewHeight } = useViewport()
// 获取菜单大小
const w = ref(0)
const h = ref(0)
const handeleDivView = (size: any) => {
  w.value = size.width
  // 这里没获取h 是因为加了过渡 高度会一直更新
  // h.value = size.height
}

// 菜单加载前
const handleBeforeEnter = (el: any) => {
  el.style.height = 0
}
// 菜单加载后
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
// 菜单离开时
const handleAfterEnter = (el: any) => {
  el.style.transition = "none"
}

// 动态计算菜单坐标
const pos = computed(() => {
  // 菜单坐标
  let menuX = x.value
  let menuY = y.value
  // 视图大小
  let vW = viewWidth.value
  let vH = viewHeight.value
  // 菜单大小
  let menuW = w.value
  let menuH = h.value
  // x 坐标
  menuX = menuX > vW - w.value ? menuX - menuW : menuX
  // Y 坐标
  menuY = menuY > vH - menuH ? menuY - vH + menuH : menuY
  return {
    left: menuX + "px",
    top: menuY + "px"
  }
})
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
