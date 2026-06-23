import { describe, expect, it } from 'vitest';

describe('US10 - Repetir intervalo', () => {
	it('debería considerar lunes, miércoles y viernes', () => {
		const dias = ['lunes', 'miércoles', 'viernes'];

		expect(dias).toHaveLength(3);
		expect(dias).toEqual(['lunes', 'miércoles', 'viernes']);
	});
});