import { DataFieldValue } from '../enums'

const getDataValues = (
  target: Element,
  selector: string,
  valueA: string,
  valueB?: string
): Record<string, string>[] => {
  return Array.from(target.querySelectorAll(`${selector} li`)).map(
    (headLine: HTMLLIElement) => {
      const result = {}

      result[valueA] = headLine.dataset[DataFieldValue.FIRST_FIELD]

      if (valueB) {
        result[valueB] = headLine.dataset[DataFieldValue.SECOND_FIELD]
      }

      return result
    }
  )
}

export const fromHTMLToJsonTemplate = (
  formContainer: HTMLDivElement
): string => {
  const template = {}
  Array.from(formContainer.querySelectorAll('.main-fields input')).forEach(
    (item: HTMLInputElement) => {
      template[item.dataset.target] = item.value
    }
  )
  const adGroupConfigurationTemplates = Array.from(
    formContainer.querySelectorAll('.ad-groupe-container > li')
  ).map((item: HTMLLIElement) => {
    const result = {}
    const templateNameInput: HTMLInputElement = item.querySelector('input')
    const keywordInfoConfigurationTemplates = getDataValues(
      item,
      '.keywords-container',
      'textTemplate',
      'keywordMatchType'
    )

    result[templateNameInput.dataset.target] = templateNameInput.value

    const adConfigurationTemplates = Array.from(
      item.querySelectorAll('.ad-config-container > li')
    ).map((item: HTMLLIElement) => {
      const headlineTemplates = getDataValues(
        item,
        '.headline-templates',
        'textTemplate',
        'fallbackText'
      )
      const descriptionLineTemplates = getDataValues(
        item,
        '.description-line-templates',
        'textTemplate',
        'fallbackText'
      )
      const finalUrlTemplates = Array.from(
        item.querySelectorAll('.final-urls li input')
      ).map((input: HTMLInputElement) => input.value)

      return {
        headlineTemplates,
        descriptionLineTemplates,
        finalUrlTemplates
      }
    })

    return {
      ...result,
      keywordInfoConfigurationTemplates,
      adConfigurationTemplates
    }
  })

  return `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify({ ...template, adGroupConfigurationTemplates }, null, 2)
  )}`
}
