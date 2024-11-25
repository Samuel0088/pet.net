document.getElementById("dogForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio do formulário

    // Limpa o container de imagens para evitar adições duplicadas
    document.getElementById("imagesContainer").innerHTML = "";

    const raca = document.getElementById("raca_cao").value;
    const idade = parseInt(document.getElementById("idade").value);
    let recomendacao = "";
    let fase = "";

    // Determinando a fase da vida e a recomendação com base na idade
    if (idade >= 0 && idade <= 5) {
        fase = "Filhote (0 a 5 ano(s))";
        recomendacao = "Ração para filhotes, rica em nutrientes para o crescimento.";
    } else if (idade >= 6 && idade <= 12) {
        fase = "Adulto jovem (6 a 12 anos)";
        recomendacao = "Ração para adultos, balanceada para manter a energia e saúde.";
    } else {
        fase = "Idade fora do intervalo";
        recomendacao = "Recomendação não disponível.";
    }

   

    // Limpar conteúdo anterior
    const resultDiv = document.getElementById("result");
const imagesContainer = document.getElementById("imagesContainer");

    // Mapeamento de rações de acordo com a raça e idade
    const racoes = {
        "bulldog-ingles": { "0-5": "Royal Canin Bulldog Adulto", "6-12": "Royal Canin Medium Adult" },
        "bulldog-frances": { "0-5": "Royal Canin French Bulldog Adult", "6-12": "Hill's Science Diet Light Adult" },
        "beagle": { "0-5": "Purina Pro Plan Small Breed", "6-12": "Hill's Science Diet Adulto Cães Médios" },
        "border-collie": { "0-5": "Premier Raças Grandes", "6-12": "Royal Canin Maxi Adult" },
        "chihuahua": { "0-5": "Royal Canin Chihuahua Adult", "6-12": "Hill's Science Diet Light Adult" },
        "golden-retriever": { "0-5": "Hill's Science Diet Adulto Cães Médios", "6-12": "Royal Canin Golden Retriever Adult" },
        "labrador-retriever": { "0-5": "Premier Raças Específicas Labrador", "6-12": "Royal Canin Labrador Retriever Adult" },
        "poodle": { "0-5": "Royal Canin Poodle Adulto", "6-12": "Premier Ambientes Internos porte medio" },
        "pinscher": { "0-5": "Ração Royal Canin Mini Indoor Puppy Junior", "6-12": "Royal Canin Mini Adult" },
        "rottweiler": { "0-5": "Royal Canin Rottweiler Adult", "6-12": "Premier Raças Grandes e Gigantes" },
        "shih-tzu": { "0-5": "Premier Shih Tzu Adulto", "6-12": "Royal Canin Shih Tzu Adult" },
        "yorkshire": { "0-5": "Royal Canin Yorkshire Adult", "6-12": "Hill's Science Diet Light Adult" },
        "dachshund": { "0-5": "Royal Canin Dachshund Adult", "6-12": "Premier Raças Específicas Dachshund" },
        "pitbull": { "0-5": "Premier Raças Específicas Pitbull", "6-12": "Royal Canin Maxi Adult" },
        "akita": { "0-5": "Royal Canin Maxi Adult", "6-12": "Hill's Science Diet Light Adult" },    
        "husky-siberiano": { "0-5": "Premier Raças Grandes", "6-12": "Royal Canin Maxi Adult" },
        "cocker-spaniel": { "0-5": "Royal Canin Cocker Adult", "6-12": "Hill's Science Diet Adulto Cães Médios" },
        "pug": { "0-5": "Royal Canin Pug Adult", "6-12": "Premier Ambientes Internos Pug" },
        "dalmata": { "0-5": "Royal Canin Maxi Adult", "6-12": "Hill's Science Diet Adulto Cães Médios" },
        "doberman": { "0-5": "Royal Canin Puppy Giant", "6-12": "Premier Raças Grandes" }
    };

    // Mapeamento de rações para URLs de imagens
    const imagensDeRacas = { 
        "bulldog-ingles": "https://i.pinimg.com/originals/32/eb/41/32eb419833f25bc24732c8da29261f5b.jpg",
        "bulldog-frances": "https://th.bing.com/th/id/OIP.l7LW62m5qcz20LF1CtERtgHaFS?rs=1&pid=ImgDetMain",
        "beagle": "https://th.bing.com/th/id/OIP.aE2DaPPRSwuhWiVOaTQuvQHaEW?rs=1&pid=ImgDetMain",
        "border-collie": "https://th.bing.com/th/id/OIP.X9AiS7ogTf1ab2NkYmreEwHaE7?rs=1&pid=ImgDetMain",
        "chihuahua": "https://th.bing.com/th/id/OIP.yhBItwbs9R78a0eA98BMEQHaEo?rs=1&pid=ImgDetMain",
        "golden-retriever": "https://th.bing.com/th/id/R.9ef8cb37ff325e3cf8e0e2c08ba93583?rik=VCMV3sKZ6J%2bIqA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-AI2fhTCbWQ4%2fT26wCp9yk3I%2fAAAAAAAACTI%2f6O88_7A0txo%2fs1600%2fgolden-retriever-picture.jpg&ehk=o5AIwvcpHapUYotcpJR%2b5GFgvSl0QK6k3%2fOI2sE7OwM%3d&risl=&pid=ImgRaw&r=0",
        "labrador-retriever": "https://th.bing.com/th/id/OIP.g0p9GzecZBmWjsSYrsvt1AAAAA?rs=1&pid=ImgDetMain",
        "poodle": "https://th.bing.com/th/id/OIP.TyKyBJAMvajx-1E13nrqTwHaF7?rs=1&pid=ImgDetMain",
        "pinscher":"https://cdn.britannica.com/33/233233-050-BD461F52/miniature-pinscher-dog.jpg",
        "rottweiler": "https://th.bing.com/th/id/OIP.AazP6kEpK1bT1vJPoCDf2wHaE5?rs=1&pid=ImgDetMain",
        "shih-tzu": "https://th.bing.com/th/id/OIP.4ldscM77Gk_1-DKgcAZRqwHaFC?rs=1&pid=ImgDetMain",
        "pitbull": "https://th.bing.com/th/id/OIP.6iDNL3PBhIYkKf-lTkjX0QHaFj?rs=1&pid=ImgDetMain",
        "yorkshire": "https://highlandcanine.com/wp-content/uploads/2021/05/yorkshire-terrier-sitting-on-decking.jpg",
        "dachshund": "https://th.bing.com/th/id/R.d38f254a1866691e297760f77715ab82?rik=IbbOu%2fRyFU4RaQ&riu=http%3a%2f%2fwww.dog-learn.com%2fdog-breeds%2fdachshund%2fimages%2fblack-and-tan-dachshund.jpg&ehk=zlBt9NANCKgV%2br5JTndelpPbdlZwisTFZ83mSAYoNnU%3d&risl=&pid=ImgRaw&r=0",
        "akita": "https://static.wixstatic.com/media/cb07a6_b12ee4bf7ba548ffb4324564a0790ca1~mv2.jpg/v1/fill/w_404,h_391,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/cb07a6_b12ee4bf7ba548ffb4324564a0790ca1~mv2.jpg",
        "husky-siberiano": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Black-Magic-Big-Boy.jpg",
        "cocker-spaniel": "https://cobasi.vteximg.com.br/arquivos/ids/622425/cocker-spaniel-english.png?v=637571426914900000",
        "pug": "https://liderdamatilha.fbitsstatic.net/media/pug-header1.jpg",
        "dalmata": "https://www.petz.com.br/cachorro/racas/dalmata/img/dalmata-caracteristicas-guia-racas.webp",
        "doberman": "https://cdn.britannica.com/75/234475-050-7D0C0D7E/Doberman-pinscher-dog.jpg"
    };

    // Faixa etária do cão
    let faixaEtaria = idade >= 0 && idade <= 5 ? "0-5" : idade >= 6 && idade <= 12 ? "6-12" : null;

    // Verificar se a faixa etária é válida
    if (!faixaEtaria) {
        resultDiv.innerHTML = `<p>Faixa etária inválida. Informe uma idade entre 1 e 12 anos.</p>`;
        return;
    }

    // Ração recomendada com base na raça e faixa etária
    let racaoRecomendada = racoes[raca] ? racoes[raca][faixaEtaria] : null;

    if (racaoRecomendada) {
        resultDiv.innerHTML = `<p>Ração recomendada para ${raca.replace(/-/g, ' ')} de ${idade} ano(s): ${racaoRecomendada}</p>`;
    } else {
        resultDiv.innerHTML = `<p>Ração não encontrada para a raça ${raca.replace(/-/g, ' ')} e idade ${idade} ano(s).</p>`;
    }

    // Exibir imagem da raça do cão
    if (imagensDeRacas[raca]) {
        let dogImage = document.createElement('img');
        dogImage.src = imagensDeRacas[raca];
        dogImage.alt = `Imagem de um ${raca.replace(/-/g, ' ')}`;
        dogImage.id = "dogImage";
        imagesContainer.appendChild(dogImage);
    } else {
        resultDiv.innerHTML += `<p>Imagem da raça do cão não encontrada.</p>`;
    }

    // Exibir imagem da ração (caso disponível)
    const imagensDeRacoes = {
        "Royal Canin Bulldog Adulto": "https://cdn.pacifiko.com/image/cache/catalog/p/OGUxM2U4MD_196-1000x1000.png",
        "Royal Canin Medium Adult": "https://th.bing.com/th/id/OIP.7ECZOCqWAKSQt49PK1BnXQHaIx?rs=1&pid=ImgDetMain",
        "Royal Canin French Bulldog Adult": "https://th.bing.com/th/id/OIP._fN9G-i-dcPSLFC0ZvxVZwHaE8?rs=1&pid=ImgDetMain",
        "Hill's Science Diet Light Adult": "https://th.bing.com/th/id/R.d0522ec4d4cc3cf25cf82b8b2121744c?rik=3rhwhGlNrrW9qw&pid=ImgRaw&r=0",
        "Purina Pro Plan Small Breed": "https://th.bing.com/th/id/OIP.Yz82D-JwSO0Xyb-SRfNLeAHaHZ?rs=1&pid=ImgDetMain",
        "Hill's Science Diet Adulto Cães Médios": "https://images.petz.com.br/fotos/1613058041791.jpg",
        "Royal Canin Maxi Adult": "https://www.petlove.com.br/images/products/208594/product/Ra%C3%A7%C3%A3o_Royal_Canin_Maxi_Adult_para_C%C3%A3es_Adultos_Grandes_a_partir_de_15_Meses_de_Idade_3105317.jpg?1627668785",
        "Royal Canin Chihuahua Adult": "https://www.petlove.com.br/images/products/207462/product/Ra%C3%A7%C3%A3o_Royal_Canin_Mini_Adult_para_C%C3%A3es_Adultos_de_Ra%C3%A7as_Pequenas_com_10_Meses_ou_mais_de_Idade_3105614.jpg?1627665375",
        "Royal Canin Golden Retriever Adult": "https://www.petlove.com.br/images/products/203963/product/Ra%C3%A7%C3%A3o_Premier_Pet_Ra%C3%A7as_Espec%C3%ADficas_Golden_Retriever_Adulto_-_12_Kg_1199958.jpg?1627654386",
        "Premier Raças Específicas Labrador": "https://premierpet.com.br/wp-content/uploads/2020/11/racao-premier-racas-especificas-caes-adulto-labrador-porte-grande-frango-1.png",
        "Royal Canin Poodle Adulto": "https://www.petlove.com.br/images/products/212539/product/Ra%C3%A7%C3%A3o_Royal_Canin_para_C%C3%A3es_Adultos_da_Ra%C3%A7a_Poodle_3105578.jpg?1627682532",
        "Premier Ambientes Internos porte medio": "https://images.petz.com.br/fotos/1656076056774.jpg",
        "Royal Canin Rottweiler Adult": "https://www.petlove.com.br/images/products/254538/product/Ra%C3%A7%C3%A3o_Premiatta_Rottweiler_para_C%C3%A3es_Adultos_3100371_2.png?1652379616",
       "Premier Shih Tzu Adulto": "https://cobasi.vteximg.com.br/arquivos/ids/1043172-368-368/Racao-Premier-Shih-Tzu-Adultos-Frango-Racas-Especificas-75kg-lateral.png?v=638139733684300000",
        "Royal Canin Shih Tzu Adult": "https://images.petz.com.br/fotos/1711562375069.jpg",
        "Royal Canin Yorkshire Adult": "https://images.petz.com.br/fotos/1711563302789.jpg",
        "Royal Canin Dachshund Adult": "https://images.petz.com.br/fotos/10001320000428_1731440496471.jpg",
        "Premier Raças Específicas Dachshund": "https://images.petz.com.br/fotos/1464210213650.jpg",
        "Hill's Science Diet Adult Small & Mini": "https://images.petz.com.br/fotos/1613054133081.jpg",
        "Premier Raças Específicas Pitbull": "https://images.petz.com.br/fotos/1656092311711.jpg",
        "Premier Ambientes Internos": "https://images.petz.com.br/fotos/1656076056774.jpg",
        "Premier Raças Grandes": "https://www.petz.com.br/cachorro/racas/weimaraner/img/premier-senior-weimaraner.png",
        "Royal Canin Labrador Retriever Adult": " https://http2.mlstatic.com/D_NQ_NP_2X_745246-MLA80426420603_112024-F.webp",
        "Royal Canin Puppy Giant": "https://www.burnhills.com/images/royal-canin-giant-puppy-complete-dog-food-p12-13356_image.jpg",
        "Royal Canin Pug Adult": "https://cdn.royalcanin-weshare-online.io/3D8KZn8BRYZmsWpcvdNH/v13/ar-l-producto-pug-adult-size-health-nutrition-seco",
        "Premier Ambientes Internos Pug": "https://th.bing.com/th/id/OIP.i7KaVFj4XlojmPXIGBOZfQHaHa?rs=1&pid=ImgDetMain",
        "Royal Canin Cocker Adult": "https://cdn.royalcanin-weshare-online.io/Gz83vYcBRYZmsWpc0Pj1/v17/center-front-hero-image-3969-030111418197-dog-01-jpg",
        "Premier Raças Grandes e Gigantes": "https://blog-static.petlove.com.br/wp-content/uploads/2023/01/20142415/Racao_Premier_Pet_Formula_Caes_Filhotes_Racas_Grandes_e_Gigantes_Frango_3108282_1.png",
        "Ração Royal Canin Mini Indoor Puppy Junior": "https://http2.mlstatic.com/D_NQ_NP_2X_886339-MLU73339244094_122023-F.webp",
        "Royal Canin Mini Adult": "https://th.bing.com/th/id/OIP.Li0AOURaOqggPnjKbeaehAAAAA?rs=1&pid=ImgDetMain"
    };

    if (imagensDeRacoes[racaoRecomendada]) {
        let racaoImage = document.createElement('img');
        racaoImage.src = imagensDeRacoes[racaoRecomendada];
        racaoImage.alt = `Imagem da ração ${racaoRecomendada}`;
        racaoImage.id = "racaoImage";
        imagesContainer.appendChild(racaoImage);
    } else {
        resultDiv.innerHTML += `<p>Imagem da ração não encontrada.</p>`;
    }

        document.getElementById('clearButton').addEventListener('click', function() {
        document.getElementById('dogForm').reset(); // Limpa o formulário
        document.getElementById('result').innerHTML = ''; // Limpa o texto do resultado
        document.getElementById('imagesContainer').innerHTML = ''; // Limpa as imagens exibidas
        });
});

// qual a melhor raça 
document.getElementById('enviar-pedido').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link
  
    // Captura as seleções dos inputs tipo "radio"
    const caracteristicaEmocional = document.querySelector('input[name="caracteristica-emocional"]:checked');
    const deficiencia = document.querySelector('input[name="deficiencia"]:checked');
    const espaco = document.querySelector('input[name="espaco"]:checked');
  
    // Verifica se todas as opções foram preenchidas
    if (!caracteristicaEmocional || !deficiencia || !espaco) {
      alert('Por favor, preencha todas as opções.');
      return;
    }
  
    // Inicializa as variáveis para mensagem e imagem
    let mensagem = '';
    let imagemSrc = '';
  
    // Lógica para determinar a melhor raça de cachorro
    if (deficiencia.value === 'sim') {
      mensagem = 'Um Golden Retriever pode ser uma ótima escolha para você. Eles são ótimos cães-guia.';
      imagemSrc = 'imagens/golden-retriever.jpg'; // Altere para o caminho correto
    } else if (caracteristicaEmocional.value === 'calmo') {
      mensagem = 'Baseado no seu perfil calmo, um Buldogue Inglês seria uma ótima escolha.';
      imagemSrc = 'imagens/buldog_ingles.jpg'; // Altere para o caminho correto
    } else if (caracteristicaEmocional.value === 'ativo' && espaco.value === 'muito') {
      mensagem = 'Você tem bastante espaço e é ativo, um Labrador Retriever seria ideal para você.';
      imagemSrc = 'imagens/Labrador_Retriever.jpg'; // Altere para o caminho correto
    } else if (caracteristicaEmocional.value === 'irrita') {
      mensagem = 'Para quem se irrita facilmente, um Shih Tzu pode ser uma boa escolha.';
      imagemSrc = 'imagens/shitzu.jpg'; // Altere para o caminho correto
    } else {
      mensagem = 'Um Poodle seria uma ótima companhia para você.';
      imagemSrc = 'imagens/podle.jpg'; // Altere para o caminho correto
    }
  
    // Exibe a mensagem e a imagem após o envio
    const mensagemElement = document.getElementById('mensagem');
    mensagemElement.innerText = mensagem;
    mensagemElement.style.display = 'block'; // Exibe o texto
  
    const imagemAnimal = document.getElementById('imagem-animal');
    imagemAnimal.src = imagemSrc;
    imagemAnimal.style.display = 'block'; // Exibe a imagem
  
    const resultado = document.getElementById('resultado');
    resultado.style.display = 'block'; // Mostra o resultado
  
    // Aumenta a altura da div de fundo cinza para acomodar o conteúdo extra
    const entrarEmContato = document.getElementById('entrar_em_contato');
    entrarEmContato.style.paddingBottom = '50px'; // Adiciona mais espaço para imagem e texto
  });
