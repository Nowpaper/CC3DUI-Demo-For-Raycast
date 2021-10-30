
import { _decorator, Component, Node, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('DButton')
export class DButton extends Component {
    @property([EventHandler])
    clickEvents:EventHandler[] = [];
    onClick(){
        EventHandler.emitEvents(this.clickEvents);
    }
}
