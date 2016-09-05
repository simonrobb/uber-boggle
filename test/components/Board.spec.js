import { expect } from 'chai'
import { Board, BoardIndex } from '../../src/components/Board'

describe('Board class', function() {
  let board

  beforeEach(function() {
    board = new Board()
    board.rows = [
      ['a', 'b', 'c', 'd'],
      ['e', 'f', 'g', 'h'],
      ['i', 'j', 'k', 'l'],
      ['m', 'n', 'o', 'p']
    ]
  })

  describe('validation function', function() {
    it('should return true for a valid word', function() {
      expect(board.validateWord('abc')).to.be.true
    })

    it('should return false for an invalid word', function() {
      expect(board.validateWord('abd')).to.be.false
    })

    it('should return false when the same letter is used more than once', function() {
      expect(board.validateWord('aba')).to.be.false
    })
  })

  describe('index functions', function() {
    it('should return all indices', function() {
      expect(board.getAllIndices().length).to.equal(16)
    })

    it('should return available indices for a corner', function() {
      const index = new BoardIndex(0, 0) 
      expect(board.getAvailableIndices(index).length).to.equal(3)
    })

    it('should return available indices for a side', function() {
      const index = new BoardIndex(1, 0) 
      expect(board.getAvailableIndices(index).length).to.equal(5)
    })

    it('should return available indices for an inner', function() {
      const index = new BoardIndex(1, 1) 
      expect(board.getAvailableIndices(index).length).to.equal(8)
    })

    it('should return available indices without a used index', function() {
      const index = new BoardIndex(1, 1) 
      const usedIndices = [new BoardIndex(0, 0)] 
      expect(board.getAvailableIndices(index, usedIndices).length).to.equal(7)
    })
  })
})