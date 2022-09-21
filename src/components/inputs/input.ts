import { generateId } from '../../utils'
import { createLabel } from '../label'

export function Input(
  text: string,
  value: string,
  inputName: string,
  classList: string,
  validationMessage: string
): HTMLDivElement {
  const id = generateId()
  const container = document.createElement('div')
  const validation = document.createElement('div')

  container.classList.add(classList ?? '')
  validation.classList.add('invalid-feedback')
  validation.innerText = validationMessage

  const input = document.createElement('input')
  input.setAttribute('id', id)
  input.setAttribute('name', inputName)
  input.setAttribute('type', 'text')
  input.setAttribute('autocomplete', 'off')
  input.value = value || ''
  input.dataset.target = inputName
  input.classList.add('form-control')

  const label = createLabel(id, text)
  container.appendChild(label)
  container.appendChild(input)
  container.appendChild(validation)

  return container
}
