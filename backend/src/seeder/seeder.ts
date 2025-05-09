import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TodoList } from 'src/todo/todo-list.entity';
import { TodoItem } from 'src/todo/todo-item.entity';
import { User } from 'src/users/user.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'todo_app',
  password: 'todo_pass',
  database: 'lms_db',
  entities: [User, TodoList, TodoItem],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();
  console.log('Connected to DB');

  const userRepository = AppDataSource.getRepository(User);
  const todoListRepository = AppDataSource.getRepository(TodoList);
  const todoItemRepository = AppDataSource.getRepository(TodoItem);

  // await todoItemRepository.delete({});
  // await todoListRepository.delete({});
  // await userRepository.delete({});

  const passwordHash = await bcrypt.hash('123456', 10);
  // Пользователи
  const users = [
    userRepository.create({
      name: 'Алексей',
      email: 'alex@mail.ru',
      password: passwordHash,
    }),
    userRepository.create({
      name: 'Мария',
      email: 'maria@mail.ru',
      password: passwordHash,
    }),
    userRepository.create({
      name: 'Иван',
      email: 'ivan@mail.ru',
      password: passwordHash,
    }),
    userRepository.create({
      name: 'Ольга',
      email: 'olga@mail.ru',
      password: passwordHash,
    }),
    userRepository.create({
      name: 'Тест БезСписков',
      email: 'noslists@mail.ru',
      password: passwordHash,
    }),
  ];
  await userRepository.save(users);
  // Списки и задачи
  const list1 = todoListRepository.create({
    title: 'Домашние дела',
    status: 'In Progress',
    user: users[0],
    todoItems: [
      { text: 'Постирать белье', completed: true },
      { text: 'Убраться на кухне', completed: false },
    ],
  });
  const list2 = todoListRepository.create({
    title: 'Рабочие задачи',
    status: 'In Progress',
    user: users[1],
    todoItems: [],
  });
  const list3 = todoListRepository.create({
    title: 'Купить в магазине',
    status: 'In Progress',
    user: users[2],
    todoItems: [
      { text: 'Молоко', completed: false },
      { text: 'Хлеб', completed: false },
      { text: 'Масло', completed: true },
    ],
  });
  await todoListRepository.save([list1, list2, list3]);

  console.log('Seed complete!');
  await AppDataSource.destroy();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
