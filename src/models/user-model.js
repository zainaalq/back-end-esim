import promisePool from '../utils/database.js';

// GET all users
const listAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM users');
    return rows;
  } catch (e) {
    return { error: e.message };
  }
};

// GET user by ID
const findUserById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM users WHERE user_id = ?',
      [id]
    );
    return rows[0];
  } catch (e) {
    return { error: e.message };
  }
};

// POST user
const addUser = async (user) => {
  const { username, email, password } = user;

  const sql = `
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
  `;

  try {
    const [result] = await promisePool.execute(sql, [
      username,
      email,
      password,
    ]);

    return { user_id: result.insertId };
  } catch (e) {
    return { error: e.message };
  }
};

// PUT user
const updateUser = async (id, user) => {
  const { username, email } = user;

  const sql = `
    UPDATE users
    SET username = ?, email = ?
    WHERE user_id = ?
  `;

  try {
    const [result] = await promisePool.execute(sql, [
      username,
      email,
      id,
    ]);
    return { affectedRows: result.affectedRows };
  } catch (e) {
    return { error: e.message };
  }
};

// DELETE user
const deleteUser = async (id) => {
  try {
    const [result] = await promisePool.execute(
      'DELETE FROM users WHERE user_id = ?',
      [id]
    );
    return { affectedRows: result.affectedRows };
  } catch (e) {
    return { error: e.message };
  }
};

export {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  deleteUser
};
