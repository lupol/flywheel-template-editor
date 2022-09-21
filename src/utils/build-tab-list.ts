import { ITabItem } from '../types'

export function buildTabList(
  tabs: ITabItem[],
  customClass?: string
): HTMLUListElement {
  const tabList = document.createElement('ul')
  tabList.classList.add('nav', 'nav-tabs', 'mb-2')
  tabList.setAttribute('id', 'main-tab-list')
  tabList.setAttribute('role', 'tablist')
  tabList.classList.toggle(customClass, Boolean(customClass))

  const tabsListItems = document.createDocumentFragment()

  tabs.map(({ label, id, customStyleClass }, index) => {
    const item = document.createElement('li')

    item.classList.add('nav-item')
    item.setAttribute('role', 'presentation')

    const button = document.createElement('button')
    button.classList.add('nav-link')
    button.classList.toggle('active', index === 0)
    button.setAttribute('data-bs-toggle', 'tab')
    button.setAttribute('type', 'button')
    button.setAttribute('role', 'tab')
    button.setAttribute('id', `tab_item_${id}`)
    button.setAttribute('data-bs-target', `#${id}`)
    button.classList.toggle(customStyleClass, Boolean(customStyleClass))

    button.innerText = label

    item.appendChild(button)

    tabsListItems.appendChild(item)
  })

  tabList.appendChild(tabsListItems)

  return tabList
}
