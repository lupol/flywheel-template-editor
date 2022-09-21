export function getButtonData(
  element: HTMLElement
): Record<string | never, string | never> {
  const buttonTagName = 'BUTTON'
  const iTagName = 'I'
  if (element.tagName === buttonTagName) {
    return element.dataset
  }
  if (element.tagName === iTagName) {
    return element.closest('button').dataset
  }
  return {}
}
