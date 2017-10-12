export const TEXT = 'TEXT';
export const DRAW = 'DRAW';

export function switchText(){
    return {type: TEXT};
}

export function draw(){
    return {type: DRAW};
}
