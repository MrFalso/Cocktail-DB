"use strict";
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
const urlRandom = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const searchBtn = document.getElementById('search');
const randomBtn = document.getElementById('random');
searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const drink = document.getElementById('cocktail').value;
    fetch(url + `?s=${drink}`, { method: "GET" })
        .then((res) => res.json())
        .then((json) => {
        console.log(json);
        document.querySelectorAll('[id=dCard]').forEach((el) => el.remove());
        const card = document.getElementById('drink-card');
        for (let i = 0; i < json.drinks.length; i++) {
            let clone = card === null || card === void 0 ? void 0 : card.cloneNode(true);
            clone.id = 'dCard';
            (clone === null || clone === void 0 ? void 0 : clone.getElementsByClassName('card-img-top')[0]).src = json.drinks[i].strDrinkThumb;
            (clone === null || clone === void 0 ? void 0 : clone.getElementsByClassName('card-title')[0]).innerHTML = json.drinks[i].strDrink;
            (clone === null || clone === void 0 ? void 0 : clone.getElementsByClassName('drink-id')[0]).innerHTML = json.drinks[i].idDrink;
            clone === null || clone === void 0 ? void 0 : clone.classList.remove('d-none');
            card === null || card === void 0 ? void 0 : card.before(clone);
        }
    });
});
randomBtn === null || randomBtn === void 0 ? void 0 : randomBtn.addEventListener('click', (event) => {
    event.preventDefault();
    fetch(urlRandom, { method: "GET" })
        .then((res) => res.json())
        .then((json) => {
        let id = json.drinks[0].idDrink;
        window.location = `info.html?id=${id}`;
    });
});
function showInfo(drink) {
    //console.log(drink.childNodes[3].childNodes[5].textContent);
    const id = drink.childNodes[3].childNodes[5].textContent;
    //localStorage.setItem('id', (id as string));
    window.location = 'info.html?id=' + id;
}
function addDrink(node) {
    let x = document.getElementById("snackbar");
    const data = {
        id_drink: node.childNodes[node.childNodes.length - 2].textContent,
        nome_utente: localStorage.getItem('user')
    };
    fetch('https://cocktaildb-api-1.onrender.com/addDrink', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then((res) => {
        if (!res.ok) {
            console.log("Errore");
        }
    });
    x.innerHTML = node.childNodes[1].textContent + " è stato aggiunto ai ❤️";
    x.className = "show";
    setTimeout(function () {
        x.className = x === null || x === void 0 ? void 0 : x.className.replace("show", "");
    }, 1000);
}
