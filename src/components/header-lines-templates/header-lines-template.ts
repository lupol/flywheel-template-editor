import { TitleSize, Action } from '../../enums'
import { Divider } from '../divider'
import { SectionTitle } from '../section-title'
import { HeadLineRow } from './build-head-line-row'

export function HeadlineTemplates(list = []) {
  const fragment = document.createDocumentFragment()
  const container = document.createElement('div')
  container.classList.add('base-div', 'headline-templates')
  const ul = document.createElement('ul')
  ul.classList.add('items-container', 'list-group')
  const liFragment = document.createDocumentFragment()

  const title = SectionTitle({
    title: 'Headline Templates',
    icon: 'plus-lg',
    size: TitleSize.SMALL,
    action: Action.ADD
  })
  fragment.appendChild(title)
  fragment.appendChild(Divider())

  list.forEach((item) => {
    const headLineRow = HeadLineRow(item)

    liFragment.appendChild(headLineRow)
  })

  ul.appendChild(liFragment)
  fragment.appendChild(ul)

  container.appendChild(fragment)
  return container
}
