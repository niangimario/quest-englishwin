export type Question = {
  en: string;
  options: string[]; // 6 options in Portuguese
  correctIndex: number;
};

export type Level = {
  title: string;
  description: string;
  questions: Question[];
};

// Helper to shuffle wrong options while keeping track of correct
const q = (en: string, correct: string, wrongs: string[]): Question => {
  const options = [correct, ...wrongs];
  // deterministic shuffle by rotation based on length to keep stable
  return { en, options, correctIndex: 0 };
};

// Shuffle helper (Fisher-Yates) — used at runtime, not here
export function shuffleQuestion(question: Question): Question {
  const indices = question.options.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const newOptions = indices.map((i) => question.options[i]);
  const newCorrect = indices.indexOf(question.correctIndex);
  return { ...question, options: newOptions, correctIndex: newCorrect };
}

export const LEVELS: Level[] = [
  {
    title: "Nível 1 — Iniciante",
    description:
      "Palavras simples do dia a dia: saudações, comida, animais e objetos. Ideal para dar os primeiros passos no inglês.",
    questions: [
      q("Hello", "Olá", ["Adeus", "Obrigado", "Por favor", "Sim", "Não"]),
      q("Good morning", "Bom dia", ["Boa noite", "Boa tarde", "Até logo", "Bem-vindo", "Como estás?"]),
      q("Thank you", "Obrigado", ["Desculpa", "Por favor", "De nada", "Com licença", "Adeus"]),
      q("Yes", "Sim", ["Não", "Talvez", "Nunca", "Sempre", "Agora"]),
      q("No", "Não", ["Sim", "Talvez", "Claro", "Certo", "Errado"]),
      q("Please", "Por favor", ["Obrigado", "Desculpa", "De nada", "Com licença", "Olá"]),
      q("Goodbye", "Adeus", ["Olá", "Bom dia", "Boa noite", "Até já", "Obrigado"]),
      q("Sorry", "Desculpa", ["Obrigado", "Por favor", "Adeus", "Olá", "Sim"]),
      q("Water", "Água", ["Pão", "Leite", "Vinho", "Sumo", "Café"]),
      q("Bread", "Pão", ["Água", "Queijo", "Manteiga", "Bolo", "Arroz"]),
      q("House", "Casa", ["Carro", "Rua", "Cidade", "Quarto", "Porta"]),
      q("Dog", "Cão", ["Gato", "Pássaro", "Peixe", "Cavalo", "Vaca"]),
      q("Cat", "Gato", ["Cão", "Rato", "Coelho", "Pássaro", "Peixe"]),
      q("Book", "Livro", ["Caneta", "Papel", "Mesa", "Cadeira", "Caderno"]),
      q("Friend", "Amigo", ["Irmão", "Pai", "Vizinho", "Colega", "Primo"]),
    ],
  },
  {
    title: "Nível 2 — Básico",
    description:
      "Frases curtas, verbos comuns e perguntas essenciais para começar a comunicar em inglês.",
    questions: [
      q("How are you?", "Como estás?", ["Quem és tu?", "Onde estás?", "O que fazes?", "Quantos anos tens?", "De onde és?"]),
      q("What is your name?", "Como te chamas?", ["Onde vives?", "Quantos anos tens?", "O que queres?", "Quem és?", "Como estás?"]),
      q("I am hungry", "Tenho fome", ["Tenho sede", "Estou cansado", "Estou feliz", "Estou frio", "Tenho sono"]),
      q("I am thirsty", "Tenho sede", ["Tenho fome", "Tenho calor", "Tenho frio", "Tenho medo", "Tenho sono"]),
      q("I love you", "Amo-te", ["Odeio-te", "Conheço-te", "Vejo-te", "Ouço-te", "Chamo-te"]),
      q("Where do you live?", "Onde vives?", ["Como te chamas?", "O que fazes?", "Quem és?", "Quando chegaste?", "Porquê?"]),
      q("I don't know", "Não sei", ["Não posso", "Não quero", "Não vou", "Não tenho", "Não gosto"]),
      q("See you tomorrow", "Até amanhã", ["Até logo", "Até já", "Boa noite", "Bom dia", "Adeus"]),
      q("Happy birthday", "Feliz aniversário", ["Feliz Natal", "Boa sorte", "Parabéns pelo trabalho", "Feliz ano novo", "Bem-vindo"]),
      q("I am learning English", "Estou a aprender inglês", ["Falo inglês", "Gosto de inglês", "Estudo inglês", "Ensino inglês", "Quero inglês"]),
      q("What time is it?", "Que horas são?", ["Que dia é hoje?", "Onde estamos?", "Quanto custa?", "Quem chegou?", "Quando começa?"]),
      q("I am tired", "Estou cansado", ["Estou doente", "Estou feliz", "Estou triste", "Tenho fome", "Tenho sono"]),
      q("Can you help me?", "Podes ajudar-me?", ["Podes ouvir-me?", "Podes ver-me?", "Podes esperar?", "Podes falar?", "Podes vir?"]),
      q("I like coffee", "Gosto de café", ["Bebo café", "Faço café", "Quero café", "Tenho café", "Vendo café"]),
      q("It's cold today", "Está frio hoje", ["Está calor hoje", "Está a chover", "Está sol", "Está nublado", "Está vento"]),
    ],
  },
  {
    title: "Nível 3 — Intermédio",
    description:
      "Situações reais do quotidiano: pedidos, compras, saúde e conversas úteis em qualquer viagem.",
    questions: [
      q("I need to go to the doctor", "Preciso de ir ao médico", ["Preciso de ir ao mercado", "Quero ir ao hospital", "Vou ao dentista", "Estou doente", "Chamem um médico"]),
      q("How much does it cost?", "Quanto custa?", ["Onde é?", "Quantos há?", "Quando abre?", "Quem paga?", "Porquê tão caro?"]),
      q("I would like a coffee, please", "Queria um café, por favor", ["Gosto de café, obrigado", "Traz um café", "Onde está o café?", "Fiz um café", "Não quero café"]),
      q("The weather is nice today", "O tempo está bom hoje", ["Está a chover muito", "O dia é longo", "Faz frio hoje", "O sol brilha muito", "O tempo passa depressa"]),
      q("I have been waiting for an hour", "Estou à espera há uma hora", ["Chego em uma hora", "Ainda falta uma hora", "Esperei ontem", "Chegámos há uma hora", "Vou embora daqui a uma hora"]),
      q("Could you repeat that, please?", "Podes repetir, por favor?", ["Podes falar mais alto?", "Podes explicar melhor?", "Podes escrever aí?", "Não entendi nada", "Podes traduzir?"]),
      q("I forgot my keys at home", "Esqueci as chaves em casa", ["Perdi as chaves na rua", "Deixei as chaves no carro", "As chaves estão comigo", "Não encontro as chaves", "Guardei as chaves"]),
      q("She works in a hospital", "Ela trabalha num hospital", ["Ela estuda num hospital", "Ela vai ao hospital", "Ela é médica", "Ela mora perto do hospital", "Ela ajuda no hospital"]),
      q("We are going to the beach", "Vamos à praia", ["Estamos na praia", "Voltámos da praia", "Gostamos da praia", "Vivemos perto da praia", "Vamos ao parque"]),
      q("Do you speak Portuguese?", "Falas português?", ["Entendes português?", "Aprendes português?", "Sabes português?", "Escreves português?", "Ensinas português?"]),
      q("I don't understand what you mean", "Não percebo o que queres dizer", ["Não ouvi bem", "Não falo essa língua", "Repete, por favor", "Explica outra vez", "Não sei responder"]),
      q("The train leaves at eight", "O comboio parte às oito", ["O comboio chega às oito", "O comboio atrasou-se", "Perdi o comboio das oito", "O comboio anda depressa", "O comboio está cheio"]),
      q("This book is very interesting", "Este livro é muito interessante", ["Este livro é aborrecido", "Gosto deste livro", "Comprei este livro", "Já li este livro", "Este livro é caro"]),
      q("I usually wake up early", "Costumo acordar cedo", ["Nunca acordo cedo", "Hoje acordei cedo", "Vou acordar cedo", "Adormeci cedo", "Dormi pouco ontem"]),
      q("Can I pay by card?", "Posso pagar com cartão?", ["Aceitam dinheiro?", "Quanto é ao todo?", "Onde está a caixa?", "Tens troco?", "Posso pagar depois?"]),
    ],
  },
  {
    title: "Nível 4 — Avançado",
    description:
      "Expressões mais elaboradas, tempos verbais compostos e frases condicionais para se expressar com naturalidade.",
    questions: [
      q("I've been living here for five years", "Vivo aqui há cinco anos", ["Vou viver aqui cinco anos", "Vivi aqui há cinco anos", "Estive aqui cinco vezes", "Passei aqui cinco anos", "Regresso daqui a cinco anos"]),
      q("If I were you, I would apologise", "Se eu fosse tu, pedia desculpa", ["Se eu quisesse, pedia desculpa", "Quando eu era tu, pedi desculpa", "Devias pedir desculpa", "Eu pedi desculpa por ti", "Não peças desculpa"]),
      q("She said she would call me later", "Ela disse que me ligaria mais tarde", ["Ela vai ligar-me já", "Ela ligou-me mais tarde", "Ela pediu para eu ligar", "Ela quer que eu ligue", "Ela não vai ligar"]),
      q("I'm looking forward to the trip", "Estou ansioso pela viagem", ["Já fiz a viagem", "Estou a planear a viagem", "Não quero fazer a viagem", "A viagem foi boa", "Perdi a viagem"]),
      q("You should have told me earlier", "Devias ter-me dito mais cedo", ["Podias dizer-me agora", "Vais dizer-me depois", "Já me disseste", "Não precisas de me dizer", "Diz-me quando puderes"]),
      q("The meeting was postponed until next week", "A reunião foi adiada para a próxima semana", ["A reunião foi cancelada", "A reunião foi antecipada", "A reunião é hoje", "Faltámos à reunião", "A reunião durou uma semana"]),
      q("He is used to working at night", "Ele está habituado a trabalhar à noite", ["Ele costumava trabalhar à noite", "Ele odeia trabalhar à noite", "Ele começou a trabalhar à noite", "Ele vai trabalhar à noite", "Ele não trabalha à noite"]),
      q("I wish I had studied more", "Quem me dera ter estudado mais", ["Preciso de estudar mais", "Vou estudar mais", "Estudei bastante", "Não gosto de estudar", "Devia estudar agora"]),
      q("It's not as easy as it looks", "Não é tão fácil como parece", ["É mais difícil do que pensava", "Parece muito fácil", "É fácil de aprender", "Não é assim tão difícil", "Parece complicado"]),
      q("They must have left already", "Eles já devem ter saído", ["Eles vão sair já", "Eles saíram tarde", "Eles ainda não saíram", "Eles têm de sair", "Eles saem sempre cedo"]),
      q("I can't stand this noise anymore", "Já não aguento este barulho", ["Adoro este barulho", "Não ouço barulho nenhum", "O barulho parou", "Faz muito barulho", "Vou fazer barulho"]),
      q("She is likely to win the competition", "É provável que ela ganhe a competição", ["Ela vai perder a competição", "Ela já ganhou a competição", "Ela não participa na competição", "Ela treina para a competição", "Ela gosta da competição"]),
      q("Would you mind opening the window?", "Importas-te de abrir a janela?", ["Consegues fechar a janela?", "A janela está aberta?", "Não abras a janela", "Vou abrir a janela", "Quem abriu a janela?"]),
      q("I had never seen anything like that", "Nunca tinha visto nada assim", ["Já vi isso muitas vezes", "Vou ver isso amanhã", "Estou a ver agora", "Isso é comum", "Vi ontem algo parecido"]),
      q("The sooner, the better", "Quanto mais cedo, melhor", ["Mais vale tarde do que nunca", "Devagar se vai ao longe", "É agora ou nunca", "Não há pressa", "O tempo dirá"]),
    ],
  },
  {
    title: "Nível 5 — Fluente",
    description:
      "Idiomas, expressões idiomáticas e frases sofisticadas usadas por falantes nativos no dia a dia.",
    questions: [
      q("It's raining cats and dogs", "Está a chover a cântaros", ["Há gatos e cães na rua", "Está um dia estranho", "Os animais fugiram", "Está a nevar muito", "O tempo mudou"]),
      q("Break a leg!", "Boa sorte!", ["Parte uma perna!", "Cuidado com as pernas!", "Estás magoado?", "Vai correr mal", "Não te levantes"]),
      q("It costs an arm and a leg", "Custa os olhos da cara", ["Custa pouco", "Não vale nada", "É barato", "Está em promoção", "É de graça"]),
      q("Once in a blue moon", "Muito raramente", ["Todas as noites", "Sempre à lua cheia", "Uma vez por semana", "Frequentemente", "Nunca"]),
      q("To hit the nail on the head", "Acertar em cheio", ["Falhar por pouco", "Bater com o martelo", "Perder a paciência", "Enganar-se completamente", "Fazer um trabalho difícil"]),
      q("Bite the bullet", "Aguentar firme", ["Desistir de tudo", "Morder com força", "Fugir do problema", "Chorar em silêncio", "Falar sem pensar"]),
      q("Speak of the devil", "Falar no diabo", ["Não fales assim", "Que má sorte", "Não acredito em ti", "Isso é mentira", "Cuidado com o que dizes"]),
      q("The ball is in your court", "A decisão é tua", ["O jogo acabou", "Perdeste a bola", "É a minha vez", "Estamos empatados", "Ninguém sabe"]),
      q("Under the weather", "Indisposto", ["Debaixo de chuva", "Muito animado", "Com muito calor", "Ao ar livre", "De boa saúde"]),
      q("Cutting corners", "Poupar no essencial", ["Cortar em linha reta", "Trabalhar com cuidado", "Fazer tudo bem feito", "Andar em círculos", "Perder tempo"]),
      q("It's a piece of cake", "É canja", ["É um bolo enorme", "É muito difícil", "É doce demais", "É uma sobremesa", "É complicado"]),
      q("Let the cat out of the bag", "Revelar um segredo", ["Libertar um gato", "Perder alguma coisa", "Encontrar solução", "Fazer barulho", "Assustar alguém"]),
      q("Burning the midnight oil", "Trabalhar até tarde", ["Acordar cedo", "Descansar durante o dia", "Gastar dinheiro", "Perder tempo à noite", "Cozinhar de noite"]),
      q("A blessing in disguise", "Um mal que vem por bem", ["Uma bênção verdadeira", "Uma má notícia", "Uma surpresa desagradável", "Um disfarce estranho", "Um acidente grave"]),
      q("To beat around the bush", "Andar com rodeios", ["Ir direto ao assunto", "Caminhar no jardim", "Bater em alguém", "Fugir de casa", "Falar alto"]),
    ],
  },
  {
    title: "Nível 6 — Construções de frases",
    description:
      "Frases completas e estruturadas: aprende a montar orações mais longas, ligar ideias e comunicar como um nativo.",
    questions: [
      q("I would like to book a table for two", "Gostaria de reservar uma mesa para dois", ["Quero uma mesa maior", "Já reservei a mesa", "A mesa está pronta", "Podemos sentar aqui?", "Estamos à espera de mesa"]),
      q("Could you tell me where the station is?", "Podes dizer-me onde fica a estação?", ["Sabes que horas parte o comboio?", "A estação está longe?", "Vamos para a estação?", "Perdi-me a caminho da estação", "Onde compro o bilhete?"]),
      q("If it rains tomorrow, we will stay home", "Se chover amanhã, ficamos em casa", ["Se ficarmos em casa, choverá", "Amanhã vai chover em casa", "Não sairemos se chover", "Chove sempre em casa", "Vamos sair mesmo com chuva"]),
      q("I have been studying English for three months", "Estudo inglês há três meses", ["Vou estudar inglês três meses", "Estudei inglês três vezes", "Comecei a estudar há três dias", "Já sei inglês há três anos", "Pretendo estudar mais três meses"]),
      q("Although it was late, we decided to go out", "Embora fosse tarde, decidimos sair", ["Como era cedo, fomos passear", "Ficámos em casa porque era tarde", "Saímos porque já era manhã", "Não saímos, estava tarde", "Decidimos dormir cedo"]),
      q("She asked me if I could help her with the project", "Ela perguntou-me se podia ajudá-la com o projeto", ["Ela ajudou-me no projeto", "Eu pedi-lhe ajuda com o projeto", "Ela não quis ajuda no projeto", "Vou ajudá-la amanhã", "O projeto está terminado"]),
      q("As soon as I finish work, I'll call you", "Assim que acabar o trabalho, ligo-te", ["Ligo-te antes de começar a trabalhar", "Já te liguei do trabalho", "Trabalho depois de te ligar", "Ligo-te só amanhã", "Não posso ligar hoje"]),
      q("I don't remember where I put my glasses", "Não me lembro onde pus os óculos", ["Não sei se tenho óculos", "Perdi os óculos ontem", "Os óculos estão na mesa", "Comprei óculos novos", "Preciso de óculos"]),
      q("They were watching a movie when I arrived", "Estavam a ver um filme quando cheguei", ["Vimos um filme depois de eu chegar", "Chegaram durante o filme", "Vamos ver um filme quando chegarem", "O filme já tinha acabado", "Nunca vimos esse filme"]),
      q("You had better take an umbrella, it's going to rain", "É melhor levares um guarda-chuva, vai chover", ["Não precisas de guarda-chuva", "Ontem levaste guarda-chuva", "O guarda-chuva está molhado", "Já não está a chover", "Vou comprar um guarda-chuva"]),
      q("I don't think this is a good idea", "Não acho que seja uma boa ideia", ["Acho ótima esta ideia", "Vou pensar na ideia", "Tenho uma ideia melhor", "Ninguém teve ideias", "Não sei do que falas"]),
      q("If I had known, I would have come earlier", "Se eu soubesse, teria vindo mais cedo", ["Sabia que vinhas cedo", "Vim mais cedo porque soube", "Vou saber quando chegares", "Sabia mas não vim", "Chegámos ao mesmo tempo"]),
      q("She is the woman whose son won the prize", "Ela é a mulher cujo filho ganhou o prémio", ["O filho dela quer ganhar o prémio", "Ela ganhou um prémio com o filho", "O prémio foi entregue à mulher", "O filho dela perdeu o prémio", "Ela é a filha do vencedor"]),
      q("It's high time we did something about it", "Está mais que na hora de fazermos algo sobre isso", ["Fizemos isso a horas", "Não há tempo para nada", "Fizemos algo há muito tempo", "Está cedo para agir", "Não vamos fazer nada"]),
      q("No matter how hard it is, don't give up", "Não importa o quão difícil seja, não desistas", ["Desiste se for difícil", "É sempre fácil, não desistas", "Desistir é a solução", "Só desistem os fracos, tenta amanhã", "Faz apenas o que for fácil"]),
    ],
  },
];
