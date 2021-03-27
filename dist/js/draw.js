function board() {
    let divArr = [];
    for ( let i = 0; i < 12; i++) {
        for (let j = 0; j < 4; j++) {
            divArr.push(`<div class="field__item field__item${j}"></div>`);
            
        }
       
    }
    document.querySelector('.field').innerHTML = divArr.join('');
    
    return divArr;
}

board();

