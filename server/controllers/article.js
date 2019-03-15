import models from '../models/index';
import Validation from '../helpers/validation';

const Article = models.Article;

class ArticleController {
  create(req, res) {
    const article = {
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
    };
    const { error } = Validation.validateArticle(article);
    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }
    return Article.create({
      title: article.title.trim(),
      body: article.body.trim(),
      tags: article.tags,
    }).then(data => res.status(201).json({ status: 201, data: data }))
      .catch(err => res.status(400).json({ status: 400, error: err.name }));
  }

  getAll(req, res) {
    return Article.findAll({})
      .then((data) => {
        res.status(200).json({ status: 200, data: data });
      }).catch((err) => {
        res.status(404).json({ status: 404, error: err.name });
      });
  }

  getOne(req, res) {
    if (!Number.isInteger(Number(req.params.id))) {
      return res.status(400).json({ status: 400, error: 'The Article ID must be an integer' });
    }

    return Article.findByPk(req.params.id)
      .then((data) => {
        if (!data) {
          return res.status(404).json({ status: 404, error: 'The Article with given ID is not found' });
        }
        return res.status(200).json({ status: 200, data: data });
      }).catch((err) => {
        res.status(404).json({ status: 404, error: err.name });
      });
  }

  update(req, res) {
    if (!Number.isInteger(Number(req.params.id))) {
      return res.status(400).json({ status: 400, error: 'The Article ID must be an integer' });
    }

    const article = {
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
    };
    const { error } = Validation.validateArticle(article);
    if (error) {
      return res.status(400).json({ status: 400, error: error.details[0].message });
    }
    return Article.findById(req.params.id)
      .then((data) => {
        if (!data) {
          return res.status(404).json({ status: 404, error: 'The Article with given ID is not found' });
        }
        return Article.update({
          title: article.title.trim(),
          body: article.body.trim(),
          tags: article.tags,
        },
        { where: { id: parseInt(req.params.id) } }).then((data1) => {
          return Article.findById(req.params.id)
            .then(data2 => res.status(200).json({ status: 200, data: data2 }))
            .catch(err2 => res.status(404).json({ status: 404, error: err2.name }));
        }).catch((err1) => {
          res.status(404).json({ status: 404, error: err1.name });
        });
      }).catch((err) => {
        res.status(404).json({ status: 404, error: err.name });
      });
  }

  delete(req, res) {
    if (!Number.isInteger(Number(req.params.id))) {
      return res.status(400).json({ status: 400, error: 'The Article ID must be an integer' });
    }
    return Article.findById(req.params.id)
      .then((data) => {
        if (!data) {
          return res.status(404).json({ status: 404, error: 'The Article with given ID is not found' });
        }
        return Article.destroy({ where: { id: req.params.id } })
          .then(data1 => res.status(200).json({ status: 200, message: 'Article successfuly deleted' }))
          .catch(err1 => res.status(404).json({ status: 404, error: err1.name }));
      }).catch((err) => {
        res.status(404).json({ status: 404, error: err.name });
      });
  }
}

const article = new ArticleController();

export default article;
