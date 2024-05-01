import { Jogador } from "./jogador.model";

export interface EstruturaQuestionamento{
    jogadorQuePergunta?: Jogador,
    jogadorQueResponde?: Jogador
}