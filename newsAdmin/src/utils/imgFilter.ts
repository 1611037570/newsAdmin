import { img } from "@/config/index.js"

/**
 * 从字符串中获取第一个img标签的src属性值
 * @param {string} str - 输入字符串
 * @returns {string} 第一个img标签的src属性值，如果没有找到则返回默认值
 */
export const imgFilter = (str: any) => {
  let data = img // 默认值为配置中的img变量
  if (str) {
    const imgRegex = /<img [^>]*src=['"]([^'"]+)[^>]*>/g // 匹配img标签的正则表达式
    const match = imgRegex.exec(str) // 获取第一个匹配结果
    if (match) data = match[1] // 获取第一个捕获组的值，即img标签的src属性值
  }
  return data // 返回img标签的src属性值或默认值
}
