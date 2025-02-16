// @unocss-include

import type { Menu } from '@interfaces/index'
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface'

export const useMore = defineStore('more', () => {
  const menu = ref<Menu>({
    key: 'more',
    title: 'more',
    icon: 'i-mdi:dots-vertical scale-150',
    children: [],
  })
  const map = new Map<string, Function>()

  function set(menu: Menu, path: string[] = []) {
    if (!menu.children)
      return

    path.push(menu.key)

    for (const item of menu.children) {
      if (item.click) {
        const key = [...path, item.key].join('.')
        map.set(key, item.click)
      }
      set(item, path)
    }
  }

  watch(menu, (v) => {
    map.clear()
    set(v)
  }, {
    deep: true,
  })

  function handleClick({ keyPath }: MenuInfo) {
    const key = keyPath!.join('.')
    const click = map.get(key)
    if (click)
      click()
  }

  function setMenu(handler: () => Menu['children']) {
    watchEffect(() => {
      menu.value.children = handler()
    })
    onScopeDispose(() => {
      menu.value.children = []
    })
  }

  return {
    menu,
    handleClick,
    setMenu,
  }
})
