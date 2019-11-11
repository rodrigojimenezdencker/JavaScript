document.getElementById('shuffle_button').addEventListener('click', startGame);

function startGame() {
    generateRandomPlayers();
    generateRobotPlayerImage();
    generateAvatarPlayerImage();
    shuffleDecks();
}

function shuffleDecks() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-hook="player_deck"]').forEach(player_deck =>
                fetch('https://deckofcardsapi.com/api/deck/' + data.deck_id + '/draw/?count=5')
                    .then(reponse => reponse.json())
                    .then(data => {
                        player_deck.innerHTML = "";
                        for (let card_value of data.cards) {
                            let template_card = document.querySelector('[data-hook="template_card"]').content;
                            let card = document.importNode(template_card, true);
                            card.querySelector('[data-hook="card"]').src = card_value.image;
                            card.querySelector('[data-hook="card"]').alt = card_value.code;
                            player_deck.appendChild(card);
                        }
                    })
            );
        });
}

function generateRandomPlayers() {
    document.querySelectorAll('[data-hook="random_player_information"]').forEach(element => {
        fetch('https://randomuser.me/api/?results=1')
            .then(response => response.json())
            .then(data => {
                data.results.forEach(e => {
                    element.querySelector('[data-hook="random_player_name"]').textContent = e.name.first,
                        element.querySelector('[data-hook="random_player_image"]').src = e.picture.large
                });
            });
    });
}

function generateRobotPlayerImage() {
    let randomNumber = Math.random();
    let url = 'https://robohash.org/' + randomNumber;
    let promise = new Promise(
        function(){
            let img = new Image();
            img.src = url;
        }
    )

    promise.then(document.querySelector('[data-hook="robot_player_image"]').src = url)
    // fetch('https://robohash.org/' + randomNumber)
    //     .then(response => response)
    //     .then(data => document.querySelector('[data-hook="robot_player_image"]').src = data.url);
}

function generateAvatarPlayerImage() {
    let randomNumber = Math.random();
    let url = 'https://api.adorable.io/avatars/285/' + randomNumber;
    let promise = new Promise(
        function(ok, bad){
            let img = new Image();
            img.addEventListener('load', () => ok('CORRECT'));
            img.addEventListener('error', () => ok('NOT VALID URL'));
            img.src = url;
        }
    )

    promise.then(x => {
        document.querySelector('[data-hook="real_player_image"]').src = url
    })
    // let randomNumber = Math.random();
    // fetch('https://api.adorable.io/avatars/285/' + randomNumber)
    //     .then(response => response)
    //     .then(data => document.querySelector('[data-hook="real_player_image"]').src = data.url);
}