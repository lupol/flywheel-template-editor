import { EditFieldInput } from '../inputs'

export const HeadLineEditableFields = (
  textTemplate: string,
  fallbackText: string
): HTMLDivElement => {
  const editableFields = document.createElement('div')
  editableFields.classList.add('__editable')

  const input = EditFieldInput(textTemplate)
  const fallbackInput = EditFieldInput(fallbackText, true)

  editableFields.appendChild(input)
  editableFields.appendChild(fallbackInput)

  return editableFields
}
