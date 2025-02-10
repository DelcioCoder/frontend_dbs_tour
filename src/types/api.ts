export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}



export interface Evaluation {
    id: number;
    object_id: number;
    stars: number;
    comment?: string;
}