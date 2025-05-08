// src/pages/Questions/QuestionsPage.tsx
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'Как зарегистрироваться и войти?',
    answer: `
1. Перейдите на страницу "Регистрация".
2. Введите имя, email и пароль.
3. После успешной регистрации вы автоматически будете залогинены.
4. Для повторного входа используйте страницу "Вход".
`,
  },
  {
    question: 'Как создать новый список дел?',
    answer: `
1. На главной странице ("Списки дел") введите название списка.
2. Нажмите кнопку "Добавить".
3. Новый список появится в общем списке.
`,
  },
  {
    question: 'Как редактировать задачи внутри списка?',
    answer: `
1. Откройте нужный список кликом на его карточке.
2. Измените текст или галочку "Выполнено".
3. Нажмите "Сохранить изменения" внизу страницы.
`,
  },
  {
    question: 'Как изменить профиль и аватар?',
    answer: `
1. Откройте страницу "Профиль" в меню.
2. Для смены имени введите новое и нажмите "Сохранить изменения".
3. Чтобы загрузить аватар — выберите файл и дождитесь загрузки.
`,
  },
  {
    question: 'Что происходит при удалении аккаунта?',
    answer: `
1. Нажимаете "Удалить аккаунт" на странице профиля.
2. Подтверждаете действие в появившемся диалоге.
3. Все ваши списки дел и данные удаляются без возможности восстановления.
`,
  },
  {
    question: 'Как я могу выйти из аккаунта?',
    answer: `
Нажмите кнопку "Выйти" в правом верхнем углу хедера — вы будете перенаправлены на страницу входа.
`,
  },
];

export default function QuestionsPage() {
  return (
    <Box maxWidth="800px" mx="auto" mt={4} px={2}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Часто задаваемые вопросы (FAQ)
      </Typography>

      {faqs.map((faq, idx) => (
        <Accordion
          key={idx}
          sx={{
            bgcolor: 'background.paper',
            mb: 1,
            '&:before': { backgroundColor: 'divider' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 'medium' }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div" whiteSpace="pre-line">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
