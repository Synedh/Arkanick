/**
 * Class Player extends Tile
 */
var Player = function ( $type, $content, $walkable, $offsetX, $offsetY )
{
    this.construct ( $type, $content, $walkable, $offsetX, $offsetY );
    myMap.playerList.push(this);
    Ticker.addListener ( this, true );
};

var p = Player.prototype = new Tile ();

/**
 * Array waintingList
 * Liste d'attente pour les déplacements
 */
p.waitingList = [];

/**
 * int decalX, int decalY : décalage (en pixels) entre la position réelle et la position actuelle.
 */
p.decalX = 0;
p.decalY = 0;

/**
 * bool needUpdate.
 * Indique la nécessité de mettre à jour les profondeurs.
 */
p.needUpdate = false;

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
    if ( this.map.getTileAt( this.posX + $x, this.posY + $y, 0 ) && this.map.getTileAt( this.posX + $x, this.posY + $y, 0 ).walkable )
    {
        /**
         * Le déplacement est possible, donc on l'effectue.
         */
        this.posX += $x;
        this.posY += $y;

        /**
         * Enfin, on met à jour la carte.
         */
        this.map.update ();
    }
};

/**
 * void smoothMove
 * @purpose : Déplace le joueur
 * $x, $y : déplacement à effectuer en x et en y.
 */
p.smoothMove = function ( $x, $y )
{
    myMap.player.waitingList.push ( [ $x, $y ] );
};

/**
 * Execution à chaque image.
 */
p.tick = function ( $e )
{
    if (this.content.id == myMap.player.content.id) {
        if (this.decalX !== 0 || this.decalY !== 0) {
            if (this.decalX > 0) {
                this.decalX -= 8;
                this.content.x += 8;
            }
            else if (this.decalX < 0) {
                this.decalX += 8;
                this.content.x -= 8;
            }

            if (this.decalY > 0) {
                this.decalY -= 4;
                this.content.y += 4;
            }
            else if (this.decalY < 0) {
                this.decalY += 4;
                this.content.y -= 4;
            }
        }
        else if (this.needUpdate) {
            this.map.updateDepth();
            this.needUpdate = false;
        }
        else if (this.waitingList.length !== 0) {
            var position = this.waitingList.shift();

            if (this.posX - position[0] > 0 || this.posY - position[1] > 0) {
                this.needUpdate = true;
            }

            this.posX = position[0];
            this.posY = position[1];

            if (!this.needUpdate) {
                this.map.updateDepth();
            }

            var toTile = this.map.getTileAt(this.posX, this.posY, 0);

            this.decalX = toTile.content.x - this.content.x;
            this.decalY = toTile.content.y - this.content.y;
        }
    }
};