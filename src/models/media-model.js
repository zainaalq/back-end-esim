import promisePool from '../utils/database.js';


const listAllMedia = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM mediaitems');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const findMediaById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM mediaitems WHERE media_id = ?',
      [id]
    );
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const addMedia = async (media) => {
  const { user_id, filename, size, mimetype, title, description } = media;
  const sql = `
    INSERT INTO mediaitems (user_id, filename, filesize, media_type, title, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [user_id, filename, size, mimetype, title, description];

  try {
    const [result] = await promisePool.execute(sql, params);
    return { media_id: result.insertId };
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

//update(id, media)

const updateMedia = async (id, media) =>{
  const{ title, description } = media;
  const sql = `
    UPDATE mediaitems 
    SET title = ?, description = ?
    WHERE media_id = ?
  `;
  try {
    const[result] = await promisePool.execute(sql, [
      title,
      description,
      id,
    ]);
    return { affectedRows: result.affectedRows };
    
  }catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

// delete

const deleteMedia = async (id) =>{
  try {
    const [result] = await promisePool.execute(
      'DELETE FROM mediaitems WHERE media_id = ?',
      [id]
    );
    return { affectedRows: result.affectedRows };
  } catch (e) {
    console.error('error', e.message);
     return { error: e.message };
  }
};



export { listAllMedia, findMediaById, addMedia, updateMedia, deleteMedia };
