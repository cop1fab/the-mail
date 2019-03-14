import models from '../models';

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
    async create(req, res) {
        const { body } = req.body;
        const { articleId } = req.params;
        const userId = 1; // User Id should be extracted from token
        console.log(req.body);
        try {
            // validate data before storing in the database

            const comment = await Comment
                .create({
                    body,
                    id_article : articleId,
                    id_user : userId
                });
            return res.status(201).send({
                status: 201,
                data: comment
            });
        }
        catch (err) {
            return res.status(400).send({
                status: 400,
                error: err.message
            });
        }
    }
}
   
export default new CommentController();