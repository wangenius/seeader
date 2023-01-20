import {EventManager} from "../@constant/event";
import {Fn} from "./context";

declare interface EventManagerInterface<Eve> {
    list: Map<Eve, Fn[]>;
    emitQueue: Map<Eve, any>;
    on(event: Eve, callback: Fn): EventManager;
    emit(event: Eve, ...args:any): void;
}
