export class CircularBuffer<TValue = unknown> {
  private _buffer!: Array<TValue>;

  private _position: number = 0;

  private _full = false;

  constructor(private _capacity: number) {
    if (_capacity < 1) {
      throw new Error("Capacity has to be greater than 1.");
    }

    this._buffer = Array<TValue>(_capacity);
  }

  get buffer(): Array<TValue> {
    return this._buffer;
  }

  get position(): number {
    return this._position;
  }

  get capacity(): number {
    return this._capacity;
  }

  public reset() {
    this._buffer = Array<TValue>(this._capacity);
    this._position = 0;
    this._full = false;
  }

  private pushValue(value: TValue) {
    this._buffer[this.position] = value;

    if (!this._full && this.position === this.capacity - 1) {
      this._full = true;
    }

    this._position = (this.position + 1) % this.capacity;
  }

  public push(...values: TValue[]): this {
    for (const value of values) {
      this.pushValue(value);
    }

    return this;
  }

  private getStartIndexAndSize(): [startIndex: number, size: number] {
    if (this._full) {
      return [this.position, this.capacity];
    }

    return [0, this.position];
  }

  public forEach(callback: (value: TValue, index: number) => void) {
    const [startIndex, size] = this.getStartIndexAndSize();

    for (let i = 0; i < size; i++) {
      const index = (startIndex + i) % size;
      callback(this.buffer[index], i);
    }
  }

  public map<TOutput = unknown>(callback: (value: TValue, index: number) => TOutput): Array<TOutput> {
    const output = Array<TOutput>();

    const [startIndex, size] = this.getStartIndexAndSize();

    for (let i = 0; i < size; i++) {
      const index = (startIndex + i) % size;
      output[i] = callback(this.buffer[index], i);
    }

    return output;
  }

  public get(index: number): TValue | undefined {
    const [startIndex, size] = this.getStartIndexAndSize();

    if (index < 0 || index >= size) return undefined;

    return this.buffer[(startIndex + index) % size];
  }

  public toArray(): Array<TValue> {
    const output = Array<TValue>();

    const [startIndex, size] = this.getStartIndexAndSize();

    for (let i = 0; i < size; i++) {
      const index = (startIndex + i) % size;
      output[i] = this.buffer[index];
    }

    return output;
  }
}
