export function createLabel(targetId: string, text: string): HTMLLabelElement {
  const label = document.createElement('label')
  label.setAttribute('for', targetId)
  label.classList.add('form-label')
  label.innerText = text

  return label
}
