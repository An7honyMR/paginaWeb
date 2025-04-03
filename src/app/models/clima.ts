// export interface Clima {
//     name: string;
//     main: {
//         temp: number;
//         himidity: number;
//     };
//     weather: {
//         description: string;
//         icon: string;
//     }[];
// }

export interface Clima{
    id:          number;
    name:        string;
    temp:        number;
    description: string;
    humidity:    number;
    windSpeed:   number;
    createdAt:   Date;
    updatedAt:   Date;
}