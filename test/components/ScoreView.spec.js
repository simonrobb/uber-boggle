import { expect } from 'chai'
import sinon from 'sinon'
import ScoreView from '../../src/components/ScoreView'

describe('ScoreView component', function() {
  let scoreView;

  beforeEach(function() {
    scoreView = new ScoreView(60, null)
    sinon.stub(scoreView, 'render')
  })

  afterEach(function() {
    scoreView.render.restore()
  })

  describe('SetScore function', function() {
    beforeEach(function() {
      sinon.stub(scoreView, 'animateIfUpdated')
    })

    afterEach(function() {
      scoreView.animateIfUpdated.restore()
    })

    it('should exist', function() {
      expect(scoreView.setScore).to.exist
    })

    it('should set the score', function() {
      scoreView.setScore(10)
      expect(scoreView.score).to.equal(10)
    })

    it('should rerender', function() {
      scoreView.setScore(10)
      expect(scoreView.render.calledOnce).to.be.true
    })
  })
})