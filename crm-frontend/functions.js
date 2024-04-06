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
function addContact(){
  const counter = document.querySelectorAll('.contact_block_add').length
  const contactBlock = document.createElement('div')
  contactBlock.id = `contact_block_${counter}`
  contactBlock.classList.add('contact_block_add')
  const contactSelect = document.createElement('select')
  contactSelect.id = `contact_select_${counter}`
  contactSelect.classList.add('contact_select')
  var options = [
    { value: 'phone', text: 'Телефон', selected: true },
    { value: 'email', text: 'Email' },
    { value: 'vk', text: 'VK' },
    { value: 'facebook', text: 'Facebook' }
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

const add_contact = document.getElementById('add_contact') //? Кнопка добавить контакт
//! События кликов
add_contact.addEventListener('click',() => {
  addContact()
})

