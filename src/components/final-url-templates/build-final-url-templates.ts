import { TitleSize, Relation } from '../../enums'
import { Divider } from '../divider'
import { Input } from '../inputs'
import { SectionTitle } from '../section-title'

export function FinalUrlTemplates(list = []): HTMLDivElement {
  const fragment = document.createDocumentFragment()
  const container = document.createElement('div')
  container.classList.add('base-div', 'final-urls')
  const ul = document.createElement('ul')
  ul.classList.add('items-container', 'list-group')
  const liFragment = document.createDocumentFragment()

  const title = SectionTitle({
    title: 'Final Url Templates',
    size: TitleSize.SMALL,
    icon: 'plus-lg'
  })
  fragment.appendChild(title)
  fragment.appendChild(Divider())

  list.forEach((item, index) => {
    const li = document.createElement('li')
    li.classList.add('list-group-item')
    li.dataset[Relation.FINAL_URL] = String(index)

    const text = Input(
      'Url',
      item,
      `finalUrlTemplates_${index}`,
      'col-sm-6',
      'Value is required'
    )

    li.appendChild(text)

    liFragment.appendChild(li)
  })

  ul.appendChild(liFragment)
  fragment.appendChild(ul)

  container.appendChild(fragment)
  return container
}
