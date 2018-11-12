/**
 * Common setup for tests
 */

const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);

//Use shoudls syntax
require('chai').should();
