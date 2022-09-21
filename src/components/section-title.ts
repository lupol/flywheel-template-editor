import { Action, CustomDataKey, TitleSize } from '../enums'
import { ITitleProps } from '../types'

function createControlButton(
  icon: string,
  action?: Action,
  customData?: Record<CustomDataKey, Action>
): HTMLButtonElement {
  const button = document.createElement('button')
  const iconElement = document.createElement('i')

  iconElement.classList.add('bi', `bi-${icon}`)

  button.setAttribute('type', 'button')
  button.classList.add('btn', 'btn-outline-success', 'btn-sm')

  if (action) {
    button.dataset.action = action
  }

  if (customData) {
    const [customAction, value] = Object.entries(customData)[0]
    button.dataset[customAction] = value
  }

  button.appendChild(iconElement)

  return button
}

export function SectionTitle(
  { title, icon, action, size = TitleSize.MEDIUM, customData }: ITitleProps,
  customSize?: string
): HTMLDivElement {
  const container = document.createElement('div')
  container.classList.add(
    'row',
    'justify-content-between',
    'align-items-center',
    'mt-2'
  )

  const headerWrapper = document.createElement('div')
  headerWrapper.classList.add('col-6')
  const titleElement = document.createElement(customSize ?? size)
  titleElement.classList.add('mb-0')
  titleElement.innerText = title

  headerWrapper.appendChild(titleElement)
  container.appendChild(headerWrapper)

  if (icon) {
    const controlWrapper = document.createElement('div')
    controlWrapper.classList.add(
      'col-1',
      'ms-auto',
      'd-flex',
      'justify-content-end'
    )
    const controlButton = createControlButton(icon, action, customData)
    controlWrapper.appendChild(controlButton)
    container.appendChild(controlWrapper)
  }

  return container
}
