/**
 * @module Address
 * @description OrbitDB database address verification.
 */

/**
 * Interface representing an OrbitDB address.
 */
export interface OrbitDBAddress {
	/** Protocol prefix "/orbitdb/". */
	protocol: string;

	/** The hash of the database manifest. */
	hash: string;

	/** The full database address. */
	address: string;

	/**
	 * Returns the address as a string.
	 * @returns {string} Address as a string.
	 */
	toString(): string;
}

/**
 * Validates an OrbitDB database address.
 * @function isValidAddress
 * @param {OrbitDBAddress | string} address - An OrbitDB database address.
 * @returns {boolean} True if the address is a valid OrbitDB database address, false otherwise.
 * @static
 */
export function isValidAddress(address: OrbitDBAddress | string): boolean;

/**
 * Parses an OrbitDB database address.
 * @function parseAddress
 * @param {OrbitDBAddress | string} address - A valid OrbitDB database address.
 * @returns {OrbitDBAddress} An instance of OrbitDBAddress.
 * @throws {Error} Not a valid OrbitDB address if no address is provided or if the address is invalid.
 * @static
 */
export function parseAddress(address: OrbitDBAddress | string): OrbitDBAddress;

/**
 * Creates an instance of OrbitDBAddress.
 * @function OrbitDBAddress
 * @param {string} address - The OrbitDB address string.
 * @returns {OrbitDBAddress} The OrbitDBAddress object with protocol, hash, and toString method.
 */
declare function OrbitDBAddress(address: string): OrbitDBAddress;

export default OrbitDBAddress;
