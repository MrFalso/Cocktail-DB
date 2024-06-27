"use strict";
//const url: string = 'www.thecocktaildb.com/api/json/v1/1/lookup.php';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
//console.log(id);
fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((json) => {
    //console.log(json);
    document.getElementById('drinkImg').src = json.drinks[0].strDrinkThumb;
    document.getElementById('drinkName').textContent = json.drinks[0].strDrink;
    document.getElementById('drinkDescr').textContent = json.drinks[0].strInstructionsIT;
    /*console.log(json.drinks[0]['strIngredient'+1]);*/
    const ingrs = getIngredients(json);
    const ingrCol = document.getElementById('ingr');
    for (let i = 0; i < ingrs.length; i++) {
        let clone = ingrCol === null || ingrCol === void 0 ? void 0 : ingrCol.cloneNode(true);
        //console.log(clone.childNodes);
        clone.childNodes[1].textContent = ingrs[i];
        clone === null || clone === void 0 ? void 0 : clone.classList.remove('d-none');
        ingrCol === null || ingrCol === void 0 ? void 0 : ingrCol.before(clone);
    }
    //console.log(ingrs);
});
function getIngredients(json) {
    let list = [];
    for (let i = 1; json.drinks[0]['strIngredient' + i] !== null; i++) {
        list.push(json.drinks[0]['strIngredient' + i]);
    }
    return list;
}
function getComments() {
    document.querySelectorAll('[id=commBox]').forEach((el) => el.remove());
    fetch(`https://cocktaildb-api-1.onrender.com/getComments?id=${id}`, { method: "GET" })
        .then((res) => {
        var _a, _b;
        if (!res.ok) {
            (_a = document.getElementById('noComm')) === null || _a === void 0 ? void 0 : _a.classList.remove('d-none');
        }
        else {
            (_b = document.getElementById('noComm')) === null || _b === void 0 ? void 0 : _b.classList.add('d-none');
            return res.json();
        }
    })
        .then((comments) => {
        const comment = document.getElementById('comment');
        console.log('Hello');
        for (let i = 0; i < comments.commenti.length; i++) {
            let clone = comment === null || comment === void 0 ? void 0 : comment.cloneNode(true);
            clone.id = 'commBox';
            (clone === null || clone === void 0 ? void 0 : clone.getElementsByClassName('img-fluid')[0]).src = `img/${(comments.commenti[i].nome).toLowerCase()}.png`;
            //console.log(clone?.getElementsByClassName('comm-comm')[0]);
            (clone === null || clone === void 0 ? void 0 : clone.getElementsByClassName('comm-name')[0]).innerHTML = comments.commenti[i].nome;
            (clone === null || clone === void 0 ? void 0 : clone.getElementsByClassName('comm-comment')[0]).innerHTML = comments.commenti[i].commento;
            clone.classList.remove('d-none');
            comment === null || comment === void 0 ? void 0 : comment.before(clone);
        }
    });
}
document.body.onload = (event) => {
    event.preventDefault();
    getComments();
};
let send = document.getElementById('send');
let commentInpt = document.getElementById('commentInpt');
send === null || send === void 0 ? void 0 : send.addEventListener('click', (event) => {
    event.preventDefault();
    const doc = {
        id_drink: id,
        commento: {
            nome: localStorage.getItem('user'),
            commento: commentInpt.value
        }
    };
    commentInpt.value = '';
    fetch(`https://cocktaildb-api-1.onrender.com/addComment`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc)
    }).then((res) => {
        if (res.ok) {
            getComments();
        }
        else {
            console.error('qualcosa è andato storto');
        }
    });
});
