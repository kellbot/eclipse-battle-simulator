class Blueprint {
	constructor(className, classDefaults) {
		this.name = className;
	}

	get hullStrength() {
		return this.calcHull();
	}

	hullStrength() {
		return 1;
	}

}
// function createNewBlueprint(shipClass) {
// 	const obj = {};
// 	obj.class = shipClass;
// 	obj.hullStrength = function() {
// 		return 0;
// 	}
// 	obj.hp = 1 + obj.hullStrength();

// 	return obj;
// }



let attackShips = [new Blueprint('interceptor'),new Blueprint('cruiser'),new Blueprint('dreadnought')];
// let defenseShips = [createNewBlueprint('interceptor'),createNewBlueprint('cruiser'),createNewBlueprint('dreadnought'),createNewBlueprint('starbase')];


 $(document).ready(function(){
	$.getJSON( "tokens.json", function( data ) {
		var token_data = data;
	});

  	$('.fleet-select input').change(function(){
        var blueprint = $('#' + $(this).parent().parent().data('blueprint'));
            var qty = $(this).val();
            if (qty >= 1){
              blueprint.show();
            } else {
              blueprint.hide();
            }
            blueprint.children('.pipbox').html(qty);
        });

         $('.dropdown-submenu a.test').on("click", function(e){
            $(this).next('ul').toggle();
            e.stopPropagation();
            e.preventDefault();
          });

         $('.partselect .singlepart' ).on("click", function(e){
            var slot = $(this).data('slot');
            $('#' + slot + ' button').html($(this).data('name'));
         });
		});  