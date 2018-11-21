import {mount} from '@vue/test-utils';
import UserDetailsCard from './../components/Users/UserDetailsCard.vue'

describe('UserDetailsCard', () => {
  test('setup correctly', () => {
    expect(true).toBe(true)
  })
  test('', () => {
    const wrapper = mount(UserDetailsCard)
    expect(wrapper.text()).toContain('a')
  })
});