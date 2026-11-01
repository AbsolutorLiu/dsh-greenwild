/**
 * dsh-greenwild —— 主机半端。
 *
 * 这个插件只改界面配色，主机侧没有要做的事：颜色覆盖层和开关都在浏览器半边
 * （client.js）里。保留这个文件是为了让包结构和其他 DSH 插件一致，profile 能
 * 正常把它当 bundle 加载。
 */
export const name = 'greenwild'

export function apply() {
  // 故意留空：绿野不注册工具、不写文件、不联网。
}
