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

        for (let j = 0; j < allClients[i].contacts.length; j++) {
          const contact_img_block = document.createElement('div')
          contact_img_block.classList.add('contact_img_block')
          const img = document.createElement('img')
          img.classList.add('contact_img')
          contact_img_block.append(img)
          img.id = `contact_img_${j}`
          if(allClients[i].contacts[j].type === 'Facebook'){
            img.src = './img/fb.svg'
          }else
          if(allClients[i].contacts[j].type === 'Телефон'){
            img.src = './img/phone.svg'
          }else
          if(allClients[i].contacts[j].type === 'Email'){
            img.src = './img/mail.svg'
          }else
          if(allClients[i].contacts[j].type === 'VK'){
            img.src = './img/vk.svg'
          }else
          if(allClients[i].contacts[j].type === 'Другое'){
            img.src = './img/other.svg'
          }

          if(j >= 4){
            img.classList.add('dn')
          }
          
          contactsDiv.append(contact_img_block)
        }
        const openFullContacts = document.createElement('span')
        if(allClients[i].contacts.length > 4){
          openFullContacts.textContent = `+${allClients[i].contacts.length - 4}`
        }
        openFullContacts.addEventListener('click',() => {
          for (let  j = 4; j < allClients[i].contacts.length; j++) {
            document.getElementById(`contact_img_${j}`).classList.remove('dn')
          }
          openFullContacts.classList.add('dn')
        })
        contactsDiv.append(openFullContacts)

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


