import createPattern from '../pattern'

interface TestObj1 {
  type: '1'
}

interface TestObj2 {
  type: '2'
}

describe('Test for pattern match', () => {
  test('required pattern', () => {
    const pattern = createPattern<TestObj1 | TestObj2, 'result1' | 'result2'>()
      .setup('type')
      .map({
        1: (v) => {
          expect(v.type).toBe('1')
          return 'result1'
        },
        2: (v) => {
          expect(v.type).toBe('2')
          return 'result2'
        }
      })
    expect(pattern.match({ type: '1' })).toBe('result1')
    expect(pattern.match({ type: '2' })).toBe('result2')
  })
  test('partial pattern', () => {
    const pattern = createPattern<TestObj1 | TestObj2, 'result1' | 'orElse'>()
      .setup('type')
      .map({
        1: (v) => {
          expect(v.type).toBe('1')
          return 'result1'
        }
      })
      .orElse(() => 'orElse')
    expect(pattern.match({ type: '1' })).toBe('result1')
    expect(pattern.match({ type: '2' })).toBe('orElse')
  })
})
