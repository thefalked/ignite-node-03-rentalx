import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    return dayjs(start_date).diff(end_date, "hours");
  }

  convertToUTC(date: Date): Date {
    const dateConverted = dayjs(date).utc().local().toDate();
    dateConverted.setMilliseconds(0);

    return dateConverted;
  }

  dateNowUTC(): Date {
    const date = dayjs().utc().local().toDate();
    date.setMilliseconds(0);

    return date;
  }

  addHours(date: Date, hours: number): Date {
    return dayjs(date).add(hours, "hour").toDate();
  }
}

export { DayjsDateProvider };
