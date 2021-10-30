
import { _decorator, Component, Node, Camera, Canvas, EventMouse, geometry, Color, PhysicsSystem, MeshRenderer } from 'cc';
import { DButton } from './3DButton';
import { MoveCameraOnButtonClick } from './MoveCameraOnButtonClick';

const { ccclass, property } = _decorator;


@ccclass('UIButtonCheck')
export class UIButtonCheck extends Component {

    @property(Camera)
    camera: Camera = null;
    @property(Canvas)
    canvas: Canvas = null;
    private _cur_button:Node = null;
    private _color1:Color = Color.BLACK;
    private _color2:Color = new Color(5,29,127);

    start() {
        this.canvas.node.on(Node.EventType.MOUSE_MOVE, this.checkButton, this);
        this.canvas.node.on(Node.EventType.MOUSE_UP, this.onMouseUp, this);
    }
    private checkButton(event: EventMouse) {
        const outRay = new geometry.Ray();
        this.camera.screenPointToRay(event.getLocationX(),event.getLocationY(),outRay);
        if(PhysicsSystem.instance.raycast(outRay)){
            const button = PhysicsSystem.instance.raycastResults.find(
                (v)=>{return v.collider.getComponent(DButton)}
            );            
            if(button){
                if(button.collider.node == this._cur_button) return;
                if(this._cur_button){
                    this.setButtonColor(this._cur_button,this._color1);
                }
                this._cur_button = button.collider.node;
                this.setButtonColor(this._cur_button,this._color2);
            }else if(this._cur_button){
                this.setButtonColor(this._cur_button,this._color1);
                this._cur_button = null;
            }
        }else if(this._cur_button){
            this.setButtonColor(this._cur_button,this._color1);
            this._cur_button = null;
        }        
    }
    private onMouseUp(event: EventMouse) {
        if(this._cur_button){
            this._cur_button.getComponent(DButton).onClick();
        }
    }
    private setButtonColor(node:Node,color:Color){
        node.getComponent(MeshRenderer).getMaterial(0).setProperty("emissive",color);
    }
}
