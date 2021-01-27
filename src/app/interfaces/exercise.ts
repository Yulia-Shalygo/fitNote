import { Body } from './body';

export interface Exercise {
    id?: string;
    body: string;
    name: string;
    complexity: number;
    comment: string;
}