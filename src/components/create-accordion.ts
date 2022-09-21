import { ITabItem } from '../types'
import { Action, CustomDataKey } from '../enums'
import { generateId, buildTabList } from '../utils'

export function Accordion(
  tabs: ITabItem[],
  index: number,
  dataSetKey = CustomDataKey.MANAGE_AD_GROUP
) {
  const accordionHeader = document.createElement('h4')
  accordionHeader.classList.add('accordion-header')
  const removeButton = document.createElement('button')
  const iconElement = document.createElement('i')

  iconElement.classList.add('bi', 'bi-trash')

  removeButton.setAttribute('type', 'button')
  removeButton.classList.add(
    'btn',
    'btn-outline-danger',
    'rounded-circle',
    'btn-sm',
    'ad-group__remove'
  )
  removeButton.dataset.index = String(index)
  removeButton.dataset[dataSetKey] = Action.REMOVE
  removeButton.appendChild(iconElement)

  const collapseId = generateId(6)

  const tabsElement = buildTabList(tabs)
  const accordionBody = document.createElement('div')
  accordionBody.appendChild(removeButton)
  accordionBody.classList.add('accordion-body')
  accordionBody.appendChild(tabsElement)

  const accordionButton = document.createElement('button')
  accordionButton.setAttribute('type', 'button')
  accordionButton.setAttribute('data-bs-toggle', 'collapse')
  accordionButton.setAttribute('data-bs-target', `#${collapseId}`)
  accordionButton.classList.add('accordion-button')
  accordionButton.innerText = `AdGroup #${index + 1}`
  accordionHeader.appendChild(accordionButton)

  const accordionContainer = document.createElement('div')
  accordionContainer.setAttribute('id', collapseId)
  accordionContainer.classList.add(
    'accordion-collapse',
    'collapse',
    'tab-content'
  )
  accordionContainer.classList.toggle('show', index === 0)
  accordionContainer.appendChild(accordionBody)

  return { accordionHeader, accordionBody, accordionContainer }
}
