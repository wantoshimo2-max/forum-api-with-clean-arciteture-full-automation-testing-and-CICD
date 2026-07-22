/* istanbul ignore file */
import pool from '../src/Infrastructures/database/postgres/pool.js';

const CommentsTableTestHelper = {
  async addComment({
    id = 'comment-123',
    threadId = 'thread-123',
    userId = 'user-123',
    content = 'comment content',
    isDelete = false,
  }) {
    const query = {
      text: 'INSERT INTO comentars(id, thread_id, user_id, content, is_delete) VALUES($1, $2, $3, $4, $5)',
      values: [id, threadId, userId, content, isDelete],
    };

    await pool.query(query);
  },

  async findCommentsById(id) {
    const query = {
      text: 'SELECT * FROM comentars WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comentars WHERE 1=1');
  },
};

export default CommentsTableTestHelper;
