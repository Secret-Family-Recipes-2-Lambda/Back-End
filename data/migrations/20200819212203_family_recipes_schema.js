
exports.up = function(knex) {
  return (
      knex.schema
        .createTable('user', tbl => {
            tbl.increments();
            tbl.string('username', 128).notNullable().unique();
            tbl.string('password', 128).notNullable();
        })
        .createTable('recipes', tbl => {
            tbl.increments();
            tbl.string('title', 128).notNullable();
            tbl.string('source', 128).notNullable();
            tbl.text('ingredients', 128).notNullable();
            tbl.text('instructions', 128).notNullable();
            tbl.boolean('private').defaultTo(true)
            tbl.integer('user_id')
                .unsigned()
                .notNullable()
                .references('user.id')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
  )
};

exports.down = function(knex) {
  return (
      knex.schema   
        .dropTableIfExists('recipes')
        .dropTableIfExists('user')
  )
};
