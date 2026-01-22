export interface ExpenseCategory {
    id: number;
    name: string;
    defaultDescription?: string;
    defaultAmount?: number;
}

export const DEFAULT_CATEGORIES: ExpenseCategory[] = [
    {
        id: 1,
        name: 'Food',
        defaultDescription: 'Business meal expense',
        defaultAmount: 50.00
    },
    {
        id: 2,
        name: 'Travel',
        defaultDescription: 'Travel and transportation expense',
        defaultAmount: 200.00
    },
    {
        id: 3,
        name: 'Lodging',
        defaultDescription: 'Hotel or accommodation expense',
        defaultAmount: 150.00
    },
    {
        id: 4,
        name: 'Supplies',
        defaultDescription: 'Office supplies and materials',
        defaultAmount: 75.00
    },
    {
        id: 5,
        name: 'Equipment',
        defaultDescription: 'Equipment purchase or rental',
        defaultAmount: 500.00
    },
    {
        id: 6,
        name: 'Other',
        defaultDescription: 'Other business expense',
        defaultAmount: 100.00
    }
];
