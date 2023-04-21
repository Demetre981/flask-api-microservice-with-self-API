window.onload = (event) => {

    const routes = [
        {path: '/', handler: startHandler},
        {path: '/main.html', handler: homeHandler},
        {path: '/login.html', handler: loginHandler},
        {path: '/create.html', handler: createHandler},
        {path: '/index.html', handler: startHandler},
        {path: '/items.html', handler: itemHandler},
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


    function homeHandler () {
        console.log("home works");
        const itemForm = document.getElementById("item-form");
        const logoutButton = document.querySelector('#logoutButton');
        const buyButtons = document.getElementsByClassName("btn btn-lg btn-block btn-outline-primary");
        
        console.log(buyButtons);

        getAllItems()
        .then(data => showItems(data.data))

        logoutButton.addEventListener('click', (event) => {
            logout();
        })



    }


    function itemHandler () {
        for (var i = 0; i < localStorage.length; i++){
            localStorage.getItem(localStorage.key(i));
        }
        const itemId = localStorage.getItem("item_id");
        console.log(itemId);
        fetch(`http://127.0.0.1:5000/about_product/${itemId}`)
        
        .then(response => response.json())
        .then(data => showDataAbout(data))

        //localStorage.removeItem("item_id");

        // itemForm.addEventListener("click", (event) => {
        //     event.preventDefault();

            
        //     });
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

            let buttonView = createElementAndAppendChild("a", "View", priceDiv, "btn btn-lg btn-block btn-outline-primary", "button");//  event.id       <a href="/buy/{{ el.id }}" type="button" id="Buybutto" class="btn btn-lg btn-block btn-outline-primary">Buy</a>
            buttonView.setAttribute("data", `id:${event.id}`)
            let button = createElementAndAppendChild("a", "Buy", priceDiv, "btn btn-lg btn-block btn-outline-primary", "button", event.id);//         <a href="/buy/{{ el.id }}" type="button" id="Buybutto" class="btn btn-lg btn-block btn-outline-primary">Buy</a>
        //     for (let i = 0; i < buyButtons.length; i++) {
        //         let buyButton = buyButtons[i];
        //         console.log(buyButton)
            const urlBuyItem = 'http://127.0.0.1:5000/buy'

            buttonView.addEventListener("click", (event) => {
                event.preventDefault();
                console.log(event.target.getAttribute("data").slice(3))
                localStorage.setItem("item_id", event.target.getAttribute("data").slice(3))
                location.replace("items.html") 


                console.log(event.target);
            });


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



























    function showDataAbout (event) {
        console.log(event)
        console.log(event.id)
        const AllDiv = document.getElementById("all-data-show");

        const rowCard = createElementAndAppendChild("div", null, AllDiv, "row");
    
        const cardDiv1 = createElementAndAppendChild("div", null, rowCard, "col-lg-4");
        const cardDiv2 = createElementAndAppendChild("div", null, cardDiv1, "card mb-4"); 
        const cardDiv3 = createElementAndAppendChild("div", null, cardDiv2, "card-body text-center");


        createElementAndAppendChild("img", null, cardDiv3, "rounded-circle img-fluid", null, null, "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp", "avatar", "width: 150px;");
        createElementAndAppendChild("h5", event.name, cardDiv3, "my-3");
        createElementAndAppendChild("p", event.specialty, cardDiv3, "text-muted mb-1");








        
        const itemsDiv = createElementAndAppendChild("div", null, AllDiv, "col-lg-8", null, "disp-all-data");
        const containItem = createElementAndAppendChild("div", null, itemsDiv, "card mb-4");
        const fDiv = createElementAndAppendChild("div", null, containItem, "card-body");




            // name
        const rowName = createElementAndAppendChild("div", null, fDiv, "row");
        const titleDivName = createElementAndAppendChild("div", null, rowName, "col-sm-3");
        const inputDivName = createElementAndAppendChild("div", null, fDiv, "col-sm-9");
        createElementAndAppendChild("hr", null, fDiv, null);
            // email
        const rowEmail = createElementAndAppendChild("div", null, fDiv, "row");
        const titleDivEmail = createElementAndAppendChild("div", null, rowEmail, "col-sm-3");
        const inputDivEmail = createElementAndAppendChild("div", null, fDiv, "col-sm-9");
        createElementAndAppendChild("hr", null, fDiv, null);
            // phone
        const rowPhone = createElementAndAppendChild("div", null, fDiv, "row");
        const titleDivPhone = createElementAndAppendChild("div", null, rowPhone, "col-sm-3");
        const inputDivPhone = createElementAndAppendChild("div", null, fDiv, "col-sm-9");
        createElementAndAppendChild("hr", null, fDiv, null);
            // subject
        const rowTitle = createElementAndAppendChild("div", null, fDiv, "row");
        const titleDivTitle = createElementAndAppendChild("div", null, rowTitle, "col-sm-3");
        const inputDivTitle = createElementAndAppendChild("div", null, fDiv, "col-sm-9");
        createElementAndAppendChild("hr", null, fDiv, null);
            // score
        const rowScore = createElementAndAppendChild("div", null, fDiv, "row");
        const titleDivScore = createElementAndAppendChild("div", null, rowScore, "col-sm-3");
        const inputDivScore = createElementAndAppendChild("div", null, fDiv, "col-sm-9");
        createElementAndAppendChild("hr", null, fDiv, null);
            // experience
        const rowExperience = createElementAndAppendChild("div", null, fDiv, "row");
        const titleDivExperience = createElementAndAppendChild("div", null, rowExperience, "col-sm-3");
        const inputDivExperience = createElementAndAppendChild("div", null, fDiv, "col-sm-9");
        createElementAndAppendChild("hr", null, fDiv, null);
            // about
        const rowDescription = createElementAndAppendChild("div", null, fDiv, "row");
        const titleDivDescription = createElementAndAppendChild("div", null, rowDescription, "col-sm-3");
        const inputDivDescription = createElementAndAppendChild("div", null, fDiv, "col-sm-9");
        createElementAndAppendChild("hr", null, fDiv, null);
            // pirce
        const rowPrice = createElementAndAppendChild("div", null, fDiv, "row");
        const titleDivPrice = createElementAndAppendChild("div", null, rowPrice, "col-sm-3");
        const inputDivPrice = createElementAndAppendChild("div", null, fDiv, "col-sm-9");
        createElementAndAppendChild("hr", null, fDiv, null);



            
            //name
        createElementAndAppendChild("p", "Full Name", titleDivName, "mb-0");
        createElementAndAppendChild("p", event.name, inputDivName, "text-muted mb-0");
        
            //email
        createElementAndAppendChild("p", "Email", titleDivEmail, "mb-0");
        createElementAndAppendChild("p", event.email, inputDivEmail, "text-muted mb-0");
        
            //phone
        createElementAndAppendChild("p", "Phone", titleDivPhone, "mb-0");
        createElementAndAppendChild("p", event.phone, inputDivPhone, "text-muted mb-0");
        
            //subject
        createElementAndAppendChild("p", "Subject", titleDivTitle, "mb-0");
        createElementAndAppendChild("p", event.title, inputDivTitle, "text-muted mb-0");
        
            //score
        createElementAndAppendChild("p", "Overall score of the EE", titleDivScore, "mb-0");
        createElementAndAppendChild("p", event.score, inputDivScore, "text-muted mb-0");
        
            // experience
        createElementAndAppendChild("p", "Y-s of experience", titleDivExperience, "mb-0");
        createElementAndAppendChild("p", event.experience, inputDivExperience, "text-muted mb-0");
        
            //about
        createElementAndAppendChild("p", "About", titleDivDescription, "mb-0");
        createElementAndAppendChild("p", event.description, inputDivDescription, "text-muted mb-0");
        
            //price
        createElementAndAppendChild("p", "Price/hour", titleDivPrice, "mb-0");
        createElementAndAppendChild("p", event.price, inputDivPrice, "text-muted mb-0");
        

        const rowButton = createElementAndAppendChild("div", null, AllDiv, "row");
        const buttonDiv = createElementAndAppendChild("div", null, rowButton, "col-md-6");
        const buttonShowDiv = createElementAndAppendChild("div", null, buttonDiv, "card mb-4 mb-md-0");

        let button = createElementAndAppendChild("a", "Buy", buttonShowDiv, "btn btn-lg btn-light fw-bold border-blue bg-blue", "button", event.id);//         <a href="/buy/{{ el.id }}" type="button" id="Buybutto" class="btn btn-lg btn-block btn-outline-primary">Buy</a>
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
    }


    function createElementAndAppendChild (tagName, content, tagAddTo, classElem, typeElem = null, idElem = null, srcElem = null, altElem = null, styleElem = null) {
        const createdElement = document.createElement(tagName);
        createdElement.className = classElem;

        if ( typeElem ) { createdElement.setAttribute('type', typeElem) };
        if ( idElem ) { createdElement.id = idElem };
        if ( content ) { createdElement.textContent = content };
        if ( srcElem ) { createdElement.src = srcElem; };
        if ( altElem ) { createdElement.alt = altElem; };
        if ( styleElem ) { createdElement.style.cssText = styleElem; };
        tagAddTo.appendChild(createdElement);
        return createdElement;
    }

    function renderImageTag(imageUrl) {
        const imgTag = document.createElement("img"); 
        imgTag.src = imageUrl;
        return imgTag;
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
