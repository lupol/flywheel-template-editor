import { Action } from '../../enums'

export function ControlButton({
  icon,
  action
}: Record<string, Action>): HTMLButtonElement {
  const button = document.createElement('button')
  const iconElement = document.createElement('i')
  iconElement.classList.add('bi')
  iconElement.classList.toggle(`bi-${icon}`, Boolean(icon))
  button.appendChild(iconElement)
  button.classList.add('btn', 'btn-outline-secondary')
  button.setAttribute('type', 'button')
  button.dataset.control = action.toString()
  return button
}
