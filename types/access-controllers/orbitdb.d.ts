/**
 * @namespace AccessControllers-OrbitDB
 * @memberof module:AccessControllers
 */
import IPFSAccessController from "./ipfs.js";
import { createId } from "../utils/index.js";

/**
 * Type representing the options for OrbitDBAccessController.
 */
export interface OrbitDBAccessControllerOptions {
	/**
	 * An array of IDs of identities who can write to the database.
	 */
	write?: string[];
}

/**
 * Type representing the parameters for the OrbitDBAccessController callback.
 */
export interface OrbitDBAccessControllerParams {
	/**
	 * An instance of OrbitDB.
	 */
	orbitdb: any; // Replace 'any' with the actual OrbitDB type if available.

	/**
	 * An instance of Identities.
	 */
	identities: any; // Replace 'any' with the actual Identities type if available.

	/**
	 * The address of the database. Optional, will be generated if not provided.
	 */
	address?: string;

	/**
	 * The name of the database. Optional, used if address is not provided.
	 */
	name?: string;
}

/**
 * Type representing the OrbitDBAccessController function.
 */
export type OrbitDBAccessController = (
	options?: OrbitDBAccessControllerOptions
) => (
	params: OrbitDBAccessControllerParams
) => Promise<OrbitDBAccessControllerInstance>;

/**
 * Interface representing the instance returned by the OrbitDBAccessController.
 */
export interface OrbitDBAccessControllerInstance {
	/**
	 * The type of the access controller.
	 */
	type: string;

	/**
	 * The address of the database.
	 */
	address: string;

	/**
	 * An array of IDs of identities who can write to the database.
	 */
	write: string[];

	/**
	 * Verifies the write permission of an entry.
	 * @param entry An entry to verify.
	 * @returns True if the entry's identity has write permission, false otherwise.
	 */
	canAppend(entry: any): Promise<boolean>; // Replace 'any' with the actual entry type if available.

	/**
	 * Gets the access capabilities of the OrbitDB access controller.
	 * @returns A list of IDs of identities with admin and write access.
	 */
	capabilities(): Promise<Record<string, Set<string>>>;

	/**
	 * Gets a list of identities with the specified capability.
	 * @param capability A capability (e.g. write).
	 * @returns One or more addresses with the specified capability.
	 */
	get(capability: string): Promise<Set<string>>;

	/**
	 * Close the underlying access control database.
	 */
	close(): Promise<void>;

	/**
	 * Drop the underlying access control database.
	 */
	drop(): Promise<void>;

	/**
	 * Checks whether an identity has a capability.
	 * @param capability A capability (e.g. write).
	 * @param key An ID of an identity.
	 * @returns True if the identity has the capability, false otherwise.
	 */
	hasCapability(capability: string, key: string): Promise<boolean>;

	/**
	 * Grants a capability to an identity, storing it to the access control database.
	 * @param capability A capability (e.g. write).
	 * @param key An ID of an identity.
	 */
	grant(capability: string, key: string): Promise<void>;

	/**
	 * Revokes a capability from an identity, removing it from the access control database.
	 * @param capability A capability (e.g. write).
	 * @param key An ID of an identity.
	 */
	revoke(capability: string, key: string): Promise<void>;

	/**
	 * Events related to the underlying database.
	 */
	events: any; // Replace 'any' with the actual events type if available.
}

/**
 * The type of the OrbitDB access controller.
 */
export const type: string;

export default OrbitDBAccessController;
