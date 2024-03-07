/**
 * The {@link EventEmitter} class provides a powerful and flexible mechanism for managing and handling custom events,
 * similar in functionality to the standard {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/EventTarget EventTarget}
 * interface found in web APIs.
 * This class allows for easy creation of event-driven architectures in {@link https://www.typescriptlang.org/ TypeScript} applications,
 * enabling objects to publish events to which other parts of the application can subscribe.
 * It's particularly beneficial in scenarios where you need to implement custom event logic or
 * when working outside of environments where {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/EventTarget EventTarget}
 * is not available or suitable.
 * With {@link EventEmitter}, you can define event types, emit events, and dynamically attach or detach event listeners,
 * all within a type-safe and intuitive API.
 *
 * ## Usage
 *
 * ### Creating an {@link EventEmitter}
 *
 * Start by creating an instance of the {@link EventEmitter} class.
 * You can define the types of events it will handle using a {@link https://www.typescriptlang.org/ TypeScript} interface.
 *
 * ```ts
 * type MyEvents = {
 *   data: string;
 *   loaded: void;
 *   error: Error;
 * }
 *
 * const emitter = new EventEmitter<MyEvents>();
 * ```
 *
 * ### Registering Event Listeners
 *
 * To listen for events, use the {@link EventEmitter.on} method.
 * Define the event type and provide a callback function that will be executed when the event is emitted.
 *
 * ```ts
 * emitter.on("data", (data: string) => {
 *   console.log("Data", data);
 * });
 *
 * emitter.on("loaded", function () {
 *   console.log(
 *     "Emitter loaded",
 *     this // EventEmitter<MyEvents>
 *   );
 * });
 *
 * emitter.on("error", (error: Error) => {
 *   console.error(`Error: ${error.message}`);
 * });
 * ```
 *
 * ### Removing Event Listeners
 *
 * You can remove a specific event listener by using the {@link EventEmitter.off} method,
 * specifying the event type and the listener to remove.
 *
 * ```ts
 * const onError = (error: Error) => console.error(error);
 *
 * emitter.on("error", onError);
 *
 * // ...
 *
 * emitter.off("error", onError);
 * ```
 *
 * ### Emitting Events
 *
 * Use the {@link EventEmitter.emit} method to trigger an event.
 * This will invoke all registered listeners for that event type.
 *
 * ```ts
 * emitter.emit("data", "Sample data");
 * emitter.emit("loaded");
 * emitter.emit("error", new Error("Oh no!"));
 * ```
 *
 * ### Extending {@link EventEmitter}
 *
 * For more specialized use cases, you can extend the {@link EventEmitter} class.
 * This allows you to create a custom event emitter with additional methods or properties tailored to specific needs.
 * When extending, you can still take full advantage of the type safety and event handling features of the base class.
 *
 * ```ts
 * type MyServiceEvents = {
 *   dataLoaded: string;
 *   error: Error;
 * }
 *
 * // Extending the EventEmitter class
 * class MyService extends EventEmitter<MyServiceEvents> {
 *   // Custom method
 *   loadData() {
 *     try {
 *       // Load data and emit a `dataLoaded` event
 *       const data = "Sample Data";
 *       this.emit("dataLoaded", data);
 *     } catch (error) {
 *       // Emit an `error` event
 *       this.emit("error", error);
 *     }
 *   }
 * }
 *
 * const service = new MyService();
 *
 * service.on("dataLoaded", function (data) {
 *   console.log(
 *     `Data loaded: ${data}`,
 *     this // MyService
 *   );
 * });
 *
 * service.on("error", (error) => console.error(`Error: ${error.message}`));
 *
 * // Using the custom method
 * myEmitter.loadData();
 * ```
 *
 * In this example, `MyService` extends the {@link EventEmitter} class, adding a custom method `loadData`.
 * This method demonstrates how to {@link EventEmitter.emit} `dataLoaded` and `error` events,
 * integrating the event-emitting functionality into a more complex operation.
 *
 * @packageDocumentation
 */

/**
 * Defines a function type for event listeners.
 * The context (`this`) within the listener function is bound to the instance of the {@link EventEmitter}.
 * This design allows for strongly typed event handling, based on the specified event types and their associated data.
 *
 * @template TEvents - An object type mapping event names to their associated data types.
 * @template TData - The type of data that the event listener expects to receive. Can be void if no data is passed with the event.
 * @template TEmitter - The specific type of the {@link EventEmitter} instance to which the listener is bound.
 */
export type EventListener<
  TEvents extends Record<PropertyKey, unknown>,
  TData,
  TEmitter extends EventEmitter<TEvents>
> = (this: TEmitter, ...data: TData extends void ? [] : [data: TData]) => void | Promise<void>;

/**
 * Event emitter class capable of emitting and listening for typed events.
 * It enables the creation of a strongly-typed, custom event handling system.
 *
 * @template TEvents - An object type mapping event names to their associated data types. Each key represents an event name, and its value represents the type of data associated with that event.
 *
 * @example
 * ```ts
 * type MyEvents = {
 *   data: string;
 *   loaded: void;
 *   error: Error;
 * }
 *
 * const emitter = new EventEmitter<MyEvents>();
 * ```
 */
export class EventEmitter<TEvents extends Record<PropertyKey, unknown>> {
  private _events: Partial<{
    [TType in keyof TEvents]: Array<EventListener<TEvents, TEvents[TType], this>>;
  }> = {};

  /**
   * Adds an event listener for a specified event type.
   * This method allows you to specify which event you are interested in listening to
   * and to provide a callback function that will be executed whenever that event is emitted.
   *
   * @template TType - Event type.
   * @param type - The identifier for the event type to listen for.
   * @param listener - The callback function that will be called when the event is emitted.
   * @returns The {@link EventEmitter} instance itself, allowing for method chaining.
   *
   * @example
   * ```ts
   * emitter.on("data", (data: string) => {
   *   console.log("Data", data);
   * });
   *
   * emitter.on("loaded", function () {
   *   console.log(
   *     "Emitter loaded",
   *     this // EventEmitter<MyEvents>
   *   );
   * });
   *
   * emitter.on("error", (error: Error) => {
   *   console.error(`Error: ${error.message}`);
   * });
   * ```
   */
  public on<TType extends keyof TEvents>(type: TType, listener: EventListener<TEvents, TEvents[TType], this>): this {
    if (!(type in this._events)) {
      this._events[type] = [];
    }

    this._events[type]!.push(listener);

    return this;
  }

  /**
   * Removes a previously registered event listener for a specified event type.
   * Use this method to unregister listeners when they are no longer needed, preventing potential memory leaks.
   *
   * @template TType - Event type.
   * @param type - The identifier for the event type from which to remove the listener.
   * @param listener - The callback function to unregister.
   * @return The {@link EventEmitter} instance itself, allowing for method chaining.
   *
   * @example
   * ```ts
   * const onError = (error: Error) => console.error(error);
   *
   * emitter.on("error", onError);
   *
   * // ...
   *
   * emitter.off("error", onError);
   * ```
   */
  public off<TType extends keyof TEvents>(type: TType, listener: EventListener<TEvents, TEvents[TType], this>): this {
    if (this._events[type] !== undefined) {
      this._events[type] = this._events[type]!.filter((savedListener) => savedListener !== listener);
    }

    return this;
  }

  /**
   * Emits an event of a specific type, invoking all registered listeners for that event type with the provided data.
   *
   * @template TType - Event type.
   * @param type - The identifier for the event type to emit.
   * @param data - The data to pass to the event listeners. The type of this data is defined by the corresponding value in TEvents.
   * @return The {@link EventEmitter} instance itself, allowing for method chaining.
   *
   * @example
   * ```ts
   * emitter.emit("data", "Sample data");
   * emitter.emit("loaded");
   * emitter.emit("error", new Error("Oh no!"));
   * ```
   */
  public emit<TType extends keyof TEvents>(
    type: TType,
    ...data: TEvents[TType] extends void ? [] : [data: TEvents[TType]]
  ): this {
    this._events[type]?.forEach((listener) => listener.apply(this, data));

    return this;
  }
}
