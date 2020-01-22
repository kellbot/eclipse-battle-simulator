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
        ship.slots = Object.create(shipDefaults.slots);
        ship.baseInitiative = shipDefaults.initiative;
        ship.updateStats();
      }
    }


	});

 	$('.fleet-select input').change(function(){
    let blueprint = $(this).parent().parent().data('blueprint');
    let player = $(this).parent().parent().data('player');

    var blueprintImg = $('#' + player + blueprint);
    var qty = $(this).val();
    if (qty >= 1){
      blueprintImg.show();
    } else {
      blueprintImg.hide();
    }
    
    if (player == 'attack'){
      current_fleet = attackShips;
    } else {
      current_fleet = defenseShips;
    }
    update_pipbox(blueprintImg.children('.pipbox'), current_fleet[blueprint] );


  });

  $('.blueprintmodal').on('shown.bs.modal', function(event){
    var current_fleet;
    var button = $(event.relatedTarget); //ship thumbnail that triggered the modal
    var player = button.data('player');

    $(this).data('player', player);
    
    
    if (player == 'attack'){
      current_fleet = attackShips;
    } else {
      current_fleet = defenseShips;
    }
   //update modal to match current player's ship
    var blueprint = $(this).data('blueprint');
    var ship = current_fleet[blueprint];

    let i = 0;
    while ( i < ship.slots.length){
      let part = ship_parts[ship.slots[i]];
      if (part != null) $('#' + blueprint + i + ' button').html(part.name);
      i++;
    }


  });


  $('.dropdown-submenu a.test').on("click", function(e){
            $(this).next('ul').toggle();
            e.stopPropagation();
            e.preventDefault();
  });

  //a new ship part is selected
  $('.partselect .singlepart' ).on("click", function(e){

    var id = $(this).parents('.blueprintmodal').attr('id');

    var active_blueprint = $(this).parents('.blueprintmodal').data('blueprint');
    var player = $('#' + id).data('player');
    

    var active_slot_index = $(this).data('slotindex');
    var current_fleet = null;
    if (player == 'attack'){
       current_fleet = attackShips;
    } else {
       current_fleet = defenseShips;
    }

    let part = ship_parts[$(this).data('id')];

    let ship = current_fleet[active_blueprint];
    ship.setPart(active_slot_index, part.id);
    ship.updateStats();
    $('#' + active_blueprint + active_slot_index + ' button').html(part.name);
    $('#' + active_blueprint + 'Modal .slot'+active_slot_index).html('<img class="img-fluid" src="./images/parts/' + part.id + '.png">');

    update_pipbox($('#'+player+active_blueprint + ' .pipbox'), ship);
    
  });

 

});  

function update_pipbox(pipbox, ship){
    pipbox.html('');
    $.each(ship.cannons, function(index, value){
      pipbox.append('<div class="pip die'+ value + '">.</div>');
    });

    if (ship.computer > 0) {
      pipbox.append('<div class="pip dmgup">+'+ ship.computer + '</div>');
    }
    if (ship.shield < 0) {
      pipbox.append('<div class="pip defup">'+ship.shield+'</div>');
    }
    pipbox.append('<div class="pip initiative"><i class="fas fa-angle-up"></i>'+ ship.initiative + '</div>');
    if (ship.hull > 0) {
      pipbox.append('<div class="pip hull">+'+ ship.hull + '</div>');
    }
    if (ship.missile > 0) {
      pipbox.append('<div class="pip missile"><i class="fas fa-rocket"></i><i class="fas fa-rocket"></i></div>');
    }

  }

class Blueprint {
  constructor(className, player) {
    this.player = player;
    this.slots = {};
    this.hull = 0;
    this.missile = 0;
    this.baseInitiative = 0;
    this.initiative = this.baseInitiative;
    this.missile = 0;
    this.cannons = {};
    this.computer = 0;
    this.shield = 0;
  }

  setPart(slot_index, part_id){
    this.slots[slot_index] = part_id;
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
    let initParts = this.getParts('drive');
    initParts = initParts.concat(this.getParts('comp'));
    let initiativeValue = this.baseInitiative;
    let i = 0;
    while ( i < initParts.length){
       let part = ship_parts[initParts[i]]
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

  calcMissile(){
    return this.calcBasic('missile');
  }

  updateStats() {
    this.hull = this.calcHull();
    this.initiative = this.calcInitiative();
    this.cannons = this.calcCannons();
    this.computer = this.calcComputer();
    this.shield = this.calcShield();
    this.missile = this.calcMissile();
  }

}



let attackShips = { "interceptor": new Blueprint('interceptor', 'blue'), "cruiser" : new Blueprint('cruiser','blue'), "dreadnought" : new Blueprint('dreadnought','blue')};
let defenseShips = { "interceptor": new Blueprint('interceptor', 'green'), "cruiser" : new Blueprint('cruiser','green'), "dreadnought" : new Blueprint('dreadnought','green'), "starbase" : new Blueprint('starbase','green')};

