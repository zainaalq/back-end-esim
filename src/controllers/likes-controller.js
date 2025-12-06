import {
  getLikesByMedia,
  getLikesByUser,
  addLike,
  deleteLike as deleteLikeFromModel
} from '../models/likes-model.js';

// GET likes for media
const likesForMedia = async (req, res) => {
  const media_id = req.params.id;
  res.json(await getLikesByMedia(media_id));
};

// GET likes done by user
const likesForUser = async (req, res) => {
  const user_id = req.params.id;
  res.json(await getLikesByUser(user_id));
};

// POST like
const postLike = async (req, res) => {
  const { user_id, media_id } = req.body;

  if (!user_id || !media_id)
    return res.status(400).json({ error: 'user_id and media_id required' });

  const result = await addLike({ user_id, media_id });

  if (result.error) return res.status(500).json(result);

  res.status(201).json({ message: 'Like added', ...result });
};

// DELETE like
const deleteLikeItem = async (req, res) => {
  const id = req.params.id;

  const result = await deleteLikeFromModel(id);

  if (result.error) return res.status(500).json(result);
  if (result.affectedRows === 0)
    return res.status(404).json({ error: 'Like not found' });

  res.json({ message: 'Like deleted successfully' });
};

export {
  likesForMedia,
  likesForUser,
  postLike,
  deleteLikeItem as deleteLike
};
