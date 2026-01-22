# Email Templates - Glow Aesthetics

Templates de email personalizados para Supabase Auth en alemán.

## Cómo usar

### Authentication Templates

Ve a **Supabase Dashboard → Authentication → Email Templates** y copia el contenido HTML de cada archivo:

| Template en Supabase | Archivo |
|---------------------|---------|
| Confirm signup | `confirm-signup.html` |
| Invite user | `invite-user.html` |
| Magic Link | `magic-link.html` |
| Change Email Address | `change-email.html` |
| Reset Password | `reset-password.html` |
| Reauthentication | `reauthentication.html` |

### Security Templates

Ve a **Supabase Dashboard → Authentication → Email Templates → Security** y copia:

| Template en Supabase | Archivo |
|---------------------|---------|
| Password changed | `password-changed.html` |
| Email address changed | `email-changed.html` |
| Phone number changed | `phone-changed.html` |
| Identity linked | `identity-linked.html` |
| Identity unlinked | `identity-unlinked.html` |
| MFA method added | `mfa-added.html` |
| MFA method removed | `mfa-removed.html` |

## Variables disponibles

Supabase usa Go templates. Las variables disponibles son:

- `{{ .ConfirmationURL }}` - URL de confirmación
- `{{ .Email }}` - Email del usuario
- `{{ .Timestamp }}` - Fecha/hora del evento
- `{{ .Token }}` - Token (para algunos templates)

## Colores del branding

- **Blush (principal):** `#baaeb1`
- **Charcoal (texto):** `#2D2D2D`
- **Cream (fondo):** `#f7f7f7`
- **Success (verde):** `#4ade80`
- **Error (rojo):** `#f87171`

## Subject Lines (Asuntos)

Configura estos asuntos en alemán:

- **Confirm signup:** `Bestätigen Sie Ihre E-Mail-Adresse - Glow Aesthetics`
- **Invite user:** `Sie wurden eingeladen - Glow Aesthetics`
- **Magic Link:** `Ihr Anmelde-Link - Glow Aesthetics`
- **Change Email:** `Neue E-Mail-Adresse bestätigen - Glow Aesthetics`
- **Reset Password:** `Passwort zurücksetzen - Glow Aesthetics`
- **Reauthentication:** `Identität bestätigen - Glow Aesthetics`
- **Password changed:** `Passwort geändert - Glow Aesthetics`
- **Email changed:** `E-Mail-Adresse geändert - Glow Aesthetics`
- **Phone changed:** `Telefonnummer geändert - Glow Aesthetics`
- **Identity linked:** `Neue Anmeldemethode verknüpft - Glow Aesthetics`
- **Identity unlinked:** `Anmeldemethode entfernt - Glow Aesthetics`
- **MFA added:** `Zwei-Faktor-Authentifizierung aktiviert - Glow Aesthetics`
- **MFA removed:** `Zwei-Faktor-Authentifizierung entfernt - Glow Aesthetics`
