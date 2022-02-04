interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): Date;
  dateNowUTC(): Date;
  addHours(date: Date, hours: number): Date;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(date: Date, days: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
