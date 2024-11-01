/**
 * @module OrbitDB
 * @description Provides an interface for users to interact with OrbitDB.
 */

import { IPFS } from "ipfs-core";
import KeyStore from "./key-store.js";
import { Identities } from "./identities/index.js";
import OrbitDBAddress, { isValidAddress } from "./address.js";
import ManifestStore from "./manifest-store.js";
import { Database } from "./databases/index.js";
import IPFSAccessController from "./access-controllers/ipfs.js";

type IdentityProvider = {
	provider: (...args: any[]) => any;
};

/**
 * Parameters for creating an identity.
 */
interface CreateIdentityParams {
	/**
	 * The id of the identity to create.
	 */
	id?: string;

	/**
	 * The provider used for creating the identity.
	 */
	provider?: IdentityProvider;
}

/**
 * Interface representing an Identity with a method to create a new identity.
 */
interface Identity {
	/**
	 * Creates a new identity based on the provided parameters.
	 * @param params Parameters for creating the identity.
	 */
	createIdentity: (params: CreateIdentityParams) => Promise<Identity>;
}

/**
 * Parameters for configuring an OrbitDB instance.
 */
interface OrbitDBParams {
	/**
	 * An IPFS instance required by OrbitDB.
	 */
	ipfs: IPFS;

	/**
	 * The unique id for the OrbitDB instance.
	 */
	id?: string;

	/**
	 * An Identity instance or object used to define the identity for this OrbitDB instance.
	 */
	identity?: Identity;

	/**
	 * An Identities system instance used for identity management.
	 */
	identities?: Identities;

	/**
	 * Directory path for storing OrbitDB data.
	 */
	directory?: string;
}

/**
 * Parameters for configuring a database in OrbitDB.
 */
interface DatabaseParams {
	/**
	 * The type of database, such as "events" or "documents".
	 */
	type?: string;

	/**
	 * Metadata for the database. Only used when creating a new database.
	 */
	meta?: Record<string, unknown>;

	/**
	 * Whether to automatically sync the database. Default is true.
	 */
	sync?: boolean;

	/**
	 * Database module compatible with the OrbitDB instance.
	 */
	Database?: Database;

	/**
	 * Access controller module to manage access permissions for the database.
	 */
	AccessController?: typeof IPFSAccessController;

	/**
	 * Storage module for managing log heads.
	 */
	headsStorage?: any;

	/**
	 * Storage module for managing log entries.
	 */
	entryStorage?: any;

	/**
	 * Storage module for managing the index of log entries.
	 */
	indexStorage?: any;

	/**
	 * The number of references to keep for log entries.
	 */
	referencesCount?: number;
}

/**
 * Creates an instance of OrbitDB.
 * @function createOrbitDB
 * @param {OrbitDBParams} params One or more parameters for configuring OrbitDB.
 * @return {OrbitDBInstance} An instance of OrbitDB.
 * @throws "IPFS instance is required argument" if no IPFS instance is provided.
 */
export default function OrbitDB(
	params: OrbitDBParams
): Promise<OrbitDBInstance>;

/**
 * @interface OrbitDBInstance
 * @description The instance returned by {@link module:OrbitDB}.
 */
export interface OrbitDBInstance {
	/**
	 * The unique identifier for this OrbitDB instance.
	 */
	id: string;

	/**
	 * The IPFS instance associated with this OrbitDB instance.
	 */
	ipfs: IPFS;

	/**
	 * Directory path where OrbitDB data is stored.
	 */
	directory: string;

	/**
	 * KeyStore instance used to manage cryptographic keys for OrbitDB.
	 */
	keystore: KeyStore;

	/**
	 * Identities system instance for managing identities.
	 */
	identities: Identities;

	/**
	 * The identity associated with this OrbitDB instance.
	 */
	identity: Identity;

	/**
	 * Peer ID of the IPFS node connected to this OrbitDB instance.
	 */
	peerId: string;

	/**
	 * Opens an existing database or creates a new one if it does not already exist.
	 * @function open
	 * @param {string} address The address of an existing database to open, or the name of a new database.
	 * @param {DatabaseParams} params Database configuration parameters.
	 * @return {Promise<Database>} A database instance.
	 * @throws "Unsupported database type" if the type specified is not in the list of known databaseTypes.
	 */
	open(address: string, params?: DatabaseParams): Promise<Database>;

	/**
	 * Stops the OrbitDB instance, closing the underlying keystore and manifest store.
	 * @function stop
	 * @async
	 */
	stop(): Promise<void>;
}

export { OrbitDBAddress, isValidAddress };
