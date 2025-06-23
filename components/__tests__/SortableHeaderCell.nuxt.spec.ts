import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect } from 'vitest'
import SortableHeaderCell from '../SortableHeaderCell.vue'

describe('SortableHeaderCell', () => {
  it('renders properly with asc value', async () => {
    const wrapper = await mountSuspended(SortableHeaderCell, { 
      props: { 
        col: 3, 
        param: 'lastName', 
        sortRef: 'asc',
        sortByRef: 'lastName',
      }, 
    })
    await wrapper.find('div').trigger('click')
    expect(wrapper.find('div').attributes().class).toContain('col-span-3')
    expect(wrapper.vm.sortRef.value).toBe('desc')
    expect(wrapper.vm.sortByRef.value).toBe('lastName')
    expect(wrapper.text()).toBe('')
  })
  it('renders properly with desc value', async () => {
    const wrapper = await mountSuspended(SortableHeaderCell, { 
      props: { 
        col: 2, 
        param: 'lastName', 
        sortRef: 'asc',
        sortByRef: 'email',
      }, 
    })
    await wrapper.find('div').trigger('click')
    expect(wrapper.find('div').attributes().class).toContain('col-span-2')
    expect(wrapper.vm.sortRef.value).toBe('asc')
    expect(wrapper.vm.sortByRef.value).toBe('lastName')
    expect(wrapper.text()).toBe('')
  })
})
