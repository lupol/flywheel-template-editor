import { EditableTextarea } from '../inputs'

export function DescriptionLineEditableFields(
  textTemplate: string,
  fallbackText: string
) {
  const editableFields = document.createElement('div')
  editableFields.classList.add('__editable')

  const input = EditableTextarea(textTemplate)
  const fallbackInput = EditableTextarea(fallbackText, true)

  editableFields.appendChild(input)
  editableFields.appendChild(fallbackInput)

  return editableFields
}
