
exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {id: 1, Name: 'user1', password: 'rowValue1'},
        {id: 2, Name: 'user2', password: 'rowValue1'},
        {id: 3, Name: 'user3', password: 'rowValue1'},
        {id: 4, Name: 'dylan', password: 'rowValue1'},
        {id: 5, Name: 'jack', password: 'rowValue1'},
        {id: 6, Name: 'axel', password: 'rowValue1'},
        {id: 7, Name: 'user7', password: 'rowValue1'},
        {id: 8, Name: 'user8', password: 'rowValue1'},
        {id: 9, Name: 'rowValue1', password: 'rowValue1'}
      ]);
    });
};
