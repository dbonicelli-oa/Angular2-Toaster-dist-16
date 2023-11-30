import { Component, Input } from '@angular/core';
import { Transitions } from './transitions';
import { ToasterConfig } from './toaster-config';
import * as i0 from "@angular/core";
import * as i1 from "./toaster.service";
import * as i2 from "@angular/common";
import * as i3 from "./toast.component";
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
export class ToasterContainerComponent {
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
    static ɵfac = function ToasterContainerComponent_Factory(t) { return new (t || ToasterContainerComponent)(i0.ɵɵdirectiveInject(i1.ToasterService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToasterContainerComponent, selectors: [["toaster-container"]], inputs: { toasterconfig: "toasterconfig" }, decls: 2, vars: 4, consts: [[1, "toast-container", 3, "ngClass"], ["toastComp", "", "class", "toast", 3, "toast", "toasterconfig", "titleClass", "messageClass", "ngClass", "click", "clickEvent", "removeToastEvent", 4, "ngFor", "ngForOf"], ["toastComp", "", 1, "toast", 3, "toast", "toasterconfig", "titleClass", "messageClass", "ngClass", "click", "clickEvent", "removeToastEvent"]], template: function ToasterContainerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, ToasterContainerComponent_div_1_Template, 1, 9, "div", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c1, ctx.toasterconfig.positionClass));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx.toasts);
        } }, dependencies: [i2.NgClass, i2.NgForOf, i3.ToastComponent], encapsulation: 2, data: { animation: Transitions } });
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
    }], function () { return [{ type: i1.ToasterService }]; }, { toasterconfig: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIyLXRvYXN0ZXIvc3JjL2xpYi90b2FzdGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBR1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7O0lBU3JDLDhCQVdDO0lBRkcsK05BQVMsZUFBQSxzQkFBWSxDQUFBLElBQUMsc0tBQWUsZUFBQSx5QkFBa0IsQ0FBQSxJQUFqQyxrTEFDRixlQUFBLDBCQUFtQixDQUFBLElBRGpCO0lBRzFCLGlCQUFNOzs7O0lBWm9ELGdDQUFlLHVDQUFBLCtDQUFBLCtDQUFBLG1EQUFBLHlJQUFBOzs7QUFpQnJGLE1BQU0sT0FBTyx5QkFBeUI7SUFDMUIsa0JBQWtCLENBQU07SUFDeEIscUJBQXFCLENBQU07SUFDM0IsY0FBYyxDQUFpQjtJQUU5QixhQUFhLENBQWdCO0lBRS9CLE1BQU0sR0FBWSxFQUFFLENBQUM7SUFFNUIsWUFBWSxjQUE4QjtRQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLEtBQUssQ0FBQyxLQUFZLEVBQUUsYUFBdUI7UUFDdkMsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFF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QUMsQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2RTthQUFNO1lBQ0gsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVPLGdCQUFnQixDQUFDLEtBQVk7UUFDakMsT0FBTyxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8saUJBQWlCLENBQUMsS0FBVTtRQUNoQyxPQUFPLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxDQUFDO0lBQzFELENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FBRTtRQUN2RSxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUFFO0lBQ2pGLENBQUM7bUZBckpRLHlCQUF5Qjs2REFBekIseUJBQXlCO1lBbEI5Qiw4QkFBdUU7WUFDbkUsMEVBWU07WUFDVixpQkFBTTs7WUFkdUIscUZBQXlDO1lBQ2pDLGVBQVM7WUFBVCxvQ0FBUzs2R0FldEMsV0FBVzs7dUZBRWQseUJBQXlCO2NBckJyQyxTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O1NBZ0JMO2dCQUNMLFVBQVUsRUFBRSxXQUFXO2FBQzFCO2lFQU1ZLGFBQWE7a0JBQXJCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXQsIFxuICAgIE9uSW5pdCxcbiAgICBPbkRlc3Ryb3kgXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbnMgfSBmcm9tICcuL3RyYW5zaXRpb25zJztcbmltcG9ydCB7IFRvYXN0ZXJDb25maWcgfSBmcm9tICcuL3RvYXN0ZXItY29uZmlnJztcbmltcG9ydCB7IFRvYXN0ZXJTZXJ2aWNlfSBmcm9tICcuL3RvYXN0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBJQ2xlYXJXcmFwcGVyIH0gZnJvbSAnLi9jbGVhcldyYXBwZXInO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tICcuL3RvYXN0JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0b2FzdGVyLWNvbnRhaW5lcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvYXN0LWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cIlt0b2FzdGVyY29uZmlnLnBvc2l0aW9uQ2xhc3NdXCI+XG4gICAgICAgICAgICA8ZGl2IHRvYXN0Q29tcCAqbmdGb3I9XCJsZXQgdG9hc3Qgb2YgdG9hc3RzXCIgY2xhc3M9XCJ0b2FzdFwiIFt0b2FzdF09XCJ0b2FzdFwiXG4gICAgICAgICAgICAgICAgW3RvYXN0ZXJjb25maWddPVwidG9hc3RlcmNvbmZpZ1wiXG4gICAgICAgICAgICAgICAgW0B0b2FzdFN0YXRlXT1cInRvYXN0ZXJjb25maWcuYW5pbWF0aW9uXCJcbiAgICAgICAgICAgICAgICBbdGl0bGVDbGFzc109XCJ0b2FzdGVyY29uZmlnLnRpdGxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgIFttZXNzYWdlQ2xhc3NdPVwidG9hc3RlcmNvbmZpZy5tZXNzYWdlQ2xhc3NcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIltcbiAgICAgICAgICAgICAgICAgICAgdG9hc3RlcmNvbmZpZy5pY29uQ2xhc3Nlc1t0b2FzdC50eXBlXSxcbiAgICAgICAgICAgICAgICAgICAgdG9hc3RlcmNvbmZpZy50eXBlQ2xhc3Nlc1t0b2FzdC50eXBlXVxuICAgICAgICAgICAgICAgIF1cIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjbGljayh0b2FzdClcIiAoY2xpY2tFdmVudCk9XCJjaGlsZENsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChyZW1vdmVUb2FzdEV2ZW50KT1cInJlbW92ZVRvYXN0KCRldmVudClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFRyYW5zaXRpb25zXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0ZXJDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBhZGRUb2FzdFN1YnNjcmliZXI6IGFueTtcbiAgICBwcml2YXRlIGNsZWFyVG9hc3RzU3Vic2NyaWJlcjogYW55O1xuICAgIHByaXZhdGUgdG9hc3RlclNlcnZpY2U6IFRvYXN0ZXJTZXJ2aWNlO1xuXG4gICAgQElucHV0KCkgdG9hc3RlcmNvbmZpZzogVG9hc3RlckNvbmZpZztcblxuICAgIHB1YmxpYyB0b2FzdHM6IFRvYXN0W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHRvYXN0ZXJTZXJ2aWNlOiBUb2FzdGVyU2VydmljZSkge1xuICAgICAgICB0aGlzLnRvYXN0ZXJTZXJ2aWNlID0gdG9hc3RlclNlcnZpY2U7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJTdWJzY3JpYmVycygpO1xuICAgICAgICBpZiAodGhpcy5pc051bGxPclVuZGVmaW5lZCh0aGlzLnRvYXN0ZXJjb25maWcpKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0ZXJjb25maWcgPSBuZXcgVG9hc3RlckNvbmZpZygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZXZlbnQgaGFuZGxlcnNcbiAgICBjbGljayh0b2FzdDogVG9hc3QsIGlzQ2xvc2VCdXR0b24/OiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0b2FzdC5vbkNsaWNrQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRvYXN0Lm9uQ2xpY2tDYWxsYmFjayh0b2FzdCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0YXBUb0Rpc21pc3MgPSAhdGhpcy5pc051bGxPclVuZGVmaW5lZCh0b2FzdC50YXBUb0Rpc21pc3MpIFxuICAgICAgICAgICAgPyB0b2FzdC50YXBUb0Rpc21pc3NcbiAgICAgICAgICAgIDogdGhpcy50b2FzdGVyY29uZmlnLnRhcFRvRGlzbWlzcztcblxuICAgICAgICBpZiAodGFwVG9EaXNtaXNzIHx8ICh0b2FzdC5zaG93Q2xvc2VCdXR0b24gJiYgaXNDbG9zZUJ1dHRvbikpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVG9hc3QodG9hc3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hpbGRDbGljaygkZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmNsaWNrKCRldmVudC52YWx1ZS50b2FzdCwgJGV2ZW50LnZhbHVlLmlzQ2xvc2VCdXR0b24pO1xuICAgIH1cblxuICAgIHJlbW92ZVRvYXN0KHRvYXN0OiBUb2FzdCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMudG9hc3RzLmluZGV4T2YodG9hc3QpO1xuICAgICAgICBpZiAoaW5kZXggPCAwKSB7IHJldHVybiB9O1xuXG4gICAgICAgIGNvbnN0IHRvYXN0SWQgPSB0aGlzLnRvYXN0SWRPckRlZmF1bHQodG9hc3QpO1xuXG4gICAgICAgIHRoaXMudG9hc3RzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgaWYgKHRvYXN0Lm9uSGlkZUNhbGxiYWNrKSB7IHRvYXN0Lm9uSGlkZUNhbGxiYWNrKHRvYXN0KTsgfVxuICAgICAgICB0aGlzLnRvYXN0ZXJTZXJ2aWNlLl9yZW1vdmVUb2FzdFN1YmplY3QubmV4dCh7IHRvYXN0SWQ6IHRvYXN0SWQsIHRvYXN0Q29udGFpbmVySWQ6IHRvYXN0LnRvYXN0Q29udGFpbmVySWQgfSk7XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcbiAgICBwcml2YXRlIHJlZ2lzdGVyU3Vic2NyaWJlcnMoKSB7XG4gICAgICAgIHRoaXMuYWRkVG9hc3RTdWJzY3JpYmVyID0gdGhpcy50b2FzdGVyU2VydmljZS5hZGRUb2FzdC5zdWJzY3JpYmUoKHRvYXN0OiBUb2FzdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRUb2FzdCh0b2FzdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2xlYXJUb2FzdHNTdWJzY3JpYmVyID0gdGhpcy50b2FzdGVyU2VydmljZS5jbGVhclRvYXN0cy5zdWJzY3JpYmUoKGNsZWFyV3JhcHBlcjogSUNsZWFyV3JhcHBlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRvYXN0cyhjbGVhcldyYXBwZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvYXN0KHRvYXN0OiBUb2FzdCkge1xuICAgICAgICBpZiAodG9hc3QudG9hc3RDb250YWluZXJJZCAmJiB0aGlzLnRvYXN0ZXJjb25maWcudG9hc3RDb250YWluZXJJZFxuICAgICAgICAgICAgJiYgdG9hc3QudG9hc3RDb250YWluZXJJZCAhPT0gdGhpcy50b2FzdGVyY29uZmlnLnRvYXN0Q29udGFpbmVySWQpIHsgcmV0dXJuIH07XG5cbiAgICAgICAgaWYgKCF0b2FzdC50eXBlIFxuICAgICAgICAgICAgfHwgIXRoaXMudG9hc3RlcmNvbmZpZy50eXBlQ2xhc3Nlc1t0b2FzdC50eXBlXVxuICAgICAgICAgICAgfHwgIXRoaXMudG9hc3RlcmNvbmZpZy5pY29uQ2xhc3Nlc1t0b2FzdC50eXBlXSkge1xuICAgICAgICAgICAgdG9hc3QudHlwZSA9IHRoaXMudG9hc3RlcmNvbmZpZy5kZWZhdWx0VG9hc3RUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudG9hc3RlcmNvbmZpZy5wcmV2ZW50RHVwbGljYXRlcyAmJiB0aGlzLnRvYXN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAodG9hc3QudG9hc3RJZCAmJiB0aGlzLnRvYXN0cy5zb21lKHQgPT4gdC50b2FzdElkID09PSB0b2FzdC50b2FzdElkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50b2FzdHMuc29tZSh0ID0+IHQuYm9keSA9PT0gdG9hc3QuYm9keSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc051bGxPclVuZGVmaW5lZCh0b2FzdC5zaG93Q2xvc2VCdXR0b24pKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMudG9hc3RlcmNvbmZpZy5zaG93Q2xvc2VCdXR0b24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdG9hc3Quc2hvd0Nsb3NlQnV0dG9uID0gdGhpcy50b2FzdGVyY29uZmlnLnNob3dDbG9zZUJ1dHRvblt0b2FzdC50eXBlXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMudG9hc3RlcmNvbmZpZy5zaG93Q2xvc2VCdXR0b24gPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgIHRvYXN0LnNob3dDbG9zZUJ1dHRvbiA9IDxib29sZWFuPnRoaXMudG9hc3RlcmNvbmZpZy5zaG93Q2xvc2VCdXR0b247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9hc3Quc2hvd0Nsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICB0b2FzdC5jbG9zZUh0bWwgPSB0b2FzdC5jbG9zZUh0bWwgfHwgdGhpcy50b2FzdGVyY29uZmlnLmNsb3NlSHRtbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvYXN0LmJvZHlPdXRwdXRUeXBlID0gdG9hc3QuYm9keU91dHB1dFR5cGUgfHwgdGhpcy50b2FzdGVyY29uZmlnLmJvZHlPdXRwdXRUeXBlO1xuXG4gICAgICAgIGlmICh0aGlzLnRvYXN0ZXJjb25maWcubmV3ZXN0T25Ub3ApIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3RzLnVuc2hpZnQodG9hc3QpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNMaW1pdEV4Y2VlZGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0cy5wb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3RzLnB1c2godG9hc3QpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNMaW1pdEV4Y2VlZGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0cy5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvYXN0Lm9uU2hvd0NhbGxiYWNrKSB7XG4gICAgICAgICAgICB0b2FzdC5vblNob3dDYWxsYmFjayh0b2FzdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTGltaXRFeGNlZWRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9hc3RlcmNvbmZpZy5saW1pdCAmJiB0aGlzLnRvYXN0cy5sZW5ndGggPiB0aGlzLnRvYXN0ZXJjb25maWcubGltaXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVBbGxUb2FzdHMoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnRvYXN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdCh0aGlzLnRvYXN0c1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyVG9hc3RzKGNsZWFyV3JhcHBlcjogSUNsZWFyV3JhcHBlcikge1xuICAgICAgICBjb25zdCB0b2FzdElkID0gY2xlYXJXcmFwcGVyLnRvYXN0SWQgO1xuICAgICAgICBjb25zdCB0b2FzdENvbnRhaW5lcklkID0gY2xlYXJXcmFwcGVyLnRvYXN0Q29udGFpbmVySWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNOdWxsT3JVbmRlZmluZWQodG9hc3RDb250YWluZXJJZCkgfHwgKHRvYXN0Q29udGFpbmVySWQgPT09IHRoaXMudG9hc3RlcmNvbmZpZy50b2FzdENvbnRhaW5lcklkKSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRvYXN0c0FjdGlvbih0b2FzdElkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXJUb2FzdHNBY3Rpb24odG9hc3RJZD86IHN0cmluZykge1xuICAgICAgICBpZiAodG9hc3RJZCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdCh0aGlzLnRvYXN0cy5maWx0ZXIodCA9PiB0LnRvYXN0SWQgPT09IHRvYXN0SWQpWzBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsVG9hc3RzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHRvYXN0SWRPckRlZmF1bHQodG9hc3Q6IFRvYXN0KSB7XG4gICAgICAgIHJldHVybiB0b2FzdC50b2FzdElkIHx8ICcnO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNOdWxsT3JVbmRlZmluZWQodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYWRkVG9hc3RTdWJzY3JpYmVyKSB7IHRoaXMuYWRkVG9hc3RTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7IH1cbiAgICAgICAgaWYgKHRoaXMuY2xlYXJUb2FzdHNTdWJzY3JpYmVyKSB7IHRoaXMuY2xlYXJUb2FzdHNTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7IH1cbiAgICB9XG59XG4iXX0=