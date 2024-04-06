const add_contact = document.getElementById('add_contact') //? Кнопка добавить контакт
const save_user_add = document.getElementById('save_user_add') //? Кнопка сохранить клиента при ДОБАВЛЕНИИ

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
//? Добавить контакт в блоке нового клиента
function addContact_popup(){
  const counter = document.querySelectorAll('.contact_block_add').length
  const contactBlock = document.createElement('div')
  contactBlock.id = `contact_block_${counter}`
  contactBlock.classList.add('contact_block_add')
  const contactSelect = document.createElement('select')
  contactSelect.id = `contact_select_${counter}`
  contactSelect.classList.add('contact_select')
  const options = [
    { value: 'Телефон', text: 'Телефон', selected: true },
    { value: 'Email', text: 'Email' },
    { value: 'VK', text: 'VK' },
    { value: 'Facebook', text: 'Facebook' }
  ];
  options.forEach((el) => {
    const option = document.createElement('option')
    if(el.selected){
      option.selected = true
    }
    option.value = el.value
    option.textContent = el.text
    contactSelect.appendChild(option)
  })
  const input = document.createElement('input')
  input.type = 'text'
  input.id = `contact_input_${counter}`
  input.classList.add('contact_input')
  const delBtn = document.createElement('button')
  delBtn.textContent = 'x'
  delBtn.id = `del_${contactBlock.id}`

  contactBlock.append(contactSelect)
  contactBlock.append(input)
  contactBlock.append(delBtn)
  const form = document.getElementById('add_user_form')
  form.append(contactBlock)

  delBtn.addEventListener('click',() => {
    if(counter <= 9) add_contact.classList.remove('dn')
    document.getElementById(`contact_block_${counter}`).remove()
  })

  if(counter >= 9) document.getElementById('add_contact').classList.add('dn')
}
//? Сохранить клиента при ДОБАВЛЕНИИ


function currentDate(){
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  return formattedDate
}

//! События кликов
//? Добавление контактов в попапе
add_contact.addEventListener('click',() => {
  addContact_popup()
})

save_user_add.addEventListener('click',() => {
  const dataForSend = {
    id:'',
    createdAt: '',
    updatedAt: '',
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
    // console.log(`Фамилия - ${surnameInput.value}, Имя - ${nameInput.value}, Отчество - ${lastNameInput.value}`);

    const counter = document.querySelectorAll('.contact_block_add').length
    if(counter != 0){
      for (let i = 0; i < counter; i++) {
        // console.log(`Селект - ${document.getElementById(`contact_select_${i}`).value}, Инпут от селекта ${document.getElementById(`contact_input_${i}`).value}`);
        dataForSend.contacts.push({
          type: `${document.getElementById(`contact_select_${i}`).value}`,
          value: `${document.getElementById(`contact_input_${i}`).value}`,
        })
      }
    }
    dataForSend.createdAt = currentDate().toString()
    addContact(dataForSend)
  }
})


