/* @flow */

export interface State {
  enter(input: unknown): void;
  exit(): void;
  render(): void;
  update(delta: number): void;
}

export class BaseState implements State {
  enter (input: unknown) {}
  exit () {}
  render () {}
  update (delta: number) {}
}
