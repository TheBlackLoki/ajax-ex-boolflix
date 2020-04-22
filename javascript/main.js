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


  function lingua(lingua) {
    var bandieraLingua = ["en","it","de","es","cn","pt","jp"]
    if (bandieraLingua.includes(lingua)) {
      return '<img src="img/' + lingua + '.png" alt="' + lingua + '" class="bandierina">';
      console.log("bandiera");
    }else {
      return lingua
      console.log("no bandiera");
    }
    console.log("ma che cazzo");
  }

  function generaFilm(a) {
    for (var i = 0; i < a.length; i++) {
      var filmserie = a[i]
      // stelline
      var stellinaVoto = []
      votoFilmStelle = Math.floor(filmserie.vote_average/2)
      for (var y = 0; y < 5; y++) {
        if (votoFilmStelle > y) {
          stellinaVoto.push("fas")
        }else {
          stellinaVoto.push("far")
        }
      }
      // bandierine

      // serie o film
      console.log(filmserie.name);
      if (typeof filmserie.name == 'undefined') {
        $(".libreriaFilm").append(html)
        var context = {
          tipo:"del film",
          title:filmserie.title,
          originalTitle:filmserie.original_title,
          language:lingua(filmserie.original_language),
          vote:stellinaVoto
        }
        var html = template(context)
      }else {
        $(".libreriaSerie").append(html)
        var context = {
          tipo:"della serie",
          nomeserie:filmserie.name,
          originalTitle:filmserie.original_name,
          language:lingua(filmserie.original_language),
          vote:stellinaVoto
        }
        var html = template(context)
      }

    }
  }
})
