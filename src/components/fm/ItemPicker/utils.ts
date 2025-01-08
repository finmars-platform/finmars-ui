import type { FmAttribute } from '@/types';

export function prepareSpecialGroup<T extends FmAttribute>(
	items: string[] = [],
	data: T[] = []
): Record<string, T> {
	return items.reduce(
		(acc, i) => {
			const item = data.find((item) => item.key === i);
			if (item) {
				const { key } = item;
				acc[key] = item;
			}

			return acc;
		},
		{} as Record<string, T>
	);
}
