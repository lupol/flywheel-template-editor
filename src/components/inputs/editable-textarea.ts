const EditableTextarea = (value: string, skipTemplateAutocomplete = false) => {
  const textarea = document.createElement('textarea')
  textarea.classList.add('form-control')
  textarea.setAttribute('type', 'text')
  textarea.setAttribute('autocomplete', 'off')
  textarea.value = value || ''

  if (skipTemplateAutocomplete) {
    textarea.dataset.templateAutocomplete = 'skip'
  }

  return textarea
}

export { EditableTextarea }
