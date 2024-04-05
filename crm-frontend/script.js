const allCli = []
function addContact(){
    fetch(`http://localhost:3000/api/clients`)
    .then(resp => {
      if(!resp.ok){
        throw new Error('Ошибка запроса')
      }else{
        return resp.json()
      }
    })
    .then(data => {allCli = data})
    .catch(err => console.log('Ошибка запроса catch ',err))
    
  }

  
  

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
      }
  const btn = document.getElementById('btn')
  btn.addEventListener('click',() => {
    addContact()
    for (const key in allCli) {
      console.log(key);
    }
  })
