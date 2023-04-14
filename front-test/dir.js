window.onload = (event) => {
    const apiUrlGet = "http://127.0.0.1:5000/test"
    const fff = document.getElementById("display-items")
    // const header = document.createElement('h3');

    fetch(apiUrlGet, {method: "GET",})
      .then(response => {
        response.json()
        .then(data => {
          console.log(data)


          //Створюємо основний дів
          const discrupt = createElementAndAppendChild("div", null, fff, null);
          const dayEventsDiv = document.createElement('div');
          dayEventsDiv.classList.add('all');

          const displayData = document.createElement('h2');
          displayData.textContent = data.name;
          dayEventsDiv.appendChild(displayData);

          data.forEach( (data) => {
            // перетворюємо дані на об'єкт, так як приходить масив рядків
            event = JSON.parse(event)

    // створюємо елемент h3, в якому буде відображатись назва події
            const header = document.createElement('h3');
            header.textContent = event.price;
            const name = document.createElement('h3');
            name.textContent = event.name;
            const subject = document.createElement('h3');
            subject.textContent = event.subject;


        })
          // console.log(data)
          // header.textContent = data.fal
          // fff.appendChild(header)
        })
        
      })

      .catch(error => {
        console.error('Помилка:', error);
      });

      function createElementAndAppendChild (tagName, content, tagAddTo, className) {                  
        const createdElement = document.createElement(tagName);  
        createElement.className = className;                
        if ( content ) { createdElement.textContent = content };                         
        tagAddTo.appendChild(createdElement);                                            
        return createdElement;                                                           
    }         
}





