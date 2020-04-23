$(document).ready(function(){
  // // var Handlebars
  var source = $("#templateFilm").html();
  var template = Handlebars.compile(source);
  $("#boton").click(function () {
    $(".libreriaFilm").html("")
    $(".libreriaSerie").html("")
    var film_serieCercato = $("#zerca").val()
    console.log(film_serieCercato);


    $.ajax({
      url:"https://api.themoviedb.org/3/search/movie",
      method:"GET",
      data:{
        api_key:"a85d7660d72355c1cdf03fd5b8318e9f",
        query: film_serieCercato,
        language:"it-IT"
      },
      success: function (data,stato) {
        console.log(data);
        var listaFilmSerie = data.results
        console.log(listaFilmSerie);
        generaFilm(listaFilmSerie)

      },
      error:function (richiesta,stato,errore) {
        alert("Chiamata fallita!")
      }
    })


    $.ajax({
      url:"https://api.themoviedb.org/3/search/tv",
      method:"GET",
      data:{
        api_key:"a85d7660d72355c1cdf03fd5b8318e9f",
        query: film_serieCercato,
        language:"it-IT"
      },
      success: function (data,stato) {
        console.log(data);
        var listaFilmSerie = data.results
        console.log(listaFilmSerie);
        generaFilm(listaFilmSerie)

      },
      error:function (richiesta,stato,errore) {
        alert("Chiamata fallita!")
      }
    })
  })


  function generaFilm(film) {
    for (var i = 0; i < film.length; i++) {
      var filmserie = film[i]
      // serie o film
      if (typeof filmserie.name == 'undefined') {
        var copertina = filmserie.poster_path

        var context = {
          tipo:"del film",
          title:filmserie.title,
          originalTitle:filmserie.original_title,
          language:lingua(filmserie.original_language),
          vote:starVote(filmserie.vote_average),
          sitocopertina:'src="https://image.tmdb.org/t/p/',
          dimensionecopertina:"w185/",
          immaginecopertina:copertina
        }
        if (copertina === null) {
          context.sitocopertina = 'class="notfound"src ="img/notfound.jpg" alt="image not found"'
          context.dimensionecopertina = ""
        }
        console.log("sono un film");
        console.log(context);
        var html = template(context)
        $(".libreriaFilm").append(html)
      }else {
        var copertina = filmserie.poster_path
        var context = {
          tipo:"della serie",
          title:filmserie.name,
          originalTitle:filmserie.original_name,
          language:lingua(filmserie.original_language),
          vote:starVote(filmserie.vote_average),
          sitocopertina:'src="https://image.tmdb.org/t/p/',
          dimensionecopertina:"w185/",
          immaginecopertina:copertina
        }
        if (copertina === null) {
          context.sitocopertina = 'class="notfound"src ="img/notfound.jpg" alt="image not found"'
          context.dimensionecopertina = ""
        }
        console.log("sono una serie");
        console.log(context);
        var html = template(context)
        $(".libreriaSerie").append(html)
      }

    }
  }
  // bandierine
  function lingua(lingua) {
    var bandieraLingua = ["en","it","de","es","cn","pt","jp"]
    if (bandieraLingua.includes(lingua)) {
      return '<img src="img/' + lingua + '.png" alt="' + lingua + '" class="bandierina">';
      console.log("bandiera");
    }
    return lingua

  }
  // stelline
  function starVote(voto) {
    var stellinaVoto = []
    votoFilmStelle = Math.ceil(voto/2)
    for (var y = 0; y < 5; y++) {
      if (votoFilmStelle > y) {
        stellinaVoto.push("fas")
      }else {
        stellinaVoto.push("far")
      }
    }
    return stellinaVoto
  }
  // immagine non trovata
  function Imagenotfound() {

  }
})
