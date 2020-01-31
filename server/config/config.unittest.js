exports.sequelize = {
  dialect: 'mysql',
  host: '192.168.64.2',
  port: 3306,
  database: 'avl-doc-test',
  username: 'avl',
  password: 'avl-example',
  define: {
    freezeTableName: true,
    underscored: true,
  },
};
