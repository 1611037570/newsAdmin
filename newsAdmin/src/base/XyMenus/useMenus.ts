import { onMounted, onBeforeUnmount, ref } from "vue"
const useMenus = (containerRef: any) => {
  const show = ref(false)
  const x = ref(0)
  const y = ref(0)
  const handleContextMenu = (e: any) => {
    e.preventDefault()
    e.stopPropagation() // 阻止事件冒泡
    show.value = true
    x.value = e.clientX
    y.value = e.clientY
  }
  const closeMenus = () => {
    show.value = false
  }
  onMounted(() => {
    const div = containerRef.value
    div.addEventListener("contextmenu", handleContextMenu)
    window.addEventListener("click", closeMenus, true) // 捕获阶段处理，预防阻止事件冒泡无法触发
    window.addEventListener("contextmenu", closeMenus, true)
  })

  onBeforeUnmount(() => {
    const div = containerRef.value
    div.removeEventListener("contextmenu", handleContextMenu)
    window.addEventListener("click", closeMenus, true)
    window.addEventListener("contextmenu", closeMenus, true)
  })
  return {
    show,
    x,
    y
  }
}
export default useMenus
