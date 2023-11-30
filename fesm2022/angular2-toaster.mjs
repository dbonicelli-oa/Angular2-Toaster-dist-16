import * as i0 from '@angular/core';
import { Injectable, Pipe, EventEmitter, ViewContainerRef, Component, Input, ViewChild, Output, HostListener, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from '@angular/platform-browser';

const Transitions = [
    trigger('toastState', [
        state('flyRight, flyLeft, slideDown, slideDown, slideUp, slideUp, fade', style({ opacity: 1, transform: 'translate(0,0)' })),
        transition('void => flyRight', [
            style({
                opacity: 0,
                transform: 'translateX(100%)',
                height: 0
            }),
            animate('0.15s ease-in', style({
                opacity: 1,
                height: '*'
            })),
            animate('0.25s 15ms ease-in')
        ]),
        transition('flyRight => void', [
            animate('0.25s ease-out', style({
                opacity: 0,
                transform: 'translateX(100%)'
            })),
            animate('0.15s ease-out', style({
                height: 0
            }))
        ]),
        transition('void => flyLeft', [
            style({
                opacity: 0,
                transform: 'translateX(-100%)',
                height: 0
            }),
            animate('0.15s ease-in', style({
                opacity: 1,
                height: '*'
            })),
            animate('0.25s 15ms ease-in')
        ]),
        transition('flyLeft => void', [
            animate('0.25s 10ms ease-out', style({
                opacity: 0,
                transform: 'translateX(-100%)'
            })),
            animate('0.15s ease-out', style({
                height: 0
            }))
        ]),
        transition('void => slideDown', [
            style({
                opacity: 0,
                transform: 'translateY(-500%)',
                height: 0
            }),
            group([
                animate('0.2s ease-in', style({
                    height: '*'
                })),
                animate('0.4s ease-in', style({
                    transform: 'translate(0,0)'
                })),
                animate('0.3s 0.1s ease-in', style({
                    opacity: 1
                }))
            ])
        ]),
        transition('slideDown => void', group([
            animate('0.3s ease-out', style({
                opacity: 0
            })),
            animate('0.4s ease-out', style({
                transform: 'translateY(-500%)'
            })),
            animate('0.2s 0.2s ease-out', style({
                height: 0
            }))
        ])),
        transition('void => slideUp', [
            style({
                opacity: 0,
                transform: 'translateY(1000%)',
                height: 0
            }),
            group([
                animate('0.2s ease-in', style({
                    height: '*'
                })),
                animate('0.5s ease-in', style({
                    transform: 'translate(0,0)'
                })),
                animate('0.3s 0.1s ease-in', style({
                    opacity: 1
                }))
            ])
        ]),
        transition('slideUp => void', group([
            animate('0.3s ease-out', style({
                opacity: 0
            })),
            animate('0.5s ease-out', style({
                transform: 'translateY(1000%)'
            })),
            animate('0.3s 0.15s ease-out', style({
                height: 0
            }))
        ])),
        transition('void => fade', [
            style({
                opacity: 0,
                height: 0
            }),
            animate('0.20s ease-in', style({
                height: '*'
            })),
            animate('0.15s ease-in', style({
                opacity: 1
            }))
        ]),
        transition('fade => void', [
            group([
                animate('0.0s ease-out', style({
                    // reposition the background to prevent
                    // a ghost image during transition
                    'background-position': '-99999px'
                })),
                animate('0.15s ease-out', style({
                    opacity: 0,
                    'background-image': ''
                })),
                animate('0.3s 20ms ease-out', style({
                    height: 0
                }))
            ])
        ])
    ]),
];

var BodyOutputType;
(function (BodyOutputType) {
    BodyOutputType[BodyOutputType["Default"] = 0] = "Default";
    BodyOutputType[BodyOutputType["TrustedHtml"] = 1] = "TrustedHtml";
    BodyOutputType[BodyOutputType["Component"] = 2] = "Component";
})(BodyOutputType || (BodyOutputType = {}));

const DefaultTypeClasses = {
    error: 'toast-error',
    info: 'toast-info',
    wait: 'toast-wait',
    success: 'toast-success',
    warning: 'toast-warning'
};
const DefaultIconClasses = {
    error: 'icon-error',
    info: 'icon-info',
    wait: 'icon-wait',
    success: 'icon-success',
    warning: 'icon-warning'
};
class ToasterConfig {
    limit;
    tapToDismiss;
    showCloseButton;
    closeHtml;
    newestOnTop;
    timeout;
    typeClasses;
    iconClasses;
    bodyOutputType;
    bodyTemplate;
    defaultToastType;
    // Options (see CSS):
    // 'toast-top-full-width', 'toast-bottom-full-width', 'toast-center',
    // 'toast-top-left', 'toast-top-center', 'toast-top-right',
    // 'toast-bottom-left', 'toast-bottom-center', 'toast-bottom-right',
    positionClass;
    titleClass;
    messageClass;
    animation;
    preventDuplicates;
    mouseoverTimerStop;
    toastContainerId;
    constructor(configOverrides) {
        configOverrides = configOverrides || {};
        this.limit = configOverrides.limit || null;
        this.tapToDismiss = configOverrides.tapToDismiss != null ? configOverrides.tapToDismiss : true;
        this.showCloseButton = configOverrides.showCloseButton != null ? configOverrides.showCloseButton : false;
        this.closeHtml = configOverrides.closeHtml || '<span>&times;</span>';
        this.newestOnTop = configOverrides.newestOnTop != null ? configOverrides.newestOnTop : true;
        this.timeout = configOverrides.timeout != null ? configOverrides.timeout : 5000;
        this.typeClasses = configOverrides.typeClasses || DefaultTypeClasses;
        this.iconClasses = configOverrides.iconClasses || DefaultIconClasses;
        this.bodyOutputType = configOverrides.bodyOutputType || BodyOutputType.Default;
        this.bodyTemplate = configOverrides.bodyTemplate || 'toasterBodyTmpl.html';
        this.defaultToastType = configOverrides.defaultToastType || 'info';
        this.positionClass = configOverrides.positionClass || 'toast-top-right';
        this.titleClass = configOverrides.titleClass || 'toast-title';
        this.messageClass = configOverrides.messageClass || 'toast-message';
        this.animation = configOverrides.animation || '';
        this.preventDuplicates = configOverrides.preventDuplicates != null ? configOverrides.preventDuplicates : false;
        this.mouseoverTimerStop = configOverrides.mouseoverTimerStop != null ? configOverrides.mouseoverTimerStop : false;
        this.toastContainerId = configOverrides.toastContainerId != null ? configOverrides.toastContainerId : null;
    }
    static ɵfac = function ToasterConfig_Factory(t) { i0.ɵɵinvalidFactory(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ToasterConfig, factory: ToasterConfig.ɵfac });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToasterConfig, [{
        type: Injectable
    }], function () { return [{ type: undefined }]; }, null); })();

// http://stackoverflow.com/questions/26501688/a-typescript-guid-class
class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
class ToasterService {
    addToast;
    _addToast;
    clearToasts;
    _clearToasts;
    removeToast;
    /** @internal */
    _removeToastSubject;
    /**
     * Creates an instance of ToasterService.
     */
    constructor() {
        this.addToast = new Observable((observer) => this._addToast = observer).pipe(share());
        this.clearToasts = new Observable((observer) => this._clearToasts = observer).pipe(share());
        this._removeToastSubject = new Subject();
        this.removeToast = this._removeToastSubject.pipe(share());
    }
    /**
     * Synchronously create and show a new toast instance.
     *
     * @param {(string | Toast)} type The type of the toast, or a Toast object.
     * @param {string=} title The toast title.
     * @param {string=} body The toast body.
     * @returns {Toast}
     *          The newly created Toast instance with a randomly generated GUID Id.
     */
    pop(type, title, body) {
        const toast = typeof type === 'string' ? { type: type, title: title, body: body } : type;
        if (!toast.toastId) {
            toast.toastId = Guid.newGuid();
        }
        if (!this._addToast) {
            throw new Error('No Toaster Containers have been initialized to receive toasts.');
        }
        this._addToast.next(toast);
        return toast;
    }
    /**
     * Asynchronously create and show a new toast instance.
     *
     * @param {(string | Toast)} type The type of the toast, or a Toast object.
     * @param {string=} title The toast title.
     * @param {string=} body The toast body.
     * @returns {Observable<Toast>}
     *          A hot Observable that can be subscribed to in order to receive the Toast instance
     *          with a randomly generated GUID Id.
     */
    popAsync(type, title, body) {
        setTimeout(() => {
            this.pop(type, title, body);
        }, 0);
        return this.addToast;
    }
    /**
     * Clears a toast by toastId and/or toastContainerId.
     *
     * @param {string} toastId The toastId to clear.
     * @param {number=} toastContainerId
     *        The toastContainerId of the container to remove toasts from.
     */
    clear(toastId, toastContainerId) {
        const clearWrapper = {
            toastId: toastId, toastContainerId: toastContainerId
        };
        this._clearToasts.next(clearWrapper);
    }
    static ɵfac = function ToasterService_Factory(t) { return new (t || ToasterService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ToasterService, factory: ToasterService.ɵfac, providedIn: 'root' });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToasterService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return []; }, null); })();

class TrustHtmlPipe {
    sanitizer;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(content) {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }
    static ɵfac = function TrustHtmlPipe_Factory(t) { return new (t || TrustHtmlPipe)(i0.ɵɵdirectiveInject(i1.DomSanitizer, 16)); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "trustHtml", type: TrustHtmlPipe, pure: true });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TrustHtmlPipe, [{
        type: Pipe,
        args: [{
                name: 'trustHtml',
                pure: true
            }]
    }], function () { return [{ type: i1.DomSanitizer }]; }, null); })();

const _c0$1 = ["componentBody"];
const _c1$1 = ["toastComp", ""];
function ToastComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", null, 7);
} }
function ToastComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 8);
    i0.ɵɵpipe(1, "trustHtml");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r1.toast.body), i0.ɵɵsanitizeHtml);
} }
function ToastComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.toast.body);
} }
function ToastComponent_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function ToastComponent_button_7_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.click($event, ctx_r6.toast)); });
    i0.ɵɵpipe(1, "trustHtml");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r3.toast.closeHtml), i0.ɵɵsanitizeHtml);
} }
function ToastComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "div", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("width", ctx_r4.progressBarWidth + "%");
} }
class ToastComponent {
    componentFactoryResolver;
    changeDetectorRef;
    ngZone;
    element;
    renderer2;
    toasterconfig;
    toast;
    titleClass;
    messageClass;
    componentBody;
    progressBarWidth = -1;
    bodyOutputType = BodyOutputType;
    clickEvent = new EventEmitter();
    removeToastEvent = new EventEmitter();
    timeoutId = null;
    timeout = 0;
    progressBarIntervalId = null;
    removeToastTick;
    removeMouseOverListener;
    constructor(componentFactoryResolver, changeDetectorRef, ngZone, element, renderer2) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.changeDetectorRef = changeDetectorRef;
        this.ngZone = ngZone;
        this.element = element;
        this.renderer2 = renderer2;
    }
    ngOnInit() {
        if (this.toast.progressBar) {
            this.toast.progressBarDirection = this.toast.progressBarDirection || 'decreasing';
        }
        let timeout = (typeof this.toast.timeout === 'number')
            ? this.toast.timeout : this.toasterconfig.timeout;
        if (typeof timeout === 'object') {
            timeout = timeout[this.toast.type];
        }
        ;
        this.timeout = timeout;
    }
    ngAfterViewInit() {
        if (this.toast.bodyOutputType === this.bodyOutputType.Component) {
            const component = this.componentFactoryResolver.resolveComponentFactory(this.toast.body);
            const componentInstance = this.componentBody.createComponent(component, undefined, this.componentBody.injector);
            componentInstance.instance.toast = this.toast;
            this.changeDetectorRef.detectChanges();
        }
        if (this.toasterconfig.mouseoverTimerStop) {
            // only apply a mouseenter event when necessary to avoid
            // unnecessary event and change detection cycles.
            this.removeMouseOverListener = this.renderer2.listen(this.element.nativeElement, 'mouseenter', () => this.stopTimer());
        }
        this.configureTimer();
    }
    click(event, toast) {
        event.stopPropagation();
        this.clickEvent.emit({ value: { toast: toast, isCloseButton: true } });
    }
    stopTimer() {
        this.progressBarWidth = 0;
        this.clearTimers();
    }
    restartTimer() {
        if (this.toasterconfig.mouseoverTimerStop) {
            if (!this.timeoutId) {
                this.configureTimer();
            }
        }
        else if (this.timeout && !this.timeoutId) {
            this.removeToast();
        }
    }
    ngOnDestroy() {
        if (this.removeMouseOverListener) {
            this.removeMouseOverListener();
        }
        this.clearTimers();
    }
    configureTimer() {
        if (!this.timeout || this.timeout < 1) {
            return;
        }
        if (this.toast.progressBar) {
            this.removeToastTick = new Date().getTime() + this.timeout;
            this.progressBarWidth = -1;
        }
        this.ngZone.runOutsideAngular(() => {
            this.timeoutId = window.setTimeout(() => {
                this.ngZone.run(() => {
                    this.changeDetectorRef.markForCheck();
                    this.removeToast();
                });
            }, this.timeout);
            if (this.toast.progressBar) {
                this.progressBarIntervalId = window.setInterval(() => {
                    this.ngZone.run(() => {
                        this.updateProgressBar();
                    });
                }, 10);
            }
        });
    }
    updateProgressBar() {
        if (this.progressBarWidth === 0 || this.progressBarWidth === 100) {
            return;
        }
        this.progressBarWidth = ((this.removeToastTick - new Date().getTime()) / this.timeout) * 100;
        if (this.toast.progressBarDirection === 'increasing') {
            this.progressBarWidth = 100 - this.progressBarWidth;
        }
        if (this.progressBarWidth < 0) {
            this.progressBarWidth = 0;
        }
        if (this.progressBarWidth > 100) {
            this.progressBarWidth = 100;
        }
    }
    clearTimers() {
        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId);
        }
        if (this.progressBarIntervalId) {
            window.clearInterval(this.progressBarIntervalId);
        }
        this.timeoutId = null;
        this.progressBarIntervalId = null;
    }
    removeToast() {
        this.removeToastEvent.emit(this.toast);
    }
    static ɵfac = function ToastComponent_Factory(t) { return new (t || ToastComponent)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToastComponent, selectors: [["", "toastComp", ""]], viewQuery: function ToastComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0$1, 5, ViewContainerRef);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.componentBody = _t.first);
        } }, hostBindings: function ToastComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("mouseleave", function ToastComponent_mouseleave_HostBindingHandler() { return ctx.restartTimer(); });
        } }, inputs: { toasterconfig: "toasterconfig", toast: "toast", titleClass: "titleClass", messageClass: "messageClass" }, outputs: { clickEvent: "clickEvent", removeToastEvent: "removeToastEvent" }, attrs: _c1$1, decls: 9, vars: 9, consts: [[1, "toast-content"], [3, "ngClass"], [3, "ngClass", "ngSwitch"], [4, "ngSwitchCase"], [3, "innerHTML", 4, "ngSwitchCase"], ["class", "toast-close-button", 3, "innerHTML", "click", 4, "ngIf"], [4, "ngIf"], ["componentBody", ""], [3, "innerHTML"], [1, "toast-close-button", 3, "innerHTML", "click"], [1, "toast-progress-bar"]], template: function ToastComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2);
            i0.ɵɵtemplate(4, ToastComponent_div_4_Template, 2, 0, "div", 3);
            i0.ɵɵtemplate(5, ToastComponent_div_5_Template, 2, 3, "div", 4);
            i0.ɵɵtemplate(6, ToastComponent_div_6_Template, 2, 1, "div", 3);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(7, ToastComponent_button_7_Template, 2, 3, "button", 5);
            i0.ɵɵtemplate(8, ToastComponent_div_8_Template, 2, 2, "div", 6);
        } if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", ctx.titleClass);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(ctx.toast.title);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", ctx.messageClass)("ngSwitch", ctx.toast.bodyOutputType);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.Component);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.TrustedHtml);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.Default);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.toast.showCloseButton);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.toast.progressBar);
        } }, dependencies: [i1$1.NgClass, i1$1.NgIf, i1$1.NgSwitch, i1$1.NgSwitchCase, TrustHtmlPipe], encapsulation: 2 });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastComponent, [{
        type: Component,
        args: [{
                selector: '[toastComp]',
                template: `
        <div class="toast-content">
            <div [ngClass]="titleClass">{{toast.title}}</div>
            <div [ngClass]="messageClass" [ngSwitch]="toast.bodyOutputType">
                <div *ngSwitchCase="bodyOutputType.Component" #componentBody></div>
                <div *ngSwitchCase="bodyOutputType.TrustedHtml" [innerHTML]="toast.body | trustHtml"></div>
                <div *ngSwitchCase="bodyOutputType.Default">{{toast.body}}</div>
            </div>
        </div>
        <button class="toast-close-button" *ngIf="toast.showCloseButton" (click)="click($event, toast)"
            [innerHTML]="toast.closeHtml | trustHtml">
        </button>
        <div *ngIf="toast.progressBar">
            <div class="toast-progress-bar" [style.width]="progressBarWidth + '%'"></div>
        </div>`
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, { toasterconfig: [{
            type: Input
        }], toast: [{
            type: Input
        }], titleClass: [{
            type: Input
        }], messageClass: [{
            type: Input
        }], componentBody: [{
            type: ViewChild,
            args: ['componentBody', { read: ViewContainerRef, static: false }]
        }], clickEvent: [{
            type: Output
        }], removeToastEvent: [{
            type: Output
        }], restartTimer: [{
            type: HostListener,
            args: ['mouseleave']
        }] }); })();

const _c0 = function (a0, a1) { return [a0, a1]; };
function ToasterContainerComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵlistener("click", function ToasterContainerComponent_div_1_Template_div_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r3); const toast_r1 = restoredCtx.$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.click(toast_r1)); })("clickEvent", function ToasterContainerComponent_div_1_Template_div_clickEvent_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.childClick($event)); })("removeToastEvent", function ToasterContainerComponent_div_1_Template_div_removeToastEvent_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.removeToast($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const toast_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("toast", toast_r1)("toasterconfig", ctx_r0.toasterconfig)("@toastState", ctx_r0.toasterconfig.animation)("titleClass", ctx_r0.toasterconfig.titleClass)("messageClass", ctx_r0.toasterconfig.messageClass)("ngClass", i0.ɵɵpureFunction2(6, _c0, ctx_r0.toasterconfig.iconClasses[toast_r1.type], ctx_r0.toasterconfig.typeClasses[toast_r1.type]));
} }
const _c1 = function (a0) { return [a0]; };
class ToasterContainerComponent {
    addToastSubscriber;
    clearToastsSubscriber;
    toasterService;
    toasterconfig;
    toasts = [];
    constructor(toasterService) {
        this.toasterService = toasterService;
    }
    ngOnInit() {
        this.registerSubscribers();
        if (this.isNullOrUndefined(this.toasterconfig)) {
            this.toasterconfig = new ToasterConfig();
        }
    }
    // event handlers
    click(toast, isCloseButton) {
        if (toast.onClickCallback) {
            toast.onClickCallback(toast);
        }
        const tapToDismiss = !this.isNullOrUndefined(toast.tapToDismiss)
            ? toast.tapToDismiss
            : this.toasterconfig.tapToDismiss;
        if (tapToDismiss || (toast.showCloseButton && isCloseButton)) {
            this.removeToast(toast);
        }
    }
    childClick($event) {
        this.click($event.value.toast, $event.value.isCloseButton);
    }
    removeToast(toast) {
        const index = this.toasts.indexOf(toast);
        if (index < 0) {
            return;
        }
        ;
        const toastId = this.toastIdOrDefault(toast);
        this.toasts.splice(index, 1);
        if (toast.onHideCallback) {
            toast.onHideCallback(toast);
        }
        this.toasterService._removeToastSubject.next({ toastId: toastId, toastContainerId: toast.toastContainerId });
    }
    // private functions
    registerSubscribers() {
        this.addToastSubscriber = this.toasterService.addToast.subscribe((toast) => {
            this.addToast(toast);
        });
        this.clearToastsSubscriber = this.toasterService.clearToasts.subscribe((clearWrapper) => {
            this.clearToasts(clearWrapper);
        });
    }
    addToast(toast) {
        if (toast.toastContainerId && this.toasterconfig.toastContainerId
            && toast.toastContainerId !== this.toasterconfig.toastContainerId) {
            return;
        }
        ;
        if (!toast.type
            || !this.toasterconfig.typeClasses[toast.type]
            || !this.toasterconfig.iconClasses[toast.type]) {
            toast.type = this.toasterconfig.defaultToastType;
        }
        if (this.toasterconfig.preventDuplicates && this.toasts.length > 0) {
            if (toast.toastId && this.toasts.some(t => t.toastId === toast.toastId)) {
                return;
            }
            else if (this.toasts.some(t => t.body === toast.body)) {
                return;
            }
        }
        if (this.isNullOrUndefined(toast.showCloseButton)) {
            if (typeof this.toasterconfig.showCloseButton === 'object') {
                toast.showCloseButton = this.toasterconfig.showCloseButton[toast.type];
            }
            else if (typeof this.toasterconfig.showCloseButton === 'boolean') {
                toast.showCloseButton = this.toasterconfig.showCloseButton;
            }
        }
        if (toast.showCloseButton) {
            toast.closeHtml = toast.closeHtml || this.toasterconfig.closeHtml;
        }
        toast.bodyOutputType = toast.bodyOutputType || this.toasterconfig.bodyOutputType;
        if (this.toasterconfig.newestOnTop) {
            this.toasts.unshift(toast);
            if (this.isLimitExceeded()) {
                this.toasts.pop();
            }
        }
        else {
            this.toasts.push(toast);
            if (this.isLimitExceeded()) {
                this.toasts.shift();
            }
        }
        if (toast.onShowCallback) {
            toast.onShowCallback(toast);
        }
    }
    isLimitExceeded() {
        return this.toasterconfig.limit && this.toasts.length > this.toasterconfig.limit;
    }
    removeAllToasts() {
        for (let i = this.toasts.length - 1; i >= 0; i--) {
            this.removeToast(this.toasts[i]);
        }
    }
    clearToasts(clearWrapper) {
        const toastId = clearWrapper.toastId;
        const toastContainerId = clearWrapper.toastContainerId;
        if (this.isNullOrUndefined(toastContainerId) || (toastContainerId === this.toasterconfig.toastContainerId)) {
            this.clearToastsAction(toastId);
        }
    }
    clearToastsAction(toastId) {
        if (toastId) {
            this.removeToast(this.toasts.filter(t => t.toastId === toastId)[0]);
        }
        else {
            this.removeAllToasts();
        }
    }
    toastIdOrDefault(toast) {
        return toast.toastId || '';
    }
    isNullOrUndefined(value) {
        return value === null || typeof value === 'undefined';
    }
    ngOnDestroy() {
        if (this.addToastSubscriber) {
            this.addToastSubscriber.unsubscribe();
        }
        if (this.clearToastsSubscriber) {
            this.clearToastsSubscriber.unsubscribe();
        }
    }
    static ɵfac = function ToasterContainerComponent_Factory(t) { return new (t || ToasterContainerComponent)(i0.ɵɵdirectiveInject(ToasterService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToasterContainerComponent, selectors: [["toaster-container"]], inputs: { toasterconfig: "toasterconfig" }, decls: 2, vars: 4, consts: [[1, "toast-container", 3, "ngClass"], ["toastComp", "", "class", "toast", 3, "toast", "toasterconfig", "titleClass", "messageClass", "ngClass", "click", "clickEvent", "removeToastEvent", 4, "ngFor", "ngForOf"], ["toastComp", "", 1, "toast", 3, "toast", "toasterconfig", "titleClass", "messageClass", "ngClass", "click", "clickEvent", "removeToastEvent"]], template: function ToasterContainerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, ToasterContainerComponent_div_1_Template, 1, 9, "div", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c1, ctx.toasterconfig.positionClass));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.toasts);
        } }, dependencies: [i1$1.NgClass, i1$1.NgForOf, ToastComponent], encapsulation: 2, data: { animation: Transitions } });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToasterContainerComponent, [{
        type: Component,
        args: [{
                selector: 'toaster-container',
                template: `
        <div class="toast-container" [ngClass]="[toasterconfig.positionClass]">
            <div toastComp *ngFor="let toast of toasts" class="toast" [toast]="toast"
                [toasterconfig]="toasterconfig"
                [@toastState]="toasterconfig.animation"
                [titleClass]="toasterconfig.titleClass"
                [messageClass]="toasterconfig.messageClass"
                [ngClass]="[
                    toasterconfig.iconClasses[toast.type],
                    toasterconfig.typeClasses[toast.type]
                ]"
                (click)="click(toast)" (clickEvent)="childClick($event)"
                (removeToastEvent)="removeToast($event)"
            >
            </div>
        </div>
        `,
                animations: Transitions
            }]
    }], function () { return [{ type: ToasterService }]; }, { toasterconfig: [{
            type: Input
        }] }); })();

class ToasterModule {
    static forRoot() {
        return {
            ngModule: ToasterModule,
            providers: [ToasterService, ToasterContainerComponent]
        };
    }
    static forChild() {
        return {
            ngModule: ToasterModule,
            providers: [ToasterContainerComponent]
        };
    }
    static ɵfac = function ToasterModule_Factory(t) { return new (t || ToasterModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ToasterModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToasterModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [
                    ToastComponent,
                    ToasterContainerComponent,
                    TrustHtmlPipe
                ],
                exports: [
                    ToasterContainerComponent,
                    ToastComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ToasterModule, { declarations: [ToastComponent,
        ToasterContainerComponent,
        TrustHtmlPipe], imports: [CommonModule], exports: [ToasterContainerComponent,
        ToastComponent] }); })();

/*
 * Public API Surface of angular2-toaster
 */

/**
 * Generated bundle index. Do not edit.
 */

export { BodyOutputType, DefaultIconClasses, DefaultTypeClasses, ToastComponent, ToasterConfig, ToasterContainerComponent, ToasterModule, ToasterService };
//# sourceMappingURL=angular2-toaster.mjs.map
