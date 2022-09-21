import { createLabel } from './label'

describe('Create Label', () => {
  const labelId = 'id_test'
  const name = 'test_name'
  let label: HTMLLabelElement

  beforeEach(() => {
    label = createLabel(labelId, name)
  })

  it('should generate label', () => {
    expect(label.tagName).toBe('LABEL')
  })

  it("should apply correct id at 'for' attribute", () => {
    expect(label).toHaveAttribute('for', 'id_test')
  })

  it('should have correct class', () => {
    expect(label).toHaveClass('form-label')
  })

  it('should generate label with proper name', () => {
    expect(label.innerText).toBe('test_name')
  })
})
