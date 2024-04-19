

(async () => {
  try {
    let allClients = await getClients();

    let time;
    search_input.addEventListener('input', function(event) {
      if (time) {
          clearTimeout(time);
      }
      time = setTimeout(function() {
          const searchText = event.target.value.toLowerCase();
  
          const filteredClients = allClients.filter(el =>
              el.name.toLowerCase().includes(searchText) ||
              el.surname.toLowerCase().includes(searchText) ||
              el.lastName.toLowerCase().includes(searchText) ||
              el.id.includes(searchText)
          );
          list.innerHTML = '';
          renderList(filteredClients);
      }, 300);
    });
  
    renderList(allClients)

    const filterId = document.getElementById('filter_id')
    filterId.addEventListener('click',() => {
      filterFioFlag = false;
      filterCreateFlag = false;
      filterUpdateFlag = false;
      freeStyleFilter()
      if(!filterIdFlag){
        event.target.classList.remove('upImg')
        allClients = allClients.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        list.innerHTML = ''
        filterIdFlag = !filterIdFlag
        renderList(allClients)
      }else{
        event.target.classList.add('upImg')
        allClients = allClients.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        list.innerHTML = ''
        filterIdFlag = !filterIdFlag
        renderList(allClients)
      }
    })

    const filterFio = document.getElementById('filter_fio')
    filterFio.addEventListener('click',() => {
      filterIdFlag = false;
      filterCreateFlag = false;
      filterUpdateFlag = false;
      freeStyleFilter()
      if(!filterFioFlag){
        event.target.classList.remove('upImgLet')
        allClients = allClients.sort((a, b) => a.surname.localeCompare(b.surname));
        list.innerHTML = ''
        filterFioFlag = !filterFioFlag
        renderList(allClients)
      }else{
        event.target.classList.add('upImgLet')
        allClients = allClients.sort((a, b) => b.surname.localeCompare(a.surname));
        list.innerHTML = ''
        filterFioFlag = !filterFioFlag
        renderList(allClients)
      }
    })

    const filterCreate = document.getElementById('filter_create')
    filterCreate.addEventListener('click',() => {
      filterIdFlag = false;
      filterFioFlag = false;
      filterUpdateFlag = false;
      freeStyleFilter()
      if(!filterCreateFlag){
        event.target.classList.remove('upImg')
        allClients = allClients.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        list.innerHTML = ''
        filterCreateFlag = !filterCreateFlag
        renderList(allClients)
      }else{
        event.target.classList.add('upImg')
        allClients = allClients.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        list.innerHTML = ''
        filterCreateFlag = !filterCreateFlag
        renderList(allClients)
      }
    })

    const filterUpdate = document.getElementById('filter_update')
    filterUpdate.addEventListener('click',() => {
      filterIdFlag = false;
      filterFioFlag = false;
      filterCreateFlag = false;
      freeStyleFilter()
      if(!filterUpdateFlag){
        event.target.classList.remove('upImg')
        allClients = allClients.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        list.innerHTML = ''
        filterUpdateFlag = !filterUpdateFlag
        renderList(allClients)
      }else{
        event.target.classList.add('upImg')
        allClients = allClients.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        list.innerHTML = ''
        filterUpdateFlag = !filterUpdateFlag
        renderList(allClients)
      }
    })

    //! ------------------------------------------------------------------------------------ 
  } catch (err) {
    console.error('Произошла ошибка при получении клиентов:', err);
  }
})();