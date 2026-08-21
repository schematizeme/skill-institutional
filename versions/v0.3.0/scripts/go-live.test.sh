#!/usr/bin/env bash
# Vermelho primeiro do gate de go-live, contra um site FALSO servido de verdade por HTTP (nao
# mock): cada caso quebra uma coisa e exige a reprovacao pelo motivo certo.
# EXCEÇÃO DECLARADA de strict mode (`schematize-shell` -> `references/piso.md` secao 1):
# harness de teste roda sem `-e` de propósito — ele precisa continuar depois de um caso
# vermelho para reportar TODOS, em vez de parar no primeiro.
set -u
AQUI="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GATE="$AQUI/go-live.mjs"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"; [ -n "${SRV:-}" ] && kill "$SRV" 2>/dev/null' EXIT
ok=0; fail=0
PORTA=${PORTA:-8731}
BASE="http://127.0.0.1:$PORTA"

cat > "$TMP/servidor.py" <<'PY'
import json, os, sys
from http.server import BaseHTTPRequestHandler, HTTPServer

RAIZ = sys.argv[1]; PORTA = int(sys.argv[2])
PAGINAS = ['/', '/sobre', '/servicos', '/contato', '/legal', '/legal/termos-de-uso',
           '/legal/termos-de-servico', '/legal/privacidade', '/legal/cookies', '/mapa-do-site']

def cfg():
    with open(os.path.join(RAIZ, 'cfg.json'), encoding='utf8') as f:
        return json.load(f)

def pagina(caminho, c):
    base = c.get('base', 'http://127.0.0.1:%d' % PORTA)
    titulo = 'Duplicado' if c.get('titulo_duplicado') and caminho in ('/sobre', '/contato') else 'Pagina %s' % caminho
    if c.get('sem_titulo') == caminho: titulo = ''
    canon = base + ('' if caminho == '/' else caminho)
    if c.get('canonical_outro_host') == caminho: canon = 'https://dominio-de-teste.example' + caminho
    partes = ['<!doctype html><html><head>']
    if titulo: partes.append('<title>%s</title>' % titulo)
    partes.append('<meta name="description" content="descricao de %s">' % caminho)
    if not c.get('sem_canonical') == caminho:
        partes.append('<link rel="canonical" href="%s">' % canon)
    if c.get('noindex') == caminho:
        partes.append('<meta name="robots" content="noindex, nofollow">')
    partes.append('</head><body>')
    if c.get('sem_h1') != caminho: partes.append('<h1>%s</h1>' % caminho)
    partes.append('<p>conteudo</p><a href="/">home</a></body></html>')
    return ''.join(partes)

class H(BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def responde(self, cod, corpo, tipo='text/html; charset=utf-8'):
        b = corpo.encode('utf8')
        self.send_response(cod); self.send_header('Content-Type', tipo)
        self.send_header('Content-Length', str(len(b))); self.end_headers()
        if self.command != 'HEAD': self.wfile.write(b)
    def do_HEAD(self): self.do_GET()
    def do_GET(self):
        c = cfg(); p = self.path.split('?')[0]
        base = c.get('base', 'http://127.0.0.1:%d' % PORTA)
        if p == '/robots.txt':
            if c.get('sem_robots'): return self.responde(404, 'nao encontrado')
            txt = 'User-agent: *\nDisallow: /\n' if c.get('robots_bloqueia') else \
                  'User-agent: *\nAllow: /\nSitemap: %s/sitemap.xml\n' % base
            return self.responde(200, txt, 'text/plain')
        if p == '/sitemap.xml':
            if c.get('sem_sitemap'): return self.responde(404, 'nao encontrado')
            alvo = [] if c.get('sitemap_vazio') else list(PAGINAS)
            if c.get('sitemap_sem_contato'): alvo = [x for x in alvo if x != '/contato']
            locs = ''.join('<url><loc>%s%s</loc></url>' % (base, '' if x == '/' else x) for x in alvo)
            if c.get('sitemap_url_morta'):
                locs += '<url><loc>%s/pagina-morta</loc></url>' % base
            return self.responde(200, '<?xml version="1.0"?><urlset>%s</urlset>' % locs, 'application/xml')
        if p in PAGINAS:
            return self.responde(200, pagina(p, c))
        if c.get('soft404'):
            return self.responde(200, '<html><head><title>Nao encontrado</title></head><body><h1>Ops</h1><a href="/">voltar</a></body></html>')
        if c.get('404_sem_link'):
            return self.responde(404, '<html><head><title>404</title></head><body>' + 'nao encontramos essa pagina. ' * 12 + '</body></html>')
        return self.responde(404, '<html><head><title>404</title></head><body><h1>Pagina nao encontrada</h1>'
                                  + 'Talvez o link tenha mudado. ' * 8 + '<a href="/">voltar para a home</a></body></html>')

HTTPServer(('127.0.0.1', PORTA), H).serve_forever()
PY

cfg() { python3 -c "
import json,sys
json.dump(json.loads(sys.argv[1] or '{}'), open('$TMP/cfg.json','w'))" "$1"; }

cfg '{}'
python3 "$TMP/servidor.py" "$TMP" "$PORTA" & SRV=$!
for _ in $(seq 1 40); do curl -fsS "$BASE/" >/dev/null 2>&1 && break; done
curl -fsS "$BASE/" >/dev/null 2>&1 || { echo "  ✖ servidor de fixture nao subiu"; exit 1; }

checa() { local nome="$1" esp="$2" agulha="$3" conf="$4"
  cfg "$conf"
  local saida; saida="$(node "$GATE" "$BASE" 2>&1)"; local rc=$?
  if [ "$rc" != "$esp" ]; then echo "  ✖ $nome: exit $rc, esperado $esp"; sed 's/^/      /' <<<"$saida"; fail=$((fail+1)); return; fi
  if [ -n "$agulha" ] && ! grep -qiF -- "$agulha" <<<"$saida"; then echo "  ✖ $nome: exit certo, saida sem \"$agulha\""; sed 's/^/      /' <<<"$saida"; fail=$((fail+1)); return; fi
  echo "  ✔ $nome"; ok=$((ok+1)); }

echo "== verde de partida =="
checa "site no baseline passa" 0 "go-live" '{}'

echo "== o 404 =="
checa "SOFT-404 (200 na pagina de erro) reprova" 1 "SOFT-404" '{"soft404": true}'
checa "404 sem nenhum link reprova (beco sem saida)" 1 "sem saida" '{"404_sem_link": true}'

echo "== robots =="
checa "Disallow: / em producao reprova" 1 "robots do staging que viajou" '{"robots_bloqueia": true}'
checa "sem robots.txt reprova" 1 "sem robots nao ha go-live" '{"sem_robots": true}'

echo "== sitemap =="
checa "sem sitemap.xml reprova" 1 "/sitemap.xml" '{"sem_sitemap": true}'
checa "sitemap vazio reprova" 1 "nao e \"site pequeno\"" '{"sitemap_vazio": true}'
checa "URL morta no sitemap reprova" 1 "so entra no sitemap o que responde 200" '{"sitemap_url_morta": true}'
checa "pagina do baseline fora do sitemap reprova" 1 "FORA do sitemap" '{"sitemap_sem_contato": true}'

echo "== indexacao por pagina =="
checa "noindex numa pagina do baseline reprova" 1 "NOINDEX" '{"noindex": "/sobre"}'
checa "sem canonical reprova" 1 "sem <link rel=" '{"sem_canonical": "/contato"}'
checa "canonical para outro host reprova" 1 "canonical cruzado" '{"canonical_outro_host": "/sobre"}'
checa "titulo duplicado reprova" 1 "canibalizacao dentro do proprio site" '{"titulo_duplicado": true}'
checa "sem <title> reprova" 1 "sem <title>" '{"sem_titulo": "/legal"}'
checa "sem <h1> reprova" 1 "sem <h1>" '{"sem_h1": "/servicos"}'

echo "== uso errado =="
node "$GATE" >/dev/null 2>&1; [ $? = 2 ] && { echo "  ✔ sem argumento -> exit 2"; ok=$((ok+1)); } || { echo "  ✖ sem argumento"; fail=$((fail+1)); }
node "$GATE" "http://127.0.0.1:1" >/dev/null 2>&1; [ $? = 2 ] && { echo "  ✔ site inalcancavel -> exit 2 (nao 0)"; ok=$((ok+1)); } || { echo "  ✖ site inalcancavel"; fail=$((fail+1)); }

echo; echo "go-live: $ok ok, $fail falha(s)"; [ "$fail" = 0 ]
