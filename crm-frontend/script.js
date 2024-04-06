const list = document.getElementById('list'); //? Основной список

(async () => {
  try {
    const allClients = await getClients();
    if (allClients.length !== 0) {
      for (let i = 0; i < allClients.length; i++) {
        const item = document.createElement('li');
        item.textContent = `${allClients[i].id}-${allClients[i].name}-${allClients[i].surname}`;
        list.append(item);
      }
    }
  } catch (err) {
    console.error('Произошла ошибка при получении клиентов:', err);
  }
})();


