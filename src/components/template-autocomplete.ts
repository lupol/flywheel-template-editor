import { KeyCode } from '../enums'

function dispatchMouseLeave(target: ParentNode) {
  target.dispatchEvent(new Event('mouseleave'))
}
// TODO: Move to controllers
function handleKeyboardNavigation(event: KeyboardEvent) {
  event.preventDefault()

  const options = Array.from(this.lastElementChild.children)
  const pressedKeyCode = event.key || event.code

  const currentHighlightedIndex = options.findIndex(
    (item: HTMLOptionElement) => {
      return item.classList.contains('selected')
    }
  )

  if (pressedKeyCode === KeyCode.ArrowUp && currentHighlightedIndex > 0) {
    ;(options[currentHighlightedIndex] as HTMLOptionElement).classList.toggle(
      'selected'
    )
    ;(
      options[currentHighlightedIndex - 1] as HTMLOptionElement
    ).classList.toggle('selected')
  }
  if (
    pressedKeyCode === KeyCode.ArrowDown &&
    currentHighlightedIndex < options.length - 1
  ) {
    ;(options[currentHighlightedIndex] as HTMLOptionElement).classList.toggle(
      'selected'
    )
    ;(
      options[currentHighlightedIndex + 1] as HTMLOptionElement
    ).classList.toggle('selected')
  }

  if (pressedKeyCode === KeyCode.Enter) {
    const hashRemoved = (event.target as HTMLInputElement).value.slice(0, -1)
    const { template } = (options[currentHighlightedIndex] as HTMLOptionElement)
      .dataset

    ;(event.target as HTMLInputElement).value = hashRemoved + template
    dispatchMouseLeave(this.querySelector('.dropdown'))
  }

  if (
    pressedKeyCode === KeyCode.Escape ||
    pressedKeyCode === KeyCode.Backspace
  ) {
    dispatchMouseLeave(this.querySelector('.dropdown'))
  }
}

function onAutocompleteClick(dropdown: HTMLUListElement) {
  dropdown.addEventListener('click', function handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (target.tagName === 'LI') {
      const input = target.parentNode.parentNode
        .firstElementChild as HTMLInputElement
      const hashRemoved = input.value.slice(0, -1)
      const { template } = target.dataset

      input.value = hashRemoved + template

      dropdown.removeEventListener('click', handleClick)

      dispatchMouseLeave(target.closest('.dropdown'))
    }
  })
}

function manageEventListeners(
  parentContainer: HTMLElement,
  dropdown: HTMLUListElement
) {
  parentContainer.addEventListener('keydown', handleKeyboardNavigation)

  // TODO: Double check all event listeners clean up
  dropdown.addEventListener('mouseleave', function removeDropdown() {
    // Remove last hash value from input
    const input = this.closest('.__editable').querySelector('input')

    if (input.value.endsWith('#')) {
      input.value = input.value.slice(0, -1)
    }

    // TODO: Update removing of listeners
    this.removeEventListener('mouseleave', removeDropdown)
    parentContainer.removeEventListener('keydown', handleKeyboardNavigation)
    this.remove()
  })

  onAutocompleteClick(dropdown)
}

export function Autocomplete(
  containerNode: HTMLDivElement,
  itemList: string[] = []
) {
  const fragment = document.createDocumentFragment()
  const dropdown = document.createElement('ul')
  dropdown.classList.add('dropdown')

  itemList.forEach((item, index) => {
    const li = document.createElement('li')
    li.classList.add('__item')
    li.dataset.template = item
    li.innerText = item

    if (index === 0) {
      li.classList.add('selected')
    }

    fragment.appendChild(li)
  })

  dropdown.appendChild(fragment)
  containerNode.appendChild(dropdown)

  manageEventListeners(containerNode, dropdown)
}
