import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { Injectable, PLATFORM_ID, Inject } from "@angular/core";


@Injectable(
    {
        providedIn: `root`
    }
)
export class LocalRepository {
    private isInBrowser: boolean;
    private static _Instance: LocalRepository;


    public static get Instance(): LocalRepository {
        return LocalRepository._Instance;
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        @Inject(DOCUMENT) private doc: Document) {
        this.isInBrowser = isPlatformBrowser(this.platformId);
        LocalRepository._Instance = this;
    }

    public get IsInMobile(): boolean {
        let userAgent = this.getWindow?.navigator?.userAgent || this.getWindow?.navigator?.vendor;
        if(userAgent){
            let mobile = /android/i.test(userAgent) || /iPhone|ipad|iPod/i.test(userAgent);
            return mobile;
        }
        else {
            return false;
        }
    }

    public get IsInBrowser(): boolean {
        return this.isInBrowser;
    }

    public get getWindow(): Window | null {
        return this.doc.defaultView;
    }

    public get getDocument(): Document {
        return this.doc;
    }
}
