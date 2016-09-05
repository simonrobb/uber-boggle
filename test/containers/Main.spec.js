import { expect } from 'chai'
import sinon from 'sinon'
import Main from '../../src/containers/Main'
import { Board } from '../../src/components/Board'
import Dictionary from '../../src/components/Dictionary'

describe('Main container', function() {
  let main;

  beforeEach(function() {
    main = new Main()
    sinon.stub(main, 'render')
    sinon.stub(main, 'resetWordInput')
  })

  afterEach(function() {
    main.render.restore()
    main.resetWordInput.restore()
  })

  describe('constructor', function() {
    it('should initialize values', function() {
      expect(main.dirty).to.be.false
      expect(main.gameActive).to.be.false
      expect(main.time).to.equal(0)
      expect(main.score).to.equal(0)
    })
  })

  describe('newGame function', function() {
    it('should update state', function() {
      main.newGame()
      expect(main.dirty).to.be.true
      expect(main.gameActive).to.be.true
    })
  })

  describe('endGame function', function() {
    it('should update state', function() {
      main.newGame()
      main.endGame()
      expect(main.dirty).to.be.true
      expect(main.gameActive).to.be.false
    })
  })

  describe('submitWord function', function() {
    beforeEach(function() {
      main.newGame()
      sinon.stub(main, 'submitWordCallback') 
      sinon.stub(main.board, 'validateWord') 
      sinon.stub(Dictionary, 'check', () => new Promise((resolve) => resolve())) 
    })

    afterEach(function() {
      main.submitWordCallback.restore()
      main.board.validateWord.restore()
      Dictionary.check.restore()
    })

    it('should fail validation when word is already used', function() {
      const word = 'abc'
      main.words = [word]
      main.submitWord(word)
      expect(main.submitWordCallback.calledOnce).to.be.true
      expect(main.submitWordCallback.calledWith(sinon.match.string)).to.be.true
    })

    it('should call the board validation function', function() {
      const word = 'abc'
      main.submitWord(word)
      expect(main.board.validateWord.calledOnce).to.be.true
      expect(main.board.validateWord.calledWith(word)).to.be.true
    })

    it('should call the Dictionary validation function', function() {
      const word = 'abc'

      // Set up board to make board validation check pass
      const board = new Board()
      board.rows = [[word.split('')]]
      main.board = board
      sinon.stub(main.board, 'validateWord', () => true)

      main.submitWord(word)
      expect(Dictionary.check.calledOnce).to.be.true
      expect(Dictionary.check.calledWith(word)).to.be.true
    })
  })
})