# Time Value Module

The Time Value Module is a TypeScript module that provides classes and functions for working with time durations and time values. It allows you to perform various operations on time durations and time values, such as calculating differences, adding or subtracting durations, and formatting time values.

## Usage

```ts
const time = TimeValue.from("03:06:09");

time.hours += 3; // 06:06:09
time.minutes += 6; // 06:12:09
time.seconds += 9; // 06:12:18

time.minutes += 66; // 07:18:09

console.log(time.toString()) // Output: "07:18:09"

const duration = time.durationTo("04:07:10");
console.log(duration.toString()) // Output: "01:01:01"
```