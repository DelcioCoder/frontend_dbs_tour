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
    date_added: string;
    comment?: string;
    user : number;
    content_type: number;
}


export interface User {
    id: number;
    username: string;
}