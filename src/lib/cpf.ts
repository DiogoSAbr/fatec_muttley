/** Keeps only the digits of a CPF string. */
export function unmaskCpf(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

/** Formats a CPF as `000.000.000-00` while the user types (partial input allowed). */
export function formatCpf(value: string): string {
  const digits = unmaskCpf(value);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

/**
 * Validates a real CPF using the check-digit algorithm.
 * Rejects values that aren't 11 digits and well-known invalid sequences
 * such as `111.111.111-11` (all identical digits).
 */
export function isValidCpf(value: string): boolean {
  const cpf = unmaskCpf(value);

  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false; // all digits equal

  const calcCheckDigit = (length: number): number => {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += Number(cpf[i]) * (length + 1 - i);
    }
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  return calcCheckDigit(9) === Number(cpf[9]) && calcCheckDigit(10) === Number(cpf[10]);
}
