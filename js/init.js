

const myApp = {
  apiPokeIndex: null,
  apiPoke: null,
  // Init function lance le script, set les les variables 
  init: function () {
    this.apiPokeIndex = ' http://pokeapi.salestock.net/api/v2/pokemon/'
    this.apiPoke = 'https://pokeapi.co/api/v2/pokemon/'
    myApp.search();
    myApp.displayTeam();
    myApp.clearTeam();
    myApp.searchPoke();
  },
  // get data avec le nombre généré + api + trigger displayData
  getData: function(id) {
    console.log('this.apiPokeIndex + id :', this.apiPokeIndex + id);
    $.getJSON(this.apiPokeIndex + id, function(data) {
      console.log('1');
      console.log('data :', data);
      myApp.displayData(data);
    });
  },
  // trigger button search, genere un nombre aleatoire et appel getdata
  search: function() {
    $('#download-button').click(function() {
      const random = Math.floor((Math.random() * 150) + 1);
      myApp.getData(random);
    })
  },
  // Mise en forme HTML
  displayData: function(obj) {
    console.log('display');
    $('#name').html('Name : ' + obj.name.toUpperCase())
    $("#img").attr("src", obj.sprites.front_default);
    $('#addPoke').click(function () {
      myApp.addToTeam(obj);
    })
  },
  // Ajoute le pokemon a l'equipe
  addToTeam: function(obj) {
    const items = {...localStorage};
    console.log(Object.keys(items).length);
    if (Object.keys(items).length >= 6) {
      swal({
        title: 'Oups',
        text: 'Trop de pokemon',
        type: 'error',
        confirmButtonText: 'OK'
      })
    } else {
      localStorage.setItem(obj.id, obj.name)
      location.reload();
    }
  },
  // Html liste pour pokemon
  displayTeam: function() {
    const items = {...localStorage};
    let html = '';
    for (const item of Object.keys(items)) {
      html += '<li>' + items[item] + '</li>';
    }
    $('#list').prepend(html);
  },
  // Vide le localstorage au click
  clearTeam: function() {
    $('#delete').click(function() {
      localStorage.clear();
      location.reload();
    })
  },
  // Cherche un pokemon dans le localstorage affichage popup oui/non
  searchPoke: function() {
    $('#search').click(function() {
      const name = $('#pokeName').val();
      console.log('name :', name);
      const items = Object.values({...localStorage});
      console.log('name :', items);
      const pokeName = items.find(e => e === name);
      console.log('pokeName :', pokeName);
      if (pokeName) {
        swal({
          title: 'Team Pokemon',
          text: pokeName + ' fait bien parti de ton équipe',
          type: 'success',
          confirmButtonText: 'OK'
        })
      } else {
        swal({
          title: 'Team Pokemon',
          text: name + " n'est pas dans ton équipe",
          type: 'error',
          confirmButtonText: 'OK'
        })
      }
    })  
  }
}




$(function() {
  myApp.init();
})