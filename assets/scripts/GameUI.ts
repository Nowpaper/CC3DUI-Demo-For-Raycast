
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('GameUI')
export class GameUI extends Component {
    
    @property(Node)
    panel:Node = null;

    onClickShowPanel(){
        this.panel.active = true;
    }
    onClickHidePanel(){
        this.panel.active = false;
    }
}