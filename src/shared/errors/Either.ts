export class Either {
  left: any;
  right: any;

  constructor(left: any, right: any) {
    this.left = left;
    this.right = right;
  }

  static Left(left: any) {
    return new Either(left, null);
  }

  static Right(right: any) {
    return new Either(null, right);
  }

  static fieldAlreadyInUse(value: string) {
    return { message: `${value} cannot be used` };
  }

  static Error(value: string) {
    return { message: value };
  }

  fold(leftFn: any, rightFn: any) {
    return this.left !== null ? leftFn(this.left) : rightFn(this.right);
  }
}
