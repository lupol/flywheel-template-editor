import { EditFieldInput } from '../inputs'

export function KeywordsEditableFields(
  inputValue: string,
  selectValue: string,
  options: Record<string, string>[],
  shouldIncludeEmptyValue = false
) {
  const editableFields = document.createElement('div')
  editableFields.classList.add('__editable')
  const input = EditFieldInput(inputValue)

  const fragment = document.createDocumentFragment()
  const select = document.createElement('select')
  select.classList.add('form-select')

  if (shouldIncludeEmptyValue) {
    const emptyOption = document.createElement('option')
    emptyOption.innerText = '--Please choose an option--'
    fragment.appendChild(emptyOption)
  }

  options.forEach((item) => {
    const option: HTMLOptionElement = document.createElement('option')
    option.innerText = item.title
    option.setAttribute('value', item.value)
    option.selected = selectValue === item.value
    fragment.appendChild(option)
  })

  select.appendChild(fragment)
  editableFields.appendChild(input)
  editableFields.appendChild(select)
  return editableFields
}
