const EditFieldInput = (value: string, skipTemplateAutocomplete = false) => {
  const input = document.createElement('input')
  input.classList.add('form-control')
  input.setAttribute('type', 'text')
  input.setAttribute('autocomplete', 'off')
  input.value = value || ''

  if (skipTemplateAutocomplete) {
    input.dataset.templateAutocomplete = 'skip'
  }

  return input
}

export { EditFieldInput }
