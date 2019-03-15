import models from '../models';
import Validation from '../helpers/validation';

const Comment = models.Comment;

/**
 * Controller of Comment model
 * @exports
 * @class
 */
class CommentController {
    /**
     * Create Comment
     * @param {Object} req - Request made by user
     * @param {Object} res - Response to the request
     * @returns {Object} Response
     */
    async create (req, res) {
        const { body } = req.body;
        const { id_article } = req.params;
        try {
            // validate data before storing in the database
            await Validation.validateComment(req.body);

            const [comment, created] = await Comment
                .findOrCreate({
                    where: {
                        body,
                        id_article,
                        id_user: req.user.id
                    }
                });
            // Is comment already exist
            if (!created) {
                throw new Error('Given comment is already created by the same user on the same article');
            }

            return res.status(201).send({
                status: 201,
                data: comment,
            });
        }
        catch(err) {
            return res.status(400).send({
                status: 400,
                error: err.message
            });
        }
    }
}
   
export default new CommentController();
