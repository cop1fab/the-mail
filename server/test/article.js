import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import app from '../app';
import models from '../models/index';

const Article = models.Article;
chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

describe('Articles', () => {
  beforeEach((done) => {
    Article.destroy({
      where: {},
      truncate: true,
    }).then((data) => {
      done();
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

  describe('/GET Article', () => {
    it('it should GET all articles', (done) => {
      Article.create({
        title: 'Introduction to Nodejs',
        body: 'Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.',
        tags: ['Javascript', 'Programming'],
      }).then((data) => {
        console.log('Article created');
      }).catch((err) => {
        console.log(err);
      });

      chai.request(app)
        .get('/api/v1/articles')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data.should.all.have.property('id');
          res.body.data.should.all.have.property('title');
          res.body.data.should.all.have.property('body');
          res.body.data.should.all.have.property('tags');
          res.body.data.should.all.have.property('createdAt');
          res.body.data.should.all.have.property('updatedAt');
          done();
        });
    });
  });

  describe('/GET/:id Article', () => {
    it('it should GET one article', (done) => {
      Article.create({
        title: 'Introduction to Nodejs',
        body: 'Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.',
        tags: ['Javascript', 'Programming'],
      }).then((data) => {
        chai.request(app)
          .get('/api/v1/articles/' + data.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(200);
            res.body.should.have.property('data');
            res.body.data.should.have.property('title').eql('Introduction to Nodejs');
            res.body.data.should.have.property('body').eql('Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.');
            res.body.data.should.have.property('tags');
            done();
          });
      })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
