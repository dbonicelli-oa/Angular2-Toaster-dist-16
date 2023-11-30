import { OnInit, OnDestroy } from '@angular/core';
import { ToasterConfig } from './toaster-config';
import { ToasterService } from './toaster.service';
import { Toast } from './toast';
import * as i0 from "@angular/core";
export declare class ToasterContainerComponent implements OnInit, OnDestroy {
    private addToastSubscriber;
    private clearToastsSubscriber;
    private toasterService;
    toasterconfig: ToasterConfig;
    toasts: Toast[];
    constructor(toasterService: ToasterService);
    ngOnInit(): void;
    click(toast: Toast, isCloseButton?: boolean): void;
    childClick($event: any): void;
    removeToast(toast: Toast): void;
    private registerSubscribers;
    private addToast;
    private isLimitExceeded;
    private removeAllToasts;
    private clearToasts;
    private clearToastsAction;
    private toastIdOrDefault;
    private isNullOrUndefined;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToasterContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToasterContainerComponent, "toaster-container", never, { "toasterconfig": { "alias": "toasterconfig"; "required": false; }; }, {}, never, never, false, never>;
}
