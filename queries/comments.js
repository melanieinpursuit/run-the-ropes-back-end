const db = require('../db/dbConfig.js')

const getAllComments = async (wrestler_id) => {
    try {
        const allComments = await db.any('SELECT * FROM comments WHERE wrestler_id=$1', wrestler_id)
        return allComments
    } catch (error) {
        return (error)
    }
}

const getComment = async (id) => {
    try {
        const comment = await db.one('SELECT * FROM comments WHERE id=$1', id)
        return comment
    } catch (error) {
        return error
    }
}

const createComment = async (comment) => {
    let { commenter, content, rating, wrestler_id } = comment
    try {
        const newComment = await db.one('INSERT INTO comments (commenter, content, rating, wrestler_id) VALUES ($1, $2, $3, $4) RETURNING *', [commenter, content, rating, wrestler_id])
        return newComment
    } catch (error) {
        return error
    }
}

const deleteComment = async (id) => {
    try {
        const deletedComment = await db.one('DELETE FROM comments WHERE id=$1 RETURNING *', id)
        return deletedComment
    } catch (error) {
        return error
    }
}

const updateComment = async (id, comment) => {
    try {
        const updatedComment = await db.one('UPDATE comments SET commenter=$1, content=$2, rating=$3, wrestler_id=$4 WHERE id=$5 RETURNING *', [
            comment.commenter,
            comment.content,
            comment.rating,
            comment.wrestler_id,
            id,
        ])
        return updatedComment
    } catch (error) {
        return error
    }
}

module.exports = {
    getAllComments,
    getComment,
    createComment,
    deleteComment,
    updateComment
}