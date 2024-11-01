// access-controllers-ipfs.d.ts

import {
	IPFSBlockStorage,
	LRUStorage,
	ComposedStorage,
} from "../storage/index.js";
import { Block } from "multiformats/block";
import { Identities } from "some-identity-module"; // Update with the correct import path for Identities
import { OrbitDB } from "orbit-db"; // Update with the correct import path for OrbitDB
import { LogEntry } from "log-entry-module"; // Update with the correct import path for LogEntry

/**
 * @namespace AccessControllers-IPFS
 * @memberof module:AccessControllers
 */

/**
 * Parameters for creating an Access Control List (ACL).
 */
interface AccessControlListParams {
	storage: any; // Replace with the actual type for storage
	type: string;
	params: {
		write?: string[]; // Optional array of identity IDs who can write
	};
}

/**
 * Creates an Access Control List and stores it in the provided storage.
 * @param {AccessControlListParams} params The parameters for the ACL.
 * @returns {Promise<string>} The hash of the stored ACL.
 */
declare const AccessControlList: (
	params: AccessControlListParams
) => Promise<string>;

/**
 * Configuration options for the IPFSAccessController.
 */
interface IPFSAccessControllerOptions {
	write?: string[]; // Optional array of identity IDs who can write
	storage?: any; // Replace with the actual type for storage
}

/**
 * The IPFSAccessController function type.
 * @callback IPFSAccessController
 * @param {Object} params Various parameters for configuring the access controller.
 * @param {module:OrbitDB} params.orbitdb An OrbitDB instance.
 * @param {module:Identities} params.identities An Identities instance.
 * @param {string} [params.address] The address of the database.
 * @function
 * @instance
 * @async
 * @memberof module:AccessControllers.AccessControllers-IPFS
 */
type IPFSAccessController = (
	params: IPFSAccessControllerOptions
) => (params: {
	orbitdb: OrbitDB;
	identities: Identities;
	address?: string;
}) => Promise<IPFSAccessControllerInstance>;

/**
 * The instance of IPFSAccessController.
 */
interface IPFSAccessControllerInstance {
	type: string; // Type of the access controller
	address: string; // The address of the access control list
	write: string[]; // Array of identity IDs that can write
	canAppend: (entry: LogEntry) => Promise<boolean>; // Function to verify write permission
}

/**
 * Defines an IPFS access controller.
 * @param {IPFSAccessControllerOptions} options Various options for configuring the IPFSAccessController.
 * @returns {IPFSAccessController} An IPFSAccessController function.
 * @memberof module:AccessControllers
 */
declare const IPFSAccessController: IPFSAccessController;

export default IPFSAccessController;
