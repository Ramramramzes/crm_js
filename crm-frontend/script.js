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

