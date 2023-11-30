import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./toast.component";
import * as i2 from "./toaster-container.component";
import * as i3 from "./trust-html.pipe";
import * as i4 from "@angular/common";
export declare class ToasterModule {
    static forRoot(): ModuleWithProviders<ToasterModule>;
    static forChild(): ModuleWithProviders<ToasterModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToasterModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ToasterModule, [typeof i1.ToastComponent, typeof i2.ToasterContainerComponent, typeof i3.TrustHtmlPipe], [typeof i4.CommonModule], [typeof i2.ToasterContainerComponent, typeof i1.ToastComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ToasterModule>;
}
