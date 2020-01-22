var token_data; 
 $(document).ready(function(){


  $.getJSON( "tokens.json", function( data ) {
		token_data = data;

 //   populate default ships
    for (let [key, value] of Object.entries(attackShips)){
     value.slots = token_data.ships[key].slots;
      console.log(value);
    }

	});

  	$('.fleet-select input').change(function(){
        let shipClass = $(this).parent().parent().data('blueprint');
        let player = $(this).parent().parent().data('player');
        //calculate the ship's values
        var ship = attackShips[shipClass];
        console.log(ship.slots);

        var blueprintImg = $('#' + player + shipClass);
            var qty = $(this).val();
            if (qty >= 1){
              blueprintImg.show();
            } else {
              blueprintImg.hide();
            }
            blueprintImg.children('.pipbox').html(qty);
    });

  $('.dropdown-submenu a.test').on("click", function(e){
            $(this).next('ul').toggle();
            e.stopPropagation();
            e.preventDefault();
          });

         //a new ship part is selected
         $('.partselect .singlepart' ).on("click", function(e){
            var slot = $(this).data('slot');
            var part = token_data.parts[$(this).data('id')];
            console.log(part);
            $('#' + slot + ' button').html(part.name);
  });

});  



class Blueprint {
  constructor(className, classDefaults) {
    this.name = className;
    this.hull = 5;
  }

  get hullStrength() {
    return this.calcHull();
  }

  calcHull() {
    return this.hull;
  }

  setParts(slots){
    this.slots = slots;
  }

}



let attackShips = { "interceptor": new Blueprint('interceptor'), "cruiser" : new Blueprint('cruiser'), "dreadnought" : new Blueprint('dreadnought')};
let defenseShips = { "interceptor": new Blueprint('interceptor'), "cruiser" : new Blueprint('cruiser'), "dreadnought" : new Blueprint('starbase')};

