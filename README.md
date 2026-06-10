# Ocean

Ocean - это веб-пространство для заметок, документов и личных проектов. По
ощущению приложение близко к Notion: можно быстро создавать страницы,
выстраивать их в дерево, писать в блочном редакторе, добавлять иконки и
обложки, публиковать документы для просмотра и возвращать удалённые страницы из
корзины.

Проект сделан как полноценное Next.js-приложение с авторизацией, realtime
данными, загрузкой пользовательских файлов и Docker-сборкой. Его можно поднять
локально для разработки или собрать в production-образ.

## Что умеет Ocean

- Личный рабочий стол после входа в аккаунт.
- Приватные документы, доступные только авторизованному пользователю.
- Вложенные страницы и боковая навигация по дереву документов.
- Rich-text редактор на BlockNote: заголовки, списки, таблицы, код, медиа и
  другие блочные элементы.
- Иконки и cover image для документов.
- Быстрый поиск по документам через командное окно.
- Публикация read-only preview по отдельному маршруту.
- Корзина, восстановление и окончательное удаление документов.
- Экспорт документа в PDF.
- Светлая и тёмная тема.

## Production Deploy

Приложение находится в деплое на Vercel. Для корректного использования приложения необходим VPN т.к. используется Clerk и Convex в качестве BaaS

```text
https://ocean-six-murex.vercel.app/
```

## Скриншоты

![Стартовый экран Ocean](screenshots/screen1.png)

![Рабочая область документов](screenshots/screen2.png)

![Редактор документа](screenshots/screen3.png)

![Меню документа и экспорт](screenshots/screen4.png)

## Технологии

- **Next.js 16 App Router** и **React 19** - маршруты, layouts и клиентский UI.
- **Convex** - хранение документов, запросы и мутации с учётом пользователя.
- **Clerk** - регистрация, вход и сессии пользователя.
- **EdgeStore** - загрузка и хранение изображений документов.
- **BlockNote** - блочный rich-text редактор.
- **Tailwind CSS**, **Radix UI** и shadcn-style primitives - интерфейс,
  модальные окна, меню и базовые компоненты.
- **TypeScript**, **ESLint** и **Prettier** - проверка качества кода.

## Требования

- Node.js 22.x. Next.js 16 требует Node.js 20.9 или новее.
- npm 10 или новее.
- Clerk application с publishable/secret keys.
- Convex deployment.
- EdgeStore credentials, если нужны загрузка обложек и изображений.
- Docker, если нужно проверить production image.

## Переменные окружения

Для локальной разработки создай `.env` или `.env.local`. Не коммить реальные
ключи и токены.

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Можно указать полный URL Convex:
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Или deployment name. next.config.mjs умеет собрать URL из этого значения.
CONVEX_DEPLOYMENT=dev:your-deployment

EDGE_STORE_ACCESS_KEY=...
EDGE_STORE_SECRET_KEY=...
```

`NEXT_PUBLIC_CONVEX_URL` предпочтителен для production. Если он не задан,
приложение попробует вывести URL из `CONVEX_DEPLOYMENT`.

## Быстрый запуск

Установи зависимости:

```bash
npm install
```

Запусти Next.js dev server:

```bash
npm run dev
```

Открой приложение:

```text
http://localhost:3000
```

Если порт `3000` занят, Next.js выберет следующий свободный порт и покажет его в
консоли.

Если меняешь Convex functions/schema, параллельно запусти Convex:

```bash
npx convex dev
```

## Основные маршруты

- `/` - публичный стартовый экран.
- `/documents` - рабочая область пользователя.
- `/documents/[documentId]` - редактор конкретного документа.
- `/preview/[documentId]` - опубликованный read-only preview.
- `/api/edgestore/[...edgestore]` - API route для EdgeStore.

## Скрипты

```bash
npm run dev           # Запустить приложение в development mode
npm run build         # Собрать production build
npm run start         # Запустить production build
npm run lint          # ESLint
npm run typecheck     # TypeScript без emit
npm run format        # Отформатировать проект Prettier
npm run format:check  # Проверить форматирование
```

## Docker

Dockerfile использует multi-stage build:

1. `deps` устанавливает зависимости для сборки.
2. `prod-deps` устанавливает только production dependencies.
3. `builder` запускает `npm run build`.
4. `runner` стартует собранное приложение от non-root пользователя.

Для Docker удобно держать отдельный env-файл, например `.env.docker`. Он не
попадает в Git и Docker context, потому что `.env*` исключены в `.gitignore` и
`.dockerignore`.

```bash
cp .env .env.docker
```

Перед сборкой загрузи переменные из файла в текущий shell. Это нужно для
`NEXT_PUBLIC_*`: Next.js встраивает публичные значения в client bundle на этапе
`npm run build`.

```bash
set -a
. ./.env.docker
set +a
```

Собрать образ:

```bash
docker build \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY \
  --build-arg CONVEX_DEPLOYMENT \
  --build-arg NEXT_PUBLIC_CONVEX_URL \
  -t ocean:local .
```

Запустить контейнер, передав все runtime-переменные из env-файла:

```bash
docker run --rm -p 3000:3000 \
  --env-file .env.docker \
  ocean:local
```

Если публичные `NEXT_PUBLIC_*` или `CONVEX_DEPLOYMENT` поменялись, пересобери
image. Runtime-only secrets (`CLERK_SECRET_KEY`, `EDGE_STORE_ACCESS_KEY`,
`EDGE_STORE_SECRET_KEY`) достаточно обновить в `.env.docker` и перезапустить
контейнер.

## Проверки перед merge

Минимальный набор локальных проверок:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
docker build -t ocean:local .
```

`npm audit` можно запускать отдельно, если нужен отчёт по зависимостям:

```bash
npm audit --audit-level=moderate
```

## Заметки для разработки

- Root `app/` содержит маршруты Next.js. Не создавай отдельный `src/app`.
- `/documents/*` требует авторизованную Clerk-сессию.
- Загруженные изображения хранятся в EdgeStore.
- Документы и дерево страниц обслуживаются Convex queries/mutations.
- `.env`, `.env.*`, `.next`, `node_modules`, screenshots и служебные agent files
  исключены из Docker context.
- Не добавляй реальные secrets, customer data или локальные session artifacts в
  Git.
