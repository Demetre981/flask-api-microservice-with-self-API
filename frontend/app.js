window.onload = (event) => {

    const routes = [
        {path: '/', handler: startHandler},
        {path: '/main.html', handler: homeHandler},
        {path: '/login.html', handler: loginHandler},
        {path: '/create.html', handler: createHandler},
        {path: '/index.html', handler: startHandler},
        {path: '/signup.html', handler: signupHandler}
    ]

    handleUrlChange();


    function handleUrlChange () {
        const path = window.location.pathname;
        console.log(path)
        const urlPath = routes.find(route => route.path === path)
        console.log(urlPath)
        if (urlPath) {
            urlPath.handler();

        } else {
            homeHandler();
        }
    }

    // function homeHandler () {
    //     console.log("home works");
    //     const itemForm = document.getElementById("item-form");
    //     const JustForm = document.getElementById("buy_butt");

    //     console.log(itemForm);
    //     const urlAddItem = 'http://127.0.0.1:5000/main';
    //     const urlBuyItem = 'http://127.0.0.1:5000/buy'
    //     // const date = new Date().toISOString().slice(0, 10);
    //     // console.log(date)
        
    //     // getEventsByDate(date)
    //     // .then(data => showEvents(data.data))
    //     // logout();
    //     itemForm.addEventListener("submit", (event) => {
    //         event.preventDefault();

    //         sendRequestToServer(itemForm, urlAddItem);
    // })
    // //     JustForm.addEventListener("click", (event) => {
    // //         event.preventDefault();
            

    // //         fetch (`${urlBuyItem}/` => {});
    // //         location.replace()
    // // })

    // }


    function homeHandler () {
        console.log("home works");
        const itemForm = document.getElementById("item-form");
        const buyButtons = document.getElementsByClassName("btn btn-lg btn-block btn-outline-primary");
        
        console.log(buyButtons);
        getAllItems()
        .then(data => showItems(data.data))
        logout();

        
        
        // for (let i = 0; i < buyButtons.length; i++) {
        //     let buyButton = buyButtons[i];
        //     console.log(buyButton)
        //     buyButton.addEventListener("click", (event) => {
        //         event.preventDefault();
        //         console.log(event)

        //         console.log(event.target);
        //     });
        //}
        
            // fetch(`${urlBuyItem}/event.target.id`, {
            //     method: 'GET',
            //     headers: { Authorization: ``}
            //     })
            // location.replace(url)
    }

    function startHandler () {
        console.log("start works");
        const startForm = document.getElementById("start-form");
        console.log(startForm);
        const urlStart = 'http://127.0.0.1:5000/start';
        
        
        
        // .then(data => showEvents(data.data))
        // logout();
        itemForm.addEventListener("submit", (event) => {
            event.preventDefault();
            
            sendRequestToServer(startForm, urlStart);
            location.replace()
    })}






    function loginHandler () {
        const loginForm = document.getElementById("login-form");
        const urlLogin = 'http://127.0.0.1:5000/login';

        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            sendRequestToServer(loginForm, urlLogin)
            .then(response => {
                if (response.isLogged) {
                    location.replace("/main.html");
                    localStorage.setItem("token", response.token);
                    console.log(localStorage.getItem("token"));
                }
            });
    })
    }

    function signupHandler () {
        const signupForm = document.getElementById("signup-form");
        const urlSignup = 'http://127.0.0.1:5000/signup';

        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();

            sendRequestToServer(signupForm, urlSignup)
            .then(response => {
                if (response.isRegistered) {
                    location.replace("/login.html");
                }
            });
    })
    }


    function createHandler () {
        const createForm = document.getElementById("create-form");
        const urlCreate = 'http://127.0.0.1:5000/create_item';
        console.log(createForm)

        createForm.addEventListener("submit", (event) => {
            console.log(event)
            event.preventDefault();
            
            sendRequestToServer(createForm, urlCreate)
            .then(response => {
                if (response.isAdded) {
                    location.replace("/main.html");
                }
            });
    })
    }

    function logout() {
        const btn = document.getElementById("logoutButton");
        btn.addEventListener("click", (event) => {
            localStorage.removeItem("token");
            location.replace("login.html")
    })}


    // function getItemForBuy (url) {
    //     const apiUrlGet = `http://127.0.0.1:5000/${url}`;

    //     return fetch(apiUrlGet, {
    //         method: "GET",})
    //       .then(response => response.json())

    //       .catch(error => {
    //         console.error('Помилка:', error);
    //       });
    // }


    // function getEventsByDate (date) {
    //     const apiUrlGet = `http://127.0.0.1:5000/get_events_by_date/${date}`;

    //     return fetch(apiUrlGet, {
    //         method: "GET",})
    //       .then(response => response.json())

    //       .catch(error => {
    //         console.error('Помилка:', error);
    //       });
    // }

    function getAllItems () {
        const apiUrlGet = `http://127.0.0.1:5000/get_all_items`;

        return fetch(apiUrlGet, {
            method: "GET",})
          .then(response => response.json())

          .catch(error => {
            console.error('Помилка:', error);
          });
    }




    function sendRequestToServer (form, url) {

        const formData = new FormData(form);
        const data = {};

        for (const[key, value] of formData.entries()) {
            data[key] = value;
        }

        return fetch(url, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(error => console.error('Помилка:', error));
    }
    

    

    function showItems (data) {
        console.log(data)
        // const itemsDiv = document.getElementById("display-items");
        const itemsDiv = document.getElementById("display-items");

        const containItem = createElementAndAppendChild("div", null, itemsDiv, "container");
        const fDiv = createElementAndAppendChild("div", null, containItem, "card-deck mb-3 text-center");
        
        data.forEach( (event) => {
            event = JSON.parse(event);
                
            const sDiv = createElementAndAppendChild("div", null, fDiv, "card mb-4 shadow-sm");
            const titleDiv = createElementAndAppendChild("div", null, sDiv, "card-header");
            const priceDiv = createElementAndAppendChild("div", null, sDiv, "card-body");
            const Ul = createElementAndAppendChild("ul", null, priceDiv, "list-unstyled mt-3 mb-4");
            
            
            createElementAndAppendChild("h4", event.title, titleDiv, 'my-0 font-weight-normal');
            const h1d = createElementAndAppendChild("h1", event.price , priceDiv, "card-title pricing-card-title");
            createElementAndAppendChild("small", "UAH", h1d, "text-muted");
            createElementAndAppendChild("li", event.experience + ' years of experience', Ul, null);
            createElementAndAppendChild("li", event.score + ' years of experience', Ul, null);
            createElementAndAppendChild("li", event.phone, Ul, null);

            let button = createElementAndAppendChild("a", "Buy", priceDiv, "btn btn-lg btn-block btn-outline-primary", "button", event.id);//         <a href="/buy/{{ el.id }}" type="button" id="Buybutto" class="btn btn-lg btn-block btn-outline-primary">Buy</a>
        //     for (let i = 0; i < buyButtons.length; i++) {
        //         let buyButton = buyButtons[i];
        //         console.log(buyButton)
            const urlBuyItem = 'http://127.0.0.1:5000/buy'
            //
            button.addEventListener("click", (event) => {
                event.preventDefault();
                console.log(event)

                console.log(event.target);
            
        
        
            fetch(`${urlBuyItem}/${event.target.id}`, {
                method: 'GET',
                headers: { Authorization: ``}
                })
            
            .then(response => {
                response.json()
                .then (data => {
                    console.log(data)
                    location.replace(data.urlurl)
                })
                console.log(response)
                //
        // }
        });
            
        })
    })}
    function createElementAndAppendChild (tagName, content, tagAddTo, classElem, typeElem = null, idElem = null) {
        const createdElement = document.createElement(tagName);
        createdElement.className = classElem;
        if ( typeElem ) { createdElement.setAttribute('type', typeElem) };
        if ( idElem ) { createdElement.id = idElem };
        if ( content ) { createdElement.textContent = content };
        tagAddTo.appendChild(createdElement);
        return createdElement;
    }

}


             





    // function renderEventsForFiveDays () {
    //     const endDate = new Date();
    //     endDate.setDate(endDate.getDate() + 5);
    //     let currentDate = new Date();

    //     while (currentDate <= endDate) {
    //         const date = currentDate.toISOString();

    //         getEventsByDate(date)
    //         .then(data => showEvents(data))

    //         currentDate.setDate(currentDate.getDate() + 1)
    //     }
    // }
