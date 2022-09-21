import { TitleSize, Action, CustomDataKey } from '../enums'

export interface IKeyword {
  textTemplate: string
  keywordMatchType: 'EXACT' | 'BROAD'
}

export interface IHeadLine {
  textTemplate: string
  fallbackText: string
}

export interface ITabItem {
  label: string
  id: string
  customStyleClass?: string
}

export interface IEditableFields {
  firstField: HTMLInputElement | HTMLTextAreaElement
  secondField: HTMLTextAreaElement | HTMLSelectElement
}

export interface ITitleProps {
  title: string
  size?: TitleSize
  icon?: string
  action?: Action
  customData?: Record<CustomDataKey, Action>
}

export interface ITemplate {
  customerId: number
  nameTemplate: string
  feedRecordSelectionCriteria: string
  feedName: string
  adGroupConfigurationTemplates: IAdGroup[]
}

export interface IAdGroup {
  nameTemplate: string
  keywordInfoConfigurationTemplates: IKeyword[]
  adConfigurationTemplates: IAdConfiguration[]
}

export interface ITemplateLineItem {
  textTemplate: string
  fallbackText: string
}

export interface IAdConfiguration {
  headlineTemplates: ITemplateLineItem[]
  descriptionLineTemplates: ITemplateLineItem[]
  finalUrlTemplates: string[]
  /**
   * @deprecated
   */
  adType?: string
}

export type Maybe<T> = T | null | undefined
