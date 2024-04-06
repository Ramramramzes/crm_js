const client = {
  id: '1234567890',
  createdAt: '2021-02-03T13:07:29.554Z',
  updatedAt: '2021-02-03T13:07:29.554Z',
  name: 'Василий',
  surname: 'Пупкин',
  lastName: 'Васильевич',
  contacts: [
    {
      type: 'Телефон',
      value: '+71234567890'
    },
    {
      type: 'Email',
      value: 'abc@xyz.com'
    },
    {
      type: 'Facebook',
      value: 'https://facebook.com/vasiliy-pupkin-the-best'
    }
  ]
};
const list = document.getElementById('list'); //? Основной список

(async () => {
  try {
    const allClients = await getClients();
    if (allClients.length !== 0) {
      for (const el of allClients) {
        const item = document.createElement('li');
        item.textContent = `${allClients[0].id}-${allClients[0].name}-${allClients[0].surname}`;
        list.append(item);
      }
    }
  } catch (err) {
    console.error('Произошла ошибка при получении клиентов:', err);
  }
})();

// btn.addEventListener('click', async () => {
//   await addContact(client)
// })

