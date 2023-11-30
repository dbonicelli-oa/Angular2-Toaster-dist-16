import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { ToasterContainerComponent } from './toaster-container.component';
import { ToasterService } from './toaster.service';
import { TrustHtmlPipe } from './trust-html.pipe';
import * as i0 from "@angular/core";
export class ToasterModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYW5ndWxhcjItdG9hc3Rlci9zcmMvbGliL3RvYXN0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFjbEQsTUFBTSxPQUFPLGFBQWE7SUFDdEIsTUFBTSxDQUFDLE9BQU87UUFDVixPQUFPO1lBQ0gsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLENBQUMsY0FBYyxFQUFFLHlCQUF5QixDQUFDO1NBQ3pELENBQUE7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPO1lBQ0gsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDekMsQ0FBQTtJQUNMLENBQUM7dUVBYlEsYUFBYTs0REFBYixhQUFhO2dFQVhaLFlBQVk7O3VGQVdiLGFBQWE7Y0FaekIsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFO29CQUNWLGNBQWM7b0JBQ2QseUJBQXlCO29CQUN6QixhQUFhO2lCQUNoQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wseUJBQXlCO29CQUN6QixjQUFjO2lCQUNqQjthQUNKOzt3RkFDWSxhQUFhLG1CQVRsQixjQUFjO1FBQ2QseUJBQXlCO1FBQ3pCLGFBQWEsYUFKUCxZQUFZLGFBT2xCLHlCQUF5QjtRQUN6QixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUb2FzdENvbXBvbmVudCB9IGZyb20gJy4vdG9hc3QuY29tcG9uZW50JztcbmltcG9ydCB7IFRvYXN0ZXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3RvYXN0ZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUb2FzdGVyU2VydmljZSB9IGZyb20gJy4vdG9hc3Rlci5zZXJ2aWNlJztcbmltcG9ydCB7IFRydXN0SHRtbFBpcGUgfSBmcm9tICcuL3RydXN0LWh0bWwucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFRvYXN0Q29tcG9uZW50LFxuICAgICAgICBUb2FzdGVyQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBUcnVzdEh0bWxQaXBlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFRvYXN0ZXJDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIFRvYXN0Q29tcG9uZW50XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdGVyTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFRvYXN0ZXJNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBUb2FzdGVyTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbVG9hc3RlclNlcnZpY2UsIFRvYXN0ZXJDb250YWluZXJDb21wb25lbnRdXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZm9yQ2hpbGQoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUb2FzdGVyTW9kdWxlPiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogVG9hc3Rlck1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1RvYXN0ZXJDb250YWluZXJDb21wb25lbnRdXG4gICAgICAgIH1cbiAgICB9XG4gfVxuIl19