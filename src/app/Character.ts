import WorldObject, { WorldObjectConstructorParams } from './WorldObject';

type CharacterConstructorParams = WorldObjectConstructorParams & {
  radius: number;
  
};

export default class Character extends WorldObject {
  private radius: number;

  constructor(params: CharacterConstructorParams) {
    super(params);
    this.radius = params.radius
  }

  public getState() {
    return {
      ...super.getState(),
      radius: this.radius
    };
  }
}
