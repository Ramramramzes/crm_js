const add_contact = document.getElementById('add_contact') //? Кнопка добавить контакт
const save_user_add = document.getElementById('save_user_add') //? Кнопка сохранить клиента при ДОБАВЛЕНИИ
const cancle_add = document.getElementById('cancle_add')//? Кнопка отмены в попапе добавления 
const cancle_del = document.getElementById('del_cancel')//? Кнопка отмены в попапе удаления
const add_user_popup = document.getElementById('add_user_popup') //? Кнопка открытия попапа
const addPopup = document.getElementById('add_popup')
const delPopup = document.getElementById('del_popup')
const delBtnInChange = document.getElementById('del_user_add')

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
  } catch (err){
    console.log('Ошибка запроса catch ',err)
  }
}

// ? Удаление клиента
function deleteUserFromBase(id){
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
    })
    customOptions.append(opt)
  })
  customSelect.append(selected)
  customSelect.append(customOptions)
  contactBlock.append(customSelect)

  customOptions.classList.toggle('dn')

  selected.addEventListener('click', () => {
    customOptions.classList.toggle('dn')
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
  const del_popup = document.getElementById('del_popup')
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
    document.getElementById('del_btn').addEventListener('click',() => {
      deleteUserFromBase(id)
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

    const sendChange = document.createElement('button')
    sendChange.id = 'change_contact'
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

//! События кликов
//? Добавление контактов в попапе
add_contact.addEventListener('click',() => {
  addContact_popup()
})

save_user_add.addEventListener('click',() => {
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
    addContact(dataForSend)
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
  closeAddPopup()
  if(document.getElementById('change_contact')){
    document.getElementById('change_contact').remove()
  }
})

//? Кнопка отмены 
cancle_del.addEventListener('click', () => {
  closeAddPopup()
  if(document.getElementById('change_contact')){
    document.getElementById('change_contact').remove()
  }
})

//? Кнопка вне попапа то же самое что и отмена ниже
delPopup.addEventListener('click',(event) => {
  if(event.target === document.getElementById('del_popup')){
    closeAddPopup()
  }
})


