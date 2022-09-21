import { generateId } from '../utils'
import { createLabel } from './label'

export default function createTextarea(
  text: string,
  value: string,
  inputName: string
): HTMLLabelElement {
  const id = generateId()
  const input = document.createElement('textarea')
  input.setAttribute('id', id)
  input.setAttribute('name', inputName)
  input.value = value || ''
  input.dataset.target = inputName
  input.classList.add('form-control')

  const label = createLabel(id, text)

  label.appendChild(input)

  return label
}
