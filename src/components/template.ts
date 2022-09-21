import { IAdGroup, ITemplate } from '../types'
import { AdGroupSection } from './ad-group-templates'
import { Input } from './inputs'
import { SectionTitle } from './section-title'

export class Template {
  private templateWrapper = document.createElement('div')

  private mainFields = document.createElement('div')

  constructor(private template?: ITemplate) {
    this.initTemplate(this.template)
  }

  public getTemplate(): HTMLDivElement {
    return this.templateWrapper
  }

  private initTemplate(template?: ITemplate): void {
    this.setStylesClass()
    this.initTitle()
    this.initInputFields(template)
    this.initAdGroupSection(template?.adGroupConfigurationTemplates)
  }

  private setStylesClass(): void {
    this.templateWrapper.classList.add('template')
    this.mainFields.classList.add('main-fields', 'row', 'g-3')
  }

  private initTitle(): void {
    const title = SectionTitle({ title: 'Template Details' })
    this.templateWrapper.appendChild(title)
  }

  private initCustomerIdInput(customerId: number): void {
    const field = Input(
      'Customer Id',
      String(customerId ?? ''),
      'customerId',
      'col-sm-6',
      'Customer ID is required field'
    )
    this.mainFields.appendChild(field)
  }

  private initNameTemplateInput(templateName: string): void {
    const field = Input(
      'Template Name',
      templateName ?? '',
      'templateName',
      'col-sm-6',
      'Template name is required field'
    )
    this.mainFields.appendChild(field)
  }

  private initFeedCriteriaField(value: string): void {
    const feedCriteria = Input(
      'Feed Record Selection Criteria',
      value ?? '',
      'selectionCriteria',
      'col-sm-6',
      'Field is required field'
    )
    this.mainFields.appendChild(feedCriteria)
  }

  private initFeedNameField(name?: string): void {
    const feedName = Input(
      'Feed Name',
      name ?? '',
      'feedName',
      'col-sm-6',
      'Feed name is required field'
    )
    this.mainFields.appendChild(feedName)
  }

  private initInputFields(template?: ITemplate) {
    this.initCustomerIdInput(template?.customerId)
    this.initFeedCriteriaField(template?.feedRecordSelectionCriteria)
    this.initFeedNameField(template?.feedName)
    this.initNameTemplateInput(template?.nameTemplate)

    this.templateWrapper.appendChild(this.mainFields)
  }

  private initAdGroupSection(adGroupTemplates?: IAdGroup[]): void {
    const adGroupContainer = AdGroupSection(adGroupTemplates)
    this.templateWrapper.appendChild(adGroupContainer)
  }
}
