/**
 * Environment: names storage
 */
class Environment {
  constructor(private record: Record<string, any> = {}) {}

  /**
   * Creates a variable with the given name and value
   */
  define(name: string, value: any) {
    this.record[name] = value
    return value
  }

  /**
   * Returns the value of a defined variable, or throws if the variable is not defined
   */
  lookup(name: string) {
    if (!this.record.hasOwnProperty(name)) {
      throw new ReferenceError(`Variable "${name}" is not defined`)
    }

    return this.record[name]
  }
}

export { Environment }
