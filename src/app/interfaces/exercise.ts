import { Body } from './body';

export interface Exercise {
    id?: string;
    body: Body;
    name: string;
    complexity: number;
    comment: string;
}