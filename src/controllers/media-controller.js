import {
  addMedia,
  findMediaById, 
  listAllMedia, 
  updateMedia, 
  deleteMedia as deleteMediaFromModel
} from '../models/media-model.js';

const getMedia = async (req, res) => {
  res.json(await listAllMedia());
};

const getMediaById = async (req, res) => {
  const media = await findMediaById(req.params.id);
  if (media) {
    media.filepath = `${req.protocol}://${req.headers.host}/${process.env.UPLOADS_PATH}/${media.filename}`;
    res.json(media);
  } else {
    res.sendStatus(404);
  }
};

const postMedia = async (req, res) => {
  let {title, description, user_id} = req.body;
  description = description ? description : '';
  const {filename, size, mimetype} = req.file;

  if (filename && title && user_id) {
    const result = await addMedia({
      user_id,
      filename,
      size,
      mimetype,
      title,
      description,
    });
    res.status(201).json({message: 'New media item added.', ...result});
  } else {
    res.sendStatus(400);
  }
};

// PUT
const putMedia = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const result = await updateMedia(id, { title, description });

  if (result.error) {
    return res.status(500).json(result);
  }

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: 'Media not found' });
  }

  res.json({ message: 'Media updated successfully' });
};

// DELETE
const deleteMediaItem = async (req, res) => {
  const id = req.params.id;

  const result = await deleteMediaFromModel(id);

  if (result.error) {
    return res.status(500).json(result);
  }

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: 'Media not found' });
  }

  res.json({ message: 'Media deleted successfully' });
};

export { 
  getMedia, 
  getMediaById, 
  postMedia, 
  putMedia, 
  deleteMediaItem as deleteMedia 
};
