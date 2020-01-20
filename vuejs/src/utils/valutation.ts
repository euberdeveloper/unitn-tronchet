import { FormAnswer } from '@/schema/types/answer.interface';
import { TrueOrFalseExercise, ErrorSolution, OutputSolution, CodeExercise, instanceOfOutputSolution, Exercise, instanceOfTrueOrFalseExercise, instanceOfCodeExercise } from '@/schema/types/exam.interface';

function correctTrueOrFalseQuestion(answer: boolean | null, solution: boolean, points: number): number {
    if (answer === null) {
        return 0;
    }
    else {
        return (answer === solution ? points : -points);
    }
}

function correctTrueOrFalse(answer: FormAnswer, exercise: TrueOrFalseExercise, points: number): number {
    let score = 0;
    if (answer.type === 'TRUE_OR_FALSE') {
        answer.trueOrFalse.forEach((ans, index) => score += correctTrueOrFalseQuestion(ans, exercise[index].solution, points));
    }
    else {
        console.error('Error, answer type does not match');
    }
    return score;
}

function correctCodeError(answer: FormAnswer, solution: ErrorSolution, points: number): number {
    if ((answer.type === 'COMPILETIME' || answer.type === 'RUNTIME') && +answer.row === solution.row) {
        if (answer.type === solution.type) {
            return points;
        }
        else {
            return (3 * points) / 4;
        }
    }
    else {
        return 0;
    }
}

function correctCodeOutput(answer: FormAnswer, solution: OutputSolution, points: number): number {
    if (answer.type === 'OUTPUT' && solution.indexOf(answer.output) !== -1) {
        return points;
    }
    else {
        return 0;
    }
}

function correctCode(answer: FormAnswer, exercise: CodeExercise, points: number): number {
    if (answer.type === '') {
        return 0;
    }
    else if (instanceOfOutputSolution(exercise.solution)) {
        return correctCodeOutput(answer, exercise.solution, points);
    }
    else {
        return correctCodeError(answer, exercise.solution, points);
    }
}

export function correctExam(answers: FormAnswer[], exercises: Exercise[], points: { code: number, trueOrFalse: number }): number {
    let score = 0;
    exercises.forEach((exercise, index) => {
        if (instanceOfTrueOrFalseExercise(exercise)) {
            score += correctTrueOrFalse(answers[index], exercise, points.trueOrFalse);
        }
        else {
            score += correctCode(answers[index], exercise, points.code);
        }
    });
    return score;
}

export enum Valutation {
    EMPTY,
    RIGHT,
    WRONG,
    PARTIAL,
    NONE
}

function isCodeExerciseCorrect(answer: FormAnswer, exercise: CodeExercise): Valutation {
    if (answer.type === '') {
        return Valutation.EMPTY;
    }
    else {
        switch (correctCode(answer, exercise, 1)) {
            case 1:
                return Valutation.RIGHT;
            case 0.75:
                return Valutation.PARTIAL;
            case 0:
                return Valutation.WRONG;
            default:
                return Valutation.NONE;
        }
    }
}

export function correctExercise(answer: FormAnswer, exercise: Exercise): Valutation {
    if (instanceOfCodeExercise(exercise)) {
        return isCodeExerciseCorrect(answer, exercise);
    }
    else {
        return Valutation.NONE;
    }
}

export function correctQuestion(answer: boolean | null, solution: boolean): Valutation {
    if (answer === null) {
        return Valutation.EMPTY;
    }
    else if (answer === solution) {
        return Valutation.RIGHT;
    }
    else {
        return Valutation.WRONG;
    }
}

export enum Outcome {
    INDECENTE,
    PESSIMO,
    BOCCIATO,
    PROMOSSO,
    GRANDE
}

export function outcome(percentual: number): Outcome {
    if (percentual < 0) {
        return Outcome.INDECENTE;
    }
    else if (percentual < 40) {
        return Outcome.PESSIMO;
    }
    else if (percentual < 60) {
        return Outcome.BOCCIATO;
    }
    else if (percentual < 90) {
        return Outcome.PROMOSSO;
    }
    else {
        return Outcome.GRANDE;
    }
}
