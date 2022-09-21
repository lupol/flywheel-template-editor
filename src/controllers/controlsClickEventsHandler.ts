import { Action, DataFieldValue } from '../enums'
import { KeywordsRow, Autocomplete } from '../components'
import { IEditableFields } from '../types'

export function toggleEdit(element?: Element): void {
  element
    ?.closest('.items-container')
    ?.querySelector('.show-edit')
    ?.classList?.toggle('show-edit')
}

function dismissHighlightedErrors(target: HTMLElement, cb: () => void): void {
  Array.from(target?.closest('.items-container').children).forEach((item) => {
    item.classList.toggle('__invalid', false)
  })
  cb()
}

function getEditableFields(target: Element): IEditableFields {
  const fields: NodeListOf<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = target.querySelectorAll(
    '.__editable input, .__editable textarea, .__editable select'
  )

  const firstField = fields.item(0) as HTMLInputElement | HTMLTextAreaElement
  const secondField = fields.item(1) as HTMLTextAreaElement | HTMLSelectElement

  return {
    firstField,
    secondField
  }
}

export function handleControlsClickEvents(
  buttonType: Action | undefined,
  target: HTMLElement,
  options: string[] = []
) {
  if (buttonType) {
    const row = target.closest('li')
    const { firstField, secondField } = getEditableFields(row)

    const handleAutocompleteInput = (event: InputEvent): void => {
      handleBeforeInputEvent(event, options)
    }

    if (buttonType === Action.EDIT && !row.classList.contains('show-edit')) {
      toggleEdit(target)
      row.classList?.toggle('show-edit')
      row.addEventListener('beforeinput', handleAutocompleteInput)
    }

    if (buttonType === Action.REMOVE) {
      row.removeEventListener('keybeforeinputpress', handleAutocompleteInput)
      row.remove()
    }

    if (buttonType === Action.SAVE) {
      const isInvalid = validateKeywords(
        target,
        firstField?.value,
        secondField?.value
      )

      row.classList.toggle('__invalid', isInvalid)

      if (!isInvalid) {
        drawChanges(row, firstField, secondField)
      }
    }

    if (buttonType === Action.CLOSE) {
      const firstFieldValue = row?.dataset[DataFieldValue.FIRST_FIELD]
      const secondFieldValue = row?.dataset[DataFieldValue.SECOND_FIELD]

      if (firstFieldValue?.trim()?.length && secondFieldValue?.trim()?.length) {
        // TODO:  Update to work with every container for different rows
        dismissHighlightedErrors(target, () => {
          firstField.value = firstFieldValue
          secondField.value = secondFieldValue
          toggleEdit(target)
        })
      } else {
        row.removeEventListener('beforeinput', handleAutocompleteInput)
        row.remove()
      }
    }

    if (buttonType === Action.ADD) {
      addNewRow(target)
    }
  }
}

function validateKeywords(
  target: HTMLElement,
  currentInputValue: string,
  currentSelectValue: string
): boolean {
  // TODO: Update to work with every container for different rows - done
  const isValueDuplicating = Array.from(
    target?.closest('.items-container')?.children
  ).some((item: HTMLElement) => {
    const firstFieldValue = item?.dataset[DataFieldValue.FIRST_FIELD]
    const secondFieldValue = item?.dataset[DataFieldValue.SECOND_FIELD]

    const invalid =
      currentInputValue === firstFieldValue &&
      currentSelectValue === secondFieldValue
    const isCurrentElement = item.classList.contains('show-edit')

    item.classList.toggle('__invalid', invalid && !isCurrentElement)

    return invalid && !isCurrentElement
  })
  const isInputInvalid = currentInputValue?.trim().length <= 0
  const isSelectInvalid = currentSelectValue?.trim().length <= 0
  return isValueDuplicating || isInputInvalid || isSelectInvalid
}

function drawChanges(
  row: HTMLElement,
  firstField: HTMLInputElement | HTMLTextAreaElement,
  secondField: HTMLSelectElement | HTMLTextAreaElement
): void {
  const firstFieldValue = firstField.value
  const secondFieldValue = secondField.value

  row.dataset[DataFieldValue.FIRST_FIELD] = firstFieldValue
  row.dataset[DataFieldValue.SECOND_FIELD] = secondFieldValue

  const fields = row.querySelector('.__fields')

  ;(fields.firstChild as HTMLSpanElement).innerText = firstFieldValue
  ;(fields.firstChild as HTMLSpanElement).title = firstFieldValue
  ;(fields.lastChild as HTMLSpanElement).innerText = secondFieldValue
  ;(fields.lastChild as HTMLSpanElement).title = secondFieldValue

  row.removeEventListener('beforeinput', handleBeforeInputEvent)

  row.classList?.toggle('show-edit')
}

function addNewRow(target: HTMLElement): void {
  const keywordsContainer =
    target.parentElement.querySelector('.items-container')
  const isEditShown = Array.from(keywordsContainer.children).some((item) =>
    item.classList.contains('show-edit')
  )

  if (!isEditShown) {
    // TODO: Get options from proper place
    const keywordRow = KeywordsRow([
      { title: 'EXACT', value: 'EXACT' },
      { title: 'BROAD', value: 'BROAD' }
    ])
    keywordRow.classList.toggle('show-edit')

    keywordsContainer.insertAdjacentElement('afterbegin', keywordRow)
  }
}

function handleBeforeInputEvent(
  event: InputEvent,
  options: string[] = []
): void {
  const { data, target } = event as {
    data: string
    target: HTMLInputElement
  } & InputEvent
  const hashSymbol = '#'
  const isAutocompleteDisabled = target.dataset?.templateAutocomplete === 'skip' // TODO: Move somewhere as constant

  if (data === hashSymbol && !isAutocompleteDisabled) {
    const parentNode = target.closest('.__editable') as HTMLDivElement

    Autocomplete(parentNode, options)
  }
}
