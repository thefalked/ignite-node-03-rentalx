interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): Date;
  dateNowUTC(): Date;
  addHours(date: Date, hours: number): Date;
}

export { IDateProvider };
