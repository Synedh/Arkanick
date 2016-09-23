/**
 * Initialisation
 */

var gameview = document.getElementById('gameview'), stage;
stage = new Stage(gameview);

Ticker.setFPS(24);
Ticker.addListener(stage);

var text = null;

/**
 * Bouton play
 */
var play = gfx.play();
play.x = 340;
play.y = 268;

/**
 * Function onKeyDown
 * @purpose : Listen keys
 */
function onKeyDown ($e)
{
    switch ( $e.keyCode )
    {
        case 37: //Gauche
        case 81: // Q
            myMap.player.move ( 0, -1 );
            break;
        case 38: //Haut
        case 90: // Z
            myMap.player.move ( -1, 0 );
            break;
        case 39: //Droite
        case 68: // D
            myMap.player.move ( 0, 1 );
            break;
        case 40: // Bas
        case 83: // S
            myMap.player.move ( 1, 0 );
            break;
        case 27: // Escape
            menu( "Restart !" );
            break;
        default:
            break;
    }
}

function menu ( $text )
{
    /**
     * On supprime le jeu si besoin.
     */
    if ( $text !== "" )
    {
        /**
         * Il y a un texte à afficher (gagné ou perdu), donc un jeu a supprimer.
         */
        stage.removeChild ( myMap );                                                           
        myMap.dispose ();
        document.removeEventListener ( 'keyup', onKeyDown );

        /**
         * On affiche le texte.
         */
        text = new Text($text, "30px Arial Black", "#ffff00");
        text.textAlign = "center";
        text.textBaseline = "top";
        text.x = 408;
        text.y = 228;
        stage.addChild ( text );
    }

    /**
     * On affiche le menu.
     */
    stage.addChild ( play );
}

play.onClick = function ( $e )
{
    /**
     * On supprime le menu
     */    
    if ( text )
    {
        stage.removeChild ( text );
        text = null;
    }
    stage.removeChild ( play );

    /**
     * On lance le jeu.
     */
    myMap = new Map ();
    myMap.offsetX = 400;
    myMap.offsetY = 200;
    stage.addChild ( myMap );

    p1 = new Player ( TileType.DRAW, gfx.mur ( 255, 0, 0 ), false );
    myMap.addTile ( p1, 0, 1, 1 );
    p2 = new Player ( TileType.DRAW, gfx.mur ( 0, 0, 255 ), false );
    myMap.addTile ( p2, 0, 0, 1 );
    p3 = new Player ( TileType.DRAW, gfx.mur ( 0, 255, 0 ), false );
    myMap.addTile ( p3, 1, 0, 1 );
    myMap.player = p1;
    map = map2;

    for ( var i = 0; i < map[0].length; i++ )
    {
        for ( var j = 0; j < map.length; j++ )
        {
            if ( map[j][i] === 1 )
            {
                myMap.addTile ( new Tile ( TileType.DRAW, gfx.sol(120,120,120), true ), i, j, 0 );
            }
            else if (map[j][i] === 2 )
            {
                myMap.addTile ( new Tile ( TileType.DRAW, gfx.mur(80,80,80), false ), i, j, 1 );
            }
        }
    }

    document.addEventListener ('keyup', onKeyDown);
}

menu ( "" );