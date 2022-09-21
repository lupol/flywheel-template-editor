import { AdGroupRow } from '../components'
import { Action } from '../enums'

export function handleManageAdGroup(action: Action, target: HTMLElement): void {
  const adGroupContainer = target
    .closest('.base-div')
    ?.querySelector('.ad-groupe-container')
  if (action === Action.ADD) {
    adGroupContainer.appendChild(AdGroupRow(adGroupContainer.children.length))
  }
  if (action === Action.REMOVE) {
    target.closest('.accordion-item')?.remove()

    adGroupContainer
      .querySelectorAll('.accordion-header > .accordion-button')
      .forEach((item: HTMLButtonElement, index) => {
        item.innerText = `AdGroup #${index + 1}`
      })
  }
}
