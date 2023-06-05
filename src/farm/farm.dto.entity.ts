export class CreateFarmDto {
  /**
   * @minLength 3
   */
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
