import { Shape } from "./shape.model";

export interface Abonement {
    id?: string;
    start_date?: moment.Moment;
    end_date?: moment.Moment;
    shape: number; // Shape;
    trainer?: string;
    userId?: string;
    comment?: string;
};