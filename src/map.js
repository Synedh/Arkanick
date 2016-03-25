/**
 * Class Map extends Container
 */
var Map = function ()
{};

var p = Map.prototype = new Container();

/**
 * object tiles
 * Tableau de tuiles (une seule dimension).
 */
p.tiles = [];
 
/**
 * int TileWidth
 * Largeur des tuiles (px).
 */
p.tilesWidth = 128;
 
/**
 * int TileHeight
 * Hauteur des tuiles (px).
 */
p.tilesHeight = 64;
 
/**
 * int offsetX
 * Décalage en X.
 */
p.offsetX = 0;
 
/**
 * int offsetY/**
 * void removeTile
 * @purpose : Enlève une tuile de la carte
 * tile $tile : Tuile à supprimer de la carte.
 */
p.removeTile = function ( $tile )
{
    var index = this.tiles.indexOf ( $tile );

    if ( index === -1 )
    {
            throw new Error ( 'Map.removeTile : la tuile à supprimer ne fait pas partie de la carte !' );
    }

    this.removeChild ( $tile.content );
    this.tiles.splice ( index, 1 );

    $tile.dispose();
};

/*
 * Décalage en Y.
 */
p.offsetY = 0;

/**
 * void addTile
 * @purpose : Ajoute une tuile à la carte.
 * tile $tile : Tuile à ajouter à la carte.
 * int $x : position en X de l'endroit ou ajouter la tuile (en nombre de cases).
 * int $y : position en Y de l'endroit ou ajouter la tuile (en nombre de cases).
 * int $z : position en Z de l'endroit ou ajouter la tuile (en nombre de cases).
 */
p.addTile = function ( $tile, $x, $y, $z )
{
    $tile.posX = $x;
    $tile.posY = $y;
    $tile.posZ = $z;
    $tile.map = this;

    this.tiles.push ( $tile );
    this.addChild ( $tile.content );

    this.update ();
};

/**
 * void update
 * @purpose : Met à jour l'affichage.
 */
p.update = function ()
{
    /**
     * Mise à jour des tuiles.
     */
    this.tiles.forEach ( function($tile)
    {
        $tile.content.x = ( $tile.posY - $tile.posX ) * ($tile.map.tilesWidth/2) + ($tile.offsetX + $tile.map.offsetX);
        $tile.content.y = ( $tile.posY + $tile.posX ) * ($tile.map.tilesHeight/2) + ($tile.offsetY + $tile.map.offsetY);
        $tile.content.tile = $tile;
    });

    /**
     * Tri des tuiles pour gérer les profondeurs.
     */
    this.sortChildren (function($a,$b)
    {
        $n_a = 5 * ($a.tile.posX + $a.tile.posY) + $a.tile.posZ;
        $n_b = 5 * ($b.tile.posX + $b.tile.posY) + $b.tile.posZ;

        if ( $n_a > $n_b )
        {
            return 1;
        }
        else if ( $n_a < $n_b )
        {
            return -1;
        }
        else
        {
            return 0;
        }
    });
};

/**
 * tile getTileAt
 * @purpose : Renvoie la tuile à la position indiquée.
 * $x, $y, $z : position de la tuile demandée.
 */
p.getTileAt = function ( $x, $y, $z )
{
    var r_tile = null;
    this.tiles.forEach ( function($tile)
    {
        if ( $tile.posX === $x && $tile.posY === $y && $tile.posZ === $z )
        {
            r_tile = $tile;
        }
    });

    return r_tile;
};

/**
 * void dispose
 * @purpose : Détruit la carte.
 */
p.dispose = function ()
{
        while ( this.tiles.length > 0 )
        {
                this.removeTile ( this.tiles[0] );
        }
 
        this.tiles = null;
        this.tilesWidth = null;
        this.tilesHeight = null;
        this.offsetX = null;
        this.offsetY = null;
};