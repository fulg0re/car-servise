var assert = require('assert');
const validator = require('../../../routes/__common__/validator');

describe('Testing routes/__common__/validator "emailV()"', () => {
  it('#1 should return false', () => {
    assert.equal(validator.emailV('email'), false);
  });
  it('#2 should return false', () => {
    assert.equal(validator.emailV('email@'), false);
  });
  it('#3 should return false', () => {
    assert.equal(validator.emailV('email@email'), false);
  });
  it('#4 should return false', () => {
    assert.equal(validator.emailV('email@email.'), false);
  });
  it('#5 should return false', () => {
    assert.equal(validator.emailV('emailemail.com'), false);
  });
  it('#6 should return true', () => {
    assert.equal(validator.emailV('email@email.com'), true);
  });
});

describe('Testing routes/__common__/validator "usernameV()"', () => {
  it('#1 should return false', () => {
    assert.equal(validator.usernameV('test'), false);
  });
  it('#2 should return true', () => {
    assert.equal(validator.usernameV('uName'), true);
  });
  it('#3 should return true', () => {
    assert.equal(validator.usernameV('testUsername'), true);
  });
  it('#4 should return true', () => {
    assert.equal(validator.usernameV('testUsername111'), true);
  });
  it('#5 should return false', () => {
    assert.equal(validator.usernameV('testUsername1111'), false);
  });
});

describe.skip('Testing routes/__common__/validator "userExistsV()"', () => {
  it('#1 should return false', () => {
    assert.equal(validator.userExistsV('test'), false);
  });
});

describe('Testing routes/__common__/validator "passwordV()"', () => {
  it('#1 should return false', () => {
    assert.equal(validator.passwordV('TestTestTest', 'TestTestTestNOT'), false);
  });
  it('#2 should return false', () => {
    assert.equal(validator.passwordV('Test', 'Test'), false);
  });
  it('#3 should return false', () => {
    assert.equal(validator.passwordV('TestNot', 'TestNot'), false);
  });
  it('#4 should return true', () => {
    assert.equal(validator.passwordV('TestTest', 'TestTest'), true);
  });
  it('#5 should return true', () => {
    assert.equal(
      validator.passwordV('TestTestTestTestTestTestTestOK', 'TestTestTestTestTestTestTestOK'),
      true
    );
  });
  it('#6 should return false', () => {
    assert.equal(
      validator.passwordV('TestTestTestTestTestTestTestNot', 'TestTestTestTestTestTestTestNot'),
      false
    );
  });
});

describe('Testing routes/__common__/validator "userFullNameV()"', () => {
  it('#1 should return false', () => {
    assert.equal(validator.userFullNameV('TestTestQ'), false);
  });
  it('#2 should return true', () => {
    assert.equal(validator.userFullNameV('TestTestOK'), true);
  });
  it('#3 should return true', () => {
    assert.equal(validator.userFullNameV('TestTestTestTestTestTestTestOK'), true);
  });
  it('#4 should return false', () => {
    assert.equal(validator.userFullNameV('TestTestTestTestTestTestTestNot'), false);
  });
});

describe('Testing routes/__common__/validator "carNameV()"', () => {
  it('#1 should return false', () => {
    assert.equal(validator.carNameV('Test'), false);
  });
  it('#2 should return true', () => {
    assert.equal(validator.carNameV('TestQ'), true);
  });
  it('#3 should return true', () => {
    assert.equal(validator.carNameV('TestTestTestTestTest'), true);
  });
  it('#4 should return false', () => {
    assert.equal(validator.carNameV('TestTestTestTestTestQ'), false);
  });
});

describe('Testing routes/__common__/validator "carVinV()"', () => {
  it('#1 should return false', () => {
    assert.equal(validator.carVinV('TestTestTestTest'), false);
  });
  it('#2 should return true', () => {
    assert.equal(validator.carVinV('TestTestTestTestQ'), true);
  });
  it('#3 should return false', () => {
    assert.equal(validator.carVinV('TestTestTestTestOK'), false);
  });
});

describe.skip('Testing routes/__common__/validator "carExistsV()"', () => {
  it('!!! Temporary skiping', () => {
    assert.equal(validator.carExistsV('value1', 'value2'), false);
  });
});

describe.skip('Testing routes/__common__/validator "carOwnerV()"', () => {
  it('!!! Temporary skiping', () => {
    assert.equal(validator.carOwnerV('value1', 'value2'), false);
  });
});

describe('Testing routes/__common__/validator "carBrandV()"', () => {
  it('#1 should return false', () => {
    assert.equal(validator.carBrandV('Test'), false);
  });
  it('#2 should return true', () => {
    assert.equal(validator.carBrandV('Mazda'), true);
  });
  it('#3 should return true', () => {
    assert.equal(validator.carBrandV('BMW'), true);
  });
});

describe('Testing routes/__common__/validator "carModelV()"', () => {
  it('#1 should return false', () => {
    assert.equal(validator.carModelV(''), false);
  });
  it('#2 should return true', () => {
    assert.equal(validator.carModelV('T'), true);
  });
  it('#3 should return true', () => {
    assert.equal(validator.carModelV('TestTestTestTestTest'), true);
  });
  it('#4 should return false', () => {
    assert.equal(validator.carModelV('TestTestTestTestTestQ'), false);
  });
});

describe('Testing routes/__common__/validator "carTypeV()"', () => {
  it('#1 should return false', () => {
    assert.equal(validator.carTypeV(''), false);
  });
  it('#2 should return true', () => {
    assert.equal(validator.carTypeV('T'), true);
  });
  it('#3 should return true', () => {
    assert.equal(validator.carTypeV('TestTestTestTestTest'), true);
  });
  it('#4 should return false', () => {
    assert.equal(validator.carTypeV('TestTestTestTestTestQ'), false);
  });
});

describe('Testing routes/__common__/validator "carFuelTypeV()"', () => {
  it('#1 should return false', () => {
    assert.equal(validator.carFuelTypeV('Test'), false);
  });
  it('#2 should return true', () => {
    assert.equal(validator.carFuelTypeV('Diesel'), true);
  });
});
