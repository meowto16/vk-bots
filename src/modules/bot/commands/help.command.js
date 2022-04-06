const helpCommand = (ctx) => {
  ctx.reply(`
        ❓ Список доступных команд:
         
         1. "/help" - Отобразить подсказки по командам.
         2. "/1" - Добавить нексию, где 1 - это кол-во нексий
         3. "/rating" - Отобразить список лидеров
         4. "/sync-users" - Синхронизировать пользователей в чате. (если вдруг добавились новые участники).
         5. "/report" - Удалить у другого пользователя нексии. Необходимо переслать сообщение и написать команду
    `)
}

export default helpCommand