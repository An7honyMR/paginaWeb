export interface Clima {
    name: string;
    main: {
        temp: number;
        himidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
}
