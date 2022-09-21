import { TitleSize, Action } from '../../enums'
import { IKeyword } from '../../types'
import { Divider } from '../divider'
import { SectionTitle } from '../section-title'
import { buildKeywordsRow } from './build-keyword-row'

export function KeywordsTemplates(list: IKeyword[] = []) {
  const fragment = document.createDocumentFragment()
  const container = document.createElement('div')
  container.classList.add('keywords-container')
  const ul = document.createElement('ul')
  ul.classList.add('items-container', 'list-group')
  const liFragment = document.createDocumentFragment()

  const title = SectionTitle({
    title: 'Keywords Configuration',
    size: TitleSize.SMALL,
    action: Action.ADD,
    icon: 'plus-circle-dotted'
  })
  fragment.appendChild(title)
  fragment.appendChild(Divider())

  list.forEach((item) => {
    // TODO: Get options from proper place
    const keywordRow = buildKeywordsRow(
      [
        { title: 'EXACT', value: 'EXACT' },
        { title: 'BROAD', value: 'BROAD' }
      ],
      item
    )
    liFragment.appendChild(keywordRow)
  })

  ul.appendChild(liFragment)
  fragment.appendChild(ul)

  container.appendChild(fragment)
  return container
}
