import { Action } from '../../enums'
import { ControlGroupButtons } from './controls-group-buttons'

export function ControlButtons(): HTMLDivElement {
  const controls = document.createElement('div')
  controls.classList.add('__controls')

  const controlActions = [
    { icon: Action.EDIT, action: Action.EDIT },
    { icon: Action.REMOVE, action: Action.REMOVE }
  ]

  const editActions = [
    { icon: Action.SAVE, action: Action.SAVE },
    { icon: Action.CLOSE, action: Action.CLOSE }
  ]

  controls.appendChild(ControlGroupButtons('__control', controlActions))
  controls.appendChild(ControlGroupButtons('__edit', editActions))

  return controls
}
