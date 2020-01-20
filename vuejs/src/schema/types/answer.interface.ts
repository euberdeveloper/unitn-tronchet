export interface FormAnswer {
    type: '' | 'OUTPUT' | 'COMPILETIME' | 'RUNTIME' | 'TRUE_OR_FALSE';
    output: string;
    row: number;
    cause: string;
    trueOrFalse: (boolean | null)[];
}
