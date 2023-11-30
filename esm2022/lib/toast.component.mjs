import { Component, Input, Output, ViewChild, ViewContainerRef, EventEmitter, HostListener } from '@angular/core';
import { BodyOutputType } from './bodyOutputType';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./trust-html.pipe";
const _c0 = ["componentBody"];
const _c1 = ["toastComp", ""];
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
export class ToastComponent {
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
            i0.ɵɵviewQuery(_c0, 5, ViewContainerRef);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.componentBody = _t.first);
        } }, hostBindings: function ToastComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("mouseleave", function ToastComponent_mouseleave_HostBindingHandler() { return ctx.restartTimer(); });
        } }, inputs: { toasterconfig: "toasterconfig", toast: "toast", titleClass: "titleClass", messageClass: "messageClass" }, outputs: { clickEvent: "clickEvent", removeToastEvent: "removeToastEvent" }, attrs: _c1, decls: 9, vars: 9, consts: [[1, "toast-content"], [3, "ngClass"], [3, "ngClass", "ngSwitch"], [4, "ngSwitchCase"], [3, "innerHTML", 4, "ngSwitchCase"], ["class", "toast-close-button", 3, "innerHTML", "click", 4, "ngIf"], [4, "ngIf"], ["componentBody", ""], [3, "innerHTML"], [1, "toast-close-button", 3, "innerHTML", "click"], [1, "toast-progress-bar"]], template: function ToastComponent_Template(rf, ctx) { if (rf & 1) {
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
        } }, dependencies: [i1.NgClass, i1.NgIf, i1.NgSwitch, i1.NgSwitchCase, i2.TrustHtmlPipe], encapsulation: 2 });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIyLXRvYXN0ZXIvc3JjL2xpYi90b2FzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsWUFBWSxFQU1aLFlBQVksRUFJZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7SUFTbEMsK0JBQW1FOzs7SUFDbkUseUJBQTJGOzs7O0lBQTNDLHNGQUFvQzs7O0lBQ3BGLDJCQUE0QztJQUFBLFlBQWM7SUFBQSxpQkFBTTs7O0lBQXBCLGVBQWM7SUFBZCx1Q0FBYzs7OztJQUdsRSxpQ0FDOEM7SUFEbUIsb0tBQVMsZUFBQSxrQ0FBb0IsQ0FBQSxJQUFDOztJQUUvRixpQkFBUzs7O0lBREwsMkZBQXlDOzs7SUFFN0MsMkJBQStCO0lBQzNCLDBCQUE2RTtJQUNqRixpQkFBTTs7O0lBRDhCLGVBQXNDO0lBQXRDLHNEQUFzQzs7QUFHbEYsTUFBTSxPQUFPLGNBQWM7SUF1QmI7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQTFCRCxhQUFhLENBQWdCO0lBQzdCLEtBQUssQ0FBUTtJQUNiLFVBQVUsQ0FBUztJQUNuQixZQUFZLENBQVM7SUFDeUMsYUFBYSxDQUFtQjtJQUVoRyxnQkFBZ0IsR0FBVyxDQUFDLENBQUMsQ0FBQztJQUM5QixjQUFjLEdBQUcsY0FBYyxDQUFDO0lBR2hDLFVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBRWhDLGdCQUFnQixHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7SUFFNUMsU0FBUyxHQUFZLElBQUksQ0FBQztJQUMxQixPQUFPLEdBQVcsQ0FBQyxDQUFDO0lBQ3BCLHFCQUFxQixHQUFZLElBQUksQ0FBQztJQUN0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RU8sV0FBVztRQUNmLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7d0VBM0pRLGNBQWM7NkRBQWQsY0FBYzttQ0FLYSxnQkFBZ0I7Ozs7O3lHQUwzQyxrQkFBYzs7WUFmbkIsOEJBQTJCLGFBQUE7WUFDSyxZQUFlO1lBQUEsaUJBQU07WUFDakQsOEJBQWdFO1lBQzVELCtEQUFtRTtZQUNuRSwrREFBMkY7WUFDM0YsK0RBQWdFO1lBQ3BFLGlCQUFNLEVBQUE7WUFFVixxRUFFUztZQUNULCtEQUVNOztZQVpHLGVBQXNCO1lBQXRCLHdDQUFzQjtZQUFDLGVBQWU7WUFBZixxQ0FBZTtZQUN0QyxlQUF3QjtZQUF4QiwwQ0FBd0Isc0NBQUE7WUFDbkIsZUFBc0M7WUFBdEMsMkRBQXNDO1lBQ3RDLGVBQXdDO1lBQXhDLDZEQUF3QztZQUN4QyxlQUFvQztZQUFwQyx5REFBb0M7WUFHZCxlQUEyQjtZQUEzQixnREFBMkI7WUFHekQsZUFBdUI7WUFBdkIsNENBQXVCOzs7dUZBSXhCLGNBQWM7Y0FsQjFCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztlQWNDO2FBQ2Q7aUxBRVksYUFBYTtrQkFBckIsS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUNHLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxZQUFZO2tCQUFwQixLQUFLO1lBQ2lFLGFBQWE7a0JBQW5GLFNBQVM7bUJBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFNOUQsVUFBVTtrQkFEaEIsTUFBTTtZQUdBLGdCQUFnQjtrQkFEdEIsTUFBTTtZQWlFUCxZQUFZO2tCQURYLFlBQVk7bUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBcbiAgICBJbnB1dCwgXG4gICAgT3V0cHV0LCBcbiAgICBWaWV3Q2hpbGQsIFxuICAgIFZpZXdDb250YWluZXJSZWYsIFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFxuICAgIENoYW5nZURldGVjdG9yUmVmLCBcbiAgICBPbkluaXQsIFxuICAgIEFmdGVyVmlld0luaXQsIFxuICAgIE9uRGVzdHJveSxcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgTmdab25lLCBcbiAgICBFbGVtZW50UmVmLFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSAnLi90b2FzdCc7XG5pbXBvcnQgeyBCb2R5T3V0cHV0VHlwZSB9IGZyb20gJy4vYm9keU91dHB1dFR5cGUnO1xuaW1wb3J0IHsgVG9hc3RlckNvbmZpZyB9IGZyb20gJy4vdG9hc3Rlci1jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1t0b2FzdENvbXBdJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9hc3QtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ0aXRsZUNsYXNzXCI+e3t0b2FzdC50aXRsZX19PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIm1lc3NhZ2VDbGFzc1wiIFtuZ1N3aXRjaF09XCJ0b2FzdC5ib2R5T3V0cHV0VHlwZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImJvZHlPdXRwdXRUeXBlLkNvbXBvbmVudFwiICNjb21wb25lbnRCb2R5PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImJvZHlPdXRwdXRUeXBlLlRydXN0ZWRIdG1sXCIgW2lubmVySFRNTF09XCJ0b2FzdC5ib2R5IHwgdHJ1c3RIdG1sXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiYm9keU91dHB1dFR5cGUuRGVmYXVsdFwiPnt7dG9hc3QuYm9keX19PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJ0b2FzdC1jbG9zZS1idXR0b25cIiAqbmdJZj1cInRvYXN0LnNob3dDbG9zZUJ1dHRvblwiIChjbGljayk9XCJjbGljaygkZXZlbnQsIHRvYXN0KVwiXG4gICAgICAgICAgICBbaW5uZXJIVE1MXT1cInRvYXN0LmNsb3NlSHRtbCB8IHRydXN0SHRtbFwiPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInRvYXN0LnByb2dyZXNzQmFyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9hc3QtcHJvZ3Jlc3MtYmFyXCIgW3N0eWxlLndpZHRoXT1cInByb2dyZXNzQmFyV2lkdGggKyAnJSdcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSB0b2FzdGVyY29uZmlnOiBUb2FzdGVyQ29uZmlnO1xuICAgIEBJbnB1dCgpIHRvYXN0OiBUb2FzdDtcbiAgICBASW5wdXQoKSB0aXRsZUNsYXNzOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbWVzc2FnZUNsYXNzOiBzdHJpbmc7XG4gICAgQFZpZXdDaGlsZCgnY29tcG9uZW50Qm9keScsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiBmYWxzZSB9KSBjb21wb25lbnRCb2R5OiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgcHVibGljIHByb2dyZXNzQmFyV2lkdGg6IG51bWJlciA9IC0xO1xuICAgIHB1YmxpYyBib2R5T3V0cHV0VHlwZSA9IEJvZHlPdXRwdXRUeXBlO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIGNsaWNrRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlbW92ZVRvYXN0RXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPFRvYXN0PigpO1xuXG4gICAgcHJpdmF0ZSB0aW1lb3V0SWQ/OiBudW1iZXIgPSBudWxsO1xuICAgIHByaXZhdGUgdGltZW91dDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHByb2dyZXNzQmFySW50ZXJ2YWxJZD86IG51bWJlciA9IG51bGw7XG4gICAgcHJpdmF0ZSByZW1vdmVUb2FzdFRpY2s6IG51bWJlcjtcblxuICAgIHByaXZhdGUgcmVtb3ZlTW91c2VPdmVyTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICBwcml2YXRlIHJlbmRlcmVyMjogUmVuZGVyZXIyXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRvYXN0LnByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0LnByb2dyZXNzQmFyRGlyZWN0aW9uID0gdGhpcy50b2FzdC5wcm9ncmVzc0JhckRpcmVjdGlvbiB8fCAnZGVjcmVhc2luZyc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdGltZW91dCA9ICh0eXBlb2YgdGhpcy50b2FzdC50aW1lb3V0ID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgID8gdGhpcy50b2FzdC50aW1lb3V0IDogdGhpcy50b2FzdGVyY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aW1lb3V0ID09PSAnb2JqZWN0JykgeyBcbiAgICAgICAgICAgIHRpbWVvdXQgPSB0aW1lb3V0W3RoaXMudG9hc3QudHlwZV07IFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy50b2FzdC5ib2R5T3V0cHV0VHlwZSA9PT0gdGhpcy5ib2R5T3V0cHV0VHlwZS5Db21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMudG9hc3QuYm9keSk7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnRJbnN0YW5jZTogYW55ID0gdGhpcy5jb21wb25lbnRCb2R5LmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnQsIHVuZGVmaW5lZCwgdGhpcy5jb21wb25lbnRCb2R5LmluamVjdG9yKTtcbiAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlLmluc3RhbmNlLnRvYXN0ID0gdGhpcy50b2FzdDtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudG9hc3RlcmNvbmZpZy5tb3VzZW92ZXJUaW1lclN0b3ApIHtcbiAgICAgICAgICAgIC8vIG9ubHkgYXBwbHkgYSBtb3VzZWVudGVyIGV2ZW50IHdoZW4gbmVjZXNzYXJ5IHRvIGF2b2lkXG4gICAgICAgICAgICAvLyB1bm5lY2Vzc2FyeSBldmVudCBhbmQgY2hhbmdlIGRldGVjdGlvbiBjeWNsZXMuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1vdXNlT3Zlckxpc3RlbmVyID0gdGhpcy5yZW5kZXJlcjIubGlzdGVuKFxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCBcbiAgICAgICAgICAgICAgICAnbW91c2VlbnRlcicsIFxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMuc3RvcFRpbWVyKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZ3VyZVRpbWVyKCk7XG4gICAgfVxuXG4gICAgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIHRvYXN0OiBUb2FzdCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5jbGlja0V2ZW50LmVtaXQoeyB2YWx1ZSA6IHsgdG9hc3Q6IHRvYXN0LCBpc0Nsb3NlQnV0dG9uOiB0cnVlIH0gfSk7XG4gICAgfVxuXG4gICAgc3RvcFRpbWVyKCkge1xuICAgICAgICB0aGlzLnByb2dyZXNzQmFyV2lkdGggPSAwO1xuICAgICAgICB0aGlzLmNsZWFyVGltZXJzKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIFxuICAgIHJlc3RhcnRUaW1lcigpIHtcbiAgICAgICAgaWYgKHRoaXMudG9hc3RlcmNvbmZpZy5tb3VzZW92ZXJUaW1lclN0b3ApIHtcbiAgICAgICAgICAgIGlmICghdGhpcy50aW1lb3V0SWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZVRpbWVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50aW1lb3V0ICYmICF0aGlzLnRpbWVvdXRJZCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnJlbW92ZU1vdXNlT3Zlckxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1vdXNlT3Zlckxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGVhclRpbWVycygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29uZmlndXJlVGltZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy50aW1lb3V0IHx8IHRoaXMudGltZW91dCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRvYXN0LnByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0VGljayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgdGhpcy50aW1lb3V0O1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gLTE7XG4gICAgICAgIH0gXG4gICAgICAgIFxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCB0aGlzLnRpbWVvdXQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy50b2FzdC5wcm9ncmVzc0Jhcikge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJJbnRlcnZhbElkID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVByb2dyZXNzQmFyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0JhcldpZHRoID09PSAwIHx8IHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9PT0gMTAwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gKCh0aGlzLnJlbW92ZVRvYXN0VGljayAtIG5ldyBEYXRlKCkuZ2V0VGltZSgpKSAvIHRoaXMudGltZW91dCkgKiAxMDA7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy50b2FzdC5wcm9ncmVzc0JhckRpcmVjdGlvbiA9PT0gJ2luY3JlYXNpbmcnKSB7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMTAwIC0gdGhpcy5wcm9ncmVzc0JhcldpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzQmFyV2lkdGggPCAwKSB7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0JhcldpZHRoID4gMTAwKSB7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMTAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhclRpbWVycygpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dElkKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJJbnRlcnZhbElkKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLnByb2dyZXNzQmFySW50ZXJ2YWxJZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJJbnRlcnZhbElkID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZVRvYXN0KCkge1xuICAgICAgICB0aGlzLnJlbW92ZVRvYXN0RXZlbnQuZW1pdCh0aGlzLnRvYXN0KTtcbiAgICB9XG59XG4iXX0=