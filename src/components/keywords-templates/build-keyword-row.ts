import { DataFieldValue } from '../../enums'
import { IKeyword } from '../../types'
import { ControlButtons } from '../control-buttons'
import { KeywordsEditableFields } from '../editable-fields'

export function buildKeywordsRow(
  options: Record<string, string>[],
  item?: IKeyword | undefined
) {
  const li = document.createElement('li')
  li.classList.add('column-view', 'list-group-item')

  const textSpan = document.createElement('span')
  const matchTypeSpan = document.createElement('span')

  const staticFields = document.createElement('div')
  staticFields.classList.add('__static_fields')

  const fields = document.createElement('div')
  fields.classList.add('__fields')

  const inputValue = item?.textTemplate ?? ''
  const selectValue = item?.keywordMatchType ?? ''
  const editableFields = KeywordsEditableFields(
    inputValue,
    selectValue,
    options
  )

  li.dataset[DataFieldValue.FIRST_FIELD] = inputValue
  li.dataset[DataFieldValue.SECOND_FIELD] = selectValue

  textSpan.innerText = inputValue
  textSpan.title = selectValue

  matchTypeSpan.innerText = selectValue

  fields.appendChild(textSpan)
  fields.appendChild(matchTypeSpan)

  staticFields.appendChild(fields)

  staticFields.appendChild(editableFields)

  li.appendChild(staticFields)

  // Append controls buttons
  li.appendChild(ControlButtons())

  return li
}
