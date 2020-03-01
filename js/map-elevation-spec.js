const chai = require('chai');
chai.should();

({elevateMap, lowerMap} = require('./map-elevation'));

const inputMap = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

describe('MapModification', function() {
  context('MapElevation', function() {
    it('should be a pure function', function() {
      elevateMap(inputMap, 2, 6);
      sumOfElements = inputMap.reduce(
          (sum, row) => sum += row.reduce((rowSum, elem) => rowSum += elem), 0);

      sumOfElements.should.equal(0);
    });

    context('simple elevation', function() {
      it('should elevate at one point', function() {
        elevateMap(inputMap, 2, 5).should.deep.equal([
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 1, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ]);
      });
    });

    context('elevating neighbours', function() {
      it('should elevate neighbours', function() {
        const firstIteration = elevateMap(inputMap, 2, 5);
        elevateMap(firstIteration, 2, 5).should.deep.equal([
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 1, 0],
          [0, 0, 0, 0, 1, 2, 1],
          [0, 0, 0, 0, 0, 1, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ]);
      });

      it('should elevate neighbours of neighbours', function() {
        const firstIteration = elevateMap(inputMap, 2, 4);
        const secondIteration = elevateMap(firstIteration, 2, 4);
        const output = elevateMap(secondIteration, 2, 4);

        output.should.deep.equal([
          [0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 1, 2, 1, 0],
          [0, 0, 1, 2, 3, 2, 1],
          [0, 0, 0, 1, 2, 1, 0],
          [0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ]);
      });

      it('should elevate neighbours neighbours #2', function() {
        const iteration1 = elevateMap(inputMap, 2, 4);
        const iteration2 = elevateMap(iteration1, 2, 4);
        const iteration3 = elevateMap(iteration2, 2, 4);
        const iteration4 = elevateMap(iteration3, 3, 1);
        const iteration5 = elevateMap(iteration4, 3, 1);
        const iteration6 = elevateMap(iteration5, 3, 1);

        iteration6.should.deep.equal([
          [0, 0, 0, 0, 1, 0, 0],
          [0, 1, 0, 1, 2, 1, 0],
          [1, 2, 1, 2, 3, 2, 1],
          [2, 3, 2, 1, 2, 1, 0],
          [1, 2, 1, 0, 1, 0, 0],
          [0, 1, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ]);
      });

      it('should elevate neighbours neighbours #3', function() {
        let iterations = elevateMap(inputMap, 3, 3);
        for (let i = 0; i < 6; i++) {
          iterations = elevateMap(iterations, 3, 3);
        }

        iterations.should.deep.equal([
          [1, 2, 3, 4, 3, 2, 1],
          [2, 3, 4, 5, 4, 3, 2],
          [3, 4, 5, 6, 5, 4, 3],
          [4, 5, 6, 7, 6, 5, 4],
          [3, 4, 5, 6, 5, 4, 3],
          [2, 3, 4, 5, 4, 3, 2],
          [1, 2, 3, 4, 3, 2, 1],
        ]);
      });
    });

    context('limits', function() {
      it('should not elevate over limit', function() {
        let iterations = elevateMap(inputMap, 3, 3, [0, 7]);
        for (let i = 0; i < 12; i++) {
          iterations = elevateMap(iterations, 3, 3, [0, 7]);
        }

        iterations.should.deep.equal([
          [1, 2, 3, 4, 3, 2, 1],
          [2, 3, 4, 5, 4, 3, 2],
          [3, 4, 5, 6, 5, 4, 3],
          [4, 5, 6, 7, 6, 5, 4],
          [3, 4, 5, 6, 5, 4, 3],
          [2, 3, 4, 5, 4, 3, 2],
          [1, 2, 3, 4, 3, 2, 1],
        ]);
      });
    });

    context('boundaries', function() {
      it('should skip upper neighbours', function() {
        const firstIteration = elevateMap(inputMap, 0, 1);
        elevateMap(firstIteration, 0, 1).should.deep.equal([
          [1, 2, 1, 0, 0, 0, 0],
          [0, 1, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ]);
      });
      it('should skip left neighbours', function() {
        const firstIteration = elevateMap(inputMap, 2, 0);
        elevateMap(firstIteration, 2, 0).should.deep.equal([
          [0, 0, 0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0, 0],
          [2, 1, 0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ]);
      });
      it('should skip lower neighbour', function() {
        const firstIteration = elevateMap(inputMap, 6, 3);
        elevateMap(firstIteration, 6, 3).should.deep.equal([
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0, 0, 0],
          [0, 0, 1, 2, 1, 0, 0],
        ]);
      });
      it('should skip right neighbour', function() {
        const firstIteration = elevateMap(inputMap, 2, 6);
        elevateMap(firstIteration, 2, 6).should.deep.equal([
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 1],
          [0, 0, 0, 0, 0, 1, 2],
          [0, 0, 0, 0, 0, 0, 1],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ]);
      });
    });
  });

  context('MapDemotion', function() {
    it('should be a pure function', function() {
      lowerMap(inputMap, 2, 6);
      sumOfElements = inputMap.reduce(
          (sum, row) => sum += row.reduce((rowSum, elem) => rowSum += elem), 0);

      sumOfElements.should.equal(0);
    });

    context('simple lowering', function() {
      it('should lower at one point', function() {
        lowerMap(inputMap, 2, 5).should.deep.equal([
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, -1, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ]);
      });
    });

    context('elevating neighbours', function() {
      it('should elevate neighbours', function() {
        const firstIteration = lowerMap(inputMap, 2, 5);
        lowerMap(firstIteration, 2, 5).should.deep.equal([
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, -1, 0],
          [0, 0, 0, 0, -1, -2, -1],
          [0, 0, 0, 0, 0, -1, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ]);
      });

      it('should elevate neighbours of neighbours', function() {
        const firstIteration = lowerMap(inputMap, 2, 4);
        const secondIteration = lowerMap(firstIteration, 2, 4);
        const output = lowerMap(secondIteration, 2, 4);

        output.should.deep.equal([
          [0, 0, 0, 0, -1, 0, 0],
          [0, 0, 0, -1, -2, -1, 0],
          [0, 0, -1, -2, -3, -2, -1],
          [0, 0, 0, -1, -2, -1, 0],
          [0, 0, 0, 0, -1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
        ]);
      });
    });

    context('limits', function() {
      it('should not lower below limit', function() {
        let iterations = lowerMap(inputMap, 3, 3, [-7, 7]);
        for (let i = 0; i < 10; i++) {
          iterations = lowerMap(iterations, 3, 3, [-7, 7]);
        }

        iterations.should.deep.equal([
          [-1, -2, -3, -4, -3, -2, -1],
          [-2, -3, -4, -5, -4, -3, -2],
          [-3, -4, -5, -6, -5, -4, -3],
          [-4, -5, -6, -7, -6, -5, -4],
          [-3, -4, -5, -6, -5, -4, -3],
          [-2, -3, -4, -5, -4, -3, -2],
          [-1, -2, -3, -4, -3, -2, -1],
        ]);
      });
    });
  });
});
