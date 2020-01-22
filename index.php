<?php 

$string = file_get_contents("./tokens.json");
if ($string === false) {
    die("Can't load token information");
} 
$token_data = json_decode($string);
if ($token_data === null) {
    // Define the errors.
    $constants = get_defined_constants(true);
    $json_errors = array();
    foreach ($constants["json"] as $name => $value) {
        if (!strncmp($name, "JSON_ERROR_", 11)) {
            $json_errors[$value] = $name;
        }
    }
    // Show the errors for different depths.
    foreach (range(4, 3, -1) as $depth) {
        var_dump(json_decode($json, true, $depth));
        echo 'Last error: ', $json_errors[json_last_error()], PHP_EOL, PHP_EOL;
    }
}

  $blueprints = [];
    foreach ($token_data->ships as $ship){
      $blueprints[$ship->name] = $ship;

    }
?>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">


    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/017feb7bf8.js" crossorigin="anonymous"></script>

    <title>Hello, world!</title>
  </head>
<body>

 <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

    
        <div class="collapse navbar-collapse" id="navbarsExample09">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown09" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div class="dropdown-menu" aria-labelledby="dropdown09">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
          <form class="form-inline my-2 my-md-0">
            <input class="form-control" type="text" placeholder="Search" aria-label="Search">
          </form>
        </div>
  </nav>

  <div class="container">
        
     

<?php
$players = ["attack", "defense"];
foreach ($players as $player) {
?>

    <div class="row">
      <div class="col-12 fleetarea mt-2">
         <nav  id="<?php echo $player; ?>FleetNav" class="navbar navbar-expand-lg navbar-light bg-light rounded fleet-nav">
            <h2><a class="navbar-brand" href="#"><?php echo ucfirst($player); ?> Fleet</a></h2>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#<?php echo $player; ?>Fleet" aria-controls="<?php echo $player; ?>Fleet" aria-expanded="false" aria-label="Edit <?php echo $player; ?> fleet">
                Edit Fleet
            </button>
            <button class="btn-secondary btn" type="button"><i class="fa fa-user-astronaut"></i></button>
    
            <div class="collapse navbar-collapse text-left" id="<?php echo $player; ?>Fleet">
              <ul class="navbar-nav mr-auto">

                <?php
                foreach ($blueprints as $class => $ship) {
                  $max = $ship->max;

                ?>
                <li class="nav-item active fleet-select">
                  <?php echo $class; ?>s
                  <div class="btn-group btn-group-toggle" data-toggle="buttons" data-blueprint="<?php echo $player; ?><?php echo ucfirst($class); ?>">
                    <label class="btn btn-secondary active">
                      <input type="radio" name="<?php echo $player; ?><?php echo $class; ?>Qty" value="0" id="<?php echo $player; ?><?php echo $class; ?>0" checked>None
                    </label>
                   <?php 
                   for ($i = 1; $i <= $max; $i++) { ?>
                    
                    <label class="btn btn-secondary">
                      <input type="radio" name="<?php echo $player; ?><?php echo $class; ?>Qty" value="<?php echo $i; ?>" id="<?php echo $player; ?><?php echo $class; ?><?php echo $i; ?>"><?php echo $i; ?>
                    </label>

          <?php     } ?>
                  </div>
                </li>
       <?php    } ?>
                 
              </ul>
            </div>
          </nav>

          <div class="row">
            <div id="<?php echo $player; ?>Interceptor" class="ship collapse col-6">
              <img class="img-fluid" src="images/interceptor.jpg"  data-toggle="modal" data-target="#interceptorModal" />
              <div class="pipbox"></div>
                
            </div>
            <div id="<?php echo $player; ?>Cruiser" class="ship collapse col-6">
              <img class="img-fluid" src="images/cruiser.jpg" data-toggle="modal" data-target="#cruiserModal"/>
              <div class="pipbox"></div>
              
            </div>
            <div id="<?php echo $player; ?>Dreadnought" class="ship collapse col-6">
              <img class="img-fluid" src="images/dreadnought.jpg" data-toggle="modal" data-target="#dreadnoughtModal" />
              <div class="row bg-info">
                <div class="pipbox"></div>

                
              </div>
            </div>
            <div id="<?php echo $player; ?>Starbase" class="ship collapse col-6">
              <img class="img-fluid" src="images/starbase.jpg" data-toggle="modal" data-target="#starbaseModal"/>
              <div class="row bg-info">
                <div class="pipbox"></div>

                
              </div>
            </div>
          </div>

        </div>
      </div>
<?php } ?>
    </div>

<?php
foreach ($blueprints as $class => $ship) { ?>

<!-- Modal -->
<div class="containter">
<div class="modal fade" id="<?php echo $class; ?>Modal" tabindex="-1" role="dialog" aria-labelledby="<?php echo $class; ?>ModalLabel1" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="<?php echo $class; ?>ModalLabel1"><?php echo $class; ?></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img class="img-fluid" src="images/<?php echo $class; ?>.jpg"  data-toggle="modal" data-target="#<?php echo $class; ?>Modal" />
      </div>

<?php
    //sort parts by type
    $parts_sorted = array();
    $parts_byname = array();

    foreach ($token_data->parts as $part){
      $parts_sorted[$part->type][] = $part;
      $parts_byid[$part->id] = $part;

    }

    $slots = $ship->slots;
    foreach ($slots as $number=>$currentpart){ ?>

      ​<div id="<?php echo $class.$number; ?>" class="partselect dropdown">
        <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"><?php echo $parts_byid[$currentpart]->name; ?></button>
        <ul class="dropdown-menu">
<?php   foreach ($parts_sorted as $type => $parts) { ?>

          <li class="dropdown-submenu">
            <a class="test" tabindex="-1" href="#"><?php echo $type; ?> <i class="fa fa-caret-right"></i></a>
            <ul class="dropdown-menu">
<?php       foreach ($parts as $part) { ?>
              <li><a class="singlepart" tabindex="-1" href="#" data-slot="<?php echo $class.$number; ?>" data-name="<?php echo $part->name; ?>"><?php echo $part->name; ?></a></li>
<?php       } ?>
            </ul>
          </li>
<?php } ?>

        </ul>
      </div>
<?php } ?>

    
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary">Clear</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
</div>

<?php } ?>

  <nav class="navbar navbar-expand-lg navbar-light bg-light rounded fixed-bottom">
    <div class="container">      
          <button class="btn-secondary btn" type="button">Clear Ships
          </button>
          <button class="btn-primary btn" type="button" disabled>Run Battle!
          </button>
    </div>
      </nav>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script src="./battle.js"></script>
    

  </body>
</html>