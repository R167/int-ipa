declare module "konami-code" {
  export default class Konami {
    constructor();
    listen(callback: () => void): void;
  }
}
