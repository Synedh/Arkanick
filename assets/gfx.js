var gfx = {};
 
/**
 * Function mur
 * @purpose : Génère un sol.
 */
gfx.sol = function ( $r, $g, $b )
{
    if ( (!$r && $r !== 0) || (!$g && $g !== 0) || (!$b && $b !== 0) )
    {
        $color = "#CCCCCC";
    }
    else
    {
        $color = Graphics.getRGB ( $r, $g, $b );
    }
 
    // On crée une instance de la classe Shape.
    this.gfx = new Shape();
    this.gfx.name = $color;

    // On accéde a la propriété grapgics
    this.gfx.graphics
    				 .beginFill($color)
                     .moveTo(64,0)
                     .lineTo(0,-32)
                     .lineTo(-64,0)
                     .lineTo(0,32)
                     .lineTo(64,0)
                     .closePath();
    return this.gfx;
};

/**
 * Function solTAlea
 * @purpose : Génère un sol avec une variation de teinte aléatoire.
 */
gfx.solTAlea = function ( $r, $g, $b )
{
        var r = $r - Math.round(Math.random()*20), g = $g - Math.round(Math.random()*20), b = $b - Math.round(Math.random()*20);
 
        return this.sol ( r, g, b );
};

/**
 * Function mur
 * @purpose : Génère un mur.
 * $color : couleur du mur.
 */
gfx.mur = function ( $r, $g, $b )
{
	if ( (!$r && $r !== 0) || (!$g && $g !== 0) || (!$b && $b !== 0) ) { $r = $g = $b = 200; }
        this.gfx = new Shape();
 
        /**
         * On définit les couleurs des côtés (plus sombres).
         */
        $color = Graphics.getRGB ( $r, $g, $b );
 
        /**
         * Création des deux autr couleurs.
         */
        $color_g = Graphics.getRGB ( Math.round(0.8 * $r), Math.round(0.8 * $g), Math.round(0.8 * $b) );
        $color_d = Graphics.getRGB ( Math.round(0.6 * $r), Math.round(0.6 * $g), Math.round(0.6 * $b) );
 
        /**
         * Face droite.
         */
	this.gfx.graphics.beginFill($color_d);
        this.gfx.graphics.moveTo(0,-18).lineTo(0,32).lineTo(64,0).lineTo(64,-50).lineTo(0,-18);
 
        /**
         * Face supérieure.
         */
        this.gfx.graphics.beginFill($color);
        this.gfx.graphics.moveTo(64,-50).lineTo(0,-82).lineTo(-64,-50).lineTo(0,-18).lineTo(64,-50);
 
        /**
         * Face gauche.
         */
        this.gfx.graphics.beginFill($color_g);
        this.gfx.graphics.moveTo(-64,-50).lineTo(-64,0).lineTo(0,32).lineTo(0,-18).lineTo(-64,-50).beginFill();
        this.gfx.graphics.closePath();
 
	return this.gfx;
};

/**
 * Function murTAlea
 * @purpose : Génère un mur avec une variation de teinte aléatoire.
 */
gfx.murTAlea = function ( $r, $g, $b )
{
        var r = $r - Math.round(Math.random()*20), g = $g - Math.round(Math.random()*20), b = $b - Math.round(Math.random()*20);
 
        return this.mur ( r, g, b );
};

/**
 * Function play
 * @purpose : Génère un bouton play
 */

gfx.play = function()
{
    this.text = new Text("Lancer", "30px Arial", "#ffff00");
    this.text.textAlign = "center";
    this.text.textBaseline = "top";
    this.text.lineHeight = 34;
    this.text.lineWidth = 134;
    this.text.setTransform(71,0.8);
    this.text.shadow = new Shadow("#ff0000",0,0,10);
 
    this.gfx = new Shape();
    this.gfx.graphics.lf(["#ff6600","#ffff00"],[0,1],-11.6,-35.2,-11.6,28.7)
            .p("AKNi2QqciHp2CHQiBC0CBCzQJTCVK/iVQB1ikh1jD").f()
            .s("#ff6600").ss(2.5,1,1,3)
            .p("AKNi2QB1DDh1CkQq/CVpTiVQiBizCBi0QJ2iHKcCH").cp();
    this.gfx.setTransform(71.1,25.1);
 
    this.container = new Container ();
    this.container.addChild ( this.gfx, this.text );
 
    return this.container;
};