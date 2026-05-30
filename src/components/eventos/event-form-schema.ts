import { z } from "zod";
import type { Participant } from "@/models/participant/participant";

const intStringInRange = (requiredMsg: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(1, requiredMsg)
    .regex(/^\d+$/, "Use apenas números inteiros positivos")
    .refine((value) => Number(value) >= min, `Deve ser no mínimo ${min}`)
    .refine((value) => Number(value) <= max, `Deve ser no máximo ${max}`);

/**
 * Validation schema for the event edit form. Mirrors the create form but:
 * - no certificate background (cannot be changed on edit);
 * - `signature` is optional (only sent when replaced);
 * - competencies are an array of chips (serialized to comma-separated keywords).
 */
export const editEventSchema = z.object({
  title: z.string().trim().min(1, "Informe o título").max(50, "Máximo de 50 caracteres"),
  startDate: z.date({
    required_error: "Selecione a data inicial",
    invalid_type_error: "Selecione a data inicial",
  }),
  endDate: z.date().optional(),
  workload: intStringInRange("Informe a carga horária", 1, 99),
  capacity: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || (/^\d+$/.test(value) && Number(value) >= 1),
      "Use apenas números inteiros positivos",
    ),
  points: intStringInRange("Informe os pontos", 1, 100),
  modalityId: z.string().min(1, "Selecione a modalidade"),
  typeId: z.string().min(1, "Selecione o tipo do evento"),
  addressOrLink: z.string().trim().min(1, "Informe o local ou link"),
  subject: z.string().trim().min(1, "Informe o assunto").max(100, "Máximo de 100 caracteres"),
  competencias: z.array(z.string()),
  description: z.string().trim().max(255, "Máximo de 255 caracteres").optional(),
  organizers: z.array(z.custom<Participant>()).min(1, "Selecione ao menos um organizador"),
  speakers: z.array(z.custom<Participant>()),
  sponsors: z.array(z.custom<Participant>()),
  nameSignature: z.string().trim().min(1, "Informe o nome do responsável"),
  positionSignature: z.string().trim().min(1, "Informe o cargo / descrição"),
  signature: z.union([z.instanceof(File), z.null()]).optional(),
  background: z.union([z.instanceof(File), z.null()]).optional(),
});

export type EventFormValues = z.infer<typeof editEventSchema>;

export const onlyDigits = (value: string) => value.replace(/\D/g, "");
