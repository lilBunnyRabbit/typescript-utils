import { TimeDuration, TimeValue } from "../src";

describe("TimeValue class", () => {
  test("can create", () => {
    const time = new TimeValue(3, 6, 9);

    expect(time).toBeDefined();
    expect(time).toBeInstanceOf(TimeValue);

    expect(time.hours).toBe(3);
    expect(time.minutes).toBe(6);
    expect(time.seconds).toBe(9);

    expect(time.toString()).toBe("03:06:09");
    expect(time.toShortString()).toBe("03:06");

    expect(time.toJSON()).toEqual({
      hours: 3,
      minutes: 6,
      seconds: 9,
    });
  });

  test("can create from TimeShortString", () => {
    const time = TimeValue.from("03:06");

    expect(time.hours).toBe(3);
    expect(time.minutes).toBe(6);
    expect(time.seconds).toBe(0);

    expect(time.toString()).toBe("03:06:00");
    expect(time.toShortString()).toBe("03:06");

    expect(time.toJSON()).toEqual({
      hours: 3,
      minutes: 6,
      seconds: 0,
    });
  });

  test("can create from TimeString", () => {
    const time = TimeValue.from("03:06:09");

    expect(time.hours).toBe(3);
    expect(time.minutes).toBe(6);
    expect(time.seconds).toBe(9);

    expect(time.toString()).toBe("03:06:09");
    expect(time.toShortString()).toBe("03:06");

    expect(time.toJSON()).toEqual({
      hours: 3,
      minutes: 6,
      seconds: 9,
    });
  });

  test("can create from TimeObject", () => {
    const time = TimeValue.from({
      hours: 3,
      minutes: 6,
    });

    expect(time.hours).toBe(3);
    expect(time.minutes).toBe(6);
    expect(time.seconds).toBe(0);

    expect(time.toString()).toBe("03:06:00");
    expect(time.toShortString()).toBe("03:06");

    expect(time.toJSON()).toEqual({
      hours: 3,
      minutes: 6,
      seconds: 0,
    });
  });

  test("can create for current time", () => {
    const time = TimeValue.now();

    expect(time).toBeDefined();
    expect(time).toBeInstanceOf(TimeValue);
  });

  test("can set values", () => {
    const time = TimeValue.from("03:06:09");

    expect(time.toString()).toBe("03:06:09");

    time.set("01:02:03");
    expect(time.toString()).toBe("01:02:03");

    time.set("04:05");
    expect(time.toString()).toBe("04:05:00");

    time.set({
      hours: 1,
      minutes: 2,
    });
    expect(time.toString()).toBe("01:02:00");

    time.set({
      hours: 4,
      minutes: 5,
      seconds: 6,
    });
    expect(time.toString()).toBe("04:05:06");
  });

  test("can update hours", () => {
    const time = TimeValue.from("03:06:09");

    expect(time.toString()).toBe("03:06:09");

    // Normal
    time.hours += 1;
    expect(time.toString()).toBe("04:06:09");

    time.hours -= 1;
    expect(time.toString()).toBe("03:06:09");

    // To 00
    time.hours += 21;
    expect(time.toString()).toBe("00:06:09");

    time.set("03:06:09");
    time.hours -= 3;
    expect(time.toString()).toBe("00:06:09");

    // 24h
    time.set("03:06:09");
    time.hours += 24;
    expect(time.toString()).toBe("03:06:09");

    time.hours -= 24;
    expect(time.toString()).toBe("03:06:09");

    time.set("00:00:00");
    time.hours += 24;
    expect(time.toString()).toBe("00:00:00");

    time.hours -= 24;
    expect(time.toString()).toBe("00:00:00");

    // Over 24h
    time.set("03:06:09");
    time.hours += 36;
    expect(time.toString()).toBe("15:06:09");

    time.hours -= 36;
    expect(time.toString()).toBe("03:06:09");
  });

  test("can update minutes", () => {
    const time = TimeValue.from("03:06:09");

    expect(time.toString()).toBe("03:06:09");

    // Normal
    time.minutes += 1;
    expect(time.toString()).toBe("03:07:09");

    time.minutes -= 1;
    expect(time.toString()).toBe("03:06:09");

    // To 00
    time.minutes += 54;
    expect(time.toString()).toBe("04:00:09");

    time.set("03:06:09");
    time.minutes -= 6;
    expect(time.toString()).toBe("03:00:09");

    // 60min
    time.set("03:06:09");
    time.minutes += 60;
    expect(time.toString()).toBe("04:06:09");

    time.minutes -= 60;
    expect(time.toString()).toBe("03:06:09");

    time.set("00:00:00");
    time.minutes += 60;
    expect(time.toString()).toBe("01:00:00");

    time.minutes -= 60;
    expect(time.toString()).toBe("00:00:00");

    // Over 60min
    time.set("03:06:09");
    time.minutes += 66;
    expect(time.toString()).toBe("04:12:09");

    time.minutes -= 66;
    expect(time.toString()).toBe("03:06:09");
  });

  test("can update seconds", () => {
    const time = TimeValue.from("03:06:09");

    expect(time.toString()).toBe("03:06:09");

    // Normal
    time.seconds += 1;
    expect(time.toString()).toBe("03:06:10");

    time.seconds -= 1;
    expect(time.toString()).toBe("03:06:09");

    // To 00
    time.seconds += 51;
    expect(time.toString()).toBe("03:07:00");

    time.set("03:06:09");
    time.seconds -= 9;
    expect(time.toString()).toBe("03:06:00");

    // 60s
    time.set("03:06:09");
    time.seconds += 60;
    expect(time.toString()).toBe("03:07:09");

    time.seconds -= 60;
    expect(time.toString()).toBe("03:06:09");

    time.set("00:00:00");
    time.seconds += 60;
    expect(time.toString()).toBe("00:01:00");

    time.seconds -= 60;
    expect(time.toString()).toBe("00:00:00");

    // Over 60s
    time.set("03:06:09");
    time.seconds += 66;
    expect(time.toString()).toBe("03:07:15");

    time.seconds -= 66;
    expect(time.toString()).toBe("03:06:09");

    // Over 1h
    time.set("03:06:09");
    time.seconds += 3666;
    expect(time.toString()).toBe("04:07:15");

    time.set("03:06:09");
    time.seconds -= 3666;
    expect(time.toString()).toBe("02:05:03");
  });

  test("can get duration", () => {
    const duration = TimeValue.duration("02:05:08", "03:06:09");
    expect(duration).toBeDefined();
    expect(duration).toBeInstanceOf(TimeDuration);

    // Can use all value types
    expect(TimeValue.duration(TimeValue.from("02:05:08"), TimeValue.from("03:06:09")).toString()).toBe("01:01:01");
    expect(TimeValue.duration("02:05:08", "03:06:09").toString()).toBe("01:01:01");
    expect(TimeValue.duration("02:05", "03:06").toString()).toBe("01:01:00");
    expect(
      TimeValue.duration({ hours: 2, minutes: 5, seconds: 8 }, { hours: 3, minutes: 6, seconds: 9 }).toString()
    ).toBe("01:01:01");
    expect(TimeValue.duration({ hours: 2, minutes: 5 }, { hours: 3, minutes: 6 }).toString()).toBe("01:01:00");

    // The same time
    expect(TimeValue.duration("03:06:09", "03:06:09").toString()).toBe("00:00:00");

    expect(TimeValue.duration("03:06:09", "03:06:08").toString()).toBe("23:59:59");
  });

  test("can get duration to", () => {
    const time = TimeValue.from("03:06:09");

    const duration = time.durationTo("03:06:09");
    expect(duration).toBeDefined();
    expect(duration).toBeInstanceOf(TimeDuration);

    // Can use all value types
    expect(time.durationTo("04:07:10").toString()).toBe("01:01:01");
    expect(time.durationTo("04:07").toString()).toBe("01:00:51");
    expect(time.durationTo({ hours: 4, minutes: 7 }).toString()).toBe("01:00:51");
    expect(time.durationTo({ hours: 4, minutes: 7, seconds: 10 }).toString()).toBe("01:01:01");

    // The same time
    expect(time.durationTo("03:06:09").toString()).toBe("00:00:00");

    expect(time.durationTo("03:06:08").toString()).toBe("23:59:59");
  });

  test("can get duration from", () => {
    const time = TimeValue.from("03:06:09");

    const duration = time.durationFrom("03:06:09");
    expect(duration).toBeDefined();
    expect(duration).toBeInstanceOf(TimeDuration);

    // Can use all value types
    expect(time.durationFrom("02:05:08").toString()).toBe("01:01:01");
    expect(time.durationFrom("02:05").toString()).toBe("01:01:09");
    expect(time.durationFrom({ hours: 2, minutes: 5 }).toString()).toBe("01:01:09");
    expect(time.durationFrom({ hours: 2, minutes: 5, seconds: 8 }).toString()).toBe("01:01:01");

    // The same time
    expect(time.durationFrom("03:06:09").toString()).toBe("00:00:00");

    expect(time.durationFrom("03:06:10").toString()).toBe("23:59:59");
  });
});

describe("TimeDuration class", () => {
  test("can create", () => {
    const duration = new TimeDuration(3, 6, 9);

    expect(duration).toBeDefined();
    expect(duration).toBeInstanceOf(TimeDuration);

    expect(duration.hours).toBe(3);
    expect(duration.minutes).toBe(6);
    expect(duration.seconds).toBe(9);

    expect(duration.toString()).toBe("03:06:09");
    expect(duration.toShortString()).toBe("03:06");

    expect(duration.toJSON()).toEqual({
      hours: 3,
      minutes: 6,
      seconds: 9,
    });
  });

  test("can create from TimeShortString", () => {
    const duration = TimeDuration.from("03:06");

    expect(duration.hours).toBe(3);
    expect(duration.minutes).toBe(6);
    expect(duration.seconds).toBe(0);

    expect(duration.toString()).toBe("03:06:00");
    expect(duration.toShortString()).toBe("03:06");

    expect(duration.toJSON()).toEqual({
      hours: 3,
      minutes: 6,
      seconds: 0,
    });
  });

  test("can create from TimeString", () => {
    const duration = TimeDuration.from("03:06:09");

    expect(duration.hours).toBe(3);
    expect(duration.minutes).toBe(6);
    expect(duration.seconds).toBe(9);

    expect(duration.toString()).toBe("03:06:09");
    expect(duration.toShortString()).toBe("03:06");

    expect(duration.toJSON()).toEqual({
      hours: 3,
      minutes: 6,
      seconds: 9,
    });
  });

  test("can create from TimeObject", () => {
    const duration = TimeDuration.from({
      hours: 3,
      minutes: 6,
    });

    expect(duration.hours).toBe(3);
    expect(duration.minutes).toBe(6);
    expect(duration.seconds).toBe(0);

    expect(duration.toString()).toBe("03:06:00");
    expect(duration.toShortString()).toBe("03:06");

    expect(duration.toJSON()).toEqual({
      hours: 3,
      minutes: 6,
      seconds: 0,
    });
  });

  test("can set values", () => {
    const duration = TimeDuration.from("03:06:09");

    expect(duration.toString()).toBe("03:06:09");

    duration.set("01:02:03");
    expect(duration.toString()).toBe("01:02:03");

    duration.set("04:05");
    expect(duration.toString()).toBe("04:05:00");

    duration.set({
      hours: 1,
      minutes: 2,
    });
    expect(duration.toString()).toBe("01:02:00");

    duration.set({
      hours: 4,
      minutes: 5,
      seconds: 6,
    });
    expect(duration.toString()).toBe("04:05:06");
  });

  test("can reset", () => {
    const duration = TimeDuration.from("03:06:09");

    expect(duration.toString()).toBe("03:06:09");

    duration.reset();
    expect(duration.toString()).toBe("00:00:00");
  });

  test("can update hours", () => {
    const duration = TimeDuration.from("03:06:09");

    expect(duration.toString()).toBe("03:06:09");

    // Normal
    duration.hours += 1;
    expect(duration.toString()).toBe("04:06:09");

    duration.hours -= 1;
    expect(duration.toString()).toBe("03:06:09");

    // To 00
    duration.hours -= 3;
    expect(duration.toString()).toBe("00:06:09");

    // To negative
    duration.hours = -1;
    expect(duration.toString()).toBe("00:00:00");

    // Can set more than 24 hours
    duration.hours = 48;
    expect(duration.toString()).toBe("48:00:00");
  });

  test("can update minutes", () => {
    const duration = TimeDuration.from("03:06:09");

    expect(duration.toString()).toBe("03:06:09");

    // Normal
    duration.minutes += 1;
    expect(duration.toString()).toBe("03:07:09");

    duration.minutes -= 1;
    expect(duration.toString()).toBe("03:06:09");

    // To 00
    duration.minutes += 54;
    expect(duration.toString()).toBe("04:00:09");

    duration.set("03:06:09");
    duration.minutes -= 6;
    expect(duration.toString()).toBe("03:00:09");

    // 60min
    duration.set("03:06:09");
    duration.minutes += 60;
    expect(duration.toString()).toBe("04:06:09");

    duration.minutes -= 60;
    expect(duration.toString()).toBe("03:06:09");

    duration.set("00:00:00");
    duration.minutes += 60;
    expect(duration.toString()).toBe("01:00:00");

    duration.minutes -= 60;
    expect(duration.toString()).toBe("00:00:00");

    // Over 60min
    duration.set("03:06:09");
    duration.minutes += 66;
    expect(duration.toString()).toBe("04:12:09");

    duration.minutes -= 66;
    expect(duration.toString()).toBe("03:06:09");
  });

  test("can update seconds", () => {
    const duration = TimeDuration.from("03:06:09");

    expect(duration.toString()).toBe("03:06:09");

    // Normal
    duration.seconds += 1;
    expect(duration.toString()).toBe("03:06:10");

    duration.seconds -= 1;
    expect(duration.toString()).toBe("03:06:09");

    // To 00
    duration.seconds += 51;
    expect(duration.toString()).toBe("03:07:00");

    duration.set("03:06:09");
    duration.seconds -= 9;
    expect(duration.toString()).toBe("03:06:00");

    // 60s
    duration.set("03:06:09");
    duration.seconds += 60;
    expect(duration.toString()).toBe("03:07:09");

    duration.seconds -= 60;
    expect(duration.toString()).toBe("03:06:09");

    duration.set("00:00:00");
    duration.seconds += 60;
    expect(duration.toString()).toBe("00:01:00");

    duration.seconds -= 60;
    expect(duration.toString()).toBe("00:00:00");

    // Over 60s
    duration.set("03:06:09");
    duration.seconds += 66;
    expect(duration.toString()).toBe("03:07:15");

    duration.seconds -= 66;
    expect(duration.toString()).toBe("03:06:09");

    // Over 1h
    duration.set("03:06:09");
    duration.seconds += 3666;
    expect(duration.toString()).toBe("04:07:15");

    duration.set("03:06:09");
    duration.seconds -= 3666;
    expect(duration.toString()).toBe("02:05:03");
  });
});
