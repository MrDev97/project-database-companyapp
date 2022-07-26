const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if no attribute is provided', () => {
    const employee = new Employee();
    employee.validate((err) => {
      expect(err.errors).to.exist;
    });
  });
  it('should throw an error if attribute is not a string', () => {
    const cases = [{}, []];
    for (let test of cases) {
      const emp = new Employee({
        firstName: test,
        lastName: test,
        department: test,
      });

      emp.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });
  it('should throw an error if attributes are missing', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'John', department: 'IT' },
      { lastName: 'Doe', department: 'IT' },
    ];

    for (let test of cases) {
      const emp = new Employee(test);

      emp.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should not throw an error if attributes are correct', () => {
    const cases = [
      {
        firstName: 'John',
        lastName: 'Doe',
        department: '62dd9723a3569272a44c2812',
      },
      {
        firstName: 'Mark',
        lastName: 'Bernt',
        department: '62dd9734a3569272a44c2813',
      },
    ];

    for (let test of cases) {
      const emp = new Employee(test);

      emp.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
  after(() => {
    mongoose.models = {};
  });
});
