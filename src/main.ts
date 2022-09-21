import fakeData from '../template_example.json'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.scss'
import { Action, CustomDataKey } from './enums'
import { handleControlsClickEvents } from './controllers/controlsClickEventsHandler'

import { handleManageAdGroup } from './controllers/handle-manage-adgroup'
import { getButtonData } from './utils/get-button-dataset'
import { fromHTMLToJsonTemplate } from './utils'
import { Template } from './components'
import { ITemplate } from './types'
import { Maybe } from './types/types'

class Main {
  private downloadButton: Maybe<HTMLButtonElement>
  private template: Maybe<HTMLDivElement>
  private container: Maybe<HTMLDivElement>
  private uploadInput: Maybe<HTMLInputElement>
  private uploadedFiles = null
  private uploadButton: Maybe<HTMLButtonElement>
  private downloadField: Maybe<HTMLAnchorElement>
  private resetButton: Maybe<HTMLButtonElement>

  private autocompleteOptions = [
    "#{'store_name_1'}",
    "#{'store_name_2'}",
    "#{'store_name_3'}",
    "#{'store_name_4'}",
    "#{'store_name_5'}"
  ]

  public initSelectors(): Main {
    this.container = document.querySelector('.main')

    this.resetButton = document.querySelector('.reset-button')
    this.uploadInput = document.querySelector('.file-field')
    this.downloadButton = document.querySelector('.download-button')
    this.downloadField = document.querySelector('.download-template')
    this.fakeForm()
    return this
  }

  public addEventListeners(): void {
    this.uploadInput.addEventListener('change', this.handleReadFile.bind(this))

    document.body.addEventListener('click', (event: MouseEvent) => {
      const element = event.target as HTMLElement
      const buttonData = getButtonData(element)
      const controlButtonAction = buttonData?.control as Action
      const manageAdGroupAction = buttonData[
        CustomDataKey.MANAGE_AD_GROUP
      ] as Action

      // Handle click events for control buttons
      if (controlButtonAction) {
        handleControlsClickEvents(
          controlButtonAction,
          element,
          this.autocompleteOptions
        )
      }
      // Handle click events for adding adGroup
      if (manageAdGroupAction) {
        handleManageAdGroup(manageAdGroupAction, element)
      }

      if (element.classList.contains('upload-button')) {
        this.uploadInput.click()
      }

      if (element.classList.contains('generate-button')) {
        console.log('generate')
      }

      if (element.classList.contains('reset-button')) {
        this.handleRemoveTemplate()
      }
      if (element.classList.contains('download-button')) {
        this.downloadFile()
      }
    })
  }

  private downloadFile(): void {
    this.downloadField.setAttribute(
      'href',
      fromHTMLToJsonTemplate(this.container)
    )
    this.downloadField.setAttribute(
      'download',
      `${new Date().toLocaleDateString('uk-UK')}_template.json`
    )
    this.downloadField.click()
  }

  private handleRemoveTemplate(): void {
    this.uploadInput.value = null
    this.template?.remove()
    this.template = null
  }

  private handleReadFile(): void {
    const { files } = this.uploadInput

    if (files.length > 0) {
      this.uploadedFiles = files.item(0)

      const fr = new FileReader()

      // TODO: update type
      fr.onload = (e: any) => {
        const result = JSON.parse(e.target.result)

        this.fillForm(result)
      }

      fr.readAsText(this.uploadedFiles)
    }
  }

  private fillForm(data: ITemplate) {
    this.template = new Template(data).getTemplate()
    this.container.insertAdjacentElement('afterbegin', this.template)
  }

  fakeForm() {
    this.fillForm(fakeData)
  }
}

const main = new Main()

main.initSelectors().addEventListeners()
