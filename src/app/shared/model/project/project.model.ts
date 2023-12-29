export type Language = {
    name: string;
    percentage: number;
}

export type Project = {
    name: string;
    description: string;
    link: string;

    license?: string;
    languages?: Language[];

    stars: number;
    forks: number;
    watchers: number;
}
