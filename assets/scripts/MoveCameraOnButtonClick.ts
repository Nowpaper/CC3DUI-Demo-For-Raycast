
import { _decorator, Component, Node, Camera, Vec3, v3, tween } from 'cc';
import { DButton } from './3DButton';
const { ccclass, property } = _decorator; 
@ccclass('MoveCameraOnButtonClick')
export class MoveCameraOnButtonClick extends DButton {
   @property(Camera)
   camera:Camera = null;
   @property
   target:Vec3 = v3();

   onClick(){
       tween(this.camera.node).to(1,{position:this.target},{easing:"sineOut"}).start();
   }
}
