// Hashing SHA-256 + normalización para el Advanced Matching de la Conversions API.
// SOLO se hashea PII (em, ph, fn, ln, external_id). fbp / fbc / IP / user agent
// NUNCA se hashean. Este módulo es server-only (usa node:crypto): no debe
// importarse desde componentes de cliente.
import { createHash } from 'node:crypto';

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Números de Honduras: se eliminan no-dígitos, se quita un 0 inicial y se
// antepone el código de país 504 para dejar dígitos E.164 (sin '+').
export function normalizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  digits = digits.replace(/^0+/, '');
  if (digits.length === 8) digits = `504${digits}`;
  return digits;
}

export function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

export interface RawUserFields {
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  externalId?: string | null;
}

export interface RawTransportFields {
  fbp?: string | null;
  fbc?: string | null;
  clientIp?: string | null;
  userAgent?: string | null;
}

export interface HashedUserData {
  em?: string[];
  ph?: string[];
  fn?: string[];
  ln?: string[];
  external_id?: string[];
  fbp?: string;
  fbc?: string;
  client_ip_address?: string;
  client_user_agent?: string;
}

// Construye el objeto user_data de Meta: hashea la PII presente y deja los
// identificadores de transporte (fbp/fbc/IP/UA) en crudo.
export function buildUserData(pii: RawUserFields, transport: RawTransportFields): HashedUserData {
  const userData: HashedUserData = {};

  if (pii.email) userData.em = [sha256(normalizeEmail(pii.email))];
  if (pii.phone) userData.ph = [sha256(normalizePhone(pii.phone))];
  if (pii.firstName) userData.fn = [sha256(normalizeName(pii.firstName))];
  if (pii.lastName) userData.ln = [sha256(normalizeName(pii.lastName))];
  if (pii.externalId) userData.external_id = [sha256(String(pii.externalId).trim().toLowerCase())];

  if (transport.fbp) userData.fbp = transport.fbp;
  if (transport.fbc) userData.fbc = transport.fbc;
  if (transport.clientIp) userData.client_ip_address = transport.clientIp;
  if (transport.userAgent) userData.client_user_agent = transport.userAgent;

  return userData;
}
