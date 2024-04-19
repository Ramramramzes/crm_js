const add_contact = document.getElementById('add_contact') //? Кнопка добавить контакт
const save_user_add = document.getElementById('save_user_add') //? Кнопка сохранить клиента при ДОБАВЛЕНИИ
const cancle_add = document.getElementById('cancle_add')//? Кнопка отмены в попапе добавления 
const cancle_del = document.getElementById('del_cancel')//? Кнопка отмены в попапе удаления
const add_user_popup = document.getElementById('add_user_popup') //? Кнопка открытия попапа
const addPopup = document.getElementById('add_popup')
const delPopup = document.getElementById('del_popup')
const delBtnInChange = document.getElementById('del_user_add')
const close_add = document.getElementById('close_add')
const close_del_popup = document.getElementById('close_del_popup')
const search_input = document.getElementById('search_input')

const list = document.getElementById('list'); //? Основной список
let filterIdFlag = false;
let filterFioFlag = false;
let filterCreateFlag = false;
let filterUpdateFlag = false;

let deleteId = 0;

addPopup.classList.add('dn') //? Скрываем сразу попап
delPopup.classList.add('dn') //? Скрываем сразу попап

//? Получение массива пользователей
async function getClients() {
  try {
    const resp = await fetch('http://localhost:3000/api/clients')
    if (!resp.ok) {
      throw new Error('Ошибка запроса');
    }
    return await resp.json();
  } catch (err) {
    console.log('Ошибка запроса catch ', err);
  }
}
//? Запись объекта пользователя в базу
async function addContact(client){
  try{
    fetch(`http://localhost:3000/api/clients`,{
      method: 'POST',
      body: JSON.stringify(client),
    })
    .then(resp => {
      if(!resp.ok){
        throw new Error('Ошибка запроса')
      }else{
        return resp.json()
      }
    })
    .then((client) => console.log(`Клиент ${client.name} успешно добавлен`))
    .then(async() =>{
      const allClients = await getClients()
      list.innerHTML = ''
      await renderList(allClients)
    })
  } catch (err){
    console.log('Ошибка запроса catch ',err)
  }
}

//? Запись объекта пользователя в базу
async function sendChangeContact(client,id){
  try{
    fetch(`http://localhost:3000/api/clients/${id}`,{
      method: 'PATCH',
      body: JSON.stringify(client),
    })
    .then(resp => {
      if(!resp.ok){
        throw new Error('Ошибка запроса')
      }else{
        return resp.json()
      }
    })
    .then((client) => console.log(`Клиент ${client.name} успешно добавлен`))
    .then(async() =>{
      const allClients = await getClients()
      list.innerHTML = ''
      await renderList(allClients)
    })
  } catch (err){
    console.log('Ошибка запроса catch ',err)
  }
}

// ? Удаление клиента
async function deleteUserFromBase(id){
  fetch(`http://localhost:3000/api/clients/${id}`,{
    method: 'DELETE'
  })
  .then(resp => {
    if(!resp.ok){
      throw new Error('Ошибка с удалением')
    }
    return resp
  })
  .then(data => console.log('Пользователь удален'))
  .then(async() =>{
    const allClients = await getClients()
    list.innerHTML = ''
    await renderList(allClients)
  })
  .catch(err => console.log('Ошибка с удалением ',err))
}

//? Добавить контакт в блоке нового клиента
function addContact_popup(){
  const options = [
    { value: 'Телефон', text: 'Телефон'},
    { value: 'Email', text: 'Email' },
    { value: 'VK', text: 'VK' },
    { value: 'Facebook', text: 'Facebook' },
    { value: 'Другое', text: 'Другое' }
  ];
  const counter = document.querySelectorAll('.contact_block_add').length
  const contactBlock = document.createElement('div')
  contactBlock.id = `contact_block_${counter}`
  contactBlock.classList.add('contact_block_add')
  const customSelect = document.createElement('div')
  customSelect.id = `customSelect_${counter}`
  customSelect.classList.add('select_block')
  const selected = document.createElement('div')
  selected.id = `selected_${counter}`
  selected.textContent = 'Телефон'
  selected.classList.add('contact_select')
  const customOptions = document.createElement('div')
  customOptions.id = `customOptions_${counter}`
  customOptions.classList.add('custom_opt')
  options.forEach((el) => {
    const opt = document.createElement('span')
    opt.textContent = el.value
    opt.addEventListener('click',() => {
      selected.textContent = opt.textContent
      customOptions.classList.toggle('dn')
      selected.classList.remove('backDropUp')
    })
    customOptions.append(opt)
  })
  customSelect.append(selected)
  customSelect.append(customOptions)
  contactBlock.append(customSelect)

  customOptions.classList.toggle('dn')

  selected.classList.add('backDrop')
  selected.addEventListener('click', () => {
    customOptions.classList.toggle('dn')
    selected.classList.toggle('backDropUp')
  })

  const input = document.createElement('input')
  input.classList.add('input_contact')
  input.type = 'text'
  input.id = `contact_input_${counter}`
  input.placeholder = 'Введите данные контакта'
  input.classList.add('contact_input')
  const delBtn = document.createElement('button')
  delBtn.id = `del_${contactBlock.id}`
  delBtn.classList.add('del_btn_popup')

  contactBlock.classList.add('contactBlock')
  contactBlock.append(input)
  contactBlock.append(delBtn)
  const contactInf = document.getElementById('contact_inf')
  document.getElementById('contacts_block').append(contactBlock)

  delBtn.addEventListener('click',() => {
    if(counter <= 9) add_contact.classList.remove('dn')
    document.getElementById(`contact_block_${counter}`).remove()
  })

  if(counter >= 9) document.getElementById('add_contact').classList.add('dn')
}

//? Закрыть попап
function closeAddPopup(){
  delPopup.classList.add('dn')
  const surnameInput = document.getElementById('surname_input_add')
  const nameInput = document.getElementById('name_input_add')
  const lastNameInput = document.getElementById('lastname_input_add')
  surnameInput.value = ''
  nameInput.value = ''
  lastNameInput.value = ''
  const counter = document.querySelectorAll('.contact_block_add').length
  if(counter != 0){
    for (let i = 0; i <= 10; i++) {
      if(document.getElementById(`contact_block_${i}`)){
        document.getElementById(`contact_block_${i}`).remove()
      }
    }
  }
  addPopup.classList.add('dn')
}

async function getUser(id){
  try{
    const resp = await fetch(`http://localhost:3000/api/clients/${id}`);
    if(!resp.ok){
      throw new Error('Ошибка запроса')
    }else{
      return resp.json()
    }
  } catch (err){
    console.log('Ошибка запроса catch ',err)
  }
}

async function changeUserFn(id) {
  delBtnInChange.addEventListener('click',() => {
    closeAddPopup()
    delPopup.classList.remove('dn')
    document.getElementById('del_btn').addEventListener('click',async () => {
      await deleteUserFromBase(deleteId)
      
      closeAddPopup()
    })
  })
  try {
    const user = await getUser(id);
    addPopup.classList.remove('dn');
    const surnameInput = document.getElementById('surname_input_add')
    const nameInput = document.getElementById('name_input_add')
    const lastNameInput = document.getElementById('lastname_input_add')
    surnameInput.value = user.surname
    nameInput.value = user.name
    lastNameInput.value = user.lastName

    if(user.contacts.length != 0){
      for (let i = 0; i < user.contacts.length; i++) {
        addContact_popup()
        document.getElementById(`selected_${i}`).textContent = user.contacts[i].type
        document.getElementById(`contact_input_${i}`).value = user.contacts[i].value
      }
    }


    if(document.querySelectorAll('.change_contact').length > 0){
      for (let i = 0; i < document.querySelectorAll('.change_contact').length; i++) {
        document.querySelectorAll('.change_contact')[i].remove()
      }
    }
    const sendChange = document.createElement('button')
    sendChange.id = 'change_contact'
    sendChange.className = 'change_contact'
    sendChange.textContent = 'Сохранить'
    document.getElementById('popup_btns').append(sendChange)  
    document.getElementById('save_user_add').classList.add('dn')

    sendChange.addEventListener('click',()=> {
      const dataForSend = {
        name: '',
        surname: '',
        lastName: '',
        updatedAt: '',
        contacts: []
      }
      const surnameInput = document.getElementById('surname_input_add')
      const nameInput = document.getElementById('name_input_add')
      const lastNameInput = document.getElementById('lastname_input_add')
      
      if(surnameInput.value.trim() != '' && nameInput.value.trim() != ''){
        dataForSend.name = nameInput.value
        dataForSend.surname = surnameInput.value
        dataForSend.lastName = lastNameInput.value
    
        const counter = document.querySelectorAll('.contact_block_add').length
        if(counter != 0){
          for (let i = 0; i <= 10; i++) {
            if(document.getElementById(`contact_input_${i}`)) {
              dataForSend.contacts.push({
                type: `${document.getElementById(`selected_${i}`).textContent}`,
                value: `${document.getElementById(`contact_input_${i}`).value.trim()}`,
              })
            }
            
          }
        }
        sendChangeContact(dataForSend,id)
        closeAddPopup()
      }
    })
  } catch (err) {
    console.log('Ошибка при получении данных ', err);
  }
}

function formatedDateD(date){
  const inputDate = new Date(date);
  const day = String(inputDate.getDate()).padStart(2, '0');
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const year = inputDate.getFullYear();

  return `${day}.${month}.${year}`;
}

function formatedDateT(date){
  const inputDate = new Date(date);
  const hours = String(inputDate.getHours()).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

function freeStyleFilter() {
  document.querySelectorAll('.upImg').forEach(function(element) {
    element.classList.remove('upImg');
  });
  document.getElementById('filter_fio').classList.remove('upImgLet')
}

//! События кликов
//? Добавление контактов в попапе
add_contact.addEventListener('click',() => {
  addContact_popup()
})

save_user_add.addEventListener('click',async () => {
  const dataForSend = {
    id:'',
    name: '',
    surname: '',
    lastName: '',
    contacts: []
  }
  const surnameInput = document.getElementById('surname_input_add')
  const nameInput = document.getElementById('name_input_add')
  const lastNameInput = document.getElementById('lastname_input_add')
  
  if(surnameInput.value.trim() != '' && nameInput.value.trim() != ''){
    dataForSend.name = nameInput.value
    dataForSend.surname = surnameInput.value
    dataForSend.lastName = lastNameInput.value

    const counter = document.querySelectorAll('.contact_block_add').length
    if(counter != 0){
      for (let i = 0; i < counter; i++) {
        if(document.getElementById(`contact_input_${i}`).value.trim() === '') continue
        dataForSend.contacts.push({
          type: `${document.getElementById(`selected_${i}`).textContent}`,
          value: `${document.getElementById(`contact_input_${i}`).value.trim()}`,
        })
      }
    }
    await addContact(dataForSend)
    closeAddPopup()
  }
})

add_user_popup.addEventListener('click',() => {
  document.getElementById('add_contact').classList.remove('dn')
  document.getElementById('add_popup').classList.remove('dn')
  document.getElementById('popup_title').textContent = 'Новый клиент'
  document.getElementById('for_id').textContent = ''

  document.getElementById('del_user_add').classList.add('dn')
  document.getElementById('cancle_add').classList.remove('dn')
  document.getElementById('save_user_add').classList.remove('dn')
  
  if(document.getElementById('change_contact')){
    document.getElementById('change_contact').remove()
  }
})

//? Кнопка вне попапа то же самое что и отмена ниже
addPopup.addEventListener('click',(event) => {
  if(event.target === document.getElementById('add_popup')){
    closeAddPopup()
    if(document.getElementById('change_contact')){
      document.getElementById('change_contact').remove()
    }
  }
})

//? Кнопка отмены 
cancle_add.addEventListener('click', () => {
  deleteId = 0;
  closeAddPopup()
  if(document.getElementById('change_contact')){
    document.getElementById('change_contact').remove()
  }
})

//? Кнопка отмены 
cancle_del.addEventListener('click', () => {
  deleteId = 0;
  closeAddPopup()
  if(document.getElementById('change_contact')){
    document.getElementById('change_contact').remove()
  }
})

//? Кнопка вне попапа то же самое что и отмена ниже
delPopup.addEventListener('click',(event) => {
  if(event.target === document.getElementById('del_popup')){
    deleteId = 0;
    closeAddPopup()
  }
})

close_add.addEventListener('click', () => {
  closeAddPopup()
  deleteId = 0;
  if(document.getElementById('change_contact')){
    document.getElementById('change_contact').remove()
  }
})


close_del_popup.addEventListener('click', () => {
  closeAddPopup()
  deleteId = 0;
  if(document.getElementById('change_contact')){
    document.getElementById('change_contact').remove()
  }
})



async function renderList(allClients){
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
        deleteId = allClients[i].id;
        document.getElementById('cancle_add').classList.add('dn')
        document.getElementById('del_user_add').classList.remove('dn')
        document.getElementById('popup_title').textContent = `Изменить данные `
        document.getElementById('for_id').textContent = `ID: ${allClients[i].id}`
        if(document.querySelectorAll('.contact_block_add').length <= 9){
          document.getElementById('add_contact').classList.remove('dn')
        }
      })

      deleteUser.addEventListener('click',() => {
        deleteId = allClients[i].id;
        delPopup.classList.remove('dn')
        document.getElementById('del_btn').addEventListener('click',async () => {
          await deleteUserFromBase(deleteId)
          closeAddPopup()
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