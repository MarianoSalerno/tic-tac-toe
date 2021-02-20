import { mount } from 'enzyme'
import { stat } from 'fs-extra'
import Game from './Game'
import { findByTestAttr } from './testHelpers'

it('renders properly', () => {
  const wrapper = mount(
    <Game />
  )
  const board = findByTestAttr(wrapper, 'board')
  const status = findByTestAttr(wrapper, 'status')
  const moves = findByTestAttr(wrapper, 'moves')

  expect(board.exists()).toBe(true)
  expect(status.exists()).toBe(true)
  expect(moves.exists()).toBe(true)
})