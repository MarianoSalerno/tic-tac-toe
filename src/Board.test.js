import { mount } from 'enzyme'
import Board from './Board'
import { findByTestAttr } from './testHelpers'

describe('Board', () => {
  it('renders properly', () => {
    const mockOnCLick = jest.fn()
    const squares = Array(9).fill(null)
    const wrapper = mount(
      <Board squares={squares} onClick={mockOnCLick} />
    )
  
    squares.forEach((value, i) => {
      const square = findByTestAttr(wrapper, `square-${i}`)
  
      square.simulate('click')
  
      expect(square.exists()).toBe(true)
      expect(square.text()).toBe("")
      expect(mockOnCLick).toHaveBeenCalledTimes(i+1)
    })
  
  })
})