const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = [
    {
        username: 'Aaron_A',
        email: 'aa@email.com',
        password: 'pw123'
    },
    {
        username: 'Bob_B',
        email: 'bb@email.com',
        password: 'pw123'
    },
    {
        username: 'Clara_C',
        email: 'cc@email.com',
        password: 'pw123'
    }
];

const postData = [
    {
        user_id: 1,
        title: "Aaron's Post 1",
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus blanditiis autem quaerat natus? Eos maiores distinctio cum, autem ipsum odio numquam alias neque quibusdam eius excepturi, quos vel recusandae voluptatibus."
    },
    {
        user_id: 1,
        title: "Aaron's Post 2",
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus blanditiis autem quaerat natus."
    },
    {
        user_id: 1,
        title: "Aaron's Post 3",
        text: "This is a short post."
    },
    {
        user_id: 2,
        title: "This is a post about...",
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus blanditiis autem quaerat natus? Eos maiores distinctio cum, autem ipsum odio numquam alias neque quibusdam eius excepturi, quos vel recusandae voluptatibus."
    },
    {
        user_id: 3,
        title: "Have you heard about this?",
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus blanditiis autem quaerat natus? Eos maiores distinctio cum, autem ipsum odio numquam alias neque quibusdam eius excepturi, quos vel recusandae voluptatibus. Doloribus blanditiis autem quaerat natus? Eos maiores distinctio cum, autem ipsum odio numquam alias neque quibusdam eius excepturi, quos vel recusandae voluptatibus."
    },
    {
        user_id: 3,
        title: "What I think about this topic...",
        text: "This is also a fairly short post, for variety"
    }
];

// the following code is referenced from https://github.com/strudelAndCoffee/travel-log-dashboard/blob/main/seeds/index.js, authored by jessoliva, edm1001, GreenmanAustin
const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });
const seedPosts = () => Post.bulkCreate(postData);

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();

    process.exit(0);
};

seedAll();