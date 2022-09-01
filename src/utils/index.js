import { format } from "date-fns";

export const formatDateBr = (date) => {
    return format(new Date(date), "dd/MM/yyyy");
}

export const formatDateISO = (date) => {
    return format(new Date(date), "yyyy-MM-dd");
}