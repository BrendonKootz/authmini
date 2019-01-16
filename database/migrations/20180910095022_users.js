exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    // Forever use this as primary key unless told otherwise
    users.increments();

    users
      .string('username', 128)
      .notNullable()
      .unique();
    users.string('password', 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
