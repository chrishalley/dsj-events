const mocha = require('mocha');
const expect = require('expect');
const request = require('supertest');

const axios = require('@nuxtjs/axios');

describe('Updating user data', () => {

  beforeEach(() => {
    axios.post(`${process.env.baseURL}/users`, {
      firstName: 'Test',
      lastName: 'Testerson',
      email: 'test@test.com'
    })
  });

  it('should change the user\'s status from "pending" to "approved"', (done) => {
    done();
  })

});