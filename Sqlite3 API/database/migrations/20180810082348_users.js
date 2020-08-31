
exports.up = function(knex) {
  return (
      knex.schema
        .createTable('user', tbl => {
            tbl.increments();
            tbl.string('username').notNullable().unique();
            tbl.string('password').notNullable();
        })
        .createTable('recipes', tbl => {
            tbl.increments();
            tbl.string('title').notNullable();
            tbl.string('source').notNullable();
            tbl.text('ingredients').notNullable();
            tbl.text('instructions').notNullable();
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
