import { HeadlineTemplates } from '../header-lines-templates'
import { DescriptionLineTemplates } from '../description-line-templates'
import { Action, CustomDataKey } from '../../enums'
import { generateId, buildTabList, setTabAttributes } from '../../utils'
import { Divider } from '../divider'
import { FinalUrlTemplates } from '../final-url-templates'
import { SectionTitle } from '../section-title'

export function AdGroupConfigurationTemplates(list = []): HTMLDivElement {
  const fragment = document.createDocumentFragment()
  const container = document.createElement('div')
  container.classList.add('base-div')
  const ul = document.createElement('ul')
  ul.classList.add('ad-config-container')
  const liFragment = document.createDocumentFragment()

  const title = SectionTitle({
    title: 'AD Configuration Templates',
    action: Action.ADD,
    icon: 'plus-circle',
    customData: { [CustomDataKey.MANAGE_AD_CONFIG]: Action.ADD }
  })

  fragment.appendChild(title)
  fragment.appendChild(Divider())

  list.forEach((item) => {
    const li = document.createElement('li')
    const innerLiFragment = document.createDocumentFragment()

    const headLineId = `headline_templates_${generateId()}`
    const descriptionsId = `description_line_templates_${generateId()}`
    const finaleUrlId = `final_url_templates_${generateId()}`

    const tabs = [
      { label: 'Headline Templates', id: headLineId },
      { label: 'Description Line Templates', id: descriptionsId },
      { label: 'Final Url Templates', id: finaleUrlId }
    ]

    const tabsElement = buildTabList(tabs)
    innerLiFragment.appendChild(tabsElement)

    const headlineTemplates = setTabAttributes(
      HeadlineTemplates(item.headlineTemplates),
      headLineId,
      true
    )
    innerLiFragment.appendChild(headlineTemplates)

    const descriptionLineTemplates = setTabAttributes(
      DescriptionLineTemplates(item.descriptionLineTemplates),
      descriptionsId
    )
    innerLiFragment.appendChild(descriptionLineTemplates)

    const finalUrls = setTabAttributes(
      FinalUrlTemplates(item.finalUrlTemplates),
      finaleUrlId
    )
    innerLiFragment.appendChild(finalUrls)

    li.appendChild(innerLiFragment)
    liFragment.appendChild(li)
  })

  ul.appendChild(liFragment)
  fragment.appendChild(ul)

  container.appendChild(fragment)
  return container
}
