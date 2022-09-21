import { generateId } from '../utils'
import { createLabel } from './label'

/**
 * @Deprecated
 * TODO: Remove component
 */
export default function createSelect(
  selected: string,
  options = [],
  title = 'Chose option',
  name = 'select item'
) {
  const id = generateId(5)
  const fragment = document.createDocumentFragment()
  const select = document.createElement('select')
  select.setAttribute('name', name)
  select.setAttribute('id', id)

  const label = createLabel(id, title)

  const emptyOption = document.createElement('option')
  emptyOption.innerText = '--Please choose an option--'
  fragment.appendChild(emptyOption)

  options.forEach((item) => {
    const option = document.createElement('option')
    option.innerText = item
    option.setAttribute('value', item)
    option.selected = selected === item
    fragment.appendChild(option)
  })

  select.appendChild(fragment)

  label.appendChild(select)

  return label
}
