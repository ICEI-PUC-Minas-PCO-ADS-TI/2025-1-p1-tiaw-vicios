/**
 * Dados dos cards (armazenamento temporário).
 * TODO: Migrar para LocalStorage/JSON Server no futuro.
 */
const pesquisa = {
  cartaz: [
    {
      id: 1,
      titulo: "Vício",
      imagem: "https://picsum.photos/300/300",
      descricao: "Descubra o significado de vício, como ele surge e os impactos na vida cotidiana.",
      detalhes: "Vício é um hábito prejudicial que se torna compulsivo e difícil de controlar, afetando negativamente a saúde física, mental e social da pessoa. Pode estar relacionado a substâncias como álcool e drogas, ou comportamentos como jogos, redes sociais e compras excessivas."
    },
    {
      id: 2,
      titulo: "Tarefas Diárias",
      imagem: "https://picsum.photos/300/300",
      descricao: "Lista prática de tarefas diárias para promover disciplina, foco e equilíbrio pessoal.",
      detalhes: "Criar uma rotina estruturada com tarefas diárias pode ajudar no controle de vícios, proporcionando senso de propósito, organização e substituindo comportamentos prejudiciais por hábitos saudáveis e produtivos."
    },
    {
      id: 3,
      titulo: "Tratamentos",
      imagem: "https://picsum.photos/300/300",
      descricao: "Conheça as abordagens mais eficazes para tratar diferentes tipos de vício.",
      detalhes: "Os tratamentos para vício incluem terapias comportamentais, uso de medicação apropriada, acompanhamento psicológico, participação em grupos de apoio (como os Alcoólicos Anônimos), e estratégias para prevenção de recaídas. O suporte familiar e social também é fundamental."
    },
    {
      id: 4,
      titulo: "Casos de Vício",
      imagem: "https://picsum.photos/300/300",
      descricao: "Acompanhe histórias reais de pessoas que enfrentaram o vício e os caminhos que seguiram.",
      detalhes: "Histórias reais mostram como o vício impacta vidas de forma profunda, levando à perda de emprego, relacionamentos e saúde. Porém, também revelam superações, mostrando que com ajuda e determinação, a recuperação é possível."
    },
    {
      id: 5,
      titulo: "Vício em Tecnologia",
      imagem: "https://picsum.photos/300/300?5",
      descricao: "Entenda os impactos do uso excessivo de tecnologia no comportamento humano.",
      detalhes: "O uso compulsivo de celulares, redes sociais e jogos online pode afetar o sono, a atenção, os relacionamentos e a produtividade. É importante estabelecer limites e pausas conscientes para promover o bem-estar digital."
    },
    {
      id: 6,
      titulo: "Vício em Drogas",
      imagem: "https://picsum.photos/300/300?6",
      descricao: "Impactos físicos, mentais e sociais causados pelo uso abusivo de substâncias químicas.",
      detalhes: "Drogas como cocaína, maconha, crack e outras substâncias causam dependência química, prejudicando a saúde, os relacionamentos e o desempenho profissional. O tratamento é desafiador, mas possível com apoio profissional e pessoal."
    },
    {
      id: 7,
      titulo: "Vício em Álcool",
      imagem: "https://picsum.photos/300/300?7",
      descricao: "Conheça os riscos e consequências do consumo abusivo de bebidas alcoólicas.",
      detalhes: "O alcoolismo é um vício socialmente aceito, mas extremamente prejudicial. Pode levar a doenças hepáticas, depressão, acidentes e problemas familiares. A recuperação envolve tratamento especializado e grupos de apoio."
    },
    {
      id: 8,
      titulo: "Recaídas",
      imagem: "https://picsum.photos/300/300?8",
      descricao: "Saiba lidar com recaídas durante o processo de recuperação.",
      detalhes: "Recaídas são comuns em tratamentos contra o vício. Compreendê-las como parte do processo e não como fracasso absoluto é essencial. Estratégias de prevenção, autoconhecimento e suporte emocional são fundamentais."
    },
    {
      id: 9,
      titulo: "Apoio Familiar",
      imagem: "https://picsum.photos/300/300?9",
      descricao: "A importância do envolvimento da família na recuperação de uma pessoa com vício.",
      detalhes: "A família pode ser um pilar essencial no tratamento do vício, oferecendo suporte emocional, vigilância amorosa e incentivo à continuidade do tratamento. Também é importante que familiares recebam orientação e apoio psicológico."
    },
    {
      id: 10,
      titulo: "Autoestima e Vício",
      imagem: "https://picsum.photos/300/300?10",
      descricao: "Como a baixa autoestima pode contribuir para o desenvolvimento de vícios.",
      detalhes: "Pessoas com baixa autoestima tendem a buscar compensações externas, como vícios, para aliviar sentimentos de inadequação. Trabalhar o autoconhecimento, autovalorização e desenvolver habilidades emocionais pode ajudar na prevenção."
    },
    {
      id: 11,
      titulo: "Mindfulness e Meditação",
      imagem: "https://picsum.photos/300/300?11",
      descricao: "Técnicas de atenção plena como apoio no controle de impulsos e vícios.",
      detalhes: "Mindfulness e meditação ajudam na autorregulação emocional e no fortalecimento da consciência sobre os próprios hábitos, sendo ferramentas eficazes para lidar com ansiedade, compulsões e recaídas."
    },
    {
      id: 12,
      titulo: "Histórias de Superação",
      imagem: "https://picsum.photos/300/300?12",
      descricao: "Exemplos inspiradores de pessoas que venceram o vício.",
      detalhes: "Relatos de superação demonstram que a recuperação é possível, reforçam a importância da esperança e mostram o papel de terapias, apoio familiar, espiritualidade e mudança de hábitos na conquista de uma vida livre do vício."
    }
  ]
};

/**
 * Evento de clique no botão "Voltar"
 */
$("#voltar").click(function() {
  window.location.href = "pesquisa.html";
});

/**
 * Redireciona para a página de detalhes ao clicar em um card
 */
$(".card-pesquisa").click(function() {
  const id = $(this).data("id");
  window.location.href = `detalhes.html?id=${id}`;
});

/**
 * Filtro de pesquisa
 */
document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('search');
  const cards = document.querySelectorAll('.card-pesquisa');
  const semResultado = document.getElementById('semResultado');

  input.addEventListener('keyup', () => {
    const filtro = input.value.toLowerCase();
    let temResultado = false;

    cards.forEach(card => {
      const titulo = card.querySelector('.card-title').textContent.toLowerCase();
      const mostrar = titulo.includes(filtro);
      card.style.display = mostrar ? 'flex' : 'none';
      if (mostrar) temResultado = true;
    });

    semResultado.style.display = temResultado ? 'none' : 'block';
  });
});

/**
 * Página de detalhes
 */
if (window.location.pathname.includes("detalhes.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'));
  const item = pesquisa.cartaz.find(p => p.id === id);

  if (item) {
    const detalhes = item.detalhes || "Detalhes não disponíveis.";
    document.getElementById("conteudo-pesquisa").innerHTML = `
      <h1>${item.titulo}</h1>
      <img src="${item.imagem}" alt="${item.titulo}" style="width: 300px;">
      <p><strong>Resumo:</strong> ${item.descricao}</p>
      <p><strong>Detalhes:</strong> ${detalhes}</p>
    `;
  } else {
    document.getElementById("conteudo-pesquisa").innerHTML = "<p>Item não encontrado!</p>";
  }
}