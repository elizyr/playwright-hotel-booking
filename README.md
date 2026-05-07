# 🏨 playwright-hotel-booking

Projeto de automação de testes para sistema de reserva de hotel, utilizando **Playwright** com **JavaScript**.

Cobre testes **Web (E2E)** e **API (REST)** com padrão Page Object Model (POM).

---

## 🧪 Testes Implementados

### Web — automationintesting.online
| ID | Cenário | Tipo |
|----|---------|------|
| CT-001 | Exibir página inicial do hotel | Funcional |
| CT-002 | Exibir formulário de reserva ao clicar em Book | Funcional |
| CT-003 | Exibir erro ao submeter formulário vazio | Validação |
| CT-004 | Exibir quartos disponíveis na página | Funcional |
| CT-005 | Exibir informações de contato do hotel | Funcional |

### API — restful-booker.herokuapp.com
| ID | Endpoint | Método | Cenário |
|----|----------|--------|---------|
| CT-API-001 | /booking | GET | Listar todas as reservas |
| CT-API-002 | /booking | POST | Criar nova reserva |
| CT-API-003 | /booking/:id | GET | Buscar reserva por ID |
| CT-API-004 | /booking/:id | PUT | Atualizar reserva existente |
| CT-API-005 | /booking/:id | DELETE | Cancelar reserva |
| CT-API-006 | /booking | POST | Erro com dados inválidos |

---

## 🛠️ Tecnologias

- [Playwright](https://playwright.dev/) v1.44+
- JavaScript / Node.js
- Page Object Model (POM)
- Relatório HTML automático

---

## 📁 Estrutura do Projeto

```
playwright-hotel-booking/
├── tests/
│   ├── web/
│   │   └── booking.spec.js       # Testes de interface
│   └── api/
│       └── bookings.spec.js      # Testes de API
├── pages/
│   └── BookingPage.js            # Page Object Model
├── data/
│   └── testData.json             # Dados de teste
├── playwright.config.js
├── package.json
└── README.md
```

---

## ▶️ Como Executar

### 1. Pré-requisitos
- Node.js 18+
- VSCode (recomendado)

### 2. Instalar dependências
```bash
npm install
npx playwright install chromium
```

### 3. Rodar todos os testes
```bash
npm test
```

### 4. Rodar apenas testes Web
```bash
npm run test:web
```

### 5. Rodar apenas testes de API
```bash
npm run test:api
```

### 6. Ver relatório HTML
```bash
npm run report
```

---

## 📊 Relatório

Após rodar os testes, o relatório HTML é gerado automaticamente em `/playwright-report`.

Para visualizar:
```bash
npm run report
```

---

## 👩‍💻 Autora

**Vanessa Silva**  
Estudante de Engenharia de Software | QA em formação  
[LinkedIn](https://linkedin.com/in/seu-perfil) • [GitHub](https://github.com/elizyr)
