export interface Starship{
    name :string,
    model: string,
    manufacturer: string,
    crew: string,
    passanger: string,
    hyperdrive_rating : string,
    // cost_in_credits: string,
    // length: string;
    // url: string;
}
export interface SwapiListResponse<T>{
    count: number,
    next: String |null;
    previous: String|null;
    results: T[];
}