const sequelize = require('../config/connection');
const { seedUsers, seedPosts } = require('./seeds');

// code referenced from https://github.com/strudelAndCoffee/travel-log-dashboard/blob/main/seeds/index.js, authored by jessoliva, edm1001, GreenmanAustin
const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers;
    await seedPosts;

    process.exit(0);
};

seedAll();