import { ref, onMounted } from "vue"
const viewWidth = ref(document.documentElement.clientWidth)
const viewHeight = ref(document.documentElement.clientHeight)

export default () => {
  onMounted(() => {
    window.addEventListener("resize", () => {
      viewWidth.value = document.documentElement.clientWidth
      viewHeight.value = document.documentElement.clientHeight
    })
  })

  return {
    viewWidth,
    viewHeight
  }
}
