import {EventManagerInterface} from "../@types/event";
import {Fn} from "../@types/context";

const enum ModalEmit {
    Open,
    Close,
    Fade,
}
const enum PopEventEmit {
    Content,
    Close,
    Open
}

class EventManager<Event> implements EventManagerInterface<Event> {
    /** @Description 事件列表 */
    list: Map<any, any>
    /** @Description 队列 */
    emitQueue: Map<any, any>
    /** @Description 监听事件 */
    constructor() {
        this.list = new Map()
        this.emitQueue = new Map()
    }

    on(event: Event, callback: Fn) {
        this.list.has(event) || this.list.set(event, []);
        this.list.get(event)?.push(callback);
        return this;
    }

    /** @Description 发送 */
    emit(event: Event, ...args:any) {
        this.list.has(event) &&
        this.list.get(event)?.forEach((callback: Fn) => {
            callback(...args);
            this.emitQueue.has(event) || this.emitQueue.set(event, []);
        });
    }
}

export {ModalEmit,PopEventEmit,EventManager}