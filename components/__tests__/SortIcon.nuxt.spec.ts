import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect } from 'vitest'
import SortIcon from '../SortIcon.vue'

describe('SortIcon', () => {
  it('renders properly with asc value', async () => {
    const wrapper = await mountSuspended(SortIcon, { props: { value: 'asc' } })
    expect(wrapper.text()).toEqual('')
    expect(wrapper.attributes().viewBox).toBe('0 12 24 24')
  })
  it('renders properly with desc value', async () => {
    const wrapper = await mountSuspended(SortIcon, { props: { value: 'desc' } })
    expect(wrapper.text()).toEqual('')
    expect(wrapper.attributes().viewBox).toBe('0 0 24 3')
  })
  it('renders properly without value', async () => {
    const wrapper = await mountSuspended(SortIcon)
    expect(wrapper.text()).toEqual('')
    expect(wrapper.attributes().viewBox).toBe('0 0 24 24')
  })
})
