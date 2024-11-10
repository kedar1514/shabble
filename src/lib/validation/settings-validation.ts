import { z } from 'zod';

const settingsParamsSchema = z.object({
  userId: z.string({
    required_error: 'User ID is required',
  }),
  boardSize: z.coerce
    .number()
    .min(1, 'Board size must be at least 1')
    .default(6),
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD')
    .default(() => new Date().toISOString().split('T')[0]),
});

export function validateStatusParams(searchParams: URLSearchParams, userId: string | null): {
  isValid: boolean;
  errors: string[];
  data: z.infer<typeof settingsParamsSchema> | null;
} {
  const result = settingsParamsSchema.safeParse({
    userId,
    boardSize: searchParams.get('boardSize'),
    date: searchParams.get('date'),
  });

  if (!result.success) {
    return {
      isValid: false,
      errors: result.error.errors.map(err => err.message),
      data: null,
    };
  }

  return {
    isValid: true,
    errors: [],
    data: result.data,
  };
}