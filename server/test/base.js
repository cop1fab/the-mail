import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models/index';

chai.should();
chai.use(chaiHttp);

const User = models.user;

class Token {
  signUpUser() {
    User.destroy({
      where: {},
      truncate: true,
    }).then((data) => {
      console.log('users deleted');
    }).catch(err => console.log(err));
    const user = {
      name: 'Pacifique Clement Ndayisenga',
      email: 'pacifiqueclement@gmail.com',
      password: 'password',
    };
    return chai.request(app)
      .post('/api/v1/users/signup')
      .send(user);
  }

  getToken() {
    const user = {
      email: 'pacifiqueclement@gmail.com',
      password: 'password',
    };
    return chai.request(app)
      .post('/api/v1/users/signin')
      .send(user);
  }
}

export default new Token();
