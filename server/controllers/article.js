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
    return Article.create(article)
      .then(data => res.status(201).json({ status: 201, data: data }))
      .catch(err => res.status(400).json({ status: 400, error: err }));
  }
}

const article = new ArticleController();

export default article;
