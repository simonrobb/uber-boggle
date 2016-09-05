import { expect } from 'chai'
import sinon from 'sinon'
import WordListView from '../../src/components/WordListView'

describe('WordListView component', function() {
  let wordListView;

  beforeEach(function() {
    wordListView = new WordListView([], null)
    sinon.stub(wordListView, 'render')
  })

  afterEach(function() {
    wordListView.render.restore()
  })

  describe('SetWords function', function() {
    it('should exist', function() {
      expect(wordListView.setWords).to.exist
    })

    it('should set the word list', function() {
      const words = ['foo']
      wordListView.setWords(words)
      expect(wordListView.words).to.equal(words)
    })

    it('should rerender', function() {
      wordListView.setWords(['foo'])
      expect(wordListView.render.calledOnce).to.be.true
    })
  })
})