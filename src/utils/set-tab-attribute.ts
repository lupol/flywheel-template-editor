export function setTabAttributes<T extends HTMLElement>(
  element: T,
  id: string,
  isActive = false
): T {
  element.classList.add('tab-pane', 'fade')
  element.classList.toggle('active', isActive)
  element.classList.toggle('show', isActive)
  element.setAttribute('id', id)
  element.setAttribute('role', 'tabpanel')

  return element
}
