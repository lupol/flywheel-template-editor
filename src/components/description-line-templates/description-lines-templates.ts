import { TitleSize } from '../../enums'
import { Divider } from '../divider'
import { SectionTitle } from '../section-title'
import { DescriptionRow } from './build-description-row'

export function DescriptionLineTemplates(list = []) {
  const fragment = document.createDocumentFragment()
  const container = document.createElement('div')
  container.classList.add('base-div', 'description-line-templates')
  const ul = document.createElement('ul')
  ul.classList.add('items-container', 'list-group')
  const liFragment = document.createDocumentFragment()

  const title = SectionTitle({
    title: 'Description Line Templates',
    size: TitleSize.SMALL,
    icon: 'plus-lg'
  })
  fragment.appendChild(title)
  fragment.appendChild(Divider())

  list.forEach((item) => {
    const descriptionRow = DescriptionRow(item)

    liFragment.appendChild(descriptionRow)
  })

  ul.appendChild(liFragment)
  fragment.appendChild(ul)

  container.appendChild(fragment)
  return container
}
