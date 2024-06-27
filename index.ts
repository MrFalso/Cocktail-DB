const url: string = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
const urlRandom: string = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const searchBtn: HTMLElement | null = document.getElementById('search');
const randomBtn: HTMLElement | null = document.getElementById('random');

searchBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    const drink: string = (document.getElementById('cocktail') as HTMLInputElement).value;
    fetch(url+`?s=${drink}`, {method: "GET"})
        .then((res) => res.json())
        .then((json) => {
            console.log(json);

            document.querySelectorAll('[id=dCard]').forEach((el: any) => el.remove());

            const card: HTMLElement | null = document.getElementById('drink-card');
            for (let i = 0; i < json.drinks.length; i++) {
                let clone: HTMLElement | null = (card?.cloneNode(true) as HTMLElement);
                clone.id = 'dCard';

                (clone?.getElementsByClassName('card-img-top')[0] as HTMLImageElement).src = json.drinks[i].strDrinkThumb;
                (clone?.getElementsByClassName('card-title')[0]).innerHTML = json.drinks[i].strDrink;
                (clone?.getElementsByClassName('drink-id')[0]).innerHTML = json.drinks[i].idDrink;

                clone?.classList.remove('d-none');

                card?.before(clone);


            }
        });
});

randomBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    fetch(urlRandom, {method: "GET"})
        .then((res) => res.json())
        .then((json) => {
            let id: string = json.drinks[0].idDrink;
            (window as Window).location = `info.html?id=${id}`;
        });
});

function showInfo(drink: Node) {
    //console.log(drink.childNodes[3].childNodes[5].textContent);
    const id: string | null = drink.childNodes[3].childNodes[5].textContent;
    //localStorage.setItem('id', (id as string));
    (window as Window).location = 'info.html?id='+id;
}



function addDrink(node: Node) {
    let x: HTMLElement | null = (document.getElementById("snackbar") as HTMLElement);
    const data: {} = {
        id_drink: node.childNodes[node.childNodes.length-2].textContent,
        nome_utente: localStorage.getItem('user')
     };
    
    fetch('https://cocktaildb-api-1.onrender.com/addDrink', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then((res) => {
        if (!res.ok) {
            console.log("Errore");
        }
    })
    x.innerHTML = (node.childNodes[1].textContent as string)+" è stato aggiunto ai ❤️";
    x.className = "show";
    setTimeout(function(){ 
        x.className = (x?.className.replace("show", "") as string); 
    }, 1000);
}

