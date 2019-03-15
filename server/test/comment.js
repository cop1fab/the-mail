import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import app from '../app';
import models from '../models/index';

const Comment = models.Comment;
chai.should();
chai.use(chaiHttp);
chai.use(chaiThings);
