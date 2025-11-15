import promisePool from '../utils/database.js';

// GET likes for a media item
const getLikesByMedia = async (media_id) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM likes WHERE media_id = ?',
      [media_id]
    );
    return rows;
  } catch (e) {
    return { error: e.message };
  }
};

// GET likes done by a user
const getLikesByUser = async (user_id) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM likes WHERE user_id = ?',
      [user_id]
    );
    return rows;
  } catch (e) {
    return { error: e.message };
  }
};

// POST new like
const addLike = async ({ user_id, media_id }) => {
  try {
    const [result] = await promisePool.execute(
      'INSERT INTO likes (user_id, media_id) VALUES (?, ?)',
      [user_id, media_id]
    );
    return { like_id: result.insertId };
  } catch (e) {
    return { error: e.message };
  }
};

// DELETE like
const deleteLike = async (id) => {
  try {
    const [result] = await promisePool.execute(
      'DELETE FROM likes WHERE like_id = ?',
      [id]
    );
    return { affectedRows: result.affectedRows };
  } catch (e) {
    return { error: e.message };
  }
};

export {
  getLikesByMedia,
  getLikesByUser,
  addLike,
  deleteLike
};
