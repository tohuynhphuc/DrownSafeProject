import { z } from 'zod/v4-mini';

export const data_schema = z.object({
	username: z.string(),
	longitude: z.number(),
	latitude: z.number(),
	accuracy: z.number()
});

export type data = z.infer<typeof data_schema>;
