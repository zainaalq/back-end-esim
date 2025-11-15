import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  deleteUser as deleteUserFromModel
} from '../models/user-model.js';

// GET all
const getUsers = async (req, res) => {
  res.json(await listAllUsers());
};

// GET by ID
const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);

  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json(user);
};

// POST new user
const postUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ error: 'All fields required' });

  const result = await addUser({ username, email, password });

  if (result.error) return res.status(500).json(result);

  res.status(201).json({ message: 'User added', ...result });
};

// PUT update user
const putUser = async (req, res) => {
  const id = req.params.id;
  const { username, email } = req.body;

  if (!username)
    return res.status(400).json({ error: 'Username is required' });

  const result = await updateUser(id, { username, email });

  if (result.error) return res.status(500).json(result);

  if (result.affectedRows === 0)
    return res.status(404).json({ error: 'User not found' });

  res.json({ message: 'User updated successfully' });
};

// DELETE user
const deleteUserItem = async (req, res) => {
  const id = req.params.id;

  const result = await deleteUserFromModel(id);

  if (result.error) return res.status(500).json(result);

  if (result.affectedRows === 0)
    return res.status(404).json({ error: 'User not found' });

  res.json({ message: 'User deleted successfully' });
};

export {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUserItem as deleteUser
};
