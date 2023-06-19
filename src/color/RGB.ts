import { HSL } from "./HSL";

export type RGBString = `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number}, ${number}, ${number})`;

export class RGB {
  constructor(private _r: number, private _g: number, private _b: number, private _alpha: number = 1) {}

  // Getters & Setters
  get r(): number {
    return this._r;
  }

  set r(r: number) {
    if (isNaN(r)) return;

    if (r < 0) {
      this._r = 0;
    } else if (r > 255) {
      this._r = 255;
    } else {
      this._r = r;
    }
  }

  get g(): number {
    return this._g;
  }

  set g(g: number) {
    if (isNaN(g)) return;

    if (g < 0) {
      this._g = 0;
    } else if (g > 255) {
      this._g = 255;
    } else {
      this._g = g;
    }
  }

  get b(): number {
    return this._b;
  }

  set b(b: number) {
    if (isNaN(b)) return;

    if (b < 0) {
      this._b = 0;
    } else if (b > 255) {
      this._b = 255;
    } else {
      this._b = b;
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
  static fromHSL(hsl: HSL): RGB {
    const { h, s, l } = hsl;

    const hue2rgb = (p: number, q: number, t: number) => {
      return Math.round(
        (() => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        })() * 255
      );
    };

    if (s == 0) new RGB(l, l, l, hsl.alpha);

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    return new RGB(hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3), hsl.alpha);
  }

  // Ops
  public toString(withAlpha: boolean = false): RGBString {
    if (withAlpha) return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`;
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}
