import { RGB } from "./RGB";

export type HSLString = `hsl(${number}, ${number}%, ${number}%)` | `hsla(${number}, ${number}%, ${number}%, ${number})`;

export class HSL {
  constructor(private _h: number, private _s: number, private _l: number, private _alpha: number = 1) {}

  // Getters & Setters
  get h(): number {
    return this._h;
  }

  set h(h: number) {
    if (isNaN(h)) return;

    if (h < 0) {
      this._h = 0;
    } else if (h > 360) {
      this._h = 360;
    } else {
      this._h = h;
    }
  }

  get s(): number {
    return this._s;
  }

  set s(s: number) {
    if (isNaN(s)) return;

    if (s < 0) {
      this._s = 0;
    } else if (s > 1) {
      this._s = 1;
    } else {
      this._s = s;
    }
  }

  get l(): number {
    return this._l;
  }

  set l(l: number) {
    if (isNaN(l)) return;

    if (l < 0) {
      this._l = 0;
    } else if (l > 1) {
      this._l = 1;
    } else {
      this._l = l;
    }
  }

  get alpha(): number {
    return this._alpha;
  }

  set alpha(alpha: number | undefined) {
    if (alpha === undefined) {
      this._alpha = 1;
    } else {
      if (isNaN(alpha)) return;

      if (alpha < 0) {
        this._alpha = 0;
      } else if (alpha > 1) {
        this._alpha = 1;
      } else {
        this._alpha = alpha;
      }
    }
  }

  // Init
  static fromRGB(rgb: RGB): HSL {
    let { r, g, b } = rgb;

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    // Achromatic
    if (max === min) return new HSL(h, s, l, rgb.alpha);

    const diff = max - min;
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }

    h /= 6;

    return new HSL(h, s, l, rgb.alpha);
  }

  // Ops
  public toString(withAlpha: boolean = false): HSLString {
    if (withAlpha) return `hsla(${this.h}, ${this.s * 100}%, ${this.l * 100}%, ${this.alpha})`;
    return `hsl(${this.h}, ${this.s * 100}%, ${this.l * 100}%)`;
  }
}
