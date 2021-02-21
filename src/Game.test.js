import { mount } from 'enzyme'
import { move } from 'fs-extra'
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
    wrapper = setup()
  })

  const resetBoardToMove = move => {
    const moveButton = findByTestAttr(wrapper, `move-${move}`)

    moveButton.simulate('click')
    wrapper.update()
  }
  
  const moveSquare = square => {
    square.simulate('click')
    wrapper.update()
  }

  const playUntilXWins = () => {
    const firstSquare = findByTestAttr(wrapper, 'square-0')
    const secondSquare = findByTestAttr(wrapper, 'square-1')
    const thirdSquare = findByTestAttr(wrapper, 'square-2')
    const fourthSquare = findByTestAttr(wrapper, 'square-3')
    const fifthSquare = findByTestAttr(wrapper, 'square-4')

    moveSquare(firstSquare)
    moveSquare(fourthSquare)
    moveSquare(secondSquare)
    moveSquare(fifthSquare)
    moveSquare(thirdSquare)
  }

  const expectNumberOfMoves = (moves, n) => expect(moves.find('li')).toHaveLength(n)

  const expectNextMoveFor = (status, player) => expect(status.text()).toEqual(`Next player: ${player}`)

  const expectBoardToBeEmpty = () => Array(9).fill().forEach((value, i) => expect(findByTestAttr(wrapper, `square-${i}`).text()).toEqual(''))

  const expectMovesToExist = n => Array(n).fill().forEach((value, i) => expect(findByTestAttr(wrapper, `move-${i}`).exists()).toBe(true))
  
  it('renders properly', () => {
    const board = findByTestAttr(wrapper, 'board')
    const status = findByTestAttr(wrapper, 'status')
    const moves = findByTestAttr(wrapper, 'moves')
    const resetGame = findByTestAttr(wrapper, 'move-0')
    
    expect(board.exists()).toBe(true)
    expect(status.exists()).toBe(true)
    expectNextMoveFor(status, 'X')
    expect(moves.exists()).toBe(true)
    expectNumberOfMoves(moves, 1)
    expect(resetGame.exists()).toBe(true)
    expect(resetGame.text()).toBe('Go to game start')
  })

  it('Updates board, status and moves after a move', () => {
    const status = findByTestAttr(wrapper, 'status')
    const square = findByTestAttr(wrapper, 'square-0')
    
    moveSquare(square)
    
    const firstMove = findByTestAttr(wrapper, 'move-1')
    const moves = findByTestAttr(wrapper, 'moves')
    
    expect(square.text()).toBe('X')
    expectNextMoveFor(status, 'O')
    expectNumberOfMoves(moves, 2)
    expect(firstMove.text()).toBe('Go to move #1')
  })

  it('Updates board, status and moves after two moves', () => {
    const status = findByTestAttr(wrapper, 'status')
    const firstSquare = findByTestAttr(wrapper, 'square-0')
    const fifthSquare = findByTestAttr(wrapper, 'square-4')
    
    moveSquare(firstSquare)
    moveSquare(fifthSquare)
    
    const firstMove = findByTestAttr(wrapper, 'move-1')
    const secondMove = findByTestAttr(wrapper, 'move-2')
    const moves = findByTestAttr(wrapper, 'moves')
    
    expect(firstSquare.text()).toBe('X')
    expect(fifthSquare.text()).toBe('O')
    expectNextMoveFor(status, 'X')
    expectNumberOfMoves(moves, 3)
    expect(firstMove.text()).toBe('Go to move #1')
    expect(secondMove.text()).toBe('Go to move #2')
  })

  it('Nothing changes if a square is clicked twice', () => {
    const status = findByTestAttr(wrapper, 'status')
    const square = findByTestAttr(wrapper, 'square-0')
    
    moveSquare(square)
    moveSquare(square)
    
    const moves = findByTestAttr(wrapper, 'moves')
    const firstMove = findByTestAttr(wrapper, 'move-1')
    const secondMove = findByTestAttr(wrapper, 'move-2')
    
    expect(square.text()).toBe('X')
    expectNextMoveFor(status, 'O')
    expectNumberOfMoves(moves, 2)
    expect(firstMove.text()).toBe('Go to move #1')
    expect(secondMove.exists()).toBe(false)
  })

  it('Updates board, status and moves after X wins', () => {
    const status = findByTestAttr(wrapper, 'status')
    
    playUntilXWins()

    const moves = findByTestAttr(wrapper, 'moves')

    expect(status.text()).toEqual('The winner is: X')
    expectNumberOfMoves(moves, 6)
    expectMovesToExist(5)
  })

  it('Jump to game start resets the board', () => {
    const status = findByTestAttr(wrapper, 'status')

    playUntilXWins()

    resetBoardToMove(0)

    expectBoardToBeEmpty()
    expectNextMoveFor(status, 'X')
  })

  it('Jump to first move restores the board to that state', () => {
    const status = findByTestAttr(wrapper, 'status')
    const firstSquare = findByTestAttr(wrapper, 'square-0')
    const fifthSquare = findByTestAttr(wrapper, 'square-4')
    
    moveSquare(firstSquare)
    moveSquare(fifthSquare)
    
    resetBoardToMove(1)

    const moves = findByTestAttr(wrapper, 'moves')

    expect(fifthSquare.text()).toBe('')
    expectNextMoveFor(status, 'O')
    expectNumberOfMoves(moves, 3)
  })

  it('Jump to a previous move and moving clears history after that point', () => {
    const fifthSquare = findByTestAttr(wrapper, 'square-4')

    playUntilXWins()
    resetBoardToMove(1)
    moveSquare(fifthSquare)

    const moves = findByTestAttr(wrapper, 'moves')

    expectNumberOfMoves(moves, 3)
  })
})