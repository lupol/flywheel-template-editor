import { generateId } from '../utils'

export default function createButton(
  text: string,
  relation: string,
  action: string
): HTMLButtonElement {
  const id = generateId()
  const button = document.createElement('button')

  button.setAttribute('type', 'button')
  button.setAttribute('id', id)
  button.classList.add('add-button')
  button.innerText = text

  button.dataset.relation = relation
  button.dataset.action = action

  return button
}
