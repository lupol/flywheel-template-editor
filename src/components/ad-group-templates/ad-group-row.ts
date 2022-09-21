import { AdGroupConfigurationTemplates } from './ad-group-configuration-templates'
import { Accordion } from '../create-accordion'
import { KeywordsTemplates } from '../keywords-templates'
import { generateId, setTabAttributes } from '../../utils'
import { AdGroupTemplateInput } from '../inputs'
import { IAdGroup } from '../../types'

export function AdGroupRow(index: number, item?: IAdGroup): HTMLLIElement {
  const li = document.createElement('li')
  li.classList.add('accordion-item')

  const templateTabId = `templateName_${generateId()}`
  const keywordTabId = `keywords_${generateId()}`
  const adGroupTabId = `adGroupConfig_${generateId()}`

  const tabs = [
    { label: 'Template Name', id: templateTabId },
    { label: 'Keywords Configuration', id: keywordTabId },
    { label: 'AdGroup Configuration', id: adGroupTabId }
  ]
  const { accordionHeader, accordionBody, accordionContainer } = Accordion(
    tabs,
    index
  )
  // Append accordion header items
  li.appendChild(accordionHeader)

  // Creating nested elements
  const templateNameContainer = AdGroupTemplateInput(
    templateTabId,
    item?.nameTemplate
  )

  const keywordConfiguration = setTabAttributes(
    KeywordsTemplates(item?.keywordInfoConfigurationTemplates),
    keywordTabId
  )

  const adConfiguration = setTabAttributes(
    AdGroupConfigurationTemplates(item?.adConfigurationTemplates),
    adGroupTabId
  )
  // Fill accordion body with a content
  accordionBody.appendChild(templateNameContainer)
  accordionBody.appendChild(keywordConfiguration)
  accordionBody.appendChild(adConfiguration)
  // Append a accordion to the accordion item
  accordionContainer.appendChild(accordionBody)
  li.appendChild(accordionContainer)

  return li
}
