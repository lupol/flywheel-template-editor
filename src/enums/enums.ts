export enum Action {
  ADD = 'add',
  REMOVE = 'trash',
  EDIT = 'pencil',
  CLOSE = 'x',
  SAVE = 'check-lg'
}

export enum Relation {
  KEYWORDS = 'keywords',
  HEADLINES = 'headline',
  DESCRIPTION = 'descriptionLine',
  FINAL_URL = 'finalUrls',
  AD_CONFIG = 'adConfig',
  AD_GROUPE = 'adGroupe'
}

export enum KeyCode {
  Backspace = 'Backspace',
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  Escape = 'Escape',
  Enter = 'Enter'
}

export enum DataFieldValue {
  FIRST_FIELD = 'first_field_value',
  SECOND_FIELD = 'second_field_value'
}

export enum CustomDataKey {
  MANAGE_AD_GROUP = 'manageAdGroup',
  MANAGE_AD_CONFIG = 'manageAdConfig'
}

export enum TitleSize {
  SMALL = 'h6',
  MEDIUM = 'h4',
  LARGE = 'h2'
}
