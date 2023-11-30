import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare class TrustHtmlPipe implements PipeTransform {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(content: any): SafeHtml;
    static ɵfac: i0.ɵɵFactoryDeclaration<TrustHtmlPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TrustHtmlPipe, "trustHtml", false>;
}
