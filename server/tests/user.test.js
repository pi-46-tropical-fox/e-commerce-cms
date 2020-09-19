const request = require('supertest')
const app = require('../app')


describe('Test user login POST /login', function () {

  it('Should return an object contains access_token, name, id with status code 200', (done) => {
    request(app)
      .post("/login")
      .send({ email: "samuel@mail.com", password: "samuel" })
      .set("Accept", "application/json") 
      .expect("Content-Type", /json/)  
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("email", "samuel@mail.com");
        expect(body).toHaveProperty("access_token", expect.any(String));
        done();
      });
  });

  it('Should return an error with status code 400 when user input wrong password', (done) => {
    request(app)
      .post("/login")
      .send({ email: "samuel@mail.com", password: "wrongpass" })
      .set("Accept", "application/json") 
      .expect("Content-Type", /json/)  
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
  
  it('Should return an error with status code 400 when user input non-existent email in database', (done) => {
    request(app)
      .post("/login")
      .send({ email: "samuel1@mail.com", password: "samuel" })
      .set("Accept", "application/json") 
      .expect("Content-Type", /json/)  
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
  
  it('Should return an error with status code 400 when user blank email', (done) => {
    request(app)
      .post("/login")
      .send({ email: "", password: "samuel" })
      .set("Accept", "application/json") 
      .expect("Content-Type", /json/)  
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
  

});

// password disalahin
// product beforeall - atau di seeding

// .set("Accept", "application/json") --- terima json body
// .expect("Content-Type", /json/)  --- response return server json