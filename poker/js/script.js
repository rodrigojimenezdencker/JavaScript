document.getElementById('shuffle_button').addEventListener('click', shuffleDecks);


function shuffleDecks() {
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=5')
        .then(reponse => reponse.json())
        .then(data => {
            for (let card of data.cards) {
                let template_decks = document.querySelector('[data-hook="template_decks"]').content;
                let deck = document.importNode(template_decks, true);
                deck.querySelector('[data-hook="card"]').src = card.image;
                document.querySelector('[data-hook="deck"]').appendChild(deck);
            }
        });
}