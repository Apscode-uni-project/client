import { differenceInDays } from "date-fns";

export const CalculateAgeInDays = (birthday) => {
    const today = new Date();
    return differenceInDays(today, birthday);
};