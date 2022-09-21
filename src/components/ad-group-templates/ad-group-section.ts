import { CustomDataKey, Action } from '../../enums'
import { Divider } from '../divider'
import { SectionTitle } from '../section-title'
import { AdGroupRow } from './ad-group-row'

export function AdGroupSection(list = []): HTMLDivElement {
  const fragment = document.createDocumentFragment()
  const container = document.createElement('div')
  container.classList.add('base-div')
  const ul = document.createElement('ul')
  ul.classList.add('ad-groupe-container', 'p-0', 'accordion', 'accordion-flush')
  const liFragment = document.createDocumentFragment()

  const title = SectionTitle({
    title: 'adGroup Templates',
    icon: 'plus-circle',
    customData: { [CustomDataKey.MANAGE_AD_GROUP]: Action.ADD }
  })
  fragment.appendChild(title)
  fragment.appendChild(Divider())

  list.forEach((item, index) => {
    const li = AdGroupRow(index, item)
    liFragment.appendChild(li)
  })

  ul.appendChild(liFragment)
  fragment.appendChild(ul)

  container.appendChild(fragment)

  return container
}
