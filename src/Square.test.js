import { mount } from 'enzyme'
import Square from './Square'

const mockOnCLick = jest.fn()

describe('Square', () => {
  it('renders properly', () => {
    const squareValue = 'X'
    const wrapper = mount(
      <Square value={squareValue} onClick={mockOnCLick} />
    )
    const button = wrapper.find('button')

    expect(button.text()).toEqual(squareValue)
    button.simulate('click')
    expect(mockOnCLick).toHaveBeenCalled()
  })
})