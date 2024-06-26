"use strict";
//const url: string = 'www.thecocktaildb.com/api/json/v1/1/lookup.php';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);
fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, { method: 'GET' })
    .then((res) => res.json())
    .then((json) => {
    console.log(json);
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
    console.log(ingrs);
});
function getIngredients(json) {
    let list = [];
    for (let i = 1; json.drinks[0]['strIngredient' + i] !== null; i++) {
        list.push(json.drinks[0]['strIngredient' + i]);
    }
    return list;
}
