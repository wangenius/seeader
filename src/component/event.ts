/** @Description modal事件发射器通道 */
enum ModalEmit {
    Open,
    Close,
    Fade,
}

/** @Description  pop事件发射器通道*/
enum PopEventEmit {
    Content,
    Close,
    Open
}
/** @Description  pop事件发射器通道*/
enum TipEventEmit {
    Open,
    Close,

}

/** @Description 事件管理器  list emitQueue 监听是on  发射是emit*/
class EventHandler<Event> {
    /** @Description 事件列表 */
    list: Map<Event, Fn[]>
    /** @Description 队列 */
    emitQueue: Map<Event, any>

    /** @Description 监听事件 */
    constructor() {
        this.list = new Map()
        this.emitQueue = new Map()
    }

    /** @Description 监听 */
    on(event: Event, callback: Fn) {
        this.list.has(event) || this.list.set(event, []);
        this.list.get(event)?.push(callback);
        return this;
    }

    /** @Description 发送 */
    emit(event: Event, ...args: any) {
        this.list.has(event) &&
        this.list.get(event)?.forEach((callback: Fn) => {
            callback(...args);
            this.emitQueue.has(event) || this.emitQueue.set(event, []);
        });
    }
}

export {ModalEmit, PopEventEmit,TipEventEmit, EventHandler}