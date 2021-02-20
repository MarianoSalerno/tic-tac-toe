import { mount } from 'enzyme'
import Game from './Game'
import { findByTestAttr } from './testHelpers'

let wrapper

describe('Game', () => {
  const setup = () => {
    return mount(
      <Game />
    )
  }
  
  beforeEach(() => {
    wrapper = setup('party')
  })
  
  it('renders properly', () => {
    const board = findByTestAttr(wrapper, 'board')
    const status = findByTestAttr(wrapper, 'status')
    const moves = findByTestAttr(wrapper, 'moves')
    const firstMove = findByTestAttr(wrapper, 'move-0')
    
    expect(board.exists()).toBe(true)
    expect(status.exists()).toBe(true)
    expect(status.text()).toBe('Next player: X')
    expect(moves.exists()).toBe(true)
    expect(firstMove.exists()).toBe(true)
    expect(firstMove.text()).toBe('Go to game start')
  })
})