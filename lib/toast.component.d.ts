import { ViewContainerRef, EventEmitter, ComponentFactoryResolver, ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy, NgZone, ElementRef, Renderer2 } from '@angular/core';
import { Toast } from './toast';
import { BodyOutputType } from './bodyOutputType';
import { ToasterConfig } from './toaster-config';
import * as i0 from "@angular/core";
export declare class ToastComponent implements OnInit, AfterViewInit, OnDestroy {
    private componentFactoryResolver;
    private changeDetectorRef;
    private ngZone;
    private element;
    private renderer2;
    toasterconfig: ToasterConfig;
    toast: Toast;
    titleClass: string;
    messageClass: string;
    componentBody: ViewContainerRef;
    progressBarWidth: number;
    bodyOutputType: typeof BodyOutputType;
    clickEvent: EventEmitter<any>;
    removeToastEvent: EventEmitter<Toast>;
    private timeoutId?;
    private timeout;
    private progressBarIntervalId?;
    private removeToastTick;
    private removeMouseOverListener;
    constructor(componentFactoryResolver: ComponentFactoryResolver, changeDetectorRef: ChangeDetectorRef, ngZone: NgZone, element: ElementRef, renderer2: Renderer2);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    click(event: MouseEvent, toast: Toast): void;
    stopTimer(): void;
    restartTimer(): void;
    ngOnDestroy(): void;
    private configureTimer;
    private updateProgressBar;
    private clearTimers;
    private removeToast;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToastComponent, "[toastComp]", never, { "toasterconfig": { "alias": "toasterconfig"; "required": false; }; "toast": { "alias": "toast"; "required": false; }; "titleClass": { "alias": "titleClass"; "required": false; }; "messageClass": { "alias": "messageClass"; "required": false; }; }, { "clickEvent": "clickEvent"; "removeToastEvent": "removeToastEvent"; }, never, never, false, never>;
}
