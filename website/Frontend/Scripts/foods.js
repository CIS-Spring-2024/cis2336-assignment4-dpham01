window.addEventListener('load', () => {

    let menuCards = document.getElementsByClassName("single-menu");

    for(let i = 0; i<menuCards.length; i++){

        let card = menuCards[i];
        let flag = false

        card.addEventListener('click', (e) => {

            let hidden = card.querySelector('div[class="hidden"]');
            let expandable = card.querySelector('p[id="expand"]');

            if(flag == false){
                expandable.innerHTML = 'More Info. x';
                hidden.style.maxHeight = '100px';
            }
            else{
                expandable.innerHTML = 'More Info. +';
                hidden.style.maxHeight = '0px';
            }

            flag = !flag;

        });
    }
    
});