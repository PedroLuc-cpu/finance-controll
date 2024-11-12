import { test } from "@playwright/test";

test("should", async ({ page }) => {
  await page.goto("http://localhost:3000/signIn"); // Altere para a URL da sua aplicação

  // Clique no botão de "Entrar com Google"
  await page.click('button:has-text("Entre com Google")');

  // Preencha o e-mail do Google
  await page.fill('input[type="email"]', "gemaluzente2015@gmail.com");
  await page.click('button:has-text("Next")');

  // Preencha a senha do Google
  await page.waitForSelector('input[type="password"]', { timeout: 10000 });
  await page.fill('input[type="password"]', "sua-senha-teste");
  await page.click('button:has-text("Próxima")');

  // Aguarde a página redirecionar após o login bem-sucedido
  await page.waitForURL("http://localhost:3000/finance-dashboard", {
    timeout: 15000,
  });

  // Verifique se o login foi bem-sucedido
  if (page.url() === "http://localhost:3000/finance-dashboard") {
    console.log("Login com Google realizado com sucesso!");
  } else {
    console.log("Falha no login com Google.");
  }
});
