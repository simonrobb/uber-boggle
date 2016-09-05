import { expect } from 'chai'
import sinon from 'sinon'
import BoardView from '../../src/components/BoardView'

describe('BoardView component', function() {
  let boardView;

  beforeEach(function() {
    boardView = new BoardView([], null)
    sinon.stub(boardView, 'render')
  })

  afterEach(function() {
    boardView.render.restore()
  })

  describe('SetBoard function', function() {
    it('should exist', function() {
      expect(boardView.setBoard).to.exist
    })

    it('should set the board', function() {
      boardView.setBoard('foo')
      expect(boardView.board).to.equal('foo')
    })

    it('should rerender', function() {
      boardView.setBoard('foo')
      expect(boardView.render.calledOnce).to.be.true
    })
  })
})