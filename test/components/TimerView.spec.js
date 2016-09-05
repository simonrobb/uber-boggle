import { expect } from 'chai'
import sinon from 'sinon'
import TimerView from '../../src/components/TimerView'

describe('TimerView component', function() {
  let timerView;

  beforeEach(function() {
    timerView = new TimerView(60, null)
    sinon.stub(timerView, 'render')
  })

  afterEach(function() {
    timerView.render.restore()
  })

  describe('SetTime function', function() {
    it('should exist', function() {
      expect(timerView.setTime).to.exist
    })

    it('should set the time', function() {
      timerView.setTime(10)
      expect(timerView.time).to.equal(10)
    })

    it('should rerender', function() {
      timerView.setTime(10)
      expect(timerView.render.calledOnce).to.be.true
    })
  })
})