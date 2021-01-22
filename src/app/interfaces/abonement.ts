import { Shape } from "./shape";

export interface Abonement {
    id?: string;
    start_date?: moment.Moment;
    end_date?: moment.Moment;
    shape: Shape;
    trainer?: string;
}