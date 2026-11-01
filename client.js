/**
 * dsh-greenwild —— 浏览器半端：设置里的「绿野」一键开关 + 从壁纸取的浅色配色。
 *
 * 设计约束（2026-10 定稿）：
 *   · 一键开关放在插件自己的设置页里（设置 → 绿野）；
 *   · 开 = 把整窗换成奶油浅色 + 橄榄绿；关 = 还原原来的深色；
 *   · 开的时候顺手把内置「外观」切到浅色，关的时候还原，避免设置里写着深色界面却是浅色；
 *   · 只叠 token 覆盖层（ctx.theme.overrideTokens），不碰布局、不改字号。
 */
window.__ModuleLoader__.load({
  id: 'dsh-greenwild',
  factory: (require) => {
    const React = require('react')
    const h = React.createElement
    const { useState, useEffect } = React

    // 由 build 脚本注入：{ '--dsw-alias-xxx': { light: '#..', dark: '#..' }, ... }
    const TOKENS = {
 "--dsw-alias-bg-base": {
  "light": "#C3D39A",
  "dark": "#C3D39A"
 },
 "--dsw-alias-bg-document-preview": {
  "light": "#E9F1D5",
  "dark": "#E9F1D5"
 },
 "--dsw-alias-bg-document-selection": {
  "light": "color-mix(in srgb, var(--dsw-static-blue-500) 40%, transparent)",
  "dark": "color-mix(in srgb, var(--dsw-static-blue-500) 40%, transparent)"
 },
 "--dsw-alias-label-document-preview": {
  "light": "#6E6A55",
  "dark": "#6E6A55"
 },
 "--dsw-alias-bg-layer-1": {
  "light": "#CBDAA4",
  "dark": "#CBDAA4"
 },
 "--dsw-alias-bg-layer-2": {
  "light": "#FBF7ED",
  "dark": "#FBF7ED"
 },
 "--dsw-alias-bg-layer-3": {
  "light": "#E9F1D5",
  "dark": "#E9F1D5"
 },
 "--dsw-alias-bg-mask-1": {
  "light": "#24271C3d",
  "dark": "#24271C3d"
 },
 "--dsw-alias-bg-mask-2": {
  "light": "#24271C1f",
  "dark": "#24271C1f"
 },
 "--dsw-alias-bg-mask-3": {
  "light": "#24271C7a",
  "dark": "#24271C7a"
 },
 "--dsw-alias-bg-mask-photo": {
  "light": "#24271Ce0",
  "dark": "#24271Ce0"
 },
 "--dsw-alias-bg-mask-drop": {
  "light": "#FFFFFFb3",
  "dark": "#FFFFFFb3"
 },
 "--dsw-alias-bg-module-platform": {
  "light": "#AECB84",
  "dark": "#AECB84"
 },
 "--dsw-alias-bg-multi-select": {
  "light": "#AECB84",
  "dark": "#AECB84"
 },
 "--dsw-alias-bg-overlay": {
  "light": "#E9F1D5",
  "dark": "#E9F1D5"
 },
 "--dsw-alias-bg-skeleton": {
  "light": "#24271C0a",
  "dark": "#24271C0a"
 },
 "--dsw-alias-border-inverted2": {
  "light": "#0000",
  "dark": "#0000"
 },
 "--dsw-alias-border-inverted": {
  "light": "#0000",
  "dark": "#0000"
 },
 "--dsw-alias-border-l1": {
  "light": "#221F1626",
  "dark": "#221F1626"
 },
 "--dsw-alias-border-l2-darkmode-thin": {
  "light": "#221F1638",
  "dark": "#221F1638"
 },
 "--dsw-alias-border-l2": {
  "light": "#221F164D",
  "dark": "#221F164D"
 },
 "--dsw-alias-border-l3": {
  "light": "#221F1659",
  "dark": "#221F1659"
 },
 "--dsw-alias-border-l4": {
  "light": "#221F1666",
  "dark": "#221F1666"
 },
 "--dsw-alias-brand-primary-invert": {
  "light": "#4A5A2A",
  "dark": "#4A5A2A"
 },
 "--dsw-alias-brand-primary-new-colorprimary-new-color": {
  "light": "#4F6A2C",
  "dark": "#4F6A2C"
 },
 "--dsw-alias-brand-primary": {
  "light": "#4F6A2C",
  "dark": "#4F6A2C"
 },
 "--dsw-alias-brand-text": {
  "light": "#3F5822",
  "dark": "#3F5822"
 },
 "--dsw-alias-button-contrast-fill": {
  "light": "#6E6A55",
  "dark": "#6E6A55"
 },
 "--dsw-alias-button-elevated-fill": {
  "light": "#FFFFFF",
  "dark": "#FFFFFF"
 },
 "--dsw-alias-button-floating-fill": {
  "light": "#FFFFFF",
  "dark": "#FFFFFF"
 },
 "--dsw-alias-button-floating-hover": {
  "light": "#E8ECD5",
  "dark": "#E8ECD5"
 },
 "--dsw-alias-button-ghost-active-border": {
  "light": "#A9A48C",
  "dark": "#A9A48C"
 },
 "--dsw-alias-button-ghost-active-fill": {
  "light": "#C9DCA2",
  "dark": "#C9DCA2"
 },
 "--dsw-alias-button-ghost-active-hover": {
  "light": "#BBD29A",
  "dark": "#BBD29A"
 },
 "--dsw-alias-button-info-fill": {
  "light": "#4F6A2C",
  "dark": "#4F6A2C"
 },
 "--dsw-alias-button-info-hover": {
  "light": "#425B22",
  "dark": "#425B22"
 },
 "--dsw-alias-button-primary-dimmed": {
  "light": "#C9DCA2",
  "dark": "#C9DCA2"
 },
 "--dsw-alias-button-primary-fill": {
  "light": "#4F6A2C",
  "dark": "#4F6A2C"
 },
 "--dsw-alias-button-primary-hover": {
  "light": "#425B22",
  "dark": "#425B22"
 },
 "--dsw-alias-button-tool-bar-fill-invisible": {
  "light": "#3B3D2E5c",
  "dark": "#3B3D2E5c"
 },
 "--dsw-alias-button-tool-bar-fill": {
  "light": "#6E6A5580",
  "dark": "#6E6A5580"
 },
 "--dsw-alias-button-tool-bar-hover": {
  "light": "#6E6A5599",
  "dark": "#6E6A5599"
 },
 "--dsw-alias-interactive-bg-active": {
  "light": "#2F3A1A24",
  "dark": "#2F3A1A24"
 },
 "--dsw-alias-interactive-bg-hover-accent": {
  "light": "#4F6A2C2E",
  "dark": "#4F6A2C2E"
 },
 "--dsw-alias-interactive-bg-hover-danger": {
  "light": "#ec13130d",
  "dark": "#ec13130d"
 },
 "--dsw-alias-interactive-bg-hover-solid": {
  "light": "#BBD29A",
  "dark": "#BBD29A"
 },
 "--dsw-alias-interactive-bg-hover": {
  "light": "#2F3A1A16",
  "dark": "#2F3A1A16"
 },
 "--dsw-alias-label-caption": {
  "light": "#4E5738",
  "dark": "#4E5738"
 },
 "--dsw-alias-label-deep-diving": {
  "light": "color-mix(in srgb, var(--dsw-static-deepseek-500) 70%, var(--dsw-static-blue-950))",
  "dark": "color-mix(in srgb, var(--dsw-static-deepseek-500) 70%, var(--dsw-static-blue-950))"
 },
 "--dsw-alias-label-deep-diving-shimmer": {
  "light": "color-mix(in srgb, var(--dsw-static-deepseek-500) 30%, var(--dsw-static-blue-950))",
  "dark": "color-mix(in srgb, var(--dsw-static-deepseek-500) 30%, var(--dsw-static-blue-950))"
 },
 "--dsw-alias-label-dimmed": {
  "light": "#E8ECD5",
  "dark": "#E8ECD5"
 },
 "--dsw-alias-label-primary-bluish": {
  "light": "#221F16",
  "dark": "#221F16"
 },
 "--dsw-alias-label-primary-dimmed": {
  "light": "#24271C",
  "dark": "#24271C"
 },
 "--dsw-alias-label-primary-foreground": {
  "light": "#FFFFFF",
  "dark": "#FFFFFF"
 },
 "--dsw-alias-label-primary-inverted": {
  "light": "#FFFFFF",
  "dark": "#FFFFFF"
 },
 "--dsw-alias-label-primary": {
  "light": "#221F16",
  "dark": "#221F16"
 },
 "--dsw-alias-label-secondary": {
  "light": "#434D2E",
  "dark": "#434D2E"
 },
 "--dsw-alias-label-shimmer": {
  "light": "color-mix(in srgb, var(--dsw-static-neutral-1000) 30%, transparent)",
  "dark": "color-mix(in srgb, var(--dsw-static-neutral-1000) 30%, transparent)"
 },
 "--dsw-alias-label-tertiary": {
  "light": "#4E5738",
  "dark": "#4E5738"
 },
 "--dsw-alias-menu-icon": {
  "light": "#3B3D2E",
  "dark": "#3B3D2E"
 },
 "--dsw-alias-link": {
  "light": "#6E8443",
  "dark": "#6E8443"
 },
 "--dsw-alias-markdown-citation": {
  "light": "#E9ECE6",
  "dark": "#E9ECE6"
 },
 "--dsw-alias-markdown-code-block-banner": {
  "light": "#E9ECE6",
  "dark": "#E9ECE6"
 },
 "--dsw-alias-markdown-code-block": {
  "light": "#EFF2EC",
  "dark": "#EFF2EC"
 },
 "--dsw-alias-markdown-code-segment-selected": {
  "light": "#FFFFFF",
  "dark": "#FFFFFF"
 },
 "--dsw-alias-markdown-code-segment-unselected": {
  "light": "#E9ECE6",
  "dark": "#E9ECE6"
 },
 "--dsw-alias-markdown-inline-code": {
  "light": "#E8ECE4",
  "dark": "#E8ECE4"
 },
 "--dsw-alias-markdown-placeholder": {
  "light": "#E9ECE6",
  "dark": "#E9ECE6"
 },
 "--dsw-alias-markdown-tag": {
  "light": "#E9ECE6",
  "dark": "#E9ECE6"
 },
 "--dsw-alias-scrollbar-bg-l1": {
  "light": "#F6F1E3",
  "dark": "#F6F1E3"
 },
 "--dsw-alias-scrollbar-bg-l2": {
  "light": "#F6F1E3",
  "dark": "#F6F1E3"
 },
 "--dsw-alias-scrollbar-hover-l1": {
  "light": "#EDE7D4",
  "dark": "#EDE7D4"
 },
 "--dsw-alias-scrollbar-hover-l2": {
  "light": "#EDE7D4",
  "dark": "#EDE7D4"
 },
 "--dsw-alias-state-business-primary": {
  "light": "#5D7A35",
  "dark": "#5D7A35"
 },
 "--dsw-alias-state-business-tertiary": {
  "light": "#C9DCA2",
  "dark": "#C9DCA2"
 },
 "--dsw-alias-code-diff-added": {
  "light": "#22c55e14",
  "dark": "#22c55e14"
 },
 "--dsw-alias-code-diff-deleted": {
  "light": "#ec131314",
  "dark": "#ec131314"
 },
 "--dsw-alias-file-diff-added-bg": {
  "light": "#e6f4e7",
  "dark": "#e6f4e7"
 },
 "--dsw-alias-file-diff-added-gutter": {
  "light": "#edf7ed",
  "dark": "#edf7ed"
 },
 "--dsw-alias-file-diff-added-marker": {
  "light": "#01a241",
  "dark": "#01a241"
 },
 "--dsw-alias-file-diff-deleted-bg": {
  "light": "#fce6e2",
  "dark": "#fce6e2"
 },
 "--dsw-alias-file-diff-deleted-gutter": {
  "light": "#fdece9",
  "dark": "#fdece9"
 },
 "--dsw-alias-file-diff-deleted-marker": {
  "light": "#ba2723",
  "dark": "#ba2723"
 },
 "--dsw-alias-state-error-primary": {
  "light": "#ec1313",
  "dark": "#ec1313"
 },
 "--dsw-alias-state-error-secondary": {
  "light": "#f25a5a",
  "dark": "#f25a5a"
 },
 "--dsw-alias-state-idle-primary": {
  "light": "#EDE7D4",
  "dark": "#EDE7D4"
 },
 "--dsw-alias-state-success-primary": {
  "light": "#22c55e",
  "dark": "#22c55e"
 },
 "--dsw-alias-state-success-secondary": {
  "light": "#4ed17e",
  "dark": "#4ed17e"
 },
 "--dsw-alias-state-success-tertiary": {
  "light": "#e6faed",
  "dark": "#e6faed"
 },
 "--dsw-alias-state-warn-label": {
  "light": "#dd8629",
  "dark": "#dd8629"
 },
 "--dsw-alias-state-warn-primary": {
  "light": "#f59e0b",
  "dark": "#f59e0b"
 },
 "--dsw-alias-state-warn-secondary": {
  "light": "#f7ad31",
  "dark": "#f7ad31"
 },
 "--dsw-alias-state-warn-tertiary": {
  "light": "#fef5e7",
  "dark": "#fef5e7"
 },
 "--dsw-alias-switch-thumb": {
  "light": "#FFFFFF",
  "dark": "#FFFFFF"
 },
 "--dsw-alias-toast-bg": {
  "light": "#3B3D2E",
  "dark": "#3B3D2E"
 },
 "--dsw-alias-toast-label": {
  "light": "#FFFFFF",
  "dark": "#FFFFFF"
 },
 "--dsw-alias-tooltip-bg": {
  "light": "#F2F7E4",
  "dark": "#F2F7E4"
 },
 "--dsw-alias-tooltip-key-bg": {
  "light": "#DDE9C2",
  "dark": "#DDE9C2"
 },
 "--dsw-alias-turn-trigger-bg": {
  "light": "#E8ECD5",
  "dark": "#E8ECD5"
 },
 "--dsw-alias-turn-trigger-bg-hover": {
  "light": "#4A5A2A0f",
  "dark": "#4A5A2A0f"
 },
 "--dsw-alias-menu-group-header-fill": {
  "light": "#E8ECD5f0",
  "dark": "#E8ECD5f0"
 },
 "--dsw-specific-sidebar-fill": {
  "light": "#D2E0AE",
  "dark": "#D2E0AE"
 },
 "--dsw-specific-sidebar-nav-item-active": {
  "light": "#C2D69B",
  "dark": "#C2D69B"
 },
 "--dsw-specific-sidebar-nav-item-active-accent": {
  "light": "#B4CB8B",
  "dark": "#B4CB8B"
 },
 "--dsw-specific-sidebar-nav-item-hover": {
  "light": "#CBDCA6",
  "dark": "#CBDCA6"
 },
 "--dsw-specific-bubble": {
  "light": "#AECB84",
  "dark": "#AECB84"
 },
 "--dsw-specific-bubble-highlight": {
  "light": "#A2C077",
  "dark": "#A2C077"
 },
 "--dsw-specific-input-major": {
  "light": "#FBF7ED",
  "dark": "#FBF7ED"
 },
 "--dsw-specific-login-input": {
  "light": "#E9F1D5",
  "dark": "#E9F1D5"
 },
 "--dsw-specific-menu": {
  "light": "#EAF2D8F2",
  "dark": "#EAF2D8F2"
 },
 "--dsw-specific-selector": {
  "light": "#D6E3B4",
  "dark": "#D6E3B4"
 },
 "--dsw-specific-tip": {
  "light": "#D6E3B4",
  "dark": "#D6E3B4"
 },
 "--dsw-menu-surface-fill": {
  "light": "#EAF2D8F2",
  "dark": "#EAF2D8F2"
 }
}

    const KEY_ON = 'dsh-greenwild.on'
    const KEY_PREV = 'dsh-greenwild.prev'
    const SRC = 'dsh-greenwild'

    const PALETTE = [['底色', '#C3D39A'], ['侧栏', '#D2E0AE'], ['卡面', '#F8FAF1'], ['主色', '#4F6A2C']]

    const listeners = new Set()
    let enabled = readOn()
    let theme = null
    let dispose = null

    function readOn() {
      try {
        const v = localStorage.getItem(KEY_ON)
        return v === null ? true : v === '1'
      } catch {
        return true
      }
    }
    function writeOn(v) {
      try { localStorage.setItem(KEY_ON, v ? '1' : '0') } catch { /* 隐私模式，忽略 */ }
    }
    function readPrev() {
      try { return localStorage.getItem(KEY_PREV) || 'dark' } catch { return 'dark' }
    }

    function sync() {
      if (!theme) return
      if (enabled) {
        if (!dispose) {
          try {
            const cur = theme.getTheme().preference
            if (cur !== 'light') localStorage.setItem(KEY_PREV, cur)
          } catch { /* 读不到就按默认还原深色 */ }
          try { dispose = theme.overrideTokens(SRC, TOKENS) } catch (e) { console.warn('[绿野] 注入配色失败', e) }
          try { theme.setTheme('light') } catch (e) { console.warn('[绿野] 切浅色失败', e) }
        }
      } else if (dispose) {
        try { dispose() } catch { /* 已经移除 */ }
        dispose = null
        try { theme.setTheme(readPrev()) } catch { /* ignore */ }
      }
      for (const fn of listeners) {
        try { fn(enabled) } catch { /* ignore */ }
      }
    }

    function setEnabled(v) {
      enabled = !!v
      writeOn(enabled)
      sync()
    }

    const CSS = `
      .gw { max-width: 640px; padding: 4px 2px 24px; color: #24271C; }
      .gw-head { margin-bottom: 14px; }
      .gw-title { font-size: 18px; font-weight: 600; letter-spacing: .2px; }
      .gw-sub { margin-top: 6px; font-size: 12.5px; line-height: 1.6; color: #6B7059; }
      .gw-card { border: 1px solid #E3DDCA; background: #FFFFFF; border-radius: 14px; padding: 16px 18px; }
      .gw-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
      .gw-name { font-size: 14px; font-weight: 600; }
      .gw-hint { margin-top: 4px; font-size: 12px; color: #6B7059; }
      .gw-sw { position: relative; flex: 0 0 auto; width: 52px; height: 30px; border-radius: 999px; border: none;
               background: #CFC9B6; cursor: pointer; transition: background .16s ease; padding: 0; }
      .gw-sw.on { background: #5E7434; }
      .gw-knob { position: absolute; top: 3px; left: 3px; width: 24px; height: 24px; border-radius: 50%;
                 background: #FFFFFF; box-shadow: 0 1px 3px #00000033; transition: left .16s ease; }
      .gw-sw.on .gw-knob { left: 25px; }
      .gw-chips { display: flex; gap: 14px; margin-top: 14px; padding-top: 14px; border-top: 1px solid #EFEADA; }
      .gw-chip { display: flex; align-items: center; gap: 8px; font-size: 11px; color: #6B7059; font-family: inherit; }
      .gw-dot { width: 16px; height: 16px; border-radius: 4px; border: 1px solid #E3DDCA; }
      .gw-code { font-family: ui-monospace, Consolas, monospace; font-size: 11px; }
      .gw-foot { margin-top: 12px; font-size: 11.5px; color: #8A8B75; }
      /* 表格线在绿底上偏淡：行线加粗到 1px，表头再深一档 */
      [class*="tableScroll"] td, [class*="tableScroll"] th { border-bottom-width: 1px !important; }
      [class*="tableScroll"] td { border-bottom-color: #221F164D !important; }
      [class*="tableScroll"] th { border-bottom-color: #221F1666 !important; }
      /* 悬浮提示：底色已改浅，字色是内建写死的白，这里强制改成深色，并加一圈细边 */
      [class*="_bubble_"] {
        color: #221F16 !important;
        border: 1px solid #A8B988 !important;
        box-shadow: 0 8px 22px #24271C26 !important;
      }
      /* 会话/工作区悬浮卡片：DSH 把深色写死在这条规则里（--dsw-hovercard-bg:#2C2C2E），
         只能按元素定位。哈希类名变了也不要紧，下面 :has() 那条还能兜住。 */
      [class*="_card_38jqx"], div:has(> [class*="hoverContent"]) {
        --dsw-hovercard-bg: #F2F7E4 !important;
        border: 1px solid #A8B988 !important;
        box-shadow: 0 10px 26px #24271C26 !important;
      }
      [class*="hoverTitle"] { color: #221F16 !important; }
      [class*="hoverPath"], [class*="hoverTime"] { color: #434D2E !important; }
      [class*="hoverStatus"] { color: #4E5738 !important; }
      [class*="_copied_38jqx"] { color: #221F16 !important; }
      /* 给我的回话铺个底：AssistantMarkdown 的根节点包成一张绿白卡片 */
      [class*="xMeOpW_root"] {
        background: #FBF7ED !important;
        border-radius: 16px !important;
        padding: 14px 18px !important;
        box-shadow: 0 1px 3px #221F1614, 0 0 0 1px #221F1610 !important;
        margin: 2px 0 10px !important;
      }
      /* 左上「新会话」按钮：实心橄榄绿 + 白字（主行动，按效果图走） */
      button[class*="wtg9ga_newSession"] {
        background: #4F6A2C !important;
        color: #FFFFFF !important;
        box-shadow: 0 1px 2px #221F1626 !important;
      }
      button[class*="wtg9ga_newSession"] svg {
        color: #FFFFFF !important;
      }
      button[class*="wtg9ga_newSession"] span,
      button[class*="wtg9ga_newSession"] div {
        color: #FFFFFF !important;
      }
      button[class*="wtg9ga_newSession"]:hover {
        background: #425B22 !important;
      }
      /* 左侧栏「工作区」那一行：铺成圆角小卡片（行本身就带 radius-md） */
      [class*="wnFoaW_projectRow"] {
        background: #FBF7ED !important;
        margin: 2px 4px !important;
      }
      [class*="wnFoaW_projectRow"]:hover {
        background: #F5EFE1 !important;
      }
      /* markdown 代码块：底色已经很浅，靠左边一条主色竖条划界 */
      [class*="xMeOpW_root"] pre {
        border-left: 3px solid #4F6A2C !important;
        border-radius: 8px !important;
      }
      /* 右侧面板：展开时把这一层的"底色变量"换深，面板内部任何用它画底的地方都会跟着变 */
      [data-sidebar-right-panel][data-sidebar-right-open] {
        --dsw-alias-bg-base: #B4C78C;
        --dsw-alias-bg-layer-2: #C6D6A0;
        background: #B4C78C !important;
      }
    `

    function Switch({ on, onChange }) {
      return h('button', {
        type: 'button',
        className: 'gw-sw' + (on ? ' on' : ''),
        role: 'switch',
        'aria-checked': on ? 'true' : 'false',
        'aria-label': '绿野主题',
        onClick: () => onChange(!on),
      }, h('span', { className: 'gw-knob' }))
    }

    function Panel() {
      const [on, setOn] = useState(enabled)
      useEffect(() => {
        const fn = (v) => setOn(v)
        listeners.add(fn)
        setOn(enabled)
        return () => { listeners.delete(fn) }
      }, [])
      const [diag, setDiag] = useState('')
      useEffect(() => {
        const read = () => {
          try {
            const cs = getComputedStyle(document.body)
            const bg = cs.getPropertyValue('--dsw-alias-bg-base').trim()
            const side = cs.getPropertyValue('--dsw-specific-sidebar-fill').trim()
            setDiag(`当前取值：底色 ${bg || '(空)'} · 侧栏 ${side || '(空)'}`)
          } catch { setDiag('') }
        }
        read()
        const t = setTimeout(read, 400)
        return () => clearTimeout(t)
      }, [on])
      return h('div', { className: 'gw' }, [
        h('div', { key: 'head', className: 'gw-head' }, [
          h('div', { key: 't', className: 'gw-title' }, '绿野'),
          h('div', { key: 's', className: 'gw-sub' },
            '从你的桌面壁纸取色：橄榄绿主色、深绿底色、绿白卡面，整窗生效。'),
        ]),
        h('div', { key: 'card', className: 'gw-card' }, [
          h('div', { key: 'row', className: 'gw-row' }, [
            h('div', { key: 'txt' }, [
              h('div', { key: 'n', className: 'gw-name' }, '主题开关'),
              h('div', { key: 'h', className: 'gw-hint' }, '开：整窗换成绿野浅色；关：回到原来的深色。即时生效。'),
            ]),
            h(Switch, { key: 'sw', on, onChange: setEnabled }),
          ]),
          h('div', { key: 'chips', className: 'gw-chips' },
            PALETTE.map(([label, hex]) => h('span', { key: label, className: 'gw-chip' }, [
              h('span', { key: 'd', className: 'gw-dot', style: { background: hex } }),
              h('span', { key: 'l' }, label),
              h('span', { key: 'v', className: 'gw-code' }, hex),
            ]))),
        ]),
        h('div', { key: 'foot', className: 'gw-foot' },
          '开关即时生效，不需要重启；关掉后内置「外观」会还原成你原来的选择。'),
        diag ? h('div', { key: 'diag', className: 'gw-foot', style: { opacity: .75 } }, diag) : null,
      ])
    }

    return {
      inject: ['slots', 'theme'],
      apply(ctx) {
        theme = ctx.theme || (typeof ctx.get === 'function' ? ctx.get('theme') : undefined)
        const style = document.createElement('style')
        style.setAttribute('data-plugin-css', SRC)
        style.textContent = CSS
        document.head.appendChild(style)
        ctx.effect(() => () => {
          style.remove()
          if (dispose) {
            try { dispose() } catch { /* ignore */ }
            dispose = null
          }
        }, '绿野：清理样式与配色层')
        const slots = ctx.slots || (typeof ctx.get === 'function' ? ctx.get('slots') : undefined)
        if (slots) {
          // 只在「设置 → 插件」里多一个「绿野」标签页，不在设置左侧导航里多一栏。
          slots.inject('settings.plugins.tab', () => slots.register(
            { name: 'settings.plugins.tab', id: 'greenwild', order: 70, label: '绿野' },
            () => h(Panel),
          ))
        }
        sync()
      },
    }
  },
})
