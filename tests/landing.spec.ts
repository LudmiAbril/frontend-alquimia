import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000//');
});

test('Landing tiene título correcto', async ({ page }) => {
  await page.goto('http://localhost:3000/', { timeout: 60000 })
  await expect(page).toHaveTitle(/Alquimia/i)
})

test('Renderiza el hero principal', async ({ page }) => {
  await page.goto('http://localhost:3000/', { timeout: 80000 })
  await expect(page.getByRole('heading', { name: /Diseñá perfumes/i })).toBeVisible()
  await expect(page.getByText(/Creatividad, emoción y aroma/i)).toBeVisible()

  const botonCrear = page.getByRole('button', { name: /Empezar a crear/i })
  await expect(botonCrear).toBeVisible()
  await expect(botonCrear).toBeEnabled()
})

test('Navbar contiene enlaces correctos', async ({ page }) => {
  await page.goto('http://localhost:3000/', { timeout: 60000 })
    const nav = page.getByRole('navigation')
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Crear mi perfume', href: '/createParfum' },
    { name: 'Descubrir', href: '/quiz' },
    { name: 'Proveedores', href: '/proveedores' },
  ]

  for (const { name, href } of navLinks) {
    const link = nav.getByRole('link', { name })

    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', href)
  }
})
test('Botón "Empezar a crear" abre el modal correctamente', async ({ page }) => {
  await page.goto('http://localhost:3000/', { timeout: 60000 })

  const boton = page.getByRole('button', { name: /Empezar a crear/i })
  await expect(boton).toBeVisible()

  await boton.click()
  await expect(page.getByText(/Descubrí la esencia que revela tu magia./i)).toBeVisible()
})
/**Test quiz y funcionalidades */

test('Mascota o logo tiene alt accesible', async ({ page }) => {
  await page.goto('http://localhost:3000/', { timeout: 60000 })
  const logo = await page.getByAltText(/Alquimia/)
  await expect(logo).toBeVisible()
})

test('Decoraciones de fondo se renderizan', async ({ page }) => {
  await page.goto('http://localhost:3000/', { timeout: 60000 });

  // Árboles al fondo (ejemplo: usa alt o className si es SVG)
  const decoracion = page.locator('img[alt*="Decoración árboles"]');
  await expect(decoracion).toBeVisible();
});

test('Botón "Explorar cómo funciona" responde al hover', async ({ page }) => {
  await page.goto('http://localhost:3000/', { timeout: 60000 });

  const boton = page.getByRole('link', { name: /Explorar cómo funciona/i });
  await boton.hover();

  const styles = await boton.evaluate((el) => {
    return window.getComputedStyle(el).backgroundColor;
  });

  expect(styles).not.toBe('transparent');
});

test('Landing carga dentro del tiempo esperado', async ({ page }) => {
  const start = Date.now();
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('text=DESCUBRÍ ALQUIMIA');
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(60000); 
});
test('Sección "¿Cómo funciona?" se muestra correctamente', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const heading = page.getByRole('heading', { name: /¿CÓMO FUNCIONA\?/i });
  await expect(heading).toBeVisible();

  const pasos = [
    /Creá tu propio perfume\./i,
    /Contactate con los proveedores\./i,
    /Recibí tus ingredientes\./i,
  ];

  for (const texto of pasos) {
    await expect(page.getByText(texto)).toBeVisible();
  }

  await expect(page.getByText(/No necesitás ser experto/i)).toBeVisible();
});
test('Renderiza el título de la sección de creación de fragancia', async ({ page }) => {
  const heading = page.getByRole('heading', {
    name: /diseñá tu fragancia desde cero/i,
  });
  await expect(heading).toBeVisible();
});

test('Renderiza el texto introductorio de la sección', async ({ page }) => {
  await expect(
    page.getByText(/elegí ingredientes únicos, combiná notas/i)
  ).toBeVisible();
  await expect(
    page.getByText(/Alquimia te guía paso a paso/i)
  ).toBeVisible();
  await expect(
    page.getByText(/Diseñá tu fragancia ideal/i)
  ).toBeVisible();
});
test('Renderiza la mascota ilustrada con el frasco', async ({ page }) => {
  const mascota = page.getByAltText(/Imagen.*representativo/i); 
  await expect(mascota).toBeVisible();
});

test('Botón "Crear mi perfume" está visible y activo', async ({ page }) => {
  const botones = page.getByRole('link', { name: /crear mi perfume/i });
await expect(botones.nth(1)).toBeVisible();
await expect(botones.nth(1)).toBeEnabled();
});

