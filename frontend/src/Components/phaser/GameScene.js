import Phaser from "phaser";
import ScoreLabel from "./ScoreLabel.js";
import LadyBugSpawner from "./LadyBugSpawner.js";

const DUDE_KEY = "dude";
const LADYBUG_KEY = "bomb";

const PATH_ASSETS = "../assets/";
const PATH_ENEMIES = PATH_ASSETS + "enemies/";
const PATH_MAPS = PATH_ASSETS + "maps/";
const PATH_PLAYERS = PATH_ASSETS + "players/";
const PATH_TILESHEETS = PATH_ASSETS + "tilesheets/";

class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
    this.player = undefined;
    this.cursors = undefined;
    this.scoreLabel = undefined;
    this.stars = undefined;
    this.ladyBugSpawner = undefined;
    this.gameOver = false;
  }

  preload() {
    // Maps
    this.load.image("tiles", PATH_TILESHEETS + "winter.png");
    this.load.tilemapTiledJSON("map", PATH_MAPS + "mapTest.json");

    // Enemies
    //this.load.image(LADYBUG_KEY, PATH_ENEMIES + "ladyBug.png");

    // Players
    this.load.spritesheet(DUDE_KEY, PATH_PLAYERS + "dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    // Images of Maps
    this.tilemap = this.make.tilemap({key: "map"});
    this.tileset = this.tilemap.addTilesetImage("Winter","tiles");

    // Set all levels of the map
    this.downLayer = this.tilemap.createStaticLayer("land",this.tileset,0,0);
    this.worldLayer = this.tilemap.createStaticLayer("world",this.tileset,0,0);
    this.topLayer = this.tilemap.createStaticLayer("cityRoad",this.tileset,0,0);
    this.topLayer = this.tilemap.createStaticLayer("City",this.tileset,0,0);
    this.topLayer = this.tilemap.createStaticLayer("CityBuild1",this.tileset,0,0);
    this.topLayer = this.tilemap.createStaticLayer("CityBuild2",this.tileset,0,0);
    this.topLayer = this.tilemap.createStaticLayer("CityBuild3",this.tileset,0,0);
    this.topLayer = this.tilemap.createStaticLayer("CityBuild4",this.tileset,0,0);
    this.topLayer = this.tilemap.createStaticLayer("CityBuild5",this.tileset,0,0);
    this.topLayer = this.tilemap.createStaticLayer("Citybuild6",this.tileset,0,0);
    //this.overlapLayer = this.tilemap.createDynamicLayer("overlap",this.tileset,0,0); // pour claques avec objets récoltable ou pique qui font mal


    //this.add.image(400, 300, "sky");
    //const platforms = this.createPlatforms();
    this.player = this.createPlayer();
    //this.stars = this.createStars();
    this.scoreLabel = this.createScoreLabel(16, 16, 0);
    this.ladyBugSpawner = new LadyBugSpawner(this, LADYBUG_KEY);
    const ladyBugsGroup = this.ladyBugSpawner.group;
    //this.physics.add.collider(this.stars, platforms);
    //this.physics.add.collider(this.player, platforms);
    //this.physics.add.collider(ladyBugsGroup, platforms);
    /*this.physics.add.collider(
      this.player,
      ladyBugsGroup,
      this.hitBomb,
      null,
      this
    );*/
    /*this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );*/
    this.cursors = this.input.keyboard.createCursorKeys();

    /*The Collider takes two objects and tests for collision and performs separation against them.
    Note that we could call a callback in case of collision...*/
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  createPlatforms() {
    /*const platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody();

    platforms.create(600, 400, GROUND_KEY);
    platforms.create(50, 250, GROUND_KEY);
    platforms.create(750, 220, GROUND_KEY);
    return platforms;*/
  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 450, DUDE_KEY);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    /* The 'left' animation uses frames 0, 1, 2 and 3 and runs at 10 frames per second. 
    The 'repeat -1' value tells the animation to loop.
    */
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: DUDE_KEY, frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    return player;
  }

  createStars() {
    /*const stars = this.physics.add.group({
      key: STAR_KEY,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    return stars;*/
  }

  collectStar(player, star) {
    /*star.disableBody(true, true);
    this.scoreLabel.add(10);
    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });
    }

    this.bombSpawner.spawn(player.x);*/
  }

  createScoreLabel(x, y, score) {
    /*const style = { fontSize: "32px", fill: "#000" };
    const label = new ScoreLabel(this, x, y, score, style);
    console.log("score:", label);
    this.add.existing(label);

    return label;*/
  }

  hitBomb(player, bomb) {/*
    this.scoreLabel.setText("GAME OVER : ( \nYour Score = " + this.scoreLabel.score);
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    this.gameOver = true;*/
  }
}

export default GameScene;
