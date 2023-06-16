/**
 * Represents a string that is a valid time number.
 * It can either be a single digit number or a two-digit number prefixed with 0.
 */
export type TimeNumber = `${number}` | `0${number}`;

/**
 * Represents a string that is a valid time string in the format "HH:MM:SS".
 */
export type TimeString = `${TimeNumber}:${TimeNumber}:${TimeNumber}`;

/**
 * Represents a string that is a valid short time string in the format "HH:MM".
 */
export type TimeShortString = `${TimeNumber}:${TimeNumber}`;

/**
 * Represents an object that stores time information.
 * @export
 * @interface TimeObject
 */
export interface TimeObject {
  /**
   * Hours component of the time.
   * @type {number}
   * @memberof TimeObject
   */
  hours: number;
  /**
   * Minutes component of the time.
   * @type {number}
   * @memberof TimeObject
   */
  minutes: number;
  /**
   * Seconds component of the time (optional).
   * @type {number}
   * @memberof TimeObject
   */
  seconds?: number;
}

/**
 * Parses a time string and returns a TimeObject with all properties required.
 * @param {(TimeShortString | TimeString)} value - Time string to parse.
 * @return Parsed TimeObject.
 */
function parseTimeString(value: TimeShortString | TimeString): Required<TimeObject> {
  const [hours, minutes, seconds] = value.split(":");

  if (Number.isNaN(hours)) throw new Error("Invalid hours.");
  if (Number.isNaN(minutes)) throw new Error("Invalid minutes.");
  if (seconds) {
    if (Number.isNaN(seconds)) throw new Error("Invalid seconds.");

    return {
      hours: Number.parseInt(hours),
      minutes: Number.parseInt(minutes),
      seconds: Number.parseInt(seconds),
    };
  }

  return {
    hours: Number.parseInt(hours),
    minutes: Number.parseInt(minutes),
    seconds: 0,
  };
}

/**
 * Pads a number with leading zeros to ensure it has two digits.
 * @param {number} value - Number to pad.
 * @return Padded number as a string.
 */
function padNumber(value: number): TimeNumber {
  return String(value).padStart(2, "0") as TimeNumber;
}

/**
 * Represents a duration of time.
 * @export
 * @class TimeDuration
 */
export class TimeDuration {
  /**
   * Hours component of the duration.
   * @private
   * @type {number}
   * @memberof TimeDuration
   */
  private _hours: number = 0;

  /**
   * Minutes component of the duration.
   * @private
   * @type {number}
   * @memberof TimeDuration
   */
  private _minutes: number = 0;

  /**
   * Seconds component of the duration.
   * @private
   * @type {number}
   * @memberof TimeDuration
   */
  private _seconds: number = 0;

  /**
   * Creates an instance of TimeDuration.
   * @param {number} hours - Hours component of the duration.
   * @param {number} minutes - Minutes component of the duration.
   * @param {number} [seconds=0] - Seconds component of the duration (optional).
   * @memberof TimeDuration
   */
  constructor(hours: number, minutes: number, seconds: number = 0) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  /**
   * Creates a new TimeDuration instance from a time string or object.
   * @static
   * @param {(TimeShortString | TimeString | TimeObject)} value - Time string or object to create the duration from.
   * @return New TimeDuration instance.
   * @memberof TimeDuration
   */
  static from(value: TimeShortString | TimeString | TimeObject) {
    const parsed = typeof value === "string" ? parseTimeString(value) : value;
    return new TimeDuration(parsed.hours, parsed.minutes, parsed.seconds);
  }

  /**
   * Gets the hours component of the duration.
   * @memberof TimeDuration
   */
  get hours() {
    return this._hours;
  }

  /**
   * Gets the minutes component of the duration.
   * @memberof TimeDuration
   */
  get minutes() {
    return this._minutes;
  }

  /**
   * Gets the seconds component of the duration.
   * @memberof TimeDuration
   */
  get seconds() {
    return this._seconds;
  }

  /**
   * Sets the hours component of the duration.
   * If the provided value is negative, all components of the duration will be reset to zero.
   * @memberof TimeDuration
   */
  set hours(hours: number) {
    if (hours < 0) {
      this.reset();
    } else {
      this._hours = hours;
    }
  }

  /**
   * Sets the minutes component of the duration.
   * If the provided value is negative, the duration will be adjusted accordingly.
   * @memberof TimeDuration
   */
  set minutes(minutes: number) {
    if (minutes < 0) {
      const modMinutes = Math.abs(minutes) % 60;
      this._minutes = modMinutes > 0 ? 60 - modMinutes : 0;
      this.hours += Math.floor(minutes / 60);
    } else if (minutes < 60) {
      this._minutes = minutes;
    } else {
      this._minutes = minutes % 60;
      this.hours += Math.floor(minutes / 60);
    }
  }

  /**
   * Sets the seconds component of the duration.
   * If the provided value is negative, the duration will be adjusted accordingly.
   * @memberof TimeDuration
   */
  set seconds(seconds: number) {
    if (seconds < 0) {
      const modSeconds = Math.abs(seconds) % 60;
      this._seconds = modSeconds > 0 ? 60 - modSeconds : 0;
      this.minutes += Math.floor(seconds / 60);
    } else if (seconds < 60) {
      this._seconds = seconds;
    } else {
      this._seconds = seconds % 60;
      this.minutes += Math.floor(seconds / 60);
    }
  }

  /**
   * Sets the duration using a time string or object.
   * @param {(TimeShortString | TimeString | TimeObject)} value - Time string or object to set the duration from.
   * @return Updated TimeDuration instance.
   * @memberof TimeDuration
   */
  public set(value: TimeShortString | TimeString | TimeObject) {
    const parsed = typeof value === "string" ? parseTimeString(value) : value;

    this.hours = parsed.hours;
    this.minutes = parsed.minutes;
    if (parsed.seconds !== undefined) this.seconds = parsed.seconds;

    return this;
  }

  /**
   * Sets duration to 00:00:00.
   * @memberof TimeDuration
   */
  public reset() {
    this._hours = 0;
    this._minutes = 0;
    this._seconds = 0;
  }

  /**
   * Returns a string representation of the duration in the format "HH:MM:SS".
   * @return Time string representation of the duration.
   * @memberof TimeDuration
   */
  public toString(): TimeString {
    return `${padNumber(this.hours)}:${padNumber(this.minutes)}:${padNumber(this.seconds)}`;
  }

  /**
   * Returns a short string representation of the duration in the format "HH:MM".
   * @return Short time string representation of the duration.
   * @memberof TimeDuration
   */
  public toShortString(): TimeShortString {
    return `${padNumber(this.hours)}:${padNumber(this.minutes)}`;
  }

  /**
   * Returns a JSON object representation of the duration.
   * @return JSON object representation of the duration.
   * @memberof TimeDuration
   */
  public toJSON(): Required<TimeObject> {
    return {
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    };
  }
}

/**
 * Represents a specific time value.
 * @export
 * @class TimeValue
 */
export class TimeValue {
  /**
   * Maximum number of seconds in a day.
   * @private
   * @static
   * @memberof TimeValue
   */
  private static MAX_SECONDS = 24 * 60 * 60;

  /**
   * Hours component of the time value.
   * @private
   * @type {number}
   * @memberof TimeValue
   */
  private _hours: number = 0;

  /**
   * Minutes component of the time value.
   * @private
   * @type {number}
   * @memberof TimeValue
   */
  private _minutes: number = 0;

  /**
   * Seconds component of the time value.
   * @private
   * @type {number}
   * @memberof TimeValue
   */
  private _seconds: number = 0;

  /**
   * Creates an instance of TimeValue.
   * @param {number} hours - Hours component of the time value.
   * @param {number} minutes - Minutes component of the time value.
   * @param {number} [seconds=0] - Seconds component of the time value.
   * @memberof TimeValue
   */
  constructor(hours: number, minutes: number, seconds: number = 0) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  /**
   * Creates a new TimeValue instance from a time string or object.
   * @static
   * @param {(TimeShortString | TimeString | TimeObject)} value - Time string or object to create the TimeValue instance from.
   * @return New TimeValue instance.
   * @memberof TimeValue
   */
  static from(value: TimeShortString | TimeString | TimeObject) {
    const parsed = typeof value === "string" ? parseTimeString(value) : value;
    return new TimeValue(parsed.hours, parsed.minutes, parsed.seconds);
  }

  /**
   * Creates a new TimeValue instance representing the current time.
   * @static
   * @return New TimeValue instance.
   * @memberof TimeValue
   */
  static now() {
    const date = new Date();
    return new TimeValue(date.getHours(), date.getMinutes(), date.getSeconds());
  }

  /**
   * Converts a time value or string to the total number of seconds.
   * @static
   * @param {(TimeValue | TimeShortString | TimeString | TimeObject)} value - Time value or string to convert.
   * @return Total number of seconds.
   * @memberof TimeValue
   */
  static toSeconds(value: TimeValue | TimeShortString | TimeString | TimeObject) {
    const timeValue = value instanceof TimeValue ? value : TimeValue.from(value);
    return (timeValue.hours * 60 + timeValue.minutes) * 60 + timeValue.seconds;
  }

  /**
   * Calculates the duration between two time values or strings.
   * @static
   * @param {(TimeValue | TimeShortString | TimeString | TimeObject)} from - Starting time value or string.
   * @param {(TimeValue | TimeShortString | TimeString | TimeObject)} to - Ending time value or string.
   * @return Calculated time duration.
   * @memberof TimeValue
   */
  static duration(
    from: TimeValue | TimeShortString | TimeString | TimeObject,
    to: TimeValue | TimeShortString | TimeString | TimeObject
  ): TimeDuration {
    const fromSeconds = TimeValue.toSeconds(from);
    const toSeconds = TimeValue.toSeconds(to);

    let difference = 0;
    if (toSeconds > fromSeconds) {
      difference = toSeconds - fromSeconds;
    } else {
      difference = TimeValue.MAX_SECONDS - fromSeconds + toSeconds;
      if (difference === TimeValue.MAX_SECONDS) difference = 0;
    }

    const seconds = Math.abs(difference);
    const minutes = Math.floor(seconds / 60);

    return new TimeDuration(Math.floor(minutes / 60), minutes % 60, seconds % 60);
  }

  /**
   * Gets the hours component of the time value.
   * @memberof TimeValue
   */
  get hours() {
    return this._hours;
  }

  /**
   * Gets the minutes component of the time value.
   * @memberof TimeValue
   */
  get minutes() {
    return this._minutes;
  }

  /**
   * Gets the seconds component of the time value.
   * @memberof TimeValue
   */
  get seconds() {
    return this._seconds;
  }

  /**
   * Sets the hours component of the time value.
   * If the provided value is negative, the time value will be adjusted accordingly.
   * @memberof TimeValue
   */
  set hours(hours: number) {
    if (hours < 0) {
      const modHours = Math.abs(hours) % 24;
      this._hours = modHours > 0 ? 24 - modHours : 0;
    } else if (hours < 24) {
      this._hours = hours;
    } else {
      this._hours = hours % 24;
    }
  }

  /**
   * Sets the minutes component of the time value.
   * If the provided value is negative, the time value will be adjusted accordingly.
   * @memberof TimeValue
   */
  set minutes(minutes: number) {
    if (minutes < 0) {
      const modMinutes = Math.abs(minutes) % 60;
      this._minutes = modMinutes > 0 ? 60 - modMinutes : 0;
      this.hours += Math.floor(minutes / 60);
    } else if (minutes < 60) {
      this._minutes = minutes;
    } else {
      this._minutes = minutes % 60;
      this.hours += Math.floor(minutes / 60);
    }
  }

  /**
   * Sets the seconds component of the time value.
   * If the provided value is negative, the time value will be adjusted accordingly.
   * @memberof TimeValue
   */
  set seconds(seconds: number) {
    if (seconds < 0) {
      const modSeconds = Math.abs(seconds) % 60;
      this._seconds = modSeconds > 0 ? 60 - modSeconds : 0;
      this.minutes += Math.floor(seconds / 60);
    } else if (seconds < 60) {
      this._seconds = seconds;
    } else {
      this._seconds = seconds % 60;
      this.minutes += Math.floor(seconds / 60);
    }
  }

  /**
   * Sets the time value using a time string or object.
   * @param {(TimeShortString | TimeString | TimeObject)} value - Time string or object to set the time value from.
   * @return Updated TimeValue instance.
   * @memberof TimeValue
   */
  public set(value: TimeShortString | TimeString | TimeObject) {
    const parsed = typeof value === "string" ? parseTimeString(value) : value;

    this.hours = parsed.hours;
    this.minutes = parsed.minutes;
    if (parsed.seconds !== undefined) this.seconds = parsed.seconds;

    return this;
  }

  /**
   * Calculates the duration between the current time value and the specified time value.
   * @param {(TimeValue | TimeShortString | TimeString | TimeObject)} from - Time value to calculate the duration from.
   * @return Calculated time duration.
   * @memberof TimeValue
   */
  public durationFrom(from: TimeValue | TimeShortString | TimeString | TimeObject): TimeDuration {
    return TimeValue.duration(from, this);
  }

  /**
   * Calculates the duration between the specified time value and the current time value.
   * @param {(TimeValue | TimeShortString | TimeString | TimeObject)} to - Time value to calculate the duration to.
   * @return Calculated time duration.
   * @memberof TimeValue
   */
  public durationTo(to: TimeValue | TimeShortString | TimeString | TimeObject): TimeDuration {
    return TimeValue.duration(this, to);
  }

  /**
   * Returns a string representation of the time value in the format "HH:MM:SS".
   * @return String representation of the time value.
   * @memberof TimeValue
   */
  public toString(): TimeString {
    return `${padNumber(this.hours)}:${padNumber(this.minutes)}:${padNumber(this.seconds)}`;
  }

  /**
   * Returns a short string representation of the time value in the format "HH:MM".
   * @return Short string representation of the time value.
   * @memberof TimeValue
   */
  public toShortString(): TimeShortString {
    return `${padNumber(this.hours)}:${padNumber(this.minutes)}`;
  }

  /**
   * Returns a JSON object representation of the time value.
   * @return JSON object representation of the time value.
   * @memberof TimeValue
   */
  public toJSON(): Required<TimeObject> {
    return {
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    };
  }
}
