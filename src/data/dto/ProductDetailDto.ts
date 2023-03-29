export interface ProductDetailDto {
    pid: number;
    name: string;
    description: string;
    image_url: string;
    price: number;
    stock: number;
    category: CategoryMapping;
}

export type CategoryMapping = {
    "fire": string,
    "water": string,
    "electric": string,
    "grass": string,
    "fly": string,
    "fairy": string,
    "ground": string,
    "ice": string,
    "normal": string,
    "psychic": string,
    "dragon": string
}