const chai = require('chai');
chai.should();

({elevateMap} = require('./map-elevation'));

describe('init', function() {
  it('should pass', function() {
    elevateMap(3).should.equal(4);
  });
});
