const chai = require('chai');
chai.should();

global.document = {body: {onload: {}}};
({getColor, initColors} = require('./draw-map'));

describe('Draw map spec', function() {
  before(function() {
    initColors();
  });

  it('should return colors', function() {
    getColor(0).should.equal('#67ddf5');
    getColor(1).should.equal('#fff08f');
    getColor(3).should.equal('#81d952');
  });

  it('should interpolate missing colors', function() {
    getColor(2).should.equal('#c0e571');
    getColor(13).should.equal('#d8dbdd');
  });
});
