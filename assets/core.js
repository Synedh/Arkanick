var gameview = document.getElementById('gameview'), stage;
stage = new Stage(gameview);

Ticker.setFPS(24);
Ticker.addListener(stage);

var myMap = new Map ();
myMap.offsetX = 400;
myMap.offsetY = 200;
stage.addChild ( myMap );

var map = [ [1, 1, 2, 1, 1],
            [1, 1, 2, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 2, 0, 2, 1],
            [1, 1, 1, 1, 1]];
 


for ( var i = 0; i < 5; i++ )
{
        for ( var j = 0; j < 5; j++ )
        {
                if ( map[i][j] === 1 )
                {
                        myMap.addTile ( new Tile ( TileType.DRAW, gfx.solTAlea(0,150,0), true ), i, j, 0 );
                }
                else if (map[i][j] === 2 )
                {
                        myMap.addTile ( new Tile ( TileType.DRAW, gfx.murTAlea(72,61,4), false ), i, j, 0 );
                }
        }
}
 
var player = new Player ( TileType.DRAW, gfx.mur ( 255, 0, 0 ), true );
myMap.addTile ( player, 1, 1, 1 );
 
document.addEventListener ( 'keydown', onKeyDown );
function onKeyDown ($e)
{
        switch ( $e.keyCode )
        {
                case 37: //Gauche
                        player.move ( 0, -1 );
                        break;
                case 38: //Haut
                        player.move ( -1, 0 );
                        break;
                case 39: //Droite
                        player.move ( 0, 1 );
                        break;
                case 40: //Bas
                        player.move ( 1, 0 );
                        break;
                default:
                        break;
        }
}