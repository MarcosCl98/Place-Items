class Room extends Phaser.GameObjects.Sprite{

    constructor (scene, x, y, texture, couple)
      {
        super(scene, x, y, texture);
        this.scene = scene;
        this.initialx = this.x;
        this.initialy = this.y;
        this.isVisible = true;
        this.couple = couple;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setInteractive();
      }
      getCouple(){
        return this.couple;
      }

      getIsVisible(){
        return this.isVisible;
      }
      setIsVisible(param){
          this.isVisible = false;
      }
      
      restart(){
        this.x=this.initialx;
        this.y=this.initialy;
      }

    
}