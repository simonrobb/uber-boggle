import { expect } from 'chai'
import Dictionary from '../../src/components/Dictionary'

describe('Dictionary class', function() {
  it('should test an unsuccessful API lookup correctly', function() {
    const response = {
      query: {
        pages: {
          [-1]: {}
        }
      }
    }

    expect(Dictionary.getResultFromApiResponse(response)).to.be.false
  })

  it('should test an successful API lookup correctly', function() {
    const response = {
      query: {
        pages: {
          [3]: {}
        }
      }
    }

    expect(Dictionary.getResultFromApiResponse(response)).to.be.true
  })
})