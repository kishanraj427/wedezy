/**
 * Domain errors carry the form field they belong to, so callers can render them
 * inline instead of dumping a message into an alert.
 */
export class DomainError extends Error {
  readonly field?: string

  constructor(message: string, field?: string) {
    super(message)
    this.name = 'DomainError'
    this.field = field
  }
}

export class DateUnavailableError extends DomainError {
  constructor(message = 'That date is already booked at this venue.') {
    super(message, 'date')
    this.name = 'DateUnavailableError'
  }
}

export class InvalidDateError extends DomainError {
  constructor(message = 'Pick a date between today and 18 months from now.') {
    super(message, 'date')
    this.name = 'InvalidDateError'
  }
}

export class OverCapacityError extends DomainError {
  constructor(max: number) {
    super(`This venue seats up to ${max} guests.`, 'guests')
    this.name = 'OverCapacityError'
  }
}

export class EmailInUseError extends DomainError {
  constructor(message = 'An account with this email already exists.') {
    super(message, 'email')
    this.name = 'EmailInUseError'
  }
}

export class InvalidCredentialsError extends DomainError {
  constructor(message = 'Email or password is incorrect.') {
    super(message)
    this.name = 'InvalidCredentialsError'
  }
}

export class NotAuthenticatedError extends DomainError {
  constructor(message = 'Sign in to continue.') {
    super(message)
    this.name = 'NotAuthenticatedError'
  }
}

export class NotOwnerError extends DomainError {
  constructor(message = 'This booking belongs to another account.') {
    super(message)
    this.name = 'NotOwnerError'
  }
}

export class NotFoundError extends DomainError {
  constructor(what: string) {
    super(`${what} not found.`)
    this.name = 'NotFoundError'
  }
}

export class StorageFullError extends DomainError {
  constructor(message = 'Local storage is full — clear some space and try again.') {
    super(message)
    this.name = 'StorageFullError'
  }
}

export function isDomainError(error: unknown): error is DomainError {
  return error instanceof DomainError
}

/** Message safe to show a user, for any thrown value. */
export function toMessage(error: unknown): string {
  if (isDomainError(error)) return error.message
  if (error instanceof Error) return error.message
  return 'Something went wrong. Please try again.'
}
