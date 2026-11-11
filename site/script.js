(function () {
  "use strict";

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.classList.add("anim");

  var MARCAS = {
    veg: "Vegetariano",
    picante: "Picante",
    autoral: "Autoral",
    infantil: "Infantil"
  };

  var AVISO_ALCOOL = "Venda de bebida alcoólica só para maiores de 18 anos. Se beber, não dirija.";

  var CARDAPIO = [
    {
      id: "hamburgueres",
      nome: "Hambúrgueres",
      nota: "Todos no pão brioche tostado na grelha. A batata é porção à parte, exceto no Brasinha.",
      midia: { tipo: "video", src: "media/loop-montagem.mp4", poster: "media/loop-montagem.jpg", largura: 960, altura: 540 },
      itens: [
        { id: "alta-brasa", nome: "Alta Brasa", descricao: "Blend de costela e acém 180 g, cheddar inglês, bacon de barriga, cebola na manteiga e molho da casa", preco: 46.9 },
        { id: "duplo-carvao", nome: "Duplo Carvão", descricao: "Dois blends de 120 g, cheddar duplo, bacon e geleia de cebola tostada", preco: 54.9 },
        { id: "coalho-na-grelha", nome: "Coalho na Grelha", descricao: "Blend 160 g, queijo coalho tostado, maionese de alho assado e alface", preco: 42.9 },
        { id: "verde-fogo", nome: "Verde Fogo", descricao: "Blend 160 g, queijo prato, rúcula, tomate e aioli de ervas", preco: 39.9 },
        { id: "cogumelo-na-lenha", nome: "Cogumelo na Lenha", descricao: "Portobello grelhado, queijo prato, cebola roxa e aioli de ervas", preco: 41.9, marcas: ["veg"] },
        { id: "smash-da-chapa", nome: "Smash da Chapa", descricao: "Dois smash de 90 g, cheddar, picles da casa, cebola e molho da casa", preco: 36.9 },
        { id: "costela-fume", nome: "Costela Fumê", descricao: "Blend 140 g com costela desfiada braseada, provolone, cebola crispy e barbecue defumado", preco: 52.9 },
        { id: "frango-na-chama", nome: "Frango na Chama", descricao: "Sobrecoxa desossada grelhada, queijo prato, alface, tomate e maionese de mostarda e mel", preco: 37.9 },
        { id: "brasa-brava", nome: "Brasa Brava", descricao: "Blend 180 g, queijo com pimenta, jalapeño grelhado, bacon e maionese chipotle", preco: 47.9, marcas: ["picante"] },
        { id: "brasinha", nome: "Brasinha", descricao: "Blend 90 g, queijo prato e pão brioche, com porção pequena de batata", preco: 29.9, marcas: ["infantil"], sinonimos: "kids" }
      ]
    },
    {
      id: "acompanhamentos",
      nome: "Acompanhamentos",
      itens: [
        { id: "batata-rustica", nome: "Batata rústica com alecrim", descricao: "Batata em gomos com casca, alecrim e sal grosso", preco: 29.9, marcas: ["veg"] },
        { id: "batata-palito", nome: "Batata palito com páprica defumada", descricao: "Palito crocante temperado com páprica defumada", preco: 27.9, marcas: ["veg"] },
        { id: "batata-alta-brasa", nome: "Batata Alta Brasa", descricao: "Batata palito com cheddar e farofa de bacon", preco: 39.9 },
        { id: "onion-rings", nome: "Onion rings", descricao: "Anéis de cebola empanados com molho barbecue", preco: 29.9, marcas: ["veg"] },
        { id: "mandioca-crocante", nome: "Mandioca crocante", descricao: "Mandioca frita com maionese verde de ervas", preco: 29.9, marcas: ["veg"] },
        { id: "dadinho-de-tapioca", nome: "Dadinho de tapioca", descricao: "Cubos de tapioca com queijo coalho e geleia de pimenta", preco: 33.9, marcas: ["veg"] },
        { id: "provolone-na-brasa", nome: "Provolone na brasa", descricao: "Provolone grelhado com orégano, mel e pão tostado", preco: 38.9, marcas: ["veg"] }
      ]
    },
    {
      id: "molhos",
      nome: "Molhos e adicionais",
      compacto: true,
      itens: [
        { grupo: "Molhos extras, pote de 40 g", id: "molho-da-casa", nome: "Molho da casa", descricao: "Maionese defumada com mostarda e picles", preco: 5.9 },
        { grupo: "Molhos extras, pote de 40 g", id: "maionese-alho-assado", nome: "Maionese de alho assado", descricao: "Alho assado na brasa batido na maionese", preco: 5.9 },
        { grupo: "Molhos extras, pote de 40 g", id: "aioli-de-ervas", nome: "Aioli de ervas", descricao: "Maionese de salsa, cebolinha e limão", preco: 5.9, marcas: ["veg"] },
        { grupo: "Molhos extras, pote de 40 g", id: "barbecue-defumado", nome: "Barbecue defumado", descricao: "Molho barbecue com toque de fumaça", preco: 5.9 },
        { grupo: "Molhos extras, pote de 40 g", id: "maionese-chipotle", nome: "Maionese chipotle", descricao: "Maionese com pimenta chipotle", preco: 5.9, marcas: ["picante"] },
        { grupo: "Adicionais", id: "bacon-de-barriga", nome: "Bacon de barriga", descricao: "Fatias grelhadas", preco: 7.9 },
        { grupo: "Adicionais", id: "cheddar-ingles", nome: "Cheddar inglês", descricao: "Fatia extra", preco: 6.9 },
        { grupo: "Adicionais", id: "ovo-na-chapa", nome: "Ovo na chapa", descricao: "Ovo frito na chapa", preco: 4.9 },
        { grupo: "Adicionais", id: "blend-extra", nome: "Blend extra 120 g", descricao: "Mais uma carne na montagem", preco: 14.9 }
      ]
    },
    {
      id: "chope",
      nome: "Chope e cervejas",
      aviso: AVISO_ALCOOL,
      midia: { tipo: "img", src: "img/bandeja-duplo-carvao.jpg", largura: 1400, altura: 781, alt: "Hambúrguer duplo com bacon, hambúrguer com folhas verdes, batata rústica e chope servidos na bandeja", desktop: true },
      itens: [
        { id: "chope-pilsen", nome: "Chope pilsen", descricao: "Claro e leve, tirado na pressão", tamanhos: [{ rotulo: "300 ml", preco: 13.9 }, { rotulo: "500 ml", preco: 19.9 }] },
        { id: "chope-ipa", nome: "Chope IPA", descricao: "Lupulado, amargor médio", tamanhos: [{ rotulo: "300 ml", preco: 16.9 }, { rotulo: "500 ml", preco: 24.9 }] },
        { id: "chope-defumado", nome: "Chope defumado", descricao: "Rauchbier com malte defumado, combina com a brasa", tamanhos: [{ rotulo: "300 ml", preco: 17.9 }, { rotulo: "500 ml", preco: 25.9 }] },
        { id: "long-neck", nome: "Long neck artesanal", descricao: "APA ou Weiss da cervejaria parceira da casa, 355 ml", preco: 17.9 }
      ]
    },
    {
      id: "drinks",
      nome: "Drinks",
      aviso: AVISO_ALCOOL,
      itens: [
        { id: "fumaca-negroni", nome: "Fumaça Negroni", descricao: "Gin, vermute rosso e bitter italiano, finalizado com casca de laranja queimada", preco: 37.9, marcas: ["autoral"] },
        { id: "brasa-sour", nome: "Brasa Sour", descricao: "Cachaça envelhecida, limão, melado e espuma, com borda de sal defumado", preco: 35.9, marcas: ["autoral"] },
        { id: "caipirinha", nome: "Caipirinha da casa", descricao: "Cachaça, limão tahiti e açúcar. Opção com abacaxi grelhado", preco: 27.9 },
        { id: "gin-tonica", nome: "Gin tônica de alecrim", descricao: "Gin, tônica e alecrim tostado", preco: 34.9 },
        { id: "spritz-laranja-amarga", nome: "Spritz de laranja amarga", descricao: "Bitter de laranja, espumante e laranja", preco: 34.9 }
      ]
    },
    {
      id: "sem-alcool",
      nome: "Sem álcool",
      itens: [
        { id: "abacaxi-na-brasa", nome: "Abacaxi na brasa", descricao: "Abacaxi grelhado, hortelã, limão e água com gás", preco: 19.9 },
        { id: "limonada-suica", nome: "Limonada suíça", descricao: "Limão tahiti batido com casca, gelo e leite condensado", preco: 16.9 },
        { id: "soda-italiana", nome: "Soda italiana de frutas vermelhas", descricao: "Xarope de frutas vermelhas, água com gás e gelo", preco: 17.9 },
        { id: "tonica-alecrim", nome: "Tônica de alecrim e limão siciliano", descricao: "Água tônica, alecrim e limão siciliano", preco: 16.9 }
      ]
    },
    {
      id: "sucos",
      nome: "Sucos",
      nota: "Naturais, 400 ml.",
      itens: [
        { id: "suco-laranja", nome: "Laranja", nomeBandeja: "Suco de laranja 400 ml", descricao: "Espremido na hora", preco: 12.9 },
        { id: "suco-limao", nome: "Limão", nomeBandeja: "Suco de limão 400 ml", descricao: "Com ou sem açúcar", preco: 11.9 },
        { id: "suco-abacaxi", nome: "Abacaxi com hortelã", nomeBandeja: "Suco de abacaxi com hortelã 400 ml", descricao: "Polpa natural batida com hortelã", preco: 13.9 },
        { id: "suco-maracuja", nome: "Maracujá", nomeBandeja: "Suco de maracujá 400 ml", descricao: "Polpa natural, com ou sem açúcar", preco: 13.9 }
      ]
    },
    {
      id: "refrigerantes",
      nome: "Refrigerantes e água",
      itens: [
        { id: "refrigerante", nome: "Refrigerante lata 350 ml", descricao: "Cola, cola zero, guaraná ou limão", preco: 8.9 },
        { id: "agua-tonica", nome: "Água tônica lata 350 ml", descricao: "Normal ou zero", preco: 8.9 },
        { id: "cha-gelado", nome: "Chá gelado 300 ml", descricao: "Limão ou pêssego", preco: 9.9 },
        { id: "agua-sem-gas", nome: "Água mineral sem gás 500 ml", preco: 6.9 },
        { id: "agua-com-gas", nome: "Água mineral com gás 500 ml", preco: 6.9 }
      ]
    },
    {
      id: "sobremesas",
      nome: "Sobremesas",
      itens: [
        { id: "brownie", nome: "Brownie da brasa", descricao: "Brownie de chocolate aquecido na brasa com sorvete de creme e calda", preco: 28.9 },
        { id: "abacaxi-caramelizado", nome: "Abacaxi caramelizado", descricao: "Abacaxi grelhado com canela, sorvete de creme e farofa doce", preco: 24.9 },
        { id: "milkshake", nome: "Milkshake de doce de leite", descricao: "Sorvete de doce de leite, leite e calda de caramelo, 400 ml", preco: 27.9 }
      ]
    }
  ];

  var CHAVE = "brasa-alta-bandeja-v3";
  var MAX = 20;
  var W = 15;
  var formatador = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)");
  var desktop = window.matchMedia("(min-width: 1100px)");

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function moeda(v) { return formatador.format(v); }
  function moedaTexto(v) { return formatador.format(v).replace(/ /g, " "); }
  function el(tag, classe, texto) {
    var n = document.createElement(tag);
    if (classe) n.className = classe;
    if (texto != null) n.textContent = texto;
    return n;
  }

  var topo = $(".topo");
  function medirTopo() {
    document.documentElement.style.setProperty("--topo", topo.offsetHeight + "px");
  }
  medirTopo();

  var skus = {};
  var ordem = [];
  var itensMenu = {};
  var todosItens = [];
  var estado = {};

  function criarStepper(dados) {
    var g = el("div", "qtd-ctrl");
    g.setAttribute("role", "group");
    var menos = el("button", "menos pressionavel");
    menos.type = "button";
    menos.dataset.acao = "menos";
    var q = el("span", "qtd");
    var rot = el("span", "sr-only");
    var n = el("span", null, "0");
    q.appendChild(rot);
    q.appendChild(n);
    var mais = el("button", "mais pressionavel");
    mais.type = "button";
    mais.dataset.acao = "mais";
    Object.keys(dados).forEach(function (k) {
      menos.dataset[k] = dados[k];
      mais.dataset[k] = dados[k];
    });
    g.appendChild(menos);
    g.appendChild(q);
    g.appendChild(mais);
    return { el: g, menos: menos, mais: mais, rot: rot, n: n };
  }

  function rotular(ref) {
    var s = ref.lista[ref.sel];
    ref.add.setAttribute("aria-label", "Adicionar " + s.nome);
    ref.stepper.el.setAttribute("aria-label", "Quantidade de " + s.nome);
    ref.stepper.menos.setAttribute("aria-label", "Remover " + s.nome);
    ref.stepper.mais.setAttribute("aria-label", "Adicionar " + s.nome);
    ref.stepper.rot.textContent = s.nome + ": ";
    ref.precoEl.textContent = moeda(s.preco);
  }

  function iconeMais() {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "icone-mais");
    svg.setAttribute("viewBox", "0 0 14 14");
    svg.setAttribute("width", "14");
    svg.setAttribute("height", "14");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var path = document.createElementNS(ns, "path");
    path.setAttribute("d", "M7 1.5v11M1.5 7h11");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    svg.appendChild(path);
    return svg;
  }

  function normalizar(t) {
    return String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function criarItem(def, catId, catNome) {
    var li = el("li", "item");
    li.dataset.busca = normalizar(def.nome + " " + (def.nomeBandeja || "") + " " + (def.descricao || "") + " " + (catNome || "") + " " + (def.marcas || []).map(function (m) { return MARCAS[m]; }).join(" ") + " " + (def.sinonimos || ""));
    var texto = el("div", "item-texto");
    var nome = el("p", "item-nome", def.nome);
    (def.marcas || []).forEach(function (m) {
      if (MARCAS[m]) nome.appendChild(el("span", "marca-txt", MARCAS[m]));
    });
    texto.appendChild(nome);
    if (def.descricao) texto.appendChild(el("p", "item-desc", def.descricao));

    var lista;
    if (def.tamanhos) {
      lista = def.tamanhos.map(function (t) {
        return { id: def.id + "-" + t.rotulo.replace(/\D/g, ""), nome: def.nome + " " + t.rotulo, preco: t.preco, rotulo: t.rotulo, cat: catId };
      });
    } else {
      lista = [{ id: def.id, nome: def.nomeBandeja || def.nome, preco: def.preco, cat: catId }];
    }
    lista.forEach(function (s) { skus[s.id] = s; ordem.push(s.id); });

    var compra = el("div", "item-compra");
    if (def.tamanhos) {
      var fs = el("fieldset", "tamanhos");
      fs.appendChild(el("legend", "sr-only", "Tamanho de " + def.nome));
      lista.forEach(function (s, i) {
        var lb = document.createElement("label");
        var inp = document.createElement("input");
        inp.type = "radio";
        inp.name = "tam-" + def.id;
        inp.value = String(i);
        inp.checked = i === 0;
        inp.dataset.item = def.id;
        lb.appendChild(inp);
        lb.appendChild(el("span", null, s.rotulo));
        fs.appendChild(lb);
      });
      compra.appendChild(fs);
    }
    var precoCx = el("div", "item-preco-caixa");
    var precoEl = el("p", "item-preco", moeda(lista[0].preco));
    precoCx.appendChild(precoEl);
    var notaEl = null;
    if (def.tamanhos) {
      notaEl = el("p", "item-nota-bandeja");
      notaEl.hidden = true;
      precoCx.appendChild(notaEl);
    }
    compra.appendChild(precoCx);
    texto.appendChild(compra);

    var acao = el("div", "item-acao");
    var add = el("button", "item-add pressionavel");
    add.appendChild(iconeMais());
    add.appendChild(document.createTextNode("Adicionar"));
    add.type = "button";
    add.dataset.acao = "add";
    add.dataset.item = def.id;
    var stepper = criarStepper({ item: def.id });
    stepper.el.hidden = true;
    acao.appendChild(add);
    acao.appendChild(stepper.el);

    li.appendChild(texto);
    li.appendChild(acao);

    var ref = { def: def, lista: lista, sel: 0, precoEl: precoEl, notaEl: notaEl, add: add, stepper: stepper, li: li };
    itensMenu[def.id] = ref;
    todosItens.push(ref);
    rotular(ref);
    return li;
  }

  var menuEl = $("#menu-lista");
  var catsNav = $("#cats-nav");
  var ind = $("#cats-ind");

  var catRefs = [];

  function criarMidia(m) {
    var fig = el("figure", "midia grupo-midia" + (m.desktop ? " so-desktop" : ""));
    var q = el("div", "quadro" + (m.tipo === "img" ? " zoom revelar" : ""));
    if (m.tipo === "video") {
      var v = document.createElement("video");
      v.className = "vivo";
      v.muted = true;
      v.setAttribute("muted", "");
      v.loop = true;
      v.setAttribute("playsinline", "");
      v.setAttribute("aria-hidden", "true");
      v.tabIndex = -1;
      v.preload = "none";
      v.poster = m.poster;
      v.width = m.largura;
      v.height = m.altura;
      var so = document.createElement("source");
      so.src = m.src;
      so.type = "video/mp4";
      v.appendChild(so);
      q.appendChild(v);
    } else {
      var img = document.createElement("img");
      img.src = m.src;
      img.width = m.largura;
      img.height = m.altura;
      img.loading = "lazy";
      img.alt = m.alt;
      q.appendChild(img);
    }
    fig.appendChild(q);
    return fig;
  }

  CARDAPIO.forEach(function (cat) {
    var link = el("a", "cats-link pressionavel", cat.nome);
    link.href = "#g-" + cat.id;
    catsNav.insertBefore(link, ind);

    var sec = el("section", "grupo" + (cat.compacto ? " compacto" : ""));
    sec.id = "g-" + cat.id;
    sec.setAttribute("aria-labelledby", "t-" + cat.id);
    var h3 = el("h3", null, cat.nome);
    h3.id = "t-" + cat.id;
    sec.appendChild(h3);
    if (cat.nota) sec.appendChild(el("p", "grupo-nota", cat.nota));
    if (cat.aviso) sec.appendChild(el("p", "grupo-aviso", cat.aviso));
    if (cat.midia) sec.appendChild(criarMidia(cat.midia));
    var ul = null;
    var grupoAtual = null;
    cat.itens.forEach(function (def) {
      if (!ul || (def.grupo || null) !== grupoAtual) {
        grupoAtual = def.grupo || null;
        if (grupoAtual) sec.appendChild(el("h4", "subtitulo", grupoAtual));
        ul = el("ul", "itens");
        sec.appendChild(ul);
      }
      ul.appendChild(criarItem(def, cat.id, cat.nome));
    });
    menuEl.appendChild(sec);
    catRefs.push({ id: cat.id, sec: sec, link: link });
  });

  var contador = $("#contador");
  var btnHeader = $("#abrir-header");
  var barraEl = $("#barra");
  var barraBtn = $("#abrir-barra");
  var barraResumo = $("#barra-resumo");
  var painel = $("#bandeja");
  var alca = $("#alca");
  var tituloB = $("#bandeja-titulo");
  var btnFechar = $("#fechar-bandeja");
  var vu = $("#vu");
  var vazioEl = $("#bandeja-vazia");
  var itensEl = $("#bandeja-itens");
  var listaEl = $("#bandeja-lista");
  var totalEl = $("#bandeja-total");
  var camposEl = $("#bandeja-campos");
  var formEl = $("#form-pedido");
  var enviarEl = $("#enviar");
  var obsEl = $("#obs");
  var radios = $$('input[name="modo"]');
  var toastEl = $("#toast");
  var toastTexto = $("#toast-texto");
  var toastDesfazer = $("#toast-desfazer");
  var anuncioEl = $("#anuncio");

  function modoAtual() {
    var r = radios.filter(function (x) { return x.checked; })[0];
    return r ? r.value : "Retirar no balcão";
  }

  function carregar() {
    try {
      var bruto = window.localStorage.getItem(CHAVE);
      if (!bruto) return;
      var d = JSON.parse(bruto);
      if (!d || typeof d !== "object") return;
      if (d.q && typeof d.q === "object") {
        Object.keys(d.q).forEach(function (id) {
          if (Object.prototype.hasOwnProperty.call(skus, id)) {
            var n = Math.floor(Number(d.q[id]));
            if (n > 0) estado[id] = Math.min(n, MAX);
          }
        });
      }
      if (typeof d.obs === "string") obsEl.value = d.obs.slice(0, 240);
      if (typeof d.modo === "string") {
        radios.forEach(function (r) { if (r.value === d.modo) r.checked = true; });
      }
    } catch (e) {}
  }

  function salvar() {
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify({ q: estado, obs: obsEl.value, modo: modoAtual() }));
    } catch (e) {}
  }

  function totais() {
    var n = 0;
    var v = 0;
    ordem.forEach(function (id) {
      var q = estado[id] || 0;
      n += q;
      v += q * skus[id].preco;
    });
    return { n: n, v: v };
  }

  function rotuloItens(n) { return n === 1 ? "1 item" : n + " itens"; }

  function renderLista() {
    listaEl.textContent = "";
    ordem.forEach(function (id) {
      var q = estado[id];
      if (!q) return;
      var s = skus[id];
      var li = el("li", "linha-b");
      var linha = el("div", "linha-b-topo");
      linha.appendChild(el("span", null, q + "x " + s.nome));
      linha.appendChild(el("span", "linha-b-sub", moeda(q * s.preco)));
      li.appendChild(linha);
      var st = criarStepper({ sku: id });
      st.el.setAttribute("aria-label", "Quantidade de " + s.nome);
      st.menos.setAttribute("aria-label", "Remover " + s.nome + " da bandeja");
      st.mais.setAttribute("aria-label", "Adicionar " + s.nome + " à bandeja");
      st.rot.textContent = s.nome + ": ";
      st.n.textContent = q;
      st.mais.disabled = q >= MAX;
      li.appendChild(st.el);
      listaEl.appendChild(li);
    });
  }

  function atualizarBarra() {
    barraEl.classList.toggle("visivel", totais().n > 0);
    document.body.classList.toggle("com-barra", totais().n > 0);
  }

  function atualizar() {
    var t = totais();
    todosItens.forEach(function (ref) {
      var s = ref.lista[ref.sel];
      var q = estado[s.id] || 0;
      ref.add.hidden = q > 0;
      ref.stepper.el.hidden = q === 0;
      ref.stepper.n.textContent = q;
      ref.stepper.mais.disabled = q >= MAX;
      ref.precoEl.textContent = moeda(s.preco);
      if (ref.notaEl) {
        var outras = [];
        ref.lista.forEach(function (o, i) {
          if (i !== ref.sel && estado[o.id]) outras.push(o.rotulo + " na bandeja: " + estado[o.id]);
        });
        ref.notaEl.textContent = outras.join("; ");
        ref.notaEl.hidden = outras.length === 0;
      }
    });
    renderLista();
    contador.textContent = t.n;
    btnHeader.setAttribute("aria-label", t.n ? "Bandeja, " + rotuloItens(t.n) : "Bandeja, vazia");
    barraResumo.textContent = t.n ? rotuloItens(t.n) + ", " + moeda(t.v) : "Bandeja vazia";
    barraBtn.setAttribute("aria-label", "Ver bandeja, " + (t.n ? rotuloItens(t.n) + ", " + moedaTexto(t.v) : "vazia"));
    totalEl.textContent = moeda(t.v);
    vazioEl.hidden = t.n > 0;
    itensEl.hidden = t.n === 0;
    camposEl.hidden = t.n === 0;
    enviarEl.disabled = t.n === 0;
    atualizarBarra();
    salvar();
  }

  var pulsoT = 0;
  function pulsar() {
    if (reduz.matches) return;
    contador.classList.remove("pulso");
    void contador.offsetWidth;
    contador.classList.add("pulso");
    window.clearTimeout(pulsoT);
    pulsoT = window.setTimeout(function () { contador.classList.remove("pulso"); }, 400);
  }

  var anunciarT = 0;
  function anunciar(msg) {
    window.clearTimeout(anunciarT);
    anuncioEl.textContent = "";
    anunciarT = window.setTimeout(function () { anuncioEl.textContent = msg; }, 60);
  }

  var toastT = 0;
  var toastRestante = 0;
  var toastInicio = 0;
  var toastPausado = false;
  var desfazer = null;
  function iniciarTempoToast(ms) {
    window.clearTimeout(toastT);
    toastRestante = ms;
    toastInicio = Date.now();
    toastT = window.setTimeout(esconderToast, ms);
  }
  function pausarToast() {
    if (!desfazer || toastPausado) return;
    toastPausado = true;
    window.clearTimeout(toastT);
    toastRestante = Math.max(2000, toastRestante - (Date.now() - toastInicio));
  }
  function retomarToast() {
    if (!desfazer || !toastPausado) return;
    if (toastEl.contains(document.activeElement) || toastEl.matches(":hover")) return;
    toastPausado = false;
    iniciarTempoToast(toastRestante);
  }
  function esconderToast() {
    window.clearTimeout(toastT);
    toastPausado = false;
    toastEl.classList.remove("visivel");
    document.body.classList.remove("toast-ativo");
    desfazer = null;
  }
  function mostrarToastDesfazer(texto, itens) {
    toastPausado = false;
    toastTexto.textContent = texto;
    desfazer = { itens: itens };
    toastEl.classList.add("visivel");
    document.body.classList.add("toast-ativo");
    iniciarTempoToast(10000);
  }
  function mostrarToastRemovido(nome, skuId, qtd) {
    mostrarToastDesfazer(nome + " removido", [{ id: skuId, qtd: qtd }]);
  }
  toastEl.addEventListener("mouseenter", pausarToast);
  toastEl.addEventListener("focusin", pausarToast);
  toastEl.addEventListener("mouseleave", retomarToast);
  toastEl.addEventListener("focusout", function () { window.setTimeout(retomarToast, 0); });
  document.addEventListener("keydown", function (e) {
    if (!desfazer || !(e.ctrlKey || e.metaKey) || e.altKey || e.shiftKey || (e.key !== "z" && e.key !== "Z")) return;
    var t = e.target;
    if (t && t.matches && t.matches("input, textarea, [contenteditable]")) return;
    e.preventDefault();
    toastDesfazer.click();
  });
  toastDesfazer.addEventListener("click", function () {
    if (!desfazer) return;
    var d = desfazer;
    esconderToast();
    d.itens.forEach(function (i) {
      estado[i.id] = Math.min(MAX, (estado[i.id] || 0) + i.qtd);
    });
    atualizar();
    pulsar();
    if (d.itens.length > 1) {
      anunciar("Bandeja restaurada");
      return;
    }
    var id = d.itens[0].id;
    anunciar(skus[id].nome + " restaurado na bandeja");
    todosItens.forEach(function (ref) {
      var sk = ref.lista[ref.sel];
      if (ref.lista.indexOf(skus[id]) > -1 && !folhaAberta()) {
        (estado[sk.id] ? ref.stepper.mais : ref.add).focus();
      }
    });
  });

  function folhaAberta() { return folha.alvo === "aberta"; }

  function chamaMini() {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 28");
    svg.setAttribute("width", "8");
    svg.setAttribute("height", "9");
    svg.setAttribute("aria-hidden", "true");
    var path = document.createElementNS(ns, "path");
    path.setAttribute("d", "M12.6 0.8C13.6 6.2 10.6 8.4 8.2 11.3C6 13.9 4.6 16.2 4.6 19.4C4.6 24 7.9 27.2 12 27.2C16.1 27.2 19.4 24 19.4 19.6C19.4 16.5 18 14.4 16.4 12.6C16.2 14.5 15.3 15.8 13.9 16.2C15 11.8 14.2 6.6 12.6 0.8Z");
    path.setAttribute("fill", "#201A16");
    svg.appendChild(path);
    return svg;
  }

  function voar(origem, usarBarra) {
    if (reduz.matches || !origem || !document.body.animate) return;
    var alvoEl = usarBarra ? barraResumo : contador;
    var b = alvoEl.getBoundingClientRect();
    if (!b.width || !origem.width) { pulsar(); return; }
    var x0 = origem.left + origem.width / 2 - 7;
    var y0 = origem.top + origem.height / 2 - 7;
    var x1 = b.left + b.width / 2 - 7;
    var y1 = b.top + b.height / 2 - 7;
    var disco = el("div", "voo");
    disco.setAttribute("aria-hidden", "true");
    disco.appendChild(chamaMini());
    document.body.appendChild(disco);
    var alto = Math.min(140, 50 + Math.abs(y1 - y0) * 0.2);
    var quadros = [];
    var N = 16;
    for (var i = 0; i <= N; i++) {
      var t = i / N;
      var e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      var x = x0 + (x1 - x0) * e;
      var y = y0 + (y1 - y0) * e - alto * 4 * e * (1 - e);
      quadros.push({ transform: "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0) scale(" + (1 - 0.25 * e).toFixed(3) + ")", offset: t });
    }
    var fim = function () {
      if (disco.parentNode) disco.parentNode.removeChild(disco);
      pulsar();
    };
    var anim = disco.animate(quadros, { duration: 450, easing: "linear", fill: "forwards" });
    anim.onfinish = fim;
    window.setTimeout(function () { if (disco.parentNode) fim(); }, 800);
  }

  function alterar(skuId, delta, origemRect) {
    var antes = estado[skuId] || 0;
    var q = Math.max(0, Math.min(MAX, antes + delta));
    if (q === antes) return;
    var usarBarra = modoFolha() && barraEl.classList.contains("visivel") && folha.alvo !== "aberta";
    if (q === 0) delete estado[skuId]; else estado[skuId] = q;
    atualizar();
    var nome = skus[skuId].nome;
    if (delta > 0) {
      anunciar(nome + " adicionado à bandeja, " + q + " na bandeja.");
      if (reduz.matches) pulsar();
      else voar(origemRect, usarBarra);
    } else if (q === 0) {
      mostrarToastRemovido(nome, skuId, antes);
      anunciar(nome + " removido da bandeja. Desfazer disponível. Ctrl+Z desfaz.");
    } else {
      anunciar(nome + ", " + q + " na bandeja.");
    }
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("button[data-acao]") : null;
    if (!b) return;
    var delta = b.dataset.acao === "menos" ? -1 : 1;
    if (b.dataset.item) {
      var ref = itensMenu[b.dataset.item];
      var s = ref.lista[ref.sel];
      alterar(s.id, delta, b.getBoundingClientRect());
      if (!estado[s.id]) ref.add.focus();
      else if (ref.stepper.mais.disabled) ref.stepper.menos.focus();
      else if (delta > 0) ref.stepper.mais.focus();
    } else if (b.dataset.sku) {
      var id = b.dataset.sku;
      alterar(id, delta, b.getBoundingClientRect());
      var alvo = listaEl.querySelector('button[data-sku="' + id + '"][data-acao="' + b.dataset.acao + '"]');
      if (!alvo || alvo.disabled) alvo = listaEl.querySelector('button[data-sku="' + id + '"]:not(:disabled)');
      (alvo || tituloB).focus();
    }
  });

  document.addEventListener("change", function (e) {
    var inp = e.target;
    if (inp && inp.matches && inp.matches(".tamanhos input")) {
      var ref = itensMenu[inp.dataset.item];
      ref.sel = Number(inp.value);
      rotular(ref);
      atualizar();
    }
  });

  var pressionado = null;
  function soltar() {
    if (pressionado) {
      pressionado.classList.remove("pressionado");
      pressionado = null;
    }
  }
  document.addEventListener("pointerdown", function (e) {
    var n = e.target.closest ? e.target.closest(".pressionavel") : null;
    if (n && !n.disabled) {
      pressionado = n;
      n.classList.add("pressionado");
    }
  }, true);
  ["pointerup", "pointercancel", "dragend"].forEach(function (ev) {
    document.addEventListener(ev, soltar, true);
  });
  window.addEventListener("blur", soltar);

  var folha = { alvo: "fechada", y: 0, v: 0, raf: 0, fechado: 0, abridor: null, inertados: [], timer: 0 };

  function modoFolha() { return !desktop.matches; }

  function fechadoY() {
    var h = painel.offsetHeight;
    var b = barraEl.classList.contains("visivel") ? barraEl.offsetHeight : 0;
    return Math.max(h - b, 0);
  }

  function mover(y) {
    folha.y = y;
    painel.style.transform = "translate3d(0," + y.toFixed(2) + "px,0)";
    var p = folha.fechado > 0 ? 1 - y / folha.fechado : 1;
    p = Math.max(0, Math.min(1, p));
    vu.style.opacity = (p * 0.62).toFixed(3);
    barraEl.style.opacity = Math.max(0, 1 - p * 4).toFixed(3);
  }

  function parar() {
    if (folha.raf) {
      window.cancelAnimationFrame(folha.raf);
      folha.raf = 0;
    }
  }

  function concluirFechada() {
    painel.classList.remove("visivel-folha");
    painel.style.transform = "";
    painel.style.opacity = "";
    painel.style.transition = "";
    vu.hidden = true;
    vu.style.opacity = "";
    vu.style.transition = "";
    barraEl.style.opacity = "";
    painel.removeAttribute("role");
    painel.removeAttribute("aria-modal");
    if (!$("#dialogo-pedido").open) document.body.classList.remove("sem-rolagem");
  }

  function animar(alvo, v0) {
    parar();
    var x0 = folha.y;
    var A = x0 - alvo;
    var B = v0 + W * A;
    var t0 = performance.now();
    function passo(agora) {
      var t = Math.max(0, (agora - t0) / 1000);
      var e = Math.exp(-W * t);
      var x = alvo + (A + B * t) * e;
      var v = (B - W * (A + B * t)) * e;
      folha.v = v;
      mover(x);
      if (Math.abs(x - alvo) < 0.4 && Math.abs(v) < 8) {
        mover(alvo);
        folha.v = 0;
        folha.raf = 0;
        if (folha.alvo === "fechada") concluirFechada();
        return;
      }
      folha.raf = window.requestAnimationFrame(passo);
    }
    folha.raf = window.requestAnimationFrame(passo);
  }

  function fadeAbrir() {
    window.clearTimeout(folha.timer);
    painel.style.transition = "none";
    painel.style.transform = "none";
    painel.style.opacity = "0";
    vu.style.transition = "none";
    vu.style.opacity = "0";
    barraEl.style.opacity = "0";
    void painel.offsetWidth;
    painel.style.transition = "opacity 200ms linear";
    vu.style.transition = "opacity 200ms linear";
    painel.style.opacity = "1";
    vu.style.opacity = "0.62";
  }

  function fadeFechar() {
    painel.style.transition = "opacity 200ms linear";
    vu.style.transition = "opacity 200ms linear";
    painel.style.opacity = "0";
    vu.style.opacity = "0";
    barraEl.style.opacity = "";
    window.clearTimeout(folha.timer);
    folha.timer = window.setTimeout(function () {
      if (folha.alvo === "fechada") concluirFechada();
    }, 220);
  }

  function inertarFora(ligar) {
    if (ligar) {
      if (folha.inertados.length) return;
      var no = painel;
      while (no && no !== document.body) {
        var pai = no.parentElement;
        if (!pai) break;
        var atual = no;
        Array.prototype.forEach.call(pai.children, function (irmao) {
          if (irmao === atual || irmao.hasAttribute("data-nao-inert") || irmao.tagName === "SCRIPT" || irmao.inert) return;
          irmao.inert = true;
          folha.inertados.push(irmao);
        });
        no = pai;
      }
    } else {
      folha.inertados.forEach(function (n) { n.inert = false; });
      folha.inertados = [];
    }
  }

  function sincronizarAria(aberto) {
    barraBtn.setAttribute("aria-expanded", aberto ? "true" : "false");
    btnHeader.setAttribute("aria-expanded", aberto ? "true" : "false");
  }

  function abrirFolha(origem) {
    if (!modoFolha()) {
      $("#cardapio").scrollIntoView();
      tituloB.focus({ preventScroll: true });
      return;
    }
    if (folha.alvo === "aberta") return;
    folha.alvo = "aberta";
    folha.abridor = origem || barraBtn;
    window.clearTimeout(folha.timer);
    var jaVisivel = painel.classList.contains("visivel-folha");
    document.body.classList.add("folha-ativa");
    if (!jaVisivel) {
      folha.fechado = fechadoY();
      folha.v = 0;
      painel.classList.add("visivel-folha");
      vu.hidden = false;
      painel.setAttribute("role", "dialog");
      painel.setAttribute("aria-modal", "true");
      document.body.classList.add("sem-rolagem");
      if (!reduz.matches) {
        mover(folha.fechado);
        void painel.offsetWidth;
      }
    }
    inertarFora(true);
    sincronizarAria(true);
    if (reduz.matches) fadeAbrir();
    else animar(0, folha.v);
    tituloB.focus({ preventScroll: true });
  }

  function fecharFolha(devolver) {
    if (folha.alvo !== "aberta") return;
    folha.alvo = "fechada";
    document.body.classList.remove("folha-ativa");
    inertarFora(false);
    sincronizarAria(false);
    if (devolver !== false) {
      var a = folha.abridor;
      if (a && a.focus) a.focus({ preventScroll: true });
      if (document.activeElement !== a) btnHeader.focus({ preventScroll: true });
    }
    if (reduz.matches) {
      fadeFechar();
    } else {
      folha.fechado = fechadoY();
      animar(folha.fechado, folha.v);
    }
  }

  function resetarFolha() {
    parar();
    window.clearTimeout(folha.timer);
    folha.alvo = "fechada";
    document.body.classList.remove("folha-ativa");
    inertarFora(false);
    sincronizarAria(false);
    concluirFechada();
  }

  barraBtn.addEventListener("click", function () { abrirFolha(barraBtn); });
  btnHeader.addEventListener("click", function () {
    if (modoFolha() && folha.alvo === "aberta") fecharFolha(true);
    else abrirFolha(btnHeader);
  });
  btnFechar.addEventListener("click", function () { fecharFolha(true); });
  vu.addEventListener("click", function () { fecharFolha(true); });

  var arraste = null;
  alca.addEventListener("pointerdown", function (e) {
    if (!modoFolha() || reduz.matches || folha.alvo !== "aberta") return;
    if (e.target.closest("button")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    parar();
    folha.fechado = fechadoY();
    arraste = { id: e.pointerId, inicio: e.clientY, base: folha.y, amostras: [{ t: e.timeStamp, y: e.clientY }] };
    try { alca.setPointerCapture(e.pointerId); } catch (x) {}
    painel.classList.add("arrastando");
  });
  alca.addEventListener("pointermove", function (e) {
    if (!arraste || e.pointerId !== arraste.id) return;
    var y = arraste.base + (e.clientY - arraste.inicio);
    if (y < 0) y = y * 0.25;
    mover(y);
    arraste.amostras.push({ t: e.timeStamp, y: e.clientY });
    while (arraste.amostras.length > 2 && e.timeStamp - arraste.amostras[0].t > 100) arraste.amostras.shift();
  });
  function soltarArraste(e, cancelado) {
    if (!arraste || e.pointerId !== arraste.id) return;
    var a = arraste;
    arraste = null;
    painel.classList.remove("arrastando");
    try { alca.releasePointerCapture(e.pointerId); } catch (x) {}
    var v = 0;
    if (!cancelado && a.amostras.length > 1) {
      var p = a.amostras[0];
      var u = a.amostras[a.amostras.length - 1];
      var dt = u.t - p.t;
      if (dt > 0) v = ((u.y - p.y) / dt) * 1000;
    }
    var projetado = folha.y + (v / 1000) * 0.998 / (1 - 0.998);
    folha.v = v;
    if (projetado > folha.fechado * 0.5) fecharFolha(true);
    else animar(0, v);
  }
  alca.addEventListener("pointerup", function (e) { soltarArraste(e, false); });
  alca.addEventListener("pointercancel", function (e) { soltarArraste(e, true); });

  var dialogo = $("#dialogo-pedido");
  var mensagemEl = $("#mensagem");

  document.addEventListener("keydown", function (e) {
    if (folha.alvo !== "aberta" || dialogo.open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      fecharFolha(true);
    } else if (e.key === "Tab") {
      var foco = $$("button, textarea, input, a[href]", painel).filter(function (n) {
        return !n.disabled && n.getClientRects().length > 0;
      });
      if (toastEl.classList.contains("visivel")) foco.push(toastDesfazer);
      if (!foco.length) return;
      var primeiro = foco[0];
      var ultimo = foco[foco.length - 1];
      if (e.shiftKey && (document.activeElement === primeiro || document.activeElement === tituloB)) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    }
  });

  desktop.addEventListener("change", function () {
    if (desktop.matches || painel.classList.contains("visivel-folha")) resetarFolha();
  });

  function montarMensagem() {
    var linhas = ["Olá, Brasa Alta! Quero fazer um pedido:", ""];
    ordem.forEach(function (id) {
      var q = estado[id];
      if (!q) return;
      var s = skus[id];
      linhas.push(q + "x " + s.nome + ", " + moedaTexto(q * s.preco));
    });
    linhas.push("");
    linhas.push("Total: " + moedaTexto(totais().v));
    linhas.push("Forma: " + modoAtual());
    var o = obsEl.value.trim();
    if (o) linhas.push("Observação: " + o);
    return linhas.join("\n");
  }

  var avisoAlcoolEl = $("#aviso-alcool");
  function temAlcool() {
    return ordem.some(function (id) {
      return estado[id] && (skus[id].cat === "chope" || skus[id].cat === "drinks");
    });
  }

  function abrirDialogo() {
    resetarDialogo(dialogo);
    mensagemEl.textContent = montarMensagem();
    avisoAlcoolEl.hidden = !temAlcool();
    dialogo.appendChild(anuncioEl);
    document.body.classList.add("sem-rolagem");
    if (typeof dialogo.showModal === "function") dialogo.showModal();
    else dialogo.setAttribute("open", "");
    enviarPedidoBtn.focus();
  }

  dialogo.addEventListener("close", function () {
    resetarDialogo(dialogo);
    document.body.appendChild(anuncioEl);
    if (!painel.classList.contains("visivel-folha")) document.body.classList.remove("sem-rolagem");
  });
  dialogo.addEventListener("click", function (e) {
    if (e.target === dialogo) dialogo.close();
  });
  $("#fechar-dialogo").addEventListener("click", function () { dialogo.close(); });

  var NOTA_DEMO = "Demonstração: nenhuma mensagem saiu do site. Na versão real, o pedido vai para o WhatsApp da casa.";
  var enviarPedidoBtn = $("#enviar-pedido");
  var conv = { timers: [] };

  function limparConv() {
    conv.timers.forEach(function (t) { window.clearTimeout(t); });
    conv.timers = [];
  }
  function depois(ms, fn) { conv.timers.push(window.setTimeout(fn, ms)); }

  function resetarDialogo(dlg) {
    limparConv();
    var tela = $(".conversa", dlg);
    if (tela) tela.parentNode.removeChild(tela);
    var form = $(".dlg-form", dlg);
    if (form) form.hidden = false;
    dlg.setAttribute("aria-labelledby", dlg.dataset.titulo);
  }

  var fusoHora = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo", hourCycle: "h23" });

  function chamaGrande() {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 28");
    svg.setAttribute("width", "26");
    svg.setAttribute("height", "30");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var path = document.createElementNS(ns, "path");
    path.setAttribute("d", "M12.6 0.8C13.6 6.2 10.6 8.4 8.2 11.3C6 13.9 4.6 16.2 4.6 19.4C4.6 24 7.9 27.2 12 27.2C16.1 27.2 19.4 24 19.4 19.6C19.4 16.5 18 14.4 16.4 12.6C16.2 14.5 15.3 15.8 13.9 16.2C15 11.8 14.2 6.6 12.6 0.8Z");
    path.setAttribute("fill", "#E86A1E");
    svg.appendChild(path);
    return svg;
  }

  function marcasLeitura(lida) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 20 12");
    svg.setAttribute("width", "17");
    svg.setAttribute("height", "10");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var d = lida ? "M1 6.5l3.5 3.5L11 2M7 8.5l1.5 1.5L15 2" : "M3 6.5l3.5 3.5L13 2";
    var path = document.createElementNS(ns, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", lida ? "#fff" : "rgba(255,255,255,.75)");
    path.setAttribute("stroke-width", "1.8");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
    return svg;
  }

  function respostaPedido() {
    var t = totais();
    var txt;
    var st = calcularStatus(agoraSP());
    if (st.aberto || typeof agoraSP().dia !== "number") {
      var parte = modoAtual() === "Comer na casa" ? "Comer na casa: sua mesa fica reservada por 30 min." : "Retirada no balcão: fica pronto em cerca de 25 min.";
      txt = "Pedido recebido! " + t.n + (t.n === 1 ? " item" : " itens") + ", total " + moedaTexto(t.v) + ". " + parte + " Obrigado por escolher a Brasa Alta.";
    } else {
      txt = "Recebemos seu pedido. Estamos fechados agora e abrimos " + st.texto.replace("Fechado agora. Abre ", "") + "; ele entra na fila assim que abrirmos.";
    }
    if (temAlcool()) txt += " Lembrando: bebida alcoólica só para maiores de 18 anos.";
    return txt;
  }

  function botao(texto, classe, id) {
    var b = el("button", "btn pressionavel " + classe, texto);
    b.type = "button";
    if (id) b.id = id;
    return b;
  }

  function criarBolhaEu(texto) {
    var eu = el("div", "bolha bolha-eu");
    eu.appendChild(el("span", "bolha-texto", texto));
    var meta = el("span", "bolha-meta");
    var marcas = el("span", "marcas");
    var estadoSr = el("span", "sr-only", "Enviada");
    marcas.appendChild(marcasLeitura(false));
    meta.appendChild(el("time", "", fusoHora.format(new Date())));
    meta.appendChild(marcas);
    meta.appendChild(estadoSr);
    eu.appendChild(meta);
    return {
      el: eu,
      lida: function () {
        marcas.replaceChild(marcasLeitura(true), marcas.firstChild);
        estadoSr.textContent = "Lida";
      }
    };
  }

  function criarBolhaCasa(texto, acao) {
    var c = el("div", "bolha bolha-casa");
    c.appendChild(el("span", "bolha-rotulo", "Brasa Alta respondeu"));
    c.appendChild(el("span", "bolha-texto", texto));
    if (acao) {
      var b = el("button", "btn bolha-acao pressionavel", acao.texto);
      b.type = "button";
      b.addEventListener("click", acao.fazer);
      c.appendChild(b);
    }
    var m = el("span", "bolha-meta");
    m.appendChild(el("time", "", fusoHora.format(new Date())));
    c.appendChild(m);
    return c;
  }

  function criarDigitando() {
    var d = el("div", "bolha bolha-casa digitando");
    d.appendChild(el("span", "", "Brasa Alta está digitando"));
    var pontos = el("span", "pontos");
    pontos.setAttribute("aria-hidden", "true");
    for (var i = 0; i < 3; i++) pontos.appendChild(el("span"));
    d.appendChild(pontos);
    return d;
  }

  function iniciarConversa(dlg, texto, resposta, acoesDef) {
    limparConv();
    var antiga = $(".conversa", dlg);
    if (antiga) antiga.parentNode.removeChild(antiga);
    $(".dlg-form", dlg).hidden = true;
    var tela = el("div", "conversa");
    var cab = el("div", "conv-cab");
    cab.appendChild(chamaGrande());
    var tx = el("div", "conv-quem");
    var titulo = el("h2", "", "Brasa Alta");
    titulo.id = dlg.id + "-conv-titulo";
    titulo.tabIndex = -1;
    tx.appendChild(titulo);
    tx.appendChild(el("p", "", "Conversa de demonstração"));
    cab.appendChild(tx);
    var log = el("div", "conv-log");
    log.setAttribute("role", "log");
    log.setAttribute("aria-label", "Conversa com a Brasa Alta");
    var eu = criarBolhaEu(texto);
    log.appendChild(eu.el);
    tela.appendChild(cab);
    tela.appendChild(log);
    tela.appendChild(el("p", "nota-demo", NOTA_DEMO));
    var acoes = el("div", "dialogo-acoes");
    acoesDef.forEach(function (a) {
      var b = botao(a.texto, a.classe);
      b.addEventListener("click", a.fazer);
      acoes.appendChild(b);
    });
    tela.appendChild(acoes);
    $(".dialogo-in", dlg).appendChild(tela);
    dlg.setAttribute("aria-labelledby", titulo.id);
    titulo.focus();
    anunciar("Mensagem enviada");

    function responder() {
      var dig = $(".digitando", log);
      if (dig) log.removeChild(dig);
      eu.lida();
      log.appendChild(criarBolhaCasa(resposta));
      log.scrollTop = log.scrollHeight;
      anunciar("Brasa Alta respondeu: " + resposta);
    }
    if (reduz.matches) {
      depois(600, responder);
    } else {
      depois(900, function () {
        eu.lida();
        log.appendChild(criarDigitando());
        log.scrollTop = log.scrollHeight;
        depois(1400, responder);
      });
    }
  }

  enviarPedidoBtn.addEventListener("click", function () {
    iniciarConversa(dialogo, montarMensagem(), respostaPedido(), [
      { texto: "Concluir", classe: "btn-escuro", fazer: concluirPedido },
      { texto: "Voltar ao cardápio", classe: "", fazer: function () { dialogo.close(); fecharFolha(true); } }
    ]);
  });

  function concluirPedido() {
    var itens = ordem.filter(function (id) { return estado[id]; }).map(function (id) { return { id: id, qtd: estado[id] }; });
    dialogo.close();
    fecharFolha(true);
    itens.forEach(function (i) { delete estado[i.id]; });
    atualizar();
    mostrarToastDesfazer("Bandeja esvaziada", itens);
    anunciar("Pedido enviado");
  }

  var dialogoWa = $("#dialogo-wa");
  var chatLog = $("#chat-log");
  var chatChips = $("#chat-chips");
  var chatForm = $("#chat-form");
  var chatTexto = $("#chat-texto");
  var chat = { iniciado: false, ocupado: false, usados: {}, timers: [], pendente: null, abridor: null };

  function textoHorario() {
    var tr = $('#horario tr[data-dia="2"] td');
    return tr ? tr.textContent.trim() : "18h às 23h30";
  }
  function respostaAbertos() {
    var h = textoHorario();
    var fim = h.split(" às ")[1] || "23h30";
    var funcionamos = "Funcionamos de terça a domingo, das " + h + ".";
    var st = calcularStatus(agoraSP());
    if (st.aberto) return "Sim, abertos até " + fim + ". " + funcionamos;
    return "Agora estamos fechados. Abrimos " + st.texto.replace("Fechado agora. Abre ", "") + ". " + funcionamos;
  }
  function nomesVeg() {
    var nomes = [];
    CARDAPIO.forEach(function (cat) {
      if (cat.id !== "hamburgueres" && cat.id !== "acompanhamentos") return;
      cat.itens.forEach(function (d) {
        if ((d.marcas || []).indexOf("veg") > -1) nomes.push(d.nome);
      });
    });
    return nomes;
  }
  function textoChopes() {
    var linhas = [];
    CARDAPIO.forEach(function (cat) {
      if (cat.id !== "chope") return;
      cat.itens.forEach(function (d) {
        if (!d.tamanhos) return;
        linhas.push(d.nome + ": " + d.tamanhos.map(function (t) { return t.rotulo + " " + moedaTexto(t.preco); }).join(" e "));
      });
    });
    return linhas.join("\n") + "\n" + AVISO_ALCOOL;
  }
  function irPara(sel) {
    var alvo = $(sel);
    if (alvo) alvo.scrollIntoView({ behavior: reduz.matches ? "auto" : "smooth", block: "start" });
  }
  function fecharChatE(fn) {
    dialogoWa.close();
    window.setTimeout(fn, 60);
  }

  var CHIPS = [
    { id: "abertos", texto: "Vocês estão abertos?", pergunta: "Vocês estão abertos?" },
    { id: "onde", texto: "Onde fica?", pergunta: "Onde fica?" },
    { id: "retirada", texto: "Quanto tempo para retirar?", pergunta: "Quanto tempo para retirar?" },
    { id: "veg", texto: "Tem opção vegetariana?", pergunta: "Tem opção vegetariana?" },
    { id: "chopes", texto: "Quais chopes vocês têm?", pergunta: "Quais chopes vocês têm?" },
    { id: "pedido", texto: "Quero fazer um pedido", pergunta: "Quero fazer um pedido" }
  ];

  function respostaChip(id) {
    if (id === "abertos") return { texto: respostaAbertos() };
    if (id === "onde") {
      var end = $("#endereco address").textContent.trim();
      if (end.indexOf("endereço fictício") < 0) end += " (endereço fictício)";
      return { texto: end, acao: { texto: "Ver endereço", fazer: function () { fecharChatE(function () { irPara("#endereco"); }); } } };
    }
    if (id === "retirada") return { texto: "Cerca de 25 min depois da confirmação." };
    if (id === "veg") {
      return {
        texto: "Opções vegetarianas: " + nomesVeg().join(", ") + ".",
        acao: {
          texto: "Ver no cardápio",
          fazer: function () {
            fecharChatE(function () {
              buscaEl.value = "vegetariano";
              aplicarBusca();
              irPara("#cardapio");
            });
          }
        }
      };
    }
    if (id === "chopes") return { texto: textoChopes() };
    var tem = totais().n > 0;
    return {
      texto: "Monte seu pedido no cardápio e toque em Enviar no WhatsApp na bandeja.",
      acao: tem
        ? { texto: "Ver minha bandeja", fazer: function () { fecharChatE(function () { if (desktop.matches) irPara("#bandeja"); else abrirFolha(btnHeader); }); } }
        : { texto: "Abrir cardápio", fazer: function () { fecharChatE(function () { irPara("#cardapio"); }); } }
    };
  }

  function chatDepois(ms, fn) { chat.timers.push(window.setTimeout(fn, ms)); }
  function rolarChat() { chatLog.scrollTop = chatLog.scrollHeight; }

  function renderChips() {
    var tinhaFoco = chatChips.contains(document.activeElement);
    chatChips.textContent = "";
    var lista = CHIPS.filter(function (c) { return !chat.usados[c.id]; });
    chatChips.hidden = lista.length === 0;
    lista.forEach(function (c) {
      var b = el("button", "chip-resp pressionavel", c.texto);
      b.type = "button";
      if (chat.ocupado) b.setAttribute("aria-disabled", "true");
      b.addEventListener("click", function () {
        if (chat.ocupado) return;
        chat.usados[c.id] = true;
        conversar(c.pergunta, function () { return respostaChip(c.id); });
      });
      chatChips.appendChild(b);
    });
    if (tinhaFoco) (chatChips.firstElementChild || chatTexto).focus();
  }

  function conversar(pergunta, montar) {
    chat.ocupado = true;
    var eu = criarBolhaEu(pergunta);
    chatLog.appendChild(eu.el);
    rolarChat();
    renderChips();
    anunciar("Mensagem enviada");
    var feito = false;
    function responder(silencioso) {
      if (feito) return;
      feito = true;
      var dig = $(".digitando", chatLog);
      if (dig) chatLog.removeChild(dig);
      eu.lida();
      var r = montar();
      chatLog.appendChild(criarBolhaCasa(r.texto, r.acao));
      rolarChat();
      chat.ocupado = false;
      chat.pendente = null;
      renderChips();
      if (!silencioso) anunciar("Brasa Alta respondeu: " + r.texto);
    }
    chat.pendente = responder;
    if (reduz.matches) {
      chatDepois(600, function () { responder(false); });
    } else {
      chatDepois(900, function () {
        eu.lida();
        chatLog.appendChild(criarDigitando());
        rolarChat();
        chatDepois(1400, function () { responder(false); });
      });
    }
  }

  function saudar() {
    chat.ocupado = true;
    var feito = false;
    function dizer(silencioso) {
      if (feito) return;
      feito = true;
      var dig = $(".digitando", chatLog);
      if (dig) chatLog.removeChild(dig);
      var t = "Oi! Aqui é a Brasa Alta. Como podemos ajudar?";
      chatLog.appendChild(criarBolhaCasa(t));
      chat.ocupado = false;
      chat.pendente = null;
      renderChips();
      if (!silencioso) anunciar("Brasa Alta respondeu: " + t);
    }
    chat.pendente = dizer;
    if (reduz.matches) {
      chatDepois(300, function () { dizer(false); });
    } else {
      chatLog.appendChild(criarDigitando());
      chatDepois(600, function () { dizer(false); });
    }
  }

  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var t = chatTexto.value.trim();
    if (!t || chat.ocupado) return;
    chatTexto.value = "";
    if (CHIPS.every(function (c) { return chat.usados[c.id]; })) chat.usados = {};
    conversar(t, function () { return { texto: "Recebemos sua mensagem. Para agilizar, escolha uma das opções abaixo." }; });
  });

  function abrirWa(abridor) {
    chat.abridor = abridor;
    dialogoWa.appendChild(anuncioEl);
    document.body.classList.add("sem-rolagem");
    if (typeof dialogoWa.showModal === "function") dialogoWa.showModal();
    else dialogoWa.setAttribute("open", "");
    if (!chat.iniciado) {
      chat.iniciado = true;
      renderChips();
      saudar();
    }
    rolarChat();
    var primeiro = $(".chip-resp", chatChips);
    (primeiro || chatTexto).focus();
  }
  dialogoWa.addEventListener("close", function () {
    chat.timers.forEach(function (t) { window.clearTimeout(t); });
    chat.timers = [];
    if (chat.pendente) chat.pendente(true);
    document.body.appendChild(anuncioEl);
    if (!painel.classList.contains("visivel-folha")) document.body.classList.remove("sem-rolagem");
    if (chat.abridor && chat.abridor.focus) chat.abridor.focus({ preventScroll: true });
  });
  dialogoWa.addEventListener("click", function (e) {
    if (e.target === dialogoWa) dialogoWa.close();
  });
  $("#wa-fechar").addEventListener("click", function () { dialogoWa.close(); });
  var waFlut = $("#wa-flutuante");
  waFlut.addEventListener("click", function () { abrirWa(waFlut); });
  var waEnd = $("#wa-endereco");
  waEnd.addEventListener("click", function () { abrirWa(waEnd); });

  (function ocultarWaNoCardapio() {
    var sec = $(".grade-cardapio");
    var mq = window.matchMedia("(max-width: 1099.98px)");
    var io = null;
    function montar() {
      if (io) io.disconnect();
      document.body.classList.remove("wa-oculto");
      if (!mq.matches || !("IntersectionObserver" in window)) return;
      var faixa = 90;
      io = new IntersectionObserver(function (es) {
        document.body.classList.toggle("wa-oculto", es[es.length - 1].isIntersecting);
      }, { rootMargin: "-" + Math.max(0, window.innerHeight - faixa) + "px 0px 0px 0px" });
      io.observe(sec);
    }
    montar();
    window.addEventListener("resize", montar);
  })();
  (function entradaWa() {
    function entrar() {
      window.setTimeout(function () {
        waFlut.classList.add("entrando");
        window.requestAnimationFrame(function () {
          waFlut.classList.add("pronto");
          window.setTimeout(function () { waFlut.classList.remove("entrando"); }, 300);
        });
      }, 400);
    }
    if (document.readyState === "complete") entrar();
    else window.addEventListener("load", entrar);
  })();

  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    if (totais().n === 0) return;
    abrirDialogo();
  });
  obsEl.addEventListener("input", salvar);
  radios.forEach(function (r) { r.addEventListener("change", salvar); });

  var DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  var ABRE = 18 * 60;
  var FECHA = 23 * 60 + 30;

  function agoraSP() {
    var f = new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
    var p = f.formatToParts(new Date());
    var g = function (tipo) {
      for (var i = 0; i < p.length; i++) if (p[i].type === tipo) return p[i].value;
      return "";
    };
    var mapa = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { dia: mapa[g("weekday")], min: parseInt(g("hour"), 10) * 60 + parseInt(g("minute"), 10) };
  }

  function calcularStatus(a) {
    if (a.dia !== 1) {
      if (a.min >= ABRE && a.min < FECHA) return { aberto: true, texto: "Aberto agora, fecha 23h30" };
      if (a.min < ABRE) return { aberto: false, texto: "Fechado agora. Abre hoje às 18h" };
    }
    var prox = (a.dia + 1) % 7;
    var desl = 1;
    if (prox === 1) {
      prox = 2;
      desl = 2;
    }
    var nome = desl === 1 && a.dia !== 1 ? "amanhã" : DIAS[prox];
    return { aberto: false, texto: "Fechado agora. Abre " + nome + " às 18h" };
  }

  function marcarHoje(dia) {
    $$("#horario tr").forEach(function (tr) {
      var eh = Number(tr.dataset.dia) === dia;
      tr.classList.toggle("hoje", eh);
      if (eh) tr.setAttribute("aria-current", "date");
      else tr.removeAttribute("aria-current");
      var th = tr.firstElementChild;
      var marca = th.querySelector(".sr-only");
      if (eh && !marca) th.appendChild(el("span", "sr-only", " (hoje)"));
      if (!eh && marca) th.removeChild(marca);
    });
  }

  function aplicarStatus() {
    var a = agoraSP();
    if (typeof a.dia !== "number" || isNaN(a.min)) return;
    var s = calcularStatus(a);
    ["#status-hero", "#status-endereco"].forEach(function (sel) {
      var n = $(sel);
      if (n) {
        n.textContent = s.texto;
        n.dataset.estado = s.aberto ? "aberto" : "fechado";
      }
    });
    marcarHoje(a.dia);
  }

  var video = $("#video-hero");
  var heroVisivel = true;
  function tocarVideo() {
    if (reduz.matches || !heroVisivel) {
      video.pause();
      return;
    }
    if (!video.autoplay) video.autoplay = true;
    if (video.preload !== "auto") video.preload = "auto";
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }
  tocarVideo();
  reduz.addEventListener("change", tocarVideo);
  video.addEventListener("pause", function () {
    if (!reduz.matches && !document.hidden && heroVisivel) tocarVideo();
  });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) tocarVideo();
  });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      heroVisivel = es[es.length - 1].isIntersecting;
      tocarVideo();
    }, { threshold: 0.01 }).observe(video);
  }

  var cats = $$(".cats-link");
  var grupos = cats.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
  var catsEl = $("#cats");
  var ativoCat = -1;
  var travaAte = 0;
  var io = null;

  function posicionarInd(a, instantaneo) {
    ind.style.width = a.offsetWidth + "px";
    ind.style.transform = "translateX(" + a.offsetLeft + "px)";
    var alvo = a.offsetLeft - (catsNav.clientWidth - a.offsetWidth) / 2;
    catsNav.scrollTo({ left: Math.max(0, alvo), behavior: reduz.matches || instantaneo ? "auto" : "smooth" });
  }

  function ativarCat(i, instantaneo) {
    if (i === ativoCat || i < 0) return;
    ativoCat = i;
    cats.forEach(function (a, k) {
      if (k === i) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    posicionarInd(cats[i], instantaneo);
  }

  function linhaCats() {
    return Math.round(topo.offsetHeight + catsEl.offsetHeight + 8);
  }

  function recalcularCat() {
    var linha = linhaCats();
    var idx = -1;
    grupos.forEach(function (g, i) {
      if (!g.hidden && g.getBoundingClientRect().top <= linha + 4) idx = i;
    });
    if (idx >= 0) ativarCat(idx);
  }

  function criarObservador() {
    if (io) io.disconnect();
    if (!("IntersectionObserver" in window)) return;
    var linha = linhaCats();
    var h = window.innerHeight;
    io = new IntersectionObserver(function (entradas) {
      if (Date.now() < travaAte) return;
      entradas.forEach(function (en) {
        if (en.isIntersecting) ativarCat(grupos.indexOf(en.target));
      });
    }, { rootMargin: "-" + linha + "px 0px -" + Math.max(h - linha - 2, 0) + "px 0px", threshold: 0 });
    grupos.forEach(function (g) { io.observe(g); });
  }

  catsNav.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest(".cats-link") : null;
    if (!a) return;
    ativarCat(cats.indexOf(a));
    travaAte = Date.now() + 900;
    window.setTimeout(recalcularCat, 950);
  });


  var buscaEl = $("#busca");
  var buscaVazioEl = $("#busca-vazia");
  var buscaTermoEl = $("#busca-termo");
  var buscaT = 0;

  function aplicarBusca() {
    var bruto = buscaEl.value.trim();
    var q = normalizar(bruto);
    var total = 0;
    catRefs.forEach(function (c) {
      var visiveis = 0;
      $$(".item", c.sec).forEach(function (li) {
        var ok = !q || li.dataset.busca.indexOf(q) > -1;
        li.hidden = !ok;
        if (ok) visiveis++;
      });
      $$(".itens", c.sec).forEach(function (ul) {
        var n = $$(".item:not([hidden])", ul).length;
        ul.hidden = n === 0;
        var anterior = ul.previousElementSibling;
        if (anterior && anterior.classList.contains("subtitulo")) anterior.hidden = n === 0;
      });
      c.sec.hidden = visiveis === 0;
      c.link.hidden = visiveis === 0;
      total += visiveis;
    });
    buscaVazioEl.hidden = !(q && total === 0);
    buscaTermoEl.textContent = bruto;
    document.body.classList.toggle("buscando", !!q);
    document.body.classList.toggle("busca-sem-resultado", !!q && total === 0);
    ativoCat = -1;
    recalcularCat();
    if (ativoCat < 0) {
      var primeira = catRefs.map(function (c) { return !c.sec.hidden; }).indexOf(true);
      if (primeira > -1) ativarCat(primeira, true);
    }
    window.clearTimeout(buscaT);
    if (!q) { anuncioEl.textContent = ""; }
    if (q) {
      buscaT = window.setTimeout(function () {
        anunciar(total === 0 ? "Nenhum item encontrado." : total === 1 ? "1 item encontrado." : total + " itens encontrados.");
      }, 500);
    }
  }
  buscaEl.addEventListener("input", aplicarBusca);
  $("#busca-limpar").addEventListener("click", function () {
    buscaEl.value = "";
    aplicarBusca();
    buscaEl.focus();
  });

  ativarCat(0, true);
  window.requestAnimationFrame(function () { ind.classList.add("pronto"); });
  criarObservador();

  function aoRedimensionar() {
    medirTopo();
    if (ativoCat >= 0) posicionarInd(cats[ativoCat], true);
    criarObservador();
  }
  if ("ResizeObserver" in window) new ResizeObserver(aoRedimensionar).observe(topo);
  window.addEventListener("resize", aoRedimensionar);


  var vivos = $$("video.vivo");
  function tocarVivo(v) {
    if (reduz.matches || document.hidden) return;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  if ("IntersectionObserver" in window) {
    var ioVivo = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting && en.intersectionRatio >= 0.35) {
          v.dataset.vis = "1";
          tocarVivo(v);
        } else {
          v.dataset.vis = "";
          v.pause();
        }
      });
    }, { threshold: [0, 0.35, 0.6] });
    vivos.forEach(function (v) { ioVivo.observe(v); });
  }
  document.addEventListener("visibilitychange", function () {
    vivos.forEach(function (v) {
      if (document.hidden) v.pause();
      else if (v.dataset.vis === "1") tocarVivo(v);
    });
  });
  reduz.addEventListener("change", function () {
    if (reduz.matches) vivos.forEach(function (v) { v.pause(); });
  });

  var revelar = $$(".revelar");
  if (!reduz.matches && "IntersectionObserver" in window) {
    var ioRev = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting && en.intersectionRatio > 0) {
          en.target.firstRevelar.classList.add("revelado");
          ioRev.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    revelar.forEach(function (r) {
      var pai = r.parentElement || r;
      pai.firstRevelar = r;
      ioRev.observe(pai);
    });
  } else {
    revelar.forEach(function (r) { r.classList.add("revelado"); });
  }

  function criarBrasas(canvas) {
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var MAXP = 28;
    var cores = ["232,106,30", "232,106,30", "232,106,30", "242,232,214"];
    var ps = [];
    var w = 0;
    var h = 0;
    var raf = 0;
    var ultimo = 0;
    var ativo = false;
    var naTela = false;
    function medir() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function nova(inicio) {
      var vida = 2.4 + Math.random() * 2.6;
      return {
        x: Math.random() * w,
        y: h + Math.random() * 12 - (inicio ? Math.random() * h * 0.7 : 0),
        vx: (Math.random() - 0.5) * 14,
        vy: -(22 + Math.random() * 38),
        r: 0.8 + Math.random() * 1.8,
        t: inicio ? Math.random() * vida * 0.6 : 0,
        vida: vida,
        fase: Math.random() * 6.283,
        cor: cores[(Math.random() * cores.length) | 0]
      };
    }
    function passo(agora) {
      if (!ativo) return;
      var dt = Math.min((agora - ultimo) / 1000, 0.05);
      ultimo = agora;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        p.t += dt;
        if (p.t >= p.vida) {
          ps[i] = nova(false);
          continue;
        }
        p.x += (p.vx + Math.sin(p.t * 2 + p.fase) * 10) * dt;
        p.y += p.vy * dt;
        var k = p.t / p.vida;
        var a = (k < 0.15 ? k / 0.15 : (1 - k) / 0.85) * 0.85;
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + p.cor + "," + a.toFixed(3) + ")";
        ctx.arc(p.x, p.y, p.r * (1 - k * 0.4), 0, 6.283);
        ctx.fill();
      }
      raf = window.requestAnimationFrame(passo);
    }
    function iniciar() {
      if (ativo || !naTela || document.hidden || reduz.matches || !w) return;
      if (!ps.length) for (var i = 0; i < MAXP; i++) ps.push(nova(true));
      ativo = true;
      ultimo = performance.now();
      raf = window.requestAnimationFrame(passo);
    }
    function pausar() {
      ativo = false;
      window.cancelAnimationFrame(raf);
    }
    medir();
    if ("ResizeObserver" in window) new ResizeObserver(function () { medir(); }).observe(canvas);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entradas) {
        naTela = entradas[0].isIntersecting && entradas[0].intersectionRatio > 0;
        if (naTela) iniciar(); else pausar();
      }).observe(canvas);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) pausar(); else iniciar();
    });
    reduz.addEventListener("change", function () {
      if (reduz.matches) {
        pausar();
        ctx.clearRect(0, 0, w, h);
      } else {
        iniciar();
      }
    });
  }
  if (!reduz.matches) $$("canvas.brasas").forEach(criarBrasas);

  (function dividirTitulo() {
    var h1 = $("#titulo-hero");
    if (!h1 || reduz.matches) return;
    var palavras = $$(".palavra", h1);
    var nome = palavras.map(function (p) { return p.textContent; }).join(" ");
    var n = 0;
    palavras.forEach(function (p) {
      var txt = p.textContent;
      p.textContent = "";
      p.setAttribute("aria-hidden", "true");
      for (var i = 0; i < txt.length; i++) {
        var l = el("span", "letra", txt.charAt(i));
        l.style.animationDelay = n * 40 + "ms";
        p.appendChild(l);
        n++;
      }
    });
    h1.insertBefore(el("span", "sr-only", nome), h1.firstChild);
  })();

  carregar();
  atualizar();
  aplicarStatus();
  window.setInterval(aplicarStatus, 60000);
})();
