import Joi from 'joi';

class Validation {
  validateArticle(article) {
    const schema = Joi.object({
      title: Joi.string().empty().trim().required(),
      body: Joi.string().empty().trim().required(),
    }).unknown();

    return Joi.validate(article, schema);
  }

  /**
   * Validate posted comment
   * @param {Object} comment - Body
   */
  validateComment(comment) {
    const schema = Joi.object().keys({
      body: Joi.string().trim().min(3).required(),
    });
    return new Promise((resolve, reject) => {
      const { error } = Joi.validate(comment, schema);
      if (error) {
        reject(error.details[0]);
      } resolve(true);
    });
  }
}

const validation = new Validation();

export default validation;
