var token_data; 
var ship_parts;
 $(document).ready(function(){


  $.getJSON( "tokens.json", function( data ) {
		token_data = data;

    //populate parts
    ship_parts = token_data.parts;
 //   populate default ships
    let fleets = [attackShips, defenseShips];
    fleets.forEach(prepareDefaults);
    function prepareDefaults(fleet){
      for (let [className, ship] of Object.entries(fleet)){
        shipDefaults = token_data.ships[className];
        ship.slots = shipDefaults.slots;
        ship.baseInitiative = shipDefaults.initiative;
        ship.updateStats();
      }
    }


	});

  	$('.fleet-select input').change(function(){
        let shipClass = $(this).parent().parent().data('blueprint');
        let player = $(this).parent().parent().data('player');

        var blueprintImg = $('#' + player + shipClass);
        var qty = $(this).val();
        if (qty >= 1){
          blueprintImg.show();
        } else {
          blueprintImg.hide();
        }
        blueprintImg.children('.pipbox').html(qty);


    });

    $('.blueprintmodal').on('show.bs.modal', function(event){
      var fleet;
      var button = $(event.relatedTarget); //ship thumbnail that triggered the modal
      var player = button.data('player');
      if (player == 'attack'){
        fleet = attackShips;
      } else {
        fleet = defenseShips;
      }
      var ship = fleet[$(this).data('blueprint')];
      console.log(ship);

    });

  $('.dropdown-submenu a.test').on("click", function(e){
            $(this).next('ul').toggle();
            e.stopPropagation();
            e.preventDefault();
          });

         //a new ship part is selected
         $('.partselect .singlepart' ).on("click", function(e){
            var slot = $(this).data('slot');
            var part = ship_parts[$(this).data('id')];
            $('#' + slot + ' button').html(part.name);
  });

});  



class Blueprint {
  constructor(className, classDefaults) {
    this.name = className;
    this.hull = 0;
    this.missile = 0;
    this.baseInitiative = 0;
    this.initiative = this.baseInitiative;
    this.missile = 0;
    this.cannons = {};
    this.computer = 0;
    this.shield = 0;
  }

  getParts(type) {
    let current_hulls = this.slots.filter(function(part) {
      if (part !== null) return part.includes(type);
    });

    if (current_hulls !== null) {
      return current_hulls
    } else {
      return 0;
    }
  }

  calcBasic(type) {
    let current_parts = this.getParts(type);
    let partsValue = 0;
    let i = 0;
    while ( i < current_parts.length){
       let part = ship_parts[current_parts[i]]
       partsValue += part.value;
       i++;
    }
    return partsValue
  }

  calcHull() {
    return this.calcBasic('hull');
  }

  calcInitiative() {
    let drives = this.getParts('drive');
    let initiativeValue = this.baseInitiative;
    let i = 0;
    while ( i < drives.length){
       let part = ship_parts[drives[i]]
       initiativeValue += part.initiative;
       i++;
    }
    return initiativeValue;
  }

  calcCannons(){
    let cannons = this.getParts('cannon');
    let cannonValues = [];
    let i = 0;
    while ( i < cannons.length){
       let part = ship_parts[cannons[i]];
       cannonValues.push(part.value);
       i++;
    }
    return cannonValues;
  }

  calcComputer() {
    return this.calcBasic('comp');
  }

  calcShield() {
    return -1 * this.calcBasic('shield');
  }

  updateStats() {
    this.hull = this.calcHull();
    this.initiative = this.calcInitiative();
    this.cannons = this.calcCannons();
    this.computer = this.calcComputer();
    this.shield = this.calcShield();
  }

}



let attackShips = { "interceptor": new Blueprint('interceptor'), "cruiser" : new Blueprint('cruiser'), "dreadnought" : new Blueprint('dreadnought')};
let defenseShips = { "interceptor": new Blueprint('interceptor'), "cruiser" : new Blueprint('cruiser'), "dreadnought" : new Blueprint('dreadnought'), "starbase" : new Blueprint('starbase')};

