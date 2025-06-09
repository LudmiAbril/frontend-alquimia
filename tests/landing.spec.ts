import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000//');
});

test('Landing tiene título correcto', async ({ page }) => {
  await page.goto('http://localhost:3000/', { timeout: 60000 })
  await expect(page).toHaveTitle(/Alquimia/i)
})

test('Renderiza el hero principal', async ({ page }) => {
  await page.goto('http://localhost:3000/', { timeout: 60000 })
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

/* test('Botón "Empezar a crear" redirige correctamente', async ({ page }) => {
  await page.goto('http://localhost:3000/', { timeout: 60000 })

  const boton = page.getByRole('button', { name: /Empezar a crear/i })
  await boton.click()

  // Esperás que cambie de ruta a /crear o /crear-perfume
  await expect(page).toHaveURL(/.*createParfum/i)
}) */

test('Mascota o logo tiene alt accesible', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  const logo = await page.getByAltText(/Alquimia/)
  await expect(logo).toBeVisible()
})

