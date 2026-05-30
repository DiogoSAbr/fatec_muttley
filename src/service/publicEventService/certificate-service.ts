import { publicApi } from "@/service/api";
import { unwrapData } from "@/service/response";
import type { CertificateData } from "@/models/public/certificate";

/**
 * Endpoint público de validação de certificado, acessado pelo link
 * `/certificado/:id`. Sem autenticação — usa `publicApi`.
 */

/** GET public/certificate/:id. */
export async function getCertificate(certificateId: string): Promise<CertificateData> {
  const { data } = await publicApi.get(`public/certificate/${certificateId}`);
  return unwrapData<CertificateData>(data);
}
