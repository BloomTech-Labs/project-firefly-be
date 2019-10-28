//import the file being used for testing and sinon to use a spy for testing
const router = require('./firefly-routes')

describe('Firefly Route CRUD Tests', () => {
  //Check if the file is working 
  it('should exists', () => {
    expect(router).toBeDefined();
  })
  //Create Items
  describe('post()', () => {
      
  })
  //Read the Items
  describe('get()', () => {      
    
  })
  //Update the Items
  describe('put()', () => {
    
  })
  //Delete the Items
  describe('delete()', () => {
    
  })
})