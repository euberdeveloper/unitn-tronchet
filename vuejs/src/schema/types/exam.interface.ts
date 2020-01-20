export interface TrueOrFalseQuestion {
    question: string;
    solution: boolean;
}

export type TrueOrFalseExercise = TrueOrFalseQuestion[];

export interface ErrorSolution {
    type: 'COMPILETIME' | 'RUNTIME';
    row: number;
    cause: string;
}

export type OutputSolution = string[];

export interface CodeExercise {
    code: string;
    solution: OutputSolution | ErrorSolution;
}

export function instanceOfOutputSolution(value: OutputSolution | ErrorSolution): value is OutputSolution {
    return Array.isArray(value) && (!value.length || value.every(el => typeof el === 'string'));
}

export function instanceOfErrorSolution(value: OutputSolution | ErrorSolution): value is ErrorSolution {
    const supposed = value as ErrorSolution;
    return (supposed.type === 'COMPILETIME' || supposed.type === 'RUNTIME') && (typeof supposed.row === 'number') && (typeof supposed.cause === 'string');
}

export function instanceOfCodeExercise(value: TrueOrFalseExercise | CodeExercise): value is CodeExercise {
    const supposed = value as CodeExercise;
    return (typeof supposed.code === 'string') && (instanceOfOutputSolution(supposed.solution) || instanceOfErrorSolution(supposed.solution));
}

export function instanceOfTrueOrFalseExercise(value: TrueOrFalseExercise | CodeExercise): value is TrueOrFalseExercise {
    return Array.isArray(value) && value.every(el => (typeof el.question === 'string') && (typeof el.solution === 'boolean'));
}

export type Exercise = (TrueOrFalseExercise | CodeExercise);

export interface Exam {
    name: string;
    id: string;
    exercises: Exercise[];
}
