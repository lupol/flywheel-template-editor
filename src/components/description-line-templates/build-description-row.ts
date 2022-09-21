import { DataFieldValue } from '../../enums'
import { IHeadLine } from '../../types'
import { ControlButtons } from '../control-buttons'
import { DescriptionLineEditableFields } from '../editable-fields'

export function DescriptionRow(item?: IHeadLine | undefined) {
  const li = document.createElement('li')
  li.classList.add('column-view', '__descriptions', 'list-group-item')

  const textTemplate = document.createElement('span')
  const fallbackText = document.createElement('span')

  const staticFields = document.createElement('div')
  staticFields.classList.add('__static_fields')

  const fields = document.createElement('div')
  fields.classList.add('__fields')

  const inputTextValue = item?.textTemplate ?? ''
  const fallbackTextValue = item?.fallbackText ?? ''
  const editableFields = DescriptionLineEditableFields(
    inputTextValue,
    fallbackTextValue
  )

  li.dataset[DataFieldValue.FIRST_FIELD] = inputTextValue
  li.dataset[DataFieldValue.SECOND_FIELD] = fallbackTextValue

  textTemplate.innerText = inputTextValue
  textTemplate.title = fallbackTextValue

  fallbackText.innerText = fallbackTextValue
  fallbackText.title = fallbackTextValue

  fields.appendChild(textTemplate)
  fields.appendChild(fallbackText)

  staticFields.appendChild(fields)

  staticFields.appendChild(editableFields)

  li.appendChild(staticFields)

  // Append controls buttons
  li.appendChild(ControlButtons())

  return li
}
