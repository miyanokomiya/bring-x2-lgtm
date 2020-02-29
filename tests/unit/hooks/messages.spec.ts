import { useMessages } from '@/hooks/messages'

describe('@/hooks/messages', () => {
  const messages = useMessages()
  beforeEach(() => {
    messages.clear()
  })
  afterEach(() => {
    messages.clear()
  })

  describe('pushInfo', () => {
    it('push info message', () => {
      expect(messages.state.infos).toEqual([])
      messages.pushInfo('test')
      expect(messages.state.infos).toEqual(['test'])
    })
    it('not push dulpicated message', () => {
      messages.state.infos = ['test']
      messages.pushInfo('test')
      expect(messages.state.infos).toEqual(['test'])
    })
  })
  describe('removeInfo', () => {
    it('remove info message', () => {
      messages.state.infos = ['1', '2', '3']
      messages.removeInfo('2')
      expect(messages.state.infos).toEqual(['1', '3'])
    })
  })
  describe('pushError', () => {
    it('push error message', () => {
      expect(messages.state.errors).toEqual([])
      messages.pushError('test')
      expect(messages.state.errors).toEqual(['test'])
    })
    it('not push dulpicated message', () => {
      messages.state.errors = ['test']
      messages.pushError('test')
      expect(messages.state.errors).toEqual(['test'])
    })
  })
  describe('removeError', () => {
    it('remove error message', () => {
      messages.state.errors = ['1', '2', '3']
      messages.removeError('2')
      expect(messages.state.errors).toEqual(['1', '3'])
    })
  })
  describe('clear', () => {
    it('remove all messages', () => {
      messages.state.infos = ['1', '2', '3']
      messages.state.errors = ['1', '2', '3']
      messages.clear()
      expect(messages.state.infos).toEqual([])
      expect(messages.state.errors).toEqual([])
    })
  })
})
