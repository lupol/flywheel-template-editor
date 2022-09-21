import { setTabAttributes } from '../../utils'
import { Input } from './input'

export function AdGroupTemplateInput(
  accordionTabId: string,
  value = ''
): HTMLDivElement {
  const divElement = setTabAttributes(
    document.createElement('div'),
    accordionTabId,
    true
  )
  const templateName = Input(
    'Template Name',
    value,
    'templateName',
    'col-sm-6',
    'Template name is required field'
  )
  divElement.appendChild(templateName)

  return divElement
}
