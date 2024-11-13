import { test, expect } from "@playwright/test";

test.describe("Produto Cadastro", () => {
  test("deve validar o minimo de caracteres no nome do produto", async ({
    page,
  }) => {
    // Navegue até a página de registro do produto
    await page.goto("http://localhost:3000/produtos/cadastrar");

    // Preencha o campo do nome com menos de 10 caracteres
    await page.fill("#nome", "produto");

    // Envie o formulário
    await page.click("text=Salvar");
  });
});
