import Joi from 'joi';

class Validation {
  validateArticle(article) {
    const schema = Joi.object({
      title: Joi.string().empty().trim().required(),
      body: Joi.string().empty().trim().required(),
    }).unknown();

    return Joi.validate(article, schema);
  }
}

const validation = new Validation();

export default validation;
