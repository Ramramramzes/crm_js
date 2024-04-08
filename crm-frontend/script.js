const list = document.getElementById('list'); //? Основной список

(async () => {
  try {
    const allClients = await getClients();
    if (allClients.length !== 0) {
      for (let i = 0; i < allClients.length; i++) {
        const item = document.createElement('li');
        item.classList.add('list_item')
        const idDiv = document.createElement('div');
        idDiv.classList.add('id');
        idDiv.textContent =  `${allClients[i].id}`;

        const fioDiv = document.createElement('div');
        fioDiv.classList.add('fio');
        fioDiv.textContent = `${allClients[i].surname} ${allClients[i].name} ${allClients[i].lastName}` ;

        const createDateDiv = document.createElement('div');
        createDateDiv.classList.add('create_date');
        createDateDiv.textContent = `${allClients[i].createdAt}`;

        const changeDateDiv = document.createElement('div');
        changeDateDiv.classList.add('change_date');
        changeDateDiv.textContent = `${allClients[i].updatedAt}`;

        const contactsDiv = document.createElement('div');
        contactsDiv.classList.add('contacts');
        contactsDiv.textContent = 'Контакты';
        //! добавить отображение контактов
        const actionsDiv = document.createElement('div');
        const changeUser = document.createElement('button')
        const deleteUser = document.createElement('button')
        changeUser.textContent = 'Изменить'
        deleteUser.textContent = 'Удалить'
        actionsDiv.append(changeUser)
        actionsDiv.append(deleteUser)
        actionsDiv.classList.add('actions');
        //! добавить две кнопки с привязкой id
        item.appendChild(idDiv);
        item.appendChild(fioDiv);
        item.appendChild(createDateDiv);
        item.appendChild(changeDateDiv);
        item.appendChild(contactsDiv);
        item.appendChild(actionsDiv);

        changeUser.addEventListener('click',() => {
          changeUserFn(allClients[i].id)
          document.getElementById('popup_title').textContent = `Изменить данные `
          document.getElementById('for_id').textContent = `ID: ${allClients[i].id}`
        })
        deleteUser.addEventListener('click',() => {
          deleteUserFromBase(allClients[i].id)
        })
        list.append(item);
      }
    }
  } catch (err) {
    console.error('Произошла ошибка при получении клиентов:', err);
  }
})();


