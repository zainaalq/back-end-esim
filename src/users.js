const users =[
  {
    "user_id": 260,
    "username": "VCHar",
    "password": "********",
    "email": "vchar@example.com",
    "user_level_id": 1,
    "created_at": "2020-09-12T06:56:41.000Z"
  },
  {
    "user_id": 305,
    "username": "Donatello",
    "password": "********",
    "email": "dona@example.com",
    "user_level_id": 1,
    "created_at": "2021-12-11T06:00:41.000Z"
  },
  {
    "user_id": 3609,
    "username": "Anon5468",
    "password": "********",
    "email": "x58df@example.com",
    "user_level_id": 3,
    "created_at": "2023-04-02T05:56:41.000Z"
  }
];

const getUsersById = (req, res) => {
  const item = users.find(
    (item) => item.user_id === parseInt(req.params.id)
  );

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'user not found' });
  }
};

const getAllUsers = (req, res) => {
  res.json(users);
};

const postNewUserItem = (req, res) => {
  const data = req.body;
  data.user_id = users[users.length - 1].user_id + 1;
  users.push(data);
  res.status(201).json({ message: 'New user created', item: data });
};

const deleteUserByID = (req, res) => {
  const itemToBeDeletedIndex = users.findIndex(
    (item) => item.user_id === parseInt(req.params.id)
  );

  if (itemToBeDeletedIndex != -1) {
    users.splice(itemToBeDeletedIndex, 1);
    res.status(200).json({ message: 'user deleted' });
  } else {
    res.status(404).json({ message: 'user not found' });
  }
};

export { getAllUsers, getUsersById, postNewUserItem, deleteUserByID };