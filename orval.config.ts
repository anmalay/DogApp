import { defineConfig } from "orval";

export default defineConfig({
  activities: {
    input: {
      target: "http://localhost/api/openapi/v1.json",
    },

    output: {
      mode: "tags-split",
      target: "./src/shared/api/generated",
      schemas: "./src/shared/api/generated/types",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/shared/api/client.ts",
          name: "customInstance",
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useSuspenseQuery: true,
          useMutation: true,
        },

        // TODO: убрать когда апи будет работаь
        mock: {
          type: "msw",
          delay: 1000,
        },

        // Настройки компонентов и хуков
        components: {
          schemas: {
            suffix: "Type",
          },
          responses: {
            suffix: "Response",
          },
          parameters: {
            suffix: "Params",
          },
        },
      },
    },

    // Хуки для пост-обработки
    hooks: {
      afterAllFilesWrite: [
        "prettier --write ./src/shared/api/generated/**/*.ts", // Форматирование сгенерированных файлов
        "eslint --fix ./src/shared/api/generated/**/*.ts", // Исправление линтинга
      ],
    },
  },
});
