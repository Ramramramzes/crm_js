const list = document.getElementById('list'); //? Основной список
let filterIdFlag = false;
let filterFioFlag = false;
let filterCreateFlag = false;
let filterUpdateFlag = false;

(async () => {
  try {
    
    let allClients = await getClients();
    renderList(allClients)

    const filterId = document.getElementById('filter_id')
    filterId.addEventListener('click',() => {
      if(!filterIdFlag){
        allClients = allClients.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        list.innerHTML = ''
        filterIdFlag = !filterIdFlag
        renderList(allClients)
      }else{
        allClients = allClients.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        list.innerHTML = ''
        filterIdFlag = !filterIdFlag
        renderList(allClients)
      }
    })

    const filterFio = document.getElementById('filter_fio')
    filterFio.addEventListener('click',() => {
      if(!filterFioFlag){
        allClients = allClients.sort((a, b) => a.surname.localeCompare(b.surname));
        list.innerHTML = ''
        filterFioFlag = !filterFioFlag
        renderList(allClients)
      }else{
        allClients = allClients.sort((a, b) => b.surname.localeCompare(a.surname));
        list.innerHTML = ''
        filterFioFlag = !filterFioFlag
        renderList(allClients)
      }
    })

    const filterCreate = document.getElementById('filter_create')
    filterCreate.addEventListener('click',() => {
      if(!filterCreateFlag){
        allClients = allClients.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        list.innerHTML = ''
        filterCreateFlag = !filterCreateFlag
        renderList(allClients)
      }else{
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
      if(!filterUpdateFlag){
        allClients = allClients.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        list.innerHTML = ''
        filterUpdateFlag = !filterUpdateFlag
        renderList(allClients)
      }else{
        allClients = allClients.sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        list.innerHTML = ''
        filterUpdateFlag = !filterUpdateFlag
        renderList(allClients)
      }
    })

    function renderList(allClients){
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
          const createdDate = document.createElement('span')
          const createdTime = document.createElement('span')
          createdDate.textContent = formatedDateD(`${allClients[i].createdAt}`);
          createdTime.textContent = formatedDateT(`${allClients[i].createdAt}`);
          createDateDiv.append(createdDate,createdTime)
  
          const changeDateDiv = document.createElement('div');
          changeDateDiv.classList.add('change_date');
          const changeDate = document.createElement('span')
          const changeTime = document.createElement('span')
          changeDate.textContent = formatedDateD(`${allClients[i].updatedAt}`);
          changeTime.textContent = formatedDateT(`${allClients[i].updatedAt}`);
          changeDateDiv.append(changeDate,changeTime)
  
          const contactsDiv = document.createElement('div');
          contactsDiv.classList.add('contacts');
  
          for (let j = 0; j < allClients[i].contacts.length; j++) {
            const contact_img_block = document.createElement('div')
            contact_img_block.classList.add('contact_img_block')
            const img = document.createElement('img')
            contact_img_block.append(img)
            img.classList.add(`contact_img_${j}`)
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
            
            const content = document.createElement('div')
            content.classList.add('title_of_contacts')
            content.textContent = `${allClients[i].contacts[j].value}`
            const retangle = document.createElement('div')
            retangle.classList.add('hover_retangle','test')
            content.append(retangle)
  
            contact_img_block.append(content)
            
            content.classList.add('dn')
            contact_img_block.addEventListener('mouseenter',() => {
              content.classList.remove('dn')
            })
            contact_img_block.addEventListener('mouseleave',() => {
              content.classList.add('dn')
            })
            contactsDiv.append(contact_img_block)
          }
          
          const actionsDiv = document.createElement('div');
          const changeUser = document.createElement('button')
          const deleteUser = document.createElement('button')
          changeUser.textContent = 'Изменить'
          changeUser.classList.add('change_btn')
          deleteUser.textContent = 'Удалить'
          deleteUser.classList.add('del_btn')
          actionsDiv.append(changeUser)
          actionsDiv.append(deleteUser)
          actionsDiv.classList.add('actions');
          item.appendChild(idDiv);
          item.appendChild(fioDiv);
          item.appendChild(createDateDiv);
          item.appendChild(changeDateDiv);
          item.appendChild(contactsDiv);
          item.appendChild(actionsDiv);
  
          changeUser.addEventListener('click',() => {
            changeUserFn(allClients[i].id)
            document.getElementById('cancle_add').classList.add('dn')
            document.getElementById('del_user_add').classList.remove('dn')
            document.getElementById('popup_title').textContent = `Изменить данные `
            document.getElementById('for_id').textContent = `ID: ${allClients[i].id}`
            if(document.querySelectorAll('.contact_block_add').length <= 9){
              document.getElementById('add_contact').classList.remove('dn')
            }
          })
  
          deleteUser.addEventListener('click',() => {
            delPopup.classList.remove('dn')
            document.getElementById('del_btn').addEventListener('click',() => {
              deleteUserFromBase(allClients[i].id)
            })
          })
          list.append(item);
  
          for (let l = 4; l < document.querySelectorAll('.list_item')[i].querySelectorAll('.contact_img_block').length; l++) {
            document.querySelectorAll('.list_item')[i].querySelectorAll('.contact_img_block')[l].classList.add('dn');
          }
  
          const openFullContacts = document.createElement('span')
          if(allClients[i].contacts.length > 4){
            openFullContacts.textContent = `+${allClients[i].contacts.length - 4}`
          }
  
          openFullContacts.addEventListener('click',() => {
            const contactImages = document.querySelectorAll(`.list_item:nth-child(${i + 1}) .contact_img_block img`);
            const spans = document.querySelectorAll(`.list_item:nth-child(${i + 1}) .contacts span`);
            spans[0].classList.add('dn')
            document.querySelectorAll('.list_item')[i].querySelectorAll('.contact_img_block').forEach(el => el.classList.remove('dn'))
            for (let j = 4; j < allClients[i].contacts.length; j++) {
              contactImages[j].classList.remove('dn');
              contactImages[j].classList.add('margin_for_all_contacts')
            }
          });    
  
          openFullContacts.textContent === '' ? openFullContacts.classList.add('dn') : false //? скрываем пустой шарик
          contactsDiv.append(openFullContacts)
        }
      }
    }
  } catch (err) {
    console.error('Произошла ошибка при получении клиентов:', err);
  }
})();


