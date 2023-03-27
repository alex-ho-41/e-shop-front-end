export interface TransactionDto {
    tid:       number;
    total:     number;
    buyer_uid: number;
    date_time: string;
    status:    string;
    item:      Item[];
}

export interface Item {
    tpid:     number;
    product:  Product;
    quantity: number;
    subtotal: number;
}

export interface Product {
    pid:         number;
    name:        string;
    description: string;
    image_url:   string;
    price:       number;
    stock:       number;
    category:    string;
}
