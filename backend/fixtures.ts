import mongoose from 'mongoose';
import config from './config';
import { randomUUID } from 'crypto';
import User from './models/User';
import Recipe from './models/Recipe';

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop....`);
  }
};

const collections = ['users', 'recipes'];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  const [johnDoeUser, jackSmithUser] = await User.create(
    {
      email: 'john.doe@gmail.com',
      password: '1',
      token: randomUUID(),
      displayName: 'John Doe',
      avatar: 'fixtures/johnDoe.png',
      role: 'admin',
    },
    {
      email: 'jack.smith@gmail.com',
      password: '1',
      token: randomUUID(),
      displayName: 'Jack Smith',
      avatar: 'fixtures/jackSmith.jpeg',
      role: 'user',
    },
  );

  await Recipe.create(
    {
      user: johnDoeUser,
      title: 'Плов',
      recipe:
        'Плов — это блюдо из риса с мясом, овощами и специями. Для приготовления плова необходимо обжарить мясо и лук, ' +
        'добавить морковь и специи, затем добавить рис и воду. Тушить до готовности риса.',
      image: 'fixtures/pilaf.jpeg',
    },
    {
      user: johnDoeUser,
      title: 'Лагман',
      recipe:
        'Лагман — это традиционное блюдо с длинной лапшой и мясом в густом соусе. Для приготовления лагмана ' +
        'необходимо приготовить тесто для лапши, нарезать мясо, обжарить с овощами и приготовить соус на основе томатов.',
      image: 'fixtures/lagman.jpeg',
    },
    {
      user: johnDoeUser,
      title: 'Борщ',
      recipe:
        'Борщ — это классический суп из свёклы, капусты и мяса. Для борща нужно отварить мясо, добавить свёклу, ' +
        'морковь, картофель и капусту, приправить уксусом и специями. Варить до мягкости овощей.',
      image: 'fixtures/borsch.jpg',
    },
    {
      user: johnDoeUser,
      title: 'Пирожное',
      recipe:
        'Пирожное — это маленький десерт с кремом или начинкой. Для пирожного необходимо испечь основу из теста, ' +
        'затем добавить крем на основе масла, сахара и ванили. Охладить перед подачей.',
      image: 'fixtures/cake.jpeg',
    },
    {
      user: jackSmithUser,
      title: 'Тирамису',
      recipe:
        'Тирамису — это итальянский десерт из печенья савоярди, пропитанного кофе, с кремом на основе маскарпоне. ' +
        'Для приготовления тирамису нужно взбить маскарпоне с яйцами и сахаром, уложить слои савоярди и крема, охладить.',
      image: 'fixtures/tiramisu.jpeg',
    },
    {
      user: jackSmithUser,
      title: 'Паста',
      recipe:
        'Паста — это итальянское блюдо из макаронных изделий с соусом. Для приготовления пасты нужно сварить макароны, ' +
        'приготовить соус на основе томатов, мяса и специй, смешать с макаронами и подать.',
      image: 'fixtures/spaghetti.jpeg',
    },
    {
      user: jackSmithUser,
      title: 'Салат',
      recipe:
        'Салат — это блюдо из овощей, фруктов, мяса или рыбы. Для приготовления салата нужно нарезать овощи, ' +
        'добавить мясо или рыбу, заправить маслом или соусом, перемешать и подать.',
      image: 'fixtures/salad.jpeg',
    },
    {
      user: jackSmithUser,
      title: 'Лимонад',
      recipe:
        'Лимонад — это освежающий напиток из лимонов, сахара и воды. Для приготовления лимонада ' +
        'нужно выжать сок лимонов, добавить сахар и воду, охладить и подавать с льдом.',
      image: 'fixtures/lemonade.jpg',
    },
  );

  await db.close();
};

void run();
