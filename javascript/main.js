$(document).ready(function(){

  // // var Handlebars--------------------------------

  var source = $("#templateFilm").html();
  var template = Handlebars.compile(source);

// --------------------------------------------

  $("#boton").click(function () {
    $(".libreriaFilm").html("")
    $(".libreriaSerie").html("")
    var urlFilm = "https://api.themoviedb.org/3/search/movie"
    var urlTelefilm = "https://api.themoviedb.org/3/search/tv"
    var apiKey = "a85d7660d72355c1cdf03fd5b8318e9f"
    var film_serieCercato = $("#cerca").val()
    console.log(film_serieCercato);
    chiamataAjax(urlFilm,apiKey,film_serieCercato,"film",".libreriaFilm")
    chiamataAjax(urlTelefilm,apiKey,film_serieCercato,"serie",".libreriaSerie")
  })



  // chiamata ajax -------------------------------------

  function chiamataAjax(url,apiKey,query,tipo,dove) {
    $.ajax({
      url:url,
      method:"GET",
      data:{
        api_key:apiKey,
        query: query,
        language:"it-IT"
      },
      success: function (data,stato) {
        console.log(data);
        var listaFilmSerie = data.results
        console.log(listaFilmSerie);
        generaFilm(listaFilmSerie)
        if (data.total_results==0) {
          $(dove).append("non ci sono " + tipo + " con questo nome")
        };
        $(".info").hide()
        $(".copertina").mouseenter(function () {
          $(this).hide()
          $(this).next().show()
        })
        $(".info").mouseleave(function () {
          $(this).hide()
          $(this).prev().show()
        })

      },
      error:function (richiesta,stato,errore) {
        alert("Chiamata fallita!")
      }
    })
  }

// genera film ----------------------------------------------

  function generaFilm(film) {
    for (var i = 0; i < film.length; i++) {
      var filmserie = film[i]
      // serie o film
      if (typeof filmserie.name == 'undefined') {
        compilazioneTemplate(filmserie,"Film",filmserie.title,filmserie.original_title,".libreriaFilm")
      }else {
        compilazioneTemplate(filmserie,"Serie",filmserie.name,filmserie.original_name,".libreriaSerie")
      }

    }
  }

  // compilazione template------------------------------------

  function compilazioneTemplate(richiesta,tipo,titolo,titoloOriginale,dove) {
    var copertina = richiesta.poster_path
    var context = {
      tipo:tipo,
      title:titolo,
      originalTitle:titoloOriginale,
      language:lingua(richiesta.original_language),
      vote:starVote(richiesta.vote_average),
      sitocopertina:'https://image.tmdb.org/t/p/',
      dimensionecopertina:"w342/",
      immaginecopertina:copertina,
      overview:richiesta.overview
    }
    if (copertina === null) {
      context.sitocopertina = 'img/notfound.jpg" alt="image not found"'
      context.dimensionecopertina = ""
    }
    var html = template(context)
    $(dove).append(html)
    }

  // bandierine ------------------------------------------


  function lingua(lingua) {
    var bandieraLingua = ["en","it","de","es","cn","pt","jp"]
    if (bandieraLingua.includes(lingua)) {
      return '<img src="img/' + lingua + '.png" alt="' + lingua + '" class="bandierina">';
    }
    return lingua
  }


  // stelline -----------------------------------------


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


})
