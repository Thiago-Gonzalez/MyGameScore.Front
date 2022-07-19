import { format } from "date-fns";

export const formatData = (data) => {
    return format(new Date(data), "dd/MM/yyyy");
}