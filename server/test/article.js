import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models/index';

const Article = models.Article;
chai.should();
chai.use(chaiHttp);

describe('Articles', () => {
  beforeEach((done) => {
    Article.destroy({
      where: {},
      truncate: true,
    }).then((data) => {
      done();
      console.log(data);
    }).catch((error) => {
      done();
      console.log(error);
    });
  });

  describe('/POST Article', () => {
    it('it should POST an article', (done) => {
      const article = {
        title: 'Introduction to Nodejs',
        body: 'Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.',
        tags: ['Javascript', 'Programming'],
      };
      chai.request(app)
        .post('/api/v1/articles')
        .send(article)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
          res.body.data.should.have.property('title').eql('Introduction to Nodejs');
          res.body.data.should.have.property('body').eql('Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.');
          res.body.data.should.have.property('tags');
          done();
        });
    });
  });
});
