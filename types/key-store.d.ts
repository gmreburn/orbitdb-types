/**
 * @module KeyStore
 * @description
 * Provides a local key manager for OrbitDB.
 * @example <caption>Create a keystore with defaults.</caption>
 * const keystore = await KeyStore()
 * @example <caption>Create a keystore with custom storage.</caption>
 * const storage = await MemoryStorage()
 * const keystore = await KeyStore({ storage })
 */
declare module KeyStore {
	import { Secp256k1PrivateKey, Secp256k1PublicKey } from "@libp2p/crypto/keys";

	/**
	 * Parameters for configuring the KeyStore.
	 */
	export interface KeyStoreParams {
		storage?: Storage;
		path?: string;
	}

	/**
	 * Represents a storage mechanism.
	 */
	export interface Storage {
		put: (key: string, value: Uint8Array) => Promise<void>;
		get: (key: string) => Promise<Uint8Array | null>;
		clear: () => Promise<void>;
		close: () => Promise<void>;
	}

	/**
	 * Key pair used in signing and verification.
	 */
	export interface KeyPair {
		publicKey: Secp256k1PublicKey;
		privateKey: Secp256k1PrivateKey;
	}

	/**
	 * Verifies input data against a cached version of the signed message.
	 * @param signature The generated signature.
	 * @param publicKey The derived public key of the key pair.
	 * @param data The data to be verified.
	 * @returns True if the data and cache match, false otherwise.
	 */
	export function verifyMessage(
		signature: string,
		publicKey: string,
		data: string
	): Promise<boolean>;

	/**
	 * Signs data using a key pair.
	 * @param key The key to use for signing data.
	 * @param data The data to sign.
	 * @returns A signature as a string.
	 * @throws No signing key given if no key is provided.
	 * @throws Given input data was undefined if no data is provided.
	 */
	export function signMessage(
		key: Secp256k1PrivateKey,
		data: string | Uint8Array
	): Promise<string>;

	/**
	 * Creates an instance of KeyStore.
	 * @param params Configuration parameters for KeyStore.
	 * @returns An instance of KeyStore.
	 */
	export default function KeyStore(
		params?: KeyStoreParams
	): Promise<KeyStoreInstance>;

	/**
	 * The instance returned by `KeyStore`.
	 */
	export interface KeyStoreInstance {
		/**
		 * Closes the KeyStore's underlying storage.
		 */
		close(): Promise<void>;

		/**
		 * Clears the KeyStore's underlying storage.
		 */
		clear(): Promise<void>;

		/**
		 * Checks if a key exists in the keystore.
		 * @param id The id of an Identity to check the key for.
		 * @returns True if the key exists, false otherwise.
		 * @throws `id needed to check a key` if no id is specified.
		 */
		hasKey(id: string): Promise<boolean>;

		/**
		 * Adds a private key to the keystore.
		 * @param id The id of the Identity to whom the key belongs.
		 * @param key The private key to store.
		 */
		addKey(id: string, key: Uint8Array): Promise<void>;

		/**
		 * Creates a key pair and stores it in the keystore.
		 * @param id The id of the Identity to generate the key pair for.
		 * @returns A KeyPair object with public and private keys.
		 * @throws `id needed to create a key` if no id is specified.
		 */
		createKey(id: string): Promise<KeyPair>;

		/**
		 * Retrieves a key from the keystore.
		 * @param id The id of the Identity whose key to retrieve.
		 * @returns The key as a Uint8Array.
		 * @throws `id needed to get a key` if no id is specified.
		 */
		getKey(id: string): Promise<Uint8Array | undefined>;

		/**
		 * Retrieves the serialized public key from a key pair.
		 * @param keys A key pair containing a public key.
		 * @param options Options to format the public key.
		 * @returns The public key in specified format (hex or buffer).
		 * @throws `Supported formats are "hex" and "buffer"` if an invalid format is passed.
		 */
		getPublic(
			keys: KeyPair,
			options?: { format?: "hex" | "buffer" }
		): Uint8Array | string;
	}
}

export = KeyStore;
