/**
 * Class Player extends Tile
 */
var Player = function ( $type, $content, $walkable, $offsetX, $offsetY )
{
    this.construct ( $type, $content, $walkable, $offsetX, $offsetY );
};

var p = Player.prototype = new Tile ();

/**
 * void move
 * @purpose : Déplace le joueur
 * $x, $y : déplacement à effectuer en x et en y.
 */
p.move = function ( $x, $y )
{
    /**
     * On teste si le déplacement est possible.
     */
    if ( this.map.getTileAt( this.posX + $x, this.posY + $y, 0 ).walkable )
    {
        /**
         * Le déplacement est possible, donc on l'éffectue.
         */
        this.posX += $x;
        this.posY += $y;

        /**
         * Enfin, on met à jour la carte.
         */
        this.map.update ();
    }
};