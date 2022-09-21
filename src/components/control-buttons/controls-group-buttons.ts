import { Action } from '../../enums'
import { ControlButton } from './control-button'

export function ControlGroupButtons(
  containerName: string,
  icons: Record<string, Action>[] = []
): HTMLDivElement {
  const actions = document.createElement('div')
  actions.classList.add('btn-group', containerName)

  icons.forEach((item) => {
    actions.appendChild(ControlButton(item))
  })

  return actions
}
