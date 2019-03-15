import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import app from '../app';
import models from '../models/index';
import Token from './base';
// import token from .....

const Article = models.Article;
chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);

describe('Articles', () => {
  const article = {
    title: 'Introduction to Nodejs',
    body: 'Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.',
    tags: ['Javascript', 'Programming'],
  };
  const articleValidate = {
    title: '',
    body: '',
    tags: null,
  };

  let token;

  before((done) => {
    Token.signUpUser().then((res) => {
      Token.getToken().then((res1) => {
        token = res1.body.token;
      }).catch(err1 => console.log(err1));
      done();
    }).catch((err) => {
      console.log(err);
      done();
    });
  });

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
    it('it should not POST an article when the article data are not valid', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set('Authorization', token)
        .send(articleValidate)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          done();
        });
    });
    it('it should POST an article', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set('Authorization', token)
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
        .set('Authorization', token)
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
    it('it should not GET the article if the ID is not an integer', (done) => {
      chai.request(app)
        .get('/api/v1/articles/ok')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error').eql('The Article ID must be an integer');
          done();
        });
    });

    it('it should GET one article', (done) => {
      Article.create({
        title: 'Introduction to Nodejs',
        body: 'Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.',
        tags: ['Javascript', 'Programming'],
      }).then((data) => {
        chai.request(app)
          .get('/api/v1/articles/' + data.id)
          .set('Authorization', token)
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

  describe('/PUT/:id Article', () => {
    let id = null;

    it('it should not UPDATE the article if the ID is not an integer', (done) => {
      chai.request(app)
        .put('/api/v1/articles/ok')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error').eql('The Article ID must be an integer');
          done();
        });
    });


    it('it should UPDATE an article', (done) => {
      Article.create({
        title: 'Introduction to Nodejs',
        body: 'Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.',
        tags: ['Javascript', 'Programming'],
      }).then((data) => {
        id = data.id;
        Article.update(article, { where: { id: data.id } })
          .then((data1) => {
            chai.request(app)
              .put('/api/v1/articles/' + data.id)
              .set('Authorization', token)
              .send(article)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(200);
                res.body.should.have.property('data');
                res.body.data.should.have.property('title').eql(article.title);
                res.body.data.should.have.property('body').eql(article.body);
                res.body.data.should.have.property('tags');
                res.body.data.tags.should.be.a('array');
                done();
              });
          }).catch((err1) => {
            console.log(err1);
          });
      }).catch((err) => {
        console.log(err);
      });
    });
    it('it should not UPDATE the article when the article data are not valid', (done) => {
      chai.request(app)
        .put('/api/v1/articles/' + id)
        .set('Authorization', token)
        .send(articleValidate)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          done();
        });
    });
  });

  describe('/DELETE/:id Article', () => {
    it('it should not DELETE the article if the ID is not an integer', (done) => {
      chai.request(app)
        .delete('/api/v1/articles/ok')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error').eql('The Article ID must be an integer');
          done();
        });
    });

    it('it should DELETE an article', (done) => {
      Article.create({
        title: 'Introduction to Nodejs',
        body: 'Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.',
        tags: ['Javascript', 'Programming'],
      }).then((data) => {
        chai.request(app)
          .delete('/api/v1/articles/' + data.id)
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(200);
            res.body.should.have.property('message').eql('Article successfuly deleted');
            done();
          });
      }).catch((err) => {
        console.log(err);
      });
    });
  });
});
