document.getElementById('new-player').addEventListener('submit', addPlayer);
//var puntajeMax = document.getElementById('puntajeMax');

function addPlayer(e) {
    
    let namePlayer = document.getElementById('playerName').value;
    let points = 0;
    var player = {
        namePlayer,
        points
    };
    
    if (localStorage.getItem('players') === null){
        let players = [];
        players.push(player);
        localStorage.setItem('players', JSON.stringify(players));
    } else {
        let players = JSON.parse(localStorage.getItem('players'));
        players.push(player);
        localStorage.setItem('players', JSON.stringify(players));
    }
    getPlayer();
    document.getElementById('new-player').reset();
    e.preventDefault();

}

function getPlayer() {
    let players = JSON.parse(localStorage.getItem('players'));
    let playersView = document.getElementById('players');

    playersView.innerHTML = '';
    
    for(let i = 0; i < players.length; i++) {
        let namePlayer = players[i].namePlayer;
        let points = players[i].points;


        playersView.innerHTML += `<div class="card mb-4">
            <div class="card-body">
                <p>${namePlayer} - ${points} <input type="number" id="thePoint" placeholder="Agregar puntos" value="0"></p> <a class="btn btn-success" onclick="addPoint('${namePlayer}')">Sumar Puntos</a>
                <a class="btn btn-danger" onclick="deletePlayer('${namePlayer}')">
                Eliminar
                </a>
            </div>
        </div>`
    }
}

function deletePlayer(namePlayer){
    let players = JSON.parse(localStorage.getItem('players'));
    for(let i = 0; i < players.length; i++) {
        if(players[i].namePlayer == namePlayer) {
            players.splice(i, 1);
        }
    }
    localStorage.setItem('players', JSON.stringify(players));
    getPlayer();
}

function addPoint(namePlayer) {
    let players = JSON.parse(localStorage.getItem('players'));
    let puntoss = parseInt(document.getElementById('thePoint').value);     
    
    for(let i = 0; i < players.length; i++){
        if(players[i].namePlayer == namePlayer) {
                   
            players[i].points += puntoss;
            console.log(puntoss);
            console.log(i);
            
        }

    }
    localStorage.setItem('players', JSON.stringify(players));
    getPlayer();
}

function endGame(namePlayer){ 
    let players = JSON.parse(localStorage.getItem('players'));
    let puntajeMax = parseInt(document.getElementById('puntajeMax').value)
    
    for(let i = 0; i < players.length; i++){
        if(players[i].namePlayer == namePlayer && players[i].points > puntajeMax){
            alert(players.namePlayer + ' Ha perdido el juego!!');
            console.log(players)
       }
       endGame();
    }
}

getPlayer();
addPoint();