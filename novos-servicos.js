(() => {
  function init() {
  const img = (src, alt) => `<img src="/${src}" alt="${alt}" loading="lazy">`;
  const section = (id, eyebrow, title, copy, body, visual) => `
    <section id="${id}" class="new-service-section ${id === 'terceirizacao' ? 'new-service-partner' : ''}">
      <div class="wrap new-service-grid">
        <div class="new-service-copy">
          <p class="eyebrow light">${eyebrow}</p>
          <h2>${title}</h2>
          <p class="new-service-lead">${copy}</p>
          ${body}
          <a class="btn outline" href="https://wa.me/557588028694?text=Olá!%20Conheci%20a%20COMUNICAR%20pelo%20site%20e%20quero%20solicitar%20um%20orçamento.">Falar com um especialista ↗</a>
        </div>
        <div class="new-service-visual">${visual}</div>
      </div>
    </section>`;
  const list = items => `<ul class="new-service-list">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
  const cobertura = section('coberturas', 'NOVAS SOLUÇÕES', 'Coberturas para proteger e valorizar seus espaços.', 'Estruturas resistentes e sob medida para áreas residenciais, comerciais e industriais.', list(['Garagens e áreas gourmet', 'Espaços comerciais', 'Galpões e áreas industriais', 'Estruturas personalizadas']), `${img('cobertura-estrutura.jpeg', 'Estrutura metálica para cobertura')}<div class="new-service-mini">${img('cobertura-area.jpeg', 'Cobertura para área externa')}</div>`);
  const toldos = section('toldos', 'PROTEÇÃO E CONFORTO', 'Toldos que unem funcionalidade e presença.', 'Soluções para entradas, vitrines, janelas e áreas externas que protegem contra sol e chuva sem abrir mão do acabamento.', list(['Lojas e fachadas comerciais', 'Entradas e vitrines', 'Janelas e portas', 'Residências e áreas externas']), `${img('toldo-comercial.jpeg', 'Toldo comercial em fachada')}<div class="new-service-mini">${img('toldo-entrada.jpeg', 'Toldo para entrada residencial')}</div>`);
  const terceirizacao = section('terceirizacao', 'PARA AGÊNCIAS E EMPRESAS', 'Você cuida do cliente. A COMUNICAR cuida da produção.', 'Sua empresa não precisa ter máquinas, equipe ou estrutura própria para entregar projetos de comunicação visual.', `<p>Atuamos como parceira de produção para agências, designers, empresas e profissionais que precisam terceirizar serviços com qualidade, segurança e prazo.</p>${list(['Fachadas, toldos e coberturas', 'Letras caixa, totens e comunicação visual', 'Produção, acabamento e instalação'])}`, `<div class="partner-flow"><span>Você apresenta</span><b>→</b><span>A COMUNICAR produz</span><b>→</b><span>Seu cliente recebe</span></div>${img('cobertura-galpao.jpeg', 'Estrutura de produção em grande escala')}`);
  const process = document.querySelector('#processo');
  const faq = document.querySelector('.faq');
  if (!process || !faq) {
    window.setTimeout(init, 150);
    return;
  }
  if (process && !document.querySelector('#coberturas')) process.insertAdjacentHTML('beforebegin', cobertura + toldos);
  if (faq && !document.querySelector('#terceirizacao')) faq.insertAdjacentHTML('beforebegin', terceirizacao);
  const nav = document.querySelector('header nav');
  if (nav && !nav.querySelector('[href="#terceirizacao"]')) nav.insertAdjacentHTML('beforeend', '<a href="#terceirizacao">TERCEIRIZAÇÃO</a>');
  const footer = document.querySelector('footer .footer');
  if (footer && !footer.querySelector('.footer-contacts')) footer.insertAdjacentHTML('beforeend', `
    <div class="footer-contacts" aria-label="Contatos da COMUNICAR">
      <a href="https://wa.me/557588028694" target="_blank" rel="noreferrer"><span aria-hidden="true">◉</span><span>+55 75 8802-8694</span></a>
      <a href="mailto:atendimento@comunicarfsa.com.br"><span aria-hidden="true">✉</span><span>atendimento@comunicarfsa.com.br</span></a>
      <a href="https://instagram.com/comunicarfsa" target="_blank" rel="noreferrer"><span aria-hidden="true">◎</span><span>@comunicarfsa</span></a>
    </div>`);
  }
  init();
})();
