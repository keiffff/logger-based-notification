export const ERROR_CODE = {
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

export type ErrorCode = typeof ERROR_CODE[keyof typeof ERROR_CODE];

export class ApplicationError extends Error {
  private readonly _message: string;
  private readonly _code: ErrorCode;
  private readonly _metadata: Record<string, unknown>;

  /**
   *
   * @param message メッセージ
   * @param code エラーコード
   * @param metadata 任意のメタデータ
   */
  constructor(message: string, code: ErrorCode, metadata?: Record<string, unknown>) {
    super(message);
    this._message = message;
    this._code = code;
    this._metadata = metadata ?? {};

    Object.setPrototypeOf(this, new.target.prototype);
  }

  get message(): string {
    return this._message;
  }

  get code(): ErrorCode {
    return this._code;
  }

  get metadata(): Record<string, unknown> {
    return this._metadata;
  }
}

export class BadRequestError extends ApplicationError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, ERROR_CODE.BAD_REQUEST, metadata);

    this.name = 'BadRequestError';
  }
}

export class UnAuthenticatedError extends ApplicationError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, ERROR_CODE.UNAUTHENTICATED, metadata);

    this.name = 'UnAuthenticatedError';
  }
}

export class ForbiddenError extends ApplicationError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, ERROR_CODE.FORBIDDEN, metadata);

    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, ERROR_CODE.NOT_FOUND, metadata);

    this.name = 'NotFoundError';
  }
}

export class InternalServerError extends ApplicationError {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, ERROR_CODE.INTERNAL_SERVER_ERROR, metadata);

    this.name = 'InternalServerError';
  }
}
