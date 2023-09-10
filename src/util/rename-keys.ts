/**
 * renames all the keys
 * every return type will be a string, since the values of CTA types are also strings
 * @param keyMap
 * @param object
 */
export function renameKeys<J extends {}, K extends {}>(
	keyMap: Record<keyof J, keyof K>,
	object: J
): Record<keyof K, string> {
	const alteredKeyEntries = Object.entries(object).map(([key, value]) => [
		keyMap[key as keyof J],
		value as string,
	]);

	return Object.fromEntries(alteredKeyEntries);
}


